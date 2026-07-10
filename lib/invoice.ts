import { findCatalogPrice } from "./priceList";

export type InvoiceLineItem = {
  id: string;
  description: string;
  size: string;
  unitPrice: number;
  qty: number;
};

// Loosely-typed item as it might arrive from an automated order source (e.g. a WhatsApp
// parsing pipeline). Catalog items are re-priced server-side against lib/priceList — the
// caller only needs to know the catalog id, size, and qty, never the current price.
export type RawOrderItem = {
  catalogId?: string;
  size?: string;
  description?: string;
  unitPrice?: number;
  qty: number;
};

export type InvoiceRecord = {
  id: string;
  invoice_no: number;
  customer_name: string;
  pet_name: string;
  contact_number: string;
  address: string;
  delivery_date: string;
  issue_date: string;
  items: InvoiceLineItem[];
  delivery_fee: number;
  is_preorder: boolean;
  reference: string;
  created_at: string;
};

export function lineTotal(item: InvoiceLineItem): number {
  return item.unitPrice * item.qty;
}

export function subtotal(items: InvoiceLineItem[]): number {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

export function grandTotal(items: InvoiceLineItem[], deliveryFee: number): number {
  return subtotal(items) + deliveryFee;
}

export function depositDue(total: number): number {
  return Math.round(total * 0.5);
}

export function formatRs(amount: number): string {
  return `Rs ${amount.toLocaleString("en-US")}`;
}

export function formatInvoiceNo(n: number): string {
  return n.toString().padStart(4, "0");
}

export function resolveOrderItems(raw: RawOrderItem[]): { items: InvoiceLineItem[] } | { error: string } {
  const items: InvoiceLineItem[] = [];

  for (const [idx, entry] of raw.entries()) {
    const qty = Number(entry.qty);
    if (!Number.isFinite(qty) || qty <= 0) return { error: `Item ${idx + 1}: qty must be a positive number.` };

    if (entry.catalogId) {
      const resolved = findCatalogPrice(entry.catalogId, entry.size ?? "");
      if (!resolved) return { error: `Item ${idx + 1}: unknown catalogId "${entry.catalogId}" or size "${entry.size ?? ""}".` };
      items.push({ id: `${entry.catalogId}-${idx}`, description: resolved.name, size: entry.size ?? "", unitPrice: resolved.price, qty });
    } else if (entry.description && typeof entry.unitPrice === "number") {
      items.push({ id: `custom-${idx}`, description: entry.description, size: "", unitPrice: entry.unitPrice, qty });
    } else {
      return { error: `Item ${idx + 1}: must have either a catalogId or a description + unitPrice.` };
    }
  }

  if (items.length === 0) return { error: "At least one item is required." };
  return { items };
}
