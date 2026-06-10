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
      <header
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "64px 24px 96px",
          overflow: "hidden",
          background: "var(--cream)",
        }}
      >
        {/* soft radial wash */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "radial-gradient(120% 90% at 50% 0%, rgba(251,244,233,.4), rgba(251,244,233,.92) 70%)",
          }}
        />

        {/* scattered stickers */}
        <PawScatter />

        {/* hero content */}
        <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          <Image
            src="/logos/logo-cutout.png"
            alt="Paw Pack Pantry — Packed with Purpose"
            width={560}
            height={320}
            priority
            style={{
              width: "min(560px, 86vw)",
              height: "auto",
              filter: "drop-shadow(0 22px 26px rgba(74,53,40,.28))",
              animation: "bob 6s ease-in-out infinite",
            }}
          />

          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "13px 30px",
              background: "var(--blush-soft)",
              border: "5px solid var(--white)",
              borderRadius: 999,
              boxShadow: "0 12px 24px -12px rgba(74,53,40,.4)",
              fontFamily: "var(--font-head)", fontWeight: 600,
              letterSpacing: ".18em", textTransform: "uppercase",
              fontSize: ".86rem", color: "var(--ink)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blush)", display: "inline-block" }} />
            Packed with Purpose
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blush)", display: "inline-block" }} />
          </span>

          <p style={{ maxWidth: "44ch", color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.7, fontSize: "1.05rem" }}>
            Gourmet homemade pet meals &amp; treats, hand-cooked in Mauritius.<br />
            A share of every order feeds the island&apos;s strays. 🐾
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/menu" className="btn peach" style={{ fontSize: "1rem" }}>🍖 See the Menu</a>
            <a
              href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I'd%20like%20to%20order%20🐾"
              target="_blank" rel="noopener noreferrer"
              className="btn sage"
              style={{ fontSize: "1rem" }}
            >
              💬 Order on WhatsApp
            </a>
          </div>
        </div>

        {/* scroll cue */}
        <div
          className="scroll-cue"
          style={{
            position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 3,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            fontFamily: "var(--font-head)", fontSize: ".8rem", letterSpacing: ".14em",
            textTransform: "uppercase", color: "var(--ink-soft)",
            animation: "bob 3s ease-in-out infinite",
          }}
        >
          <span>Explore</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </header>

      {/* ===== TILE GRID ===== */}
      <main style={{ background: "var(--cream)", position: "relative" }}>
        <HomeTiles />

        {/* ===== NEWSLETTER ===== */}
        <section
          style={{
            maxWidth: 640,
            margin: "0 auto 100px",
            padding: "0 22px",
          }}
        >
          <div className="newsletter">
            <p className="eyebrow">Join the pack</p>
            <h3 style={{ fontSize: "1.7rem", marginTop: 6 }}>Get our weekly update</h3>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 6 }}>
              Fresh menus &amp; rescue stories, once a week. Just pups, no spam.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
