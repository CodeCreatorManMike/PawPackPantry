import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { resolveOrderItems, RawOrderItem } from "@/lib/invoice";
import { DEFAULT_DELIVERY_FEE } from "@/lib/priceList";
import { parseWhatsAppOrder } from "@/lib/parseWhatsAppOrder";

// Called by whatever automation glue (n8n / Make / Zapier / a custom WhatsApp Business API
// webhook) receives an incoming WhatsApp order message. Not for browser use — authenticated
// with a shared secret instead of the admin session cookie.
//
// Two ways to call it:
//
// 1. Forward the raw message text verbatim, no parsing needed on the automation side:
//    { "raw_message": "Name: Sarah Pillay\nPet: Buddy\n...\nItems:\nBeefy Bark Bowl, 1kg, 1" }
//    See lib/parseWhatsAppOrder.ts for the exact template customers/staff should follow.
//
// 2. Or send already-structured JSON if your automation does its own parsing:
//    {
//      "customer_name": "Sarah Pillay",
//      "pet_name": "Buddy",
//      "contact_number": "57755571",
//      "address": "12 Royal Road, Curepipe",
//      "delivery_date": "15 July",
//      "is_preorder": true,
//      "delivery_fee": 100,          // optional, defaults to 100
//      "items": [
//        { "catalogId": "beefy-bark-bowl", "size": "1kg", "qty": 1 },
//        { "description": "Donation", "unitPrice": 65, "qty": 1 }
//      ]
//    }
// See lib/priceList.ts CATALOG for valid catalogId / size values.

function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.WHATSAPP_WEBHOOK_SECRET;
  if (!expected) return false;
  const provided = req.headers.get("x-webhook-secret") ?? "";
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });

  let order: {
    customer_name: string;
    pet_name?: string;
    contact_number?: string;
    address?: string;
    delivery_date?: string;
    is_preorder?: boolean;
    reference?: string;
    delivery_fee?: number;
    items: RawOrderItem[];
  };

  if (typeof body.raw_message === "string") {
    const parsed = parseWhatsAppOrder(body.raw_message);
    if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    order = parsed.order;
  } else {
    if (!body.customer_name) return NextResponse.json({ error: "customer_name is required." }, { status: 400 });
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "items must be a non-empty array." }, { status: 400 });
    }
    order = body;
  }

  const resolved = resolveOrderItems(order.items);
  if ("error" in resolved) return NextResponse.json({ error: resolved.error }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("invoices")
    .insert({
      customer_name: order.customer_name,
      pet_name: order.pet_name ?? "",
      contact_number: order.contact_number ?? "",
      address: order.address ?? "",
      delivery_date: order.delivery_date ?? "",
      items: resolved.items,
      delivery_fee: Number(order.delivery_fee) || DEFAULT_DELIVERY_FEE,
      is_preorder: order.is_preorder ?? true,
      reference: order.reference ?? `${order.pet_name || order.customer_name} order`,
      source: "whatsapp",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ invoice: data });
}
