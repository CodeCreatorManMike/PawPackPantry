import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HomeTiles from "@/components/HomeTiles";
import NewsletterForm from "@/components/NewsletterForm";
import PawScatter from "@/components/PawScatter";

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* ===== HERO ===== */}
      <header style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "52px 24px 52px",
        overflow: "hidden",
        background: "var(--cream)",
      }}>
        <PawScatter />

        <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          {/* Floating logo */}
          <Image
            src="/logos/logo-cutout.png"
            alt="Paw Pack Pantry — Packed with Purpose"
            width={500}
            height={290}
            priority
            style={{
              width: "min(500px, 82vw)",
              height: "auto",
              filter: "drop-shadow(0 18px 22px rgba(68,49,43,.22))",
              animation: "bob 3.5s ease-in-out infinite",
            }}
          />

          {/* Welcome text box — thick brown border */}
          <div style={{
            maxWidth: 600,
            width: "100%",
            border: "3px solid var(--ink)",
            borderRadius: 14,
            padding: "18px 28px",
            background: "var(--white)",
            boxShadow: "4px 4px 0 var(--ink)",
          }}>
            <p style={{
              fontFamily: "var(--font-head)",
              fontWeight: 600,
              fontSize: "clamp(.95rem, 2.2vw, 1.1rem)",
              color: "var(--ink)",
              lineHeight: 1.6,
            }}>
              Welcome to Paw Pack Pantry — where every meal is homemade with love in Mauritius and packed with purpose!
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/menu" className="btn dark" style={{ fontSize: ".92rem" }}>See the Menu</a>
            <a
              href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order"
              target="_blank" rel="noopener noreferrer"
              className="btn muted"
              style={{ fontSize: ".92rem" }}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* ===== TILE GRID ===== */}
      <main style={{ background: "var(--cream)", position: "relative" }} id="contact">
        <HomeTiles />

        {/* ===== MISSION TEXT BOX below tiles ===== */}
        <section style={{ maxWidth: 820, margin: "0 auto 60px", padding: "0 22px" }}>
          <div style={{
            border: "3px solid var(--ink)",
            borderRadius: 18,
            padding: "28px 32px",
            background: "var(--white)",
            boxShadow: "4px 4px 0 var(--cream-deep)",
          }}>
            <p style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "1rem",
              color: "var(--ink-soft)",
              lineHeight: 1.8,
            }}>
              We sell a variety of delicious gourmet pet meals &amp; treats, using quality ingredients that your pets are bound to love — but our mission goes beyond your pet&apos;s bowl. A portion of every sale is contributed to our StreetSmart Campaign, helping fund stray animal feeding programmes, sterilisation initiatives, medical care, rehabilitation efforts, and community education projects across Mauritius.
            </p>
          </div>
        </section>

        {/* ===== NEWSLETTER ===== */}
        <section style={{ maxWidth: 580, margin: "0 auto 80px", padding: "0 22px" }}>
          <div className="newsletter">
            <p className="eyebrow">Join the pack</p>
            <h3 style={{ fontSize: "1.5rem", marginTop: 6 }}>Get our weekly newsletter</h3>
            <p style={{
              color: "var(--ink-soft)", fontWeight: 500, marginTop: 8, fontSize: ".9rem",
              lineHeight: 1.7, maxWidth: "44ch", margin: "8px auto 0",
            }}>
              Stay up to date with our latest pet advice, meal tips for fussy pets, new menu releases, rescue stories and stray spotlight highlights. Just pups, no spam.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
