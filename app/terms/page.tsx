import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service — Paw Pack Pantry",
  description: "The terms and conditions for ordering gourmet pet meals & treats, and for sponsoring the StreetSmart Campaign, from Paw Pack Pantry.",
  openGraph: {
    title: "Terms of Service — Paw Pack Pantry",
    description: "The terms and conditions for ordering from Paw Pack Pantry.",
    images: ["/logos/logo.png"],
  },
};

const LAST_UPDATED = "24 August 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 40 }}>
      <h2 style={{ fontSize: "1.3rem", marginBottom: 14 }}>{title}</h2>
      <div style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 14 }}>
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <SiteNav />

      <section style={{ background: "var(--ink)", padding: "64px 24px 56px", textAlign: "center" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-head)", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".72rem", color: "var(--amber-soft)", marginBottom: 12 }}>
          Legal
        </span>
        <h1 style={{ fontSize: "clamp(2.2rem,6vw,3.2rem)", color: "var(--cream)", lineHeight: 1.05 }}>
          Terms of Service
        </h1>
        <p style={{ color: "rgba(246,244,240,.65)", fontWeight: 500, marginTop: 14 }}>
          Last updated: {LAST_UPDATED}
        </p>
      </section>

      <main style={{ background: "var(--cream)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 100px" }}>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8 }}>
            These terms govern your use of pawpackpantry.com and any orders placed with Paw Pack Pantry, a
            home-based gourmet pet meal &amp; treat business operating in Mauritius. By using our website or placing
            an order, you agree to these terms.
          </p>

          <Section title="1. Orders">
            <p>
              Orders are currently placed via WhatsApp, phone, or email rather than an automated checkout. Once you
              send us your order, we will confirm availability, pricing, and delivery or collection details with you
              directly before anything is prepared.
            </p>
            <p>
              All prices are quoted in Mauritian Rupees (Rs) and are subject to change without prior notice. We will
              always confirm the final price with you before your order is prepared.
            </p>
          </Section>

          <Section title="2. Payment">
            <p>
              Payment is arranged directly with you — by bank transfer, cash, or another method we agree on — at the
              time of ordering or upon delivery/collection. We do not process card payments through this website.
            </p>
          </Section>

          <Section title="3. Delivery &amp; collection">
            <p>
              Delivery and collection arrangements, timing, and any associated fees are confirmed with you individually
              for each order, as availability varies by area and season. Please contact us via WhatsApp to confirm
              current delivery options for your location.
            </p>
          </Section>

          <Section title="4. Food safety &amp; suitability">
            <p>
              Our meals and treats are freshly hand-cooked using quality ingredients. As with any pet food, please
              introduce new foods gradually and consult your veterinarian if your pet has specific dietary needs,
              allergies, or medical conditions. Storage instructions provided with your order should be followed
              carefully to keep meals fresh and safe.
            </p>
          </Section>

          <Section title="5. Cancellations &amp; refunds">
            <p>
              Because meals are freshly prepared to order, please let us know as early as possible if you need to
              cancel or change an order. We handle cancellations, changes, and any issues with an order on a
              case-by-case basis — reach out to us directly and we&apos;ll do our best to make it right.
            </p>
          </Section>

          <Section title="6. StreetSmart Campaign &amp; sponsorships">
            <p>
              A portion of every order is contributed to our StreetSmart Campaign supporting stray animal feeding,
              sterilisation, medical care, rehabilitation, and community education across Mauritius. Direct sponsorship
              contributions (such as &ldquo;A Meal for a Stray&rdquo; or the StreetSmart Starter Pack) go toward these
              same initiatives. Sponsorships are contributions to our mission and are non-refundable once made.
            </p>
          </Section>

          <Section title="7. Website use">
            <p>
              This website and its content — including text, images, logos, and the Paw Pack Pantry name and branding
              — belong to Paw Pack Pantry and may not be copied or reused without our permission. We aim to keep the
              information on this site accurate and up to date, but we do not guarantee it is free of errors at all
              times.
            </p>
          </Section>

          <Section title="8. Limitation of liability">
            <p>
              To the extent permitted by law, Paw Pack Pantry is not liable for indirect or consequential losses
              arising from the use of this website or our products. Nothing in these terms limits any liability that
              cannot be excluded under Mauritian law.
            </p>
          </Section>

          <Section title="9. Governing law">
            <p>
              These terms are governed by the laws of the Republic of Mauritius.
            </p>
          </Section>

          <Section title="10. Changes to these terms">
            <p>
              We may update these terms from time to time. The &ldquo;Last updated&rdquo; date above reflects the most
              recent revision.
            </p>
          </Section>

          <Section title="11. Contact us">
            <p>Questions about these terms? Get in touch:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Email: <a href="mailto:info@pawpackpantry.com" style={{ color: "var(--ink)" }}>info@pawpackpantry.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/23058233898" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)" }}>+230 5823 3898</a></li>
              <li>Phone: +230 5823 3897</li>
            </ul>
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
