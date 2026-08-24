import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — Paw Pack Pantry",
  description: "How Paw Pack Pantry collects, uses, and protects your personal information when you order, sign up for our newsletter, or contact us.",
  openGraph: {
    title: "Privacy Policy — Paw Pack Pantry",
    description: "How Paw Pack Pantry collects, uses, and protects your personal information.",
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

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />

      <section style={{ background: "var(--ink)", padding: "64px 24px 56px", textAlign: "center" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-head)", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".72rem", color: "var(--amber-soft)", marginBottom: 12 }}>
          Legal
        </span>
        <h1 style={{ fontSize: "clamp(2.2rem,6vw,3.2rem)", color: "var(--cream)", lineHeight: 1.05 }}>
          Privacy Policy
        </h1>
        <p style={{ color: "rgba(246,244,240,.65)", fontWeight: 500, marginTop: 14 }}>
          Last updated: {LAST_UPDATED}
        </p>
      </section>

      <main style={{ background: "var(--cream)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 100px" }}>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8 }}>
            Paw Pack Pantry (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This policy explains what
            information we collect through our website, how we use it, and the choices you have. By using
            pawpackpantry.com or ordering from us, you agree to the practices described here.
          </p>

          <Section title="1. Who we are">
            <p>
              Paw Pack Pantry is a home-based gourmet pet meal &amp; treat business operating in Mauritius, co-founded
              by Destinee Ray Jones and Daniel Freitag. A portion of every order supports our StreetSmart Campaign
              for stray animal welfare.
            </p>
            <p>
              You can reach us at{" "}
              <a href="mailto:info@pawpackpantry.com" style={{ color: "var(--ink)" }}>info@pawpackpantry.com</a>{" "}
              with any privacy questions.
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p><strong style={{ color: "var(--ink)" }}>Information you give us directly:</strong> your name, phone number, delivery address, and order details when you place an order via WhatsApp, phone, or our website; your email address when you subscribe to our newsletter; and any details you share when you message us on WhatsApp, Instagram, or by email.</p>
            <p><strong style={{ color: "var(--ink)" }}>Information collected automatically:</strong> basic technical data such as browser type, device type, and pages visited, collected through standard website analytics to help us understand how the site is used.</p>
            <p>We do not knowingly collect information from children, and we do not collect payment card details through this website — payment is arranged directly with you via WhatsApp, bank transfer, or cash on delivery.</p>
          </Section>

          <Section title="3. How we use your information">
            <p>We use the information we collect to:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Process and deliver your orders</li>
              <li>Communicate with you about your order, enquiries, or sponsorship</li>
              <li>Send our newsletter, if you have opted in (with meal tips, menu updates, and StreetSmart stray stories)</li>
              <li>Improve our menu, website, and services</li>
              <li>Meet our legal and accounting obligations</li>
            </ul>
          </Section>

          <Section title="4. Sharing your information">
            <p>
              We do not sell your personal information. We only share information with trusted service providers who
              help us run our business — such as our website hosting provider (Vercel) and our database provider
              (Supabase) — and only to the extent needed to provide our services. We may also disclose information
              if required to do so by law.
            </p>
          </Section>

          <Section title="5. Newsletter &amp; marketing">
            <p>
              If you subscribe to our newsletter, we store your email address in our secure database solely to send
              you updates. You can unsubscribe at any time by contacting us at{" "}
              <a href="mailto:orders@pawpackpantry.com" style={{ color: "var(--ink)" }}>orders@pawpackpantry.com</a>{" "}
              and we will remove you promptly.
            </p>
          </Section>

          <Section title="6. Data retention">
            <p>
              We keep order and enquiry information for as long as needed to fulfil the order, respond to your
              enquiry, and meet any legal or accounting requirements, after which it is deleted or anonymised.
            </p>
          </Section>

          <Section title="7. Your rights">
            <p>
              You can ask us at any time to access, correct, or delete the personal information we hold about you, or
              to withdraw consent for marketing communications. To do so, contact us at{" "}
              <a href="mailto:info@pawpackpantry.com" style={{ color: "var(--ink)" }}>info@pawpackpantry.com</a>.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              Our website may use minimal cookies or similar technologies required for the site to function correctly
              and to understand overall site usage. We do not use cookies for third-party advertising.
            </p>
          </Section>

          <Section title="9. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices. The &ldquo;Last
              updated&rdquo; date at the top of this page will always show the most recent revision.
            </p>
          </Section>

          <Section title="10. Contact us">
            <p>
              If you have any questions about this Privacy Policy or how we handle your information, please reach out:
            </p>
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
