import { CATALOG } from "./priceList";
import type { RawOrderItem } from "./invoice";

// Parses the structured order template staff/customers are asked to send over WhatsApp:
//
//   Name: Sarah Pillay
//   Pet: Buddy
//   Contact: 57755571
//   Address: 12 Royal Road, Curepipe
//   Delivery: 15 July
//   Preorder: yes
//   Items:
//   Beefy Bark Bowl, 1kg, 1
//   Bone Appetit Biscuits, S, 2
//   Sponsor a Meal for a Stray, , 2
//
// Header lines are "Key: value" pairs. Everything after the "Items:" line is one item per
// line, comma-separated as "Item name, Size, Qty" (size may be blank for flat-priced items).
// Item names are matched case-insensitively against lib/priceList CATALOG — no fuzzy matching,
// so a misspelled item name fails loudly instead of silently pricing something wrong.

export type ParsedOrder = {
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

const HEADER_KEYS: Record<string, keyof ParsedOrder> = {
  name: "customer_name",
  pet: "pet_name",
  contact: "contact_number",
  address: "address",
  delivery: "delivery_date",
  preorder: "is_preorder",
  reference: "reference",
  "delivery fee": "delivery_fee",
};

function findCatalogItemByName(name: string) {
  const needle = name.trim().toLowerCase();
  return CATALOG.find(i => i.name.toLowerCase() === needle);
}

export function parseWhatsAppOrder(raw: string): { order: ParsedOrder } | { error: string } {
  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);
  const itemsIdx = lines.findIndex(l => l.toLowerCase() === "items:");
  if (itemsIdx === -1) return { error: 'Message must have an "Items:" line followed by one item per line.' };

  const order: Partial<ParsedOrder> = {};
  for (const line of lines.slice(0, itemsIdx)) {
    const sepIdx = line.indexOf(":");
    if (sepIdx === -1) continue;
    const key = line.slice(0, sepIdx).trim().toLowerCase();
    const value = line.slice(sepIdx + 1).trim();
    const field = HEADER_KEYS[key];
    if (!field) continue;
    if (field === "is_preorder") order.is_preorder = /^(y|yes|true)$/i.test(value);
    else if (field === "delivery_fee") order.delivery_fee = Number(value) || 0;
    else (order as Record<string, string>)[field] = value;
  }

  if (!order.customer_name) return { error: 'Missing "Name:" line.' };

  const items: RawOrderItem[] = [];
  for (const line of lines.slice(itemsIdx + 1)) {
    const parts = line.split(",").map(p => p.trim());
    const [itemName, size, qtyStr] = parts;
    if (!itemName) continue;
    const qty = Number(qtyStr);
    if (!Number.isFinite(qty) || qty <= 0) return { error: `Item line "${line}": qty must be a positive number.` };

    const catalogItem = findCatalogItemByName(itemName);
    if (!catalogItem) return { error: `Item line "${line}": "${itemName}" doesn't match any menu item.` };

    items.push({ catalogId: catalogItem.id, size: size || "", qty });
  }

  if (items.length === 0) return { error: "No items found after the \"Items:\" line." };

  return { order: { ...order, customer_name: order.customer_name, items } as ParsedOrder };
}
