"use client";
import { useMemo, useState } from "react";
import type { InvoiceRow } from "@/lib/supabase";
import { CATALOG, CATEGORIES, DEFAULT_DELIVERY_FEE } from "@/lib/priceList";
import { InvoiceLineItem, InvoiceRecord, depositDue, formatInvoiceNo, formatRs, grandTotal, lineTotal, subtotal } from "@/lib/invoice";
import InvoiceDocument from "@/components/InvoiceDocument";

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: ".9rem",
  padding: "9px 12px",
  borderRadius: 10,
  border: "2px solid var(--cream-deep)",
  background: "var(--white)",
  color: "var(--ink)",
  outline: "none",
  width: "100%",
};

const fieldLabel: React.CSSProperties = { fontFamily: "var(--font-head)", fontSize: ".76rem", fontWeight: 600, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: ".04em" };

export default function InvoiceManager({ invoices, onSaved }: { invoices: InvoiceRow[]; onSaved: () => void }) {
  const [customerName, setCustomerName] = useState("");
  const [petName, setPetName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(DEFAULT_DELIVERY_FEE);
  const [isPreorder, setIsPreorder] = useState(true);
  const [reference, setReference] = useState("");

  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [itemId, setItemId] = useState(CATALOG.find(i => i.category === CATEGORIES[0])?.id ?? "");
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const [customDesc, setCustomDesc] = useState("");
  const [customPrice, setCustomPrice] = useState(0);

  const [items, setItems] = useState<InvoiceLineItem[]>([]);
  const [preview, setPreview] = useState<InvoiceRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const itemsInCategory = useMemo(() => CATALOG.filter(i => i.category === category), [category]);
  const selectedItem = useMemo(() => CATALOG.find(i => i.id === itemId), [itemId]);
  const selectedSize = selectedItem?.sizes[sizeIdx];

  function addCatalogItem() {
    if (!selectedItem || !selectedSize) return;
    setItems(list => [...list, {
      id: newId(),
      description: selectedItem.name,
      size: selectedSize.size,
      unitPrice: selectedSize.price,
      qty,
    }]);
    setQty(1);
  }

  function addCustomItem() {
    if (!customDesc.trim() || customPrice <= 0) return;
    setItems(list => [...list, { id: newId(), description: customDesc.trim(), size: "", unitPrice: customPrice, qty: 1 }]);
    setCustomDesc("");
    setCustomPrice(0);
  }

  function updateQty(id: string, qty: number) {
    setItems(list => list.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  }

  function removeItem(id: string) {
    setItems(list => list.filter(i => i.id !== id));
  }

  function resetForm() {
    setCustomerName(""); setPetName(""); setContactNumber(""); setAddress("");
    setDeliveryDate(""); setDeliveryFee(DEFAULT_DELIVERY_FEE); setIsPreorder(true);
    setReference(""); setItems([]);
  }

  async function generateInvoice() {
    setError("");
    if (!customerName.trim()) { setError("Customer name is required."); return; }
    if (items.length === 0) { setError("Add at least one line item."); return; }
    setSaving(true);
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName.trim(),
        pet_name: petName.trim(),
        contact_number: contactNumber.trim(),
        address: address.trim(),
        delivery_date: deliveryDate.trim(),
        items,
        delivery_fee: deliveryFee,
        is_preorder: isPreorder,
        reference: reference.trim() || `${petName.trim() || customerName.trim()} order`,
      }),
    });
    setSaving(false);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { setError(json.error ?? "Failed to save invoice."); return; }
    setPreview(rowToRecord(json.invoice as InvoiceRow));
    onSaved();
    resetForm();
  }

  function rowToRecord(row: InvoiceRow): InvoiceRecord {
    return {
      id: row.id,
      invoice_no: row.invoice_no,
      customer_name: row.customer_name,
      pet_name: row.pet_name ?? "",
      contact_number: row.contact_number ?? "",
      address: row.address ?? "",
      delivery_date: row.delivery_date ?? "",
      issue_date: row.issue_date,
      items: row.items,
      delivery_fee: Number(row.delivery_fee),
      is_preorder: row.is_preorder,
      reference: row.reference ?? "",
      created_at: row.created_at,
    };
  }

  async function deleteInvoice(id: string) {
    if (!confirm("Delete this invoice?")) return;
    await fetch(`/api/invoices/${id}`, { method: "DELETE" });
    onSaved();
  }

  async function downloadPdf() {
    if (!preview) return;
    setDownloading(true);
    try {
      const node = document.querySelector<HTMLElement>(".invoice-print-area");
      if (!node) return;
      const { default: html2canvas } = await import("html2canvas-pro");
      const { default: jsPDF } = await import("jspdf");

      const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`invoice-${formatInvoiceNo(preview.invoice_no)}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  if (preview) {
    return (
      <div>
        <div className="no-print" style={{ display: "flex", gap: 10, marginBottom: 20, padding: "0 20px" }}>
          <button onClick={() => window.print()} className="btn sage" style={{ fontSize: ".85rem", padding: "9px 18px" }}>🖨️ Print</button>
          <button onClick={downloadPdf} disabled={downloading} className="btn ghost" style={{ fontSize: ".85rem", padding: "9px 18px" }}>
            {downloading ? "Generating…" : "⬇️ Save as PDF"}
          </button>
          <button onClick={() => setPreview(null)} className="btn ghost" style={{ fontSize: ".85rem", padding: "9px 18px" }}>← Back to invoices</button>
        </div>
        <InvoiceDocument invoice={preview} />
      </div>
    );
  }

  const currentSubtotal = subtotal(items);
  const currentTotal = grandTotal(items, deliveryFee);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {/* Customer details */}
        <div>
          <p style={{ ...fieldLabel, fontSize: ".85rem", marginBottom: 10 }}>Customer &amp; Delivery</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><label style={fieldLabel}>Customer name *</label><input style={inputStyle} value={customerName} onChange={e => setCustomerName(e.target.value)} /></div>
            <div><label style={fieldLabel}>Pet&apos;s name</label><input style={inputStyle} value={petName} onChange={e => setPetName(e.target.value)} /></div>
            <div><label style={fieldLabel}>Contact number</label><input style={inputStyle} value={contactNumber} onChange={e => setContactNumber(e.target.value)} /></div>
            <div><label style={fieldLabel}>Address</label><input style={inputStyle} value={address} onChange={e => setAddress(e.target.value)} /></div>
            <div><label style={fieldLabel}>Delivery/collection date</label><input style={inputStyle} placeholder="e.g. 15 July" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} /></div>
            <div><label style={fieldLabel}>Reference (defaults to pet name)</label><input style={inputStyle} value={reference} onChange={e => setReference(e.target.value)} /></div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ flex: 1 }}><label style={fieldLabel}>Delivery fee (Rs)</label><input type="number" style={inputStyle} value={deliveryFee} onChange={e => setDeliveryFee(Number(e.target.value))} /></div>
              <label style={{ ...fieldLabel, display: "flex", alignItems: "center", gap: 8, marginTop: 18 }}>
                <input type="checkbox" checked={isPreorder} onChange={e => setIsPreorder(e.target.checked)} /> Pre-order (50% deposit)
              </label>
            </div>
          </div>
        </div>

        {/* Item picker */}
        <div>
          <p style={{ ...fieldLabel, fontSize: ".85rem", marginBottom: 10 }}>Add Item From Menu</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label style={fieldLabel}>Category</label>
              <select style={inputStyle} value={category} onChange={e => {
                const cat = e.target.value;
                setCategory(cat);
                const first = CATALOG.find(i => i.category === cat);
                setItemId(first?.id ?? "");
                setSizeIdx(0);
              }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={fieldLabel}>Item</label>
              <select style={inputStyle} value={itemId} onChange={e => { setItemId(e.target.value); setSizeIdx(0); }}>
                {itemsInCategory.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
              {selectedItem?.note && <p style={{ fontSize: ".76rem", color: "var(--ink-soft)", marginTop: 4 }}>{selectedItem.note}</p>}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={fieldLabel}>Size</label>
                <select style={inputStyle} value={sizeIdx} onChange={e => setSizeIdx(Number(e.target.value))}>
                  {selectedItem?.sizes.map((s, idx) => <option key={idx} value={idx}>{s.size || "Standard"} — {formatRs(s.price)}</option>)}
                </select>
              </div>
              <div style={{ width: 90 }}>
                <label style={fieldLabel}>Qty</label>
                <input type="number" min={1} style={inputStyle} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} />
              </div>
            </div>
            <button onClick={addCatalogItem} className="btn sage" style={{ fontSize: ".85rem", padding: "9px 18px" }}>+ Add to invoice</button>

            <div style={{ borderTop: "2px solid var(--cream-deep)", marginTop: 6, paddingTop: 14 }}>
              <p style={{ ...fieldLabel, marginBottom: 8 }}>Or add a custom line (discount, donation, etc.)</p>
              <div style={{ display: "flex", gap: 10 }}>
                <input style={inputStyle} placeholder="Description" value={customDesc} onChange={e => setCustomDesc(e.target.value)} />
                <input type="number" style={{ ...inputStyle, width: 110 }} placeholder="Price" value={customPrice || ""} onChange={e => setCustomPrice(Number(e.target.value))} />
                <button onClick={addCustomItem} className="btn ghost" style={{ fontSize: ".85rem", padding: "9px 16px", whiteSpace: "nowrap" }}>+ Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Line items */}
      <div style={{ marginTop: 24 }}>
        <p style={{ ...fieldLabel, fontSize: ".85rem", marginBottom: 10 }}>Line Items ({items.length})</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...fieldLabel, textAlign: "left", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>Description</th>
              <th style={{ ...fieldLabel, textAlign: "right", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>Unit Price</th>
              <th style={{ ...fieldLabel, textAlign: "right", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>Qty</th>
              <th style={{ ...fieldLabel, textAlign: "right", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>Total</th>
              <th style={{ borderBottom: "2px solid var(--cream-deep)" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={{ padding: "8px", fontSize: ".88rem" }}>{item.description}{item.size ? ` — ${item.size}` : ""}</td>
                <td style={{ padding: "8px", fontSize: ".88rem", textAlign: "right" }}>{formatRs(item.unitPrice)}</td>
                <td style={{ padding: "8px", textAlign: "right" }}>
                  <input type="number" min={1} value={item.qty} onChange={e => updateQty(item.id, Number(e.target.value))} style={{ ...inputStyle, width: 60, padding: "4px 8px", textAlign: "right" }} />
                </td>
                <td style={{ padding: "8px", fontSize: ".88rem", textAlign: "right", fontWeight: 600 }}>{formatRs(lineTotal(item))}</td>
                <td style={{ padding: "8px" }}>
                  <button onClick={() => removeItem(item.id)} style={{ color: "#c0584f", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: ".82rem" }}>Remove</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} style={{ padding: 20, textAlign: "center", color: "var(--ink-soft)" }}>No items added yet.</td></tr>}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14, gap: 24 }}>
          <div style={{ textAlign: "right", fontSize: ".88rem" }}>
            <p>Subtotal: <strong>{formatRs(currentSubtotal)}</strong></p>
            <p>Delivery: <strong>{formatRs(deliveryFee)}</strong></p>
            <p style={{ fontSize: "1rem" }}>Total: <strong>{formatRs(currentTotal)}</strong></p>
            {isPreorder && <p style={{ color: "var(--sage)" }}>Deposit due (50%): <strong>{formatRs(depositDue(currentTotal))}</strong></p>}
          </div>
        </div>

        {error && <p style={{ color: "#c0584f", fontWeight: 600, fontSize: ".85rem", textAlign: "right", marginTop: 8 }}>{error}</p>}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <button onClick={generateInvoice} disabled={saving} className="btn sage" style={{ fontSize: ".9rem", padding: "10px 22px" }}>
            {saving ? "Saving…" : "Generate Invoice"}
          </button>
        </div>
      </div>

      {/* Past invoices */}
      <div style={{ marginTop: 36, borderTop: "2px solid var(--cream-deep)", paddingTop: 20 }}>
        <p style={{ ...fieldLabel, fontSize: ".85rem", marginBottom: 10 }}>Past Invoices ({invoices.length})</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...fieldLabel, textAlign: "left", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>No.</th>
              <th style={{ ...fieldLabel, textAlign: "left", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>Customer</th>
              <th style={{ ...fieldLabel, textAlign: "left", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>Pet</th>
              <th style={{ ...fieldLabel, textAlign: "left", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>Source</th>
              <th style={{ ...fieldLabel, textAlign: "right", padding: "6px 8px", borderBottom: "2px solid var(--cream-deep)" }}>Total</th>
              <th style={{ borderBottom: "2px solid var(--cream-deep)" }}></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(row => (
              <tr key={row.id}>
                <td style={{ padding: "8px", fontSize: ".88rem" }}>{formatInvoiceNo(row.invoice_no)}</td>
                <td style={{ padding: "8px", fontSize: ".88rem" }}>{row.customer_name}</td>
                <td style={{ padding: "8px", fontSize: ".88rem" }}>{row.pet_name}</td>
                <td style={{ padding: "8px", fontSize: ".82rem", color: "var(--ink-soft)" }}>{row.source === "whatsapp" ? "📱 WhatsApp" : "✍️ Manual"}</td>
                <td style={{ padding: "8px", fontSize: ".88rem", textAlign: "right" }}>{formatRs(grandTotal(row.items, Number(row.delivery_fee)))}</td>
                <td style={{ padding: "8px", display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button onClick={() => setPreview(rowToRecord(row))} style={{ color: "var(--sage)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: ".82rem" }}>View / Print</button>
                  <button onClick={() => deleteInvoice(row.id)} style={{ color: "#c0584f", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: ".82rem" }}>Delete</button>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && <tr><td colSpan={6} style={{ padding: 20, textAlign: "center", color: "var(--ink-soft)" }}>No invoices yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
