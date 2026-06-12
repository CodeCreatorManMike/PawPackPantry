import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HomeTiles from "@/components/HomeTiles";
import NewsletterForm from "@/components/NewsletterForm";
import PawScatter from "@/components/PawScatter";
import HeroNav from "@/components/HeroNav";

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* ===== HERO — full viewport ===== */}
      <header
        style={{
          position: "relative",
          minHeight: "calc(100svh - 60px)", /* 60px = nav height */
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 24px 0",
          overflow: "visible",
          background: "var(--cream)",
        }}
      >
        <PawScatter />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            width: "100%",
          }}
        >
          {/* Logo */}
          <Image
            src="/logos/logo-cutout.png"
            alt="Paw Pack Pantry — Packed with Purpose"
            width={460}
            height={268}
            priority
            style={{
              width: "min(460px, 80vw)",
              height: "auto",
              filter: "drop-shadow(0 16px 20px rgba(68,49,43,.2))",
              animation: "bob 3.5s ease-in-out infinite",
            }}
          />

          {/* Welcome blurb box */}
          <div
            style={{
              maxWidth: 600,
              width: "100%",
              border: "3px solid var(--ink)",
              borderRadius: 6,
              padding: "16px 28px",
              background: "var(--white)",
              boxShadow: "4px 4px 0 var(--ink)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-head)",
                fontWeight: 600,
                fontSize: "clamp(.92rem, 2vw, 1.05rem)",
                color: "var(--ink)",
                lineHeight: 1.6,
              }}
            >
              Welcome to Paw Pack Pantry — where every meal is homemade with love
              in Mauritius and packed with purpose!
            </p>
          </div>

          {/* Squared hero nav buttons */}
          <HeroNav />
        </div>

      </header>

      {/* ===== TILE GRID ===== */}
      <main style={{ background: "var(--cream)" }} id="contact">
        <HomeTiles />

        {/* Mission text box */}
        <section style={{ maxWidth: 820, margin: "0 auto 60px", padding: "0 22px" }}>
          <div
            style={{
              border: "3px solid var(--ink)",
              borderRadius: 10,
              padding: "26px 30px",
              background: "var(--white)",
              boxShadow: "4px 4px 0 var(--cream-deep)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: ".95rem",
                color: "var(--ink-soft)",
                lineHeight: 1.85,
              }}
            >
              We sell a variety of delicious gourmet pet meals &amp; treats, using quality ingredients that your pets are bound to love — but our mission goes beyond your pet&apos;s bowl. A portion of every sale is contributed to our StreetSmart Campaign, helping fund stray animal feeding programmes, sterilisation initiatives, medical care, rehabilitation efforts, and community education projects across Mauritius.
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section
          id="newsletter"
          style={{ maxWidth: 560, margin: "0 auto 80px", padding: "0 22px" }}
        >
          <div className="newsletter">
            <p className="eyebrow">Join the pack</p>
            <h3 style={{ fontSize: "1.45rem", marginTop: 6 }}>Get our weekly newsletter</h3>
            <p
              style={{
                color: "var(--ink-soft)",
                fontWeight: 500,
                marginTop: 8,
                fontSize: ".88rem",
                lineHeight: 1.75,
                maxWidth: "44ch",
                margin: "8px auto 0",
                fontFamily: "var(--font-body)",
              }}
            >
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
