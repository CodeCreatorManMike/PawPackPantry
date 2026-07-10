import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { InvoiceLineItem } from "@/lib/invoice";

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin.from("invoices").select("*").order("invoice_no", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ invoices: data });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.customer_name || !Array.isArray(body?.items) || body.items.length === 0) {
    return NextResponse.json({ error: "customer_name and at least one item are required." }, { status: 400 });
  }

  const items: InvoiceLineItem[] = body.items;

  const { data, error } = await supabaseAdmin
    .from("invoices")
    .insert({
      customer_name: body.customer_name,
      pet_name: body.pet_name ?? "",
      contact_number: body.contact_number ?? "",
      address: body.address ?? "",
      delivery_date: body.delivery_date ?? "",
      items,
      delivery_fee: Number(body.delivery_fee) || 0,
      is_preorder: Boolean(body.is_preorder),
      reference: body.reference ?? "",
      source: "manual",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ invoice: data });
}
