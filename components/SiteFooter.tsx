import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--cream)", padding: "48px 24px 28px", marginTop: "auto" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 40,
          marginBottom: 40,
        }}>
          {/* Brand col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Image
              src="/logos/logo-cutout.png"
              alt="Paw Pack Pantry"
              width={72}
              height={72}
              style={{ objectFit: "contain" }}
            />
            <p style={{
              fontFamily: "var(--font-brand)",
              fontWeight: 400,
              fontSize: "1.3rem",
              color: "var(--amber-soft)",
              letterSpacing: ".02em",
            }}>
              Paw Pack Pantry.
            </p>
            <p style={{ fontSize: ".82rem", color: "rgba(246,244,240,.6)", lineHeight: 1.65 }}>
              Gourmet Pet Meals &amp; Treats —<br />
              homemade in Mauritius with love.
            </p>
            <p style={{ fontSize: ".78rem", color: "var(--amber-soft)", fontFamily: "var(--font-head)", fontWeight: 600, letterSpacing: ".04em" }}>
              #packedwithpurpose
            </p>
          </div>

          {/* Explore */}
          <div>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(246,244,240,.4)", marginBottom: 14 }}>
              Explore
            </p>
            {[
              { href: "/", label: "Home" },
              { href: "/menu", label: "The Pantry" },
              { href: "/streetsmart", label: "StreetSmart Campaign" },
              { href: "/gallery", label: "Stray Gallery" },
              { href: "/news", label: "Latest News" },
              { href: "/contact", label: "Contact Us" },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                display: "block",
                fontFamily: "var(--font-head)", fontWeight: 500, fontSize: ".9rem",
                color: "rgba(246,244,240,.75)", textDecoration: "none", padding: "4px 0",
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(246,244,240,.4)", marginBottom: 14 }}>
              Contact
            </p>
            {[
              { label: "Call", val: "+230 5823 3897", href: "tel:+23058233897" },
              { label: "WhatsApp", val: "+230 5823 3898", href: "https://wa.me/23058233898" },
              { label: "Orders", val: "orders@pawpackpantry.com", href: "mailto:orders@pawpackpantry.com" },
              { label: "Instagram", val: "@pawpackpantry", href: "https://instagram.com/pawpackpantry" },
            ].map(c => (
              <div key={c.label} style={{ marginBottom: 8 }}>
                <p style={{ fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(246,244,240,.35)", fontWeight: 700 }}>{c.label}</p>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ fontFamily: "var(--font-head)", fontWeight: 500, color: "rgba(246,244,240,.8)", textDecoration: "none", fontSize: ".88rem" }}>
                  {c.val}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(246,244,240,.1)",
          paddingTop: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}>
          <p style={{ fontSize: ".78rem", color: "rgba(246,244,240,.35)" }}>
            Paw Pack Pantry. Packed with Purpose.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/privacy" style={{ fontSize: ".78rem", color: "rgba(246,244,240,.35)", textDecoration: "none" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ fontSize: ".78rem", color: "rgba(246,244,240,.35)", textDecoration: "none" }}>
              Terms of Service
            </Link>
            <p style={{ fontSize: ".78rem", color: "rgba(246,244,240,.35)" }}>
              Made in Mauritius with love.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
