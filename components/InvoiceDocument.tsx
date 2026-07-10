import { BANK_DETAILS } from "@/lib/priceList";
import { InvoiceRecord, depositDue, formatInvoiceNo, formatRs, grandTotal, lineTotal, subtotal } from "@/lib/invoice";

export default function InvoiceDocument({ invoice }: { invoice: InvoiceRecord }) {
  const sub = subtotal(invoice.items);
  const total = grandTotal(invoice.items, invoice.delivery_fee);
  const deposit = depositDue(total);

  const label: React.CSSProperties = { fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".78rem", letterSpacing: ".04em", textTransform: "uppercase", color: "var(--ink)" };
  const value: React.CSSProperties = { fontSize: ".92rem", color: "var(--ink-soft)" };

  return (
    <div className="invoice-print-area" style={{ background: "var(--white)", color: "var(--ink)", maxWidth: 820, margin: "0 auto", padding: 40, fontFamily: "var(--font-body)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: "2.6rem", fontWeight: 700, margin: 0 }}>Invoice</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/logo-cutout.png" alt="Paw Pack Pantry" style={{ width: 150, height: "auto" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 24 }}>
        <div>
          <p style={label}>Issued To:</p>
          <p style={value}>Name: {invoice.customer_name}</p>
          <p style={value}>Pet&apos;s name: {invoice.pet_name}</p>
          <p style={value}>Contact Number: {invoice.contact_number}</p>
          <p style={value}>Address: {invoice.address}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={label}>Delivery/Collection Date: <span style={{ ...value, color: "var(--ink)", fontWeight: 600 }}>{invoice.delivery_date}</span></p>
          <p style={{ ...label, marginTop: 12 }}>Invoice No: <span style={{ ...value, color: "var(--ink)", fontWeight: 600 }}>{formatInvoiceNo(invoice.invoice_no)}</span></p>
          <p style={label}>Date: <span style={{ ...value, color: "var(--ink)", fontWeight: 600 }}>{invoice.issue_date}</span></p>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <p style={label}>Payment Info:</p>
        <p style={value}>Bank: {BANK_DETAILS.bank}</p>
        <p style={value}>Account name: {BANK_DETAILS.accountName}</p>
        <p style={value}>Branch code: {BANK_DETAILS.branchCode}</p>
        <p style={value}>Account number: {BANK_DETAILS.accountNumber}</p>
        <p style={value}>Swift code: {BANK_DETAILS.swiftCode}</p>
        <p style={value}>Reference: {invoice.reference}</p>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 28 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--ink)" }}>
            <th style={{ ...label, textAlign: "left", padding: "8px 4px" }}>Description</th>
            <th style={{ ...label, textAlign: "right", padding: "8px 4px" }}>Cost</th>
            <th style={{ ...label, textAlign: "right", padding: "8px 4px" }}>Qty</th>
            <th style={{ ...label, textAlign: "right", padding: "8px 4px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map(item => (
            <tr key={item.id} style={{ borderBottom: "1px solid var(--cream-deep)" }}>
              <td style={{ ...value, padding: "10px 4px" }}>{item.description}{item.size ? ` — ${item.size}` : ""}</td>
              <td style={{ ...value, padding: "10px 4px", textAlign: "right" }}>{formatRs(item.unitPrice)}</td>
              <td style={{ ...value, padding: "10px 4px", textAlign: "right" }}>{item.qty}</td>
              <td style={{ ...value, padding: "10px 4px", textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>{formatRs(lineTotal(item))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 24 }}>
        <div style={{ maxWidth: 340 }}>
          {invoice.is_preorder && (
            <p style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>
              All Pre-orders require a 50% deposit, the remaining 50% may be paid on collection/delivery.
              Your pre-order will be ready on {invoice.delivery_date}.
            </p>
          )}
        </div>
        <div style={{ minWidth: 200 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
            <span style={label}>Subtotal</span>
            <span style={{ ...value, color: "var(--ink)" }}>{formatRs(sub)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
            <span style={label}>Delivery</span>
            <span style={{ ...value, color: "var(--ink)" }}>{formatRs(invoice.delivery_fee)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid var(--ink)", marginTop: 6 }}>
            <span style={{ ...label, fontSize: ".9rem" }}>Total</span>
            <span style={{ ...label, fontSize: ".9rem" }}>{formatRs(total)}</span>
          </div>
          {invoice.is_preorder && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
              <span style={{ ...label, color: "var(--sage)" }}>Deposit Due</span>
              <span style={{ ...value, color: "var(--sage)", fontWeight: 700 }}>{formatRs(deposit)}</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 48, textAlign: "right" }}>
        <p style={{ ...label, fontSize: ".8rem" }}>Thank You For Supporting Our Mission,</p>
        <p style={{ fontFamily: "var(--font-head)", fontSize: "1.6rem", margin: "4px 0" }}>The Paw Pack Pantry Team</p>
      </div>

      <p style={{ marginTop: 32, fontSize: ".76rem", color: "var(--ink-soft)", textAlign: "center", borderTop: "1px solid var(--cream-deep)", paddingTop: 16 }}>
        30% of every order is donated to our StreetSmart campaign helping fund feeding, sterilisation,
        rehabilitation, fostering and education &amp; awareness for strays in Mauritius.
      </p>
    </div>
  );
}
