import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        padding: "48px 24px 32px",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Image
              src="/logos/logo-cutout.png"
              alt="Paw Pack Pantry"
              width={80}
              height={80}
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.2rem" }}>
              Paw Pack Pantry.
            </p>
            <p style={{ fontSize: ".85rem", color: "rgba(251,244,233,.65)", lineHeight: 1.6 }}>
              Gourmet pet meals &amp; treats —<br />
              homemade with love in Mauritius.
            </p>
            <p style={{ fontSize: ".8rem", color: "var(--blush)", fontFamily: "var(--font-head)", fontWeight: 600 }}>
              #PackedWithPurpose
            </p>
          </div>

          {/* nav */}
          <div>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(251,244,233,.5)", marginBottom: 14 }}>
              Explore
            </p>
            {[
              { href: "/", label: "Home" },
              { href: "/menu", label: "Our Menu" },
              { href: "/gallery", label: "Gallery" },
              { href: "/streetsmart", label: "StreetSmart Campaign" },
              { href: "/news", label: "Latest News" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: "block",
                  fontFamily: "var(--font-head)",
                  fontWeight: 500,
                  fontSize: ".95rem",
                  color: "rgba(251,244,233,.8)",
                  textDecoration: "none",
                  padding: "5px 0",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* contact */}
          <div>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(251,244,233,.5)", marginBottom: 14 }}>
              Contact
            </p>
            {[
              { label: "WhatsApp", val: "+230 5823 3898", href: "https://wa.me/23058233898" },
              { label: "Orders", val: "orders@pawpackpantry.com", href: "mailto:orders@pawpackpantry.com" },
              { label: "Support", val: "straysupport@pawpackpantry.com", href: "mailto:straysupport@pawpackpantry.com" },
              { label: "Instagram", val: "@pawpackpantry", href: "https://instagram.com/pawpackpantry" },
            ].map((c) => (
              <div key={c.label} style={{ marginBottom: 10 }}>
                <p style={{ fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(251,244,233,.4)", fontWeight: 700 }}>{c.label}</p>
                <a href={c.href} style={{ fontFamily: "var(--font-head)", fontWeight: 500, color: "rgba(251,244,233,.85)", textDecoration: "none", fontSize: ".92rem" }}>{c.val}</a>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(251,244,233,.12)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p style={{ fontSize: ".8rem", color: "rgba(251,244,233,.4)" }}>
            © {new Date().getFullYear()} Paw Pack Pantry. Made in Mauritius with love. 🐾
          </p>
          <p style={{ fontSize: ".8rem", color: "rgba(251,244,233,.4)" }}>
            Serving meals with purpose, one paw at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
