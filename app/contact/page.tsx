import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Us — Paw Pack Pantry",
  description: "Get in touch with Paw Pack Pantry for orders, questions, collaborations, or to support our StreetSmart Campaign for the strays of Mauritius.",
  openGraph: {
    title: "Contact Us — Paw Pack Pantry",
    description: "Get in touch with Paw Pack Pantry — orders, questions, collaborations, or StreetSmart support.",
    images: ["/logos/logo.png"],
  },
  keywords: ["contact Paw Pack Pantry", "pet food Mauritius contact", "order pet meals Mauritius"],
};

const CONTACT_CARDS = [
  {
    label: "Call",
    value: "+230 5823 3897",
    href: "tel:+23058233897",
    accent: "var(--amber-soft)",
  },
  {
    label: "WhatsApp",
    value: "+230 5823 3898",
    href: "https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20get%20in%20touch",
    accent: "var(--amber)",
  },
  {
    label: "Orders",
    value: "orders@pawpackpantry.com",
    href: "mailto:orders@pawpackpantry.com",
    accent: "var(--neutral)",
  },
  {
    label: "General enquiries",
    value: "info@pawpackpantry.com",
    href: "mailto:info@pawpackpantry.com",
    accent: "var(--neutral-soft)",
  },
  {
    label: "StreetSmart / stray support",
    value: "straysupport@pawpackpantry.com",
    href: "mailto:straysupport@pawpackpantry.com",
    accent: "var(--brown-dark)",
  },
  {
    label: "Instagram",
    value: "@pawpackpantry",
    href: "https://instagram.com/pawpackpantry",
    accent: "var(--amber-soft)",
  },
];

const FOUNDERS = [
  { name: "Destinee Ray Jones", role: "Co-founder — heart & brain", email: "d.r.jones@pawpackpantry.com" },
  { name: "Daniel Freitag", role: "Co-founder — muscle & logistics", email: "d.p.freitag@pawpackpantry.com" },
];

export default function ContactPage() {
  return (
    <>
      <SiteNav />

      <section style={{ background: "var(--ink)", padding: "72px 24px 64px", textAlign: "center" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-head)", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".72rem", color: "var(--amber-soft)", marginBottom: 12 }}>
          Get in touch
        </span>
        <h1 style={{ fontSize: "clamp(2.4rem,7vw,3.8rem)", color: "var(--cream)", lineHeight: 1.05 }}>
          Contact Us
        </h1>
        <p style={{ color: "rgba(246,244,240,.7)", fontWeight: 500, marginTop: 16, maxWidth: "50ch", margin: "16px auto 0", lineHeight: 1.8 }}>
          Questions about our menu, an order, a collaboration, or our StreetSmart mission? We&apos;d love to hear from you.
        </p>
      </section>

      <main style={{ background: "var(--cream)" }}>
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 24px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            {CONTACT_CARDS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="card"
                style={{
                  padding: "22px 22px 24px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderTop: `4px solid ${c.accent}`,
                }}
              >
                <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                  {c.label}
                </p>
                <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)" }}>
                  {c.value}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Founders */}
        <section style={{ maxWidth: 820, margin: "72px auto 0", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p className="eyebrow">Speak to the founders</p>
            <h2 style={{ fontSize: "1.8rem", marginTop: 6 }}>Destinee &amp; Daniel</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            {FOUNDERS.map((f) => (
              <div key={f.name} className="card" style={{ padding: "24px 22px", gap: 8 }}>
                <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)" }}>{f.name}</p>
                <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".88rem" }}>{f.role}</p>
                <a href={`mailto:${f.email}`} style={{ color: "var(--ink)", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".9rem", marginTop: 4, textDecoration: "none" }}>
                  {f.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Mission box */}
        <section style={{ maxWidth: 820, margin: "72px auto 0", padding: "0 22px 100px" }}>
          <div
            style={{
              border: "3px solid var(--ink)",
              borderRadius: 10,
              padding: "26px 30px",
              background: "var(--white)",
              boxShadow: "4px 4px 0 var(--cream-deep)",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".95rem", color: "var(--ink-soft)", lineHeight: 1.85 }}>
              Prefer to order directly? Message us on{" "}
              <a
                href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order"
                target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--ink)", fontWeight: 700 }}
              >
                WhatsApp
              </a>{" "}
              and we&apos;ll get your order sorted &mdash; packed with purpose, every time.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
