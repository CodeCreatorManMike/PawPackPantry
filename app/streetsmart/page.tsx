import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PawScatter from "@/components/PawScatter";

const MISSION_PHOTOS = [
  "068e34f2-a9d4-4f78-a580-4b8bb3e0d850",
  "2341c747-2369-4ffa-abe1-a149f3ec40d5",
  "606d9281-6b77-498f-9aa7-0c085e1fa5fd",
  "7087fc65-417a-4a2e-b5cf-4a4f88a9a467",
  "a4fcfe25-c552-450b-a167-c267649cecc4",
  "b49ed4e6-65b1-4dcb-9dcf-418c9e7b3940",
];

const SPONSOR_TIERS = [
  {
    icon: "🍽️",
    title: "A Meal for a Stray",
    desc: "Fund one nutritious meal for a stray on the island. Every belly filled is a step forward.",
    accent: "var(--blush)",
  },
  {
    icon: "📅",
    title: "Feed a Stray for a Month",
    desc: "Cover a stray's full monthly food supply — consistent nutrition makes a real difference.",
    accent: "var(--peach)",
  },
  {
    icon: "❤️",
    title: "Adopt & Sponsor Monthly Meals",
    desc: "Follow a named stray and fund their ongoing care. You'll receive updates on your sponsored pup.",
    accent: "var(--sage)",
  },
  {
    icon: "🏥",
    title: "StreetSmart Starter Pack",
    desc: "The full package — covers sterilisation, de-worming and a vet check-up for one stray. Life-changing.",
    accent: "var(--sky)",
  },
];

const IMPACT_STATS = [
  { v: "100+", k: "Animals rehomed" },
  { v: "5 yrs", k: "Rescuing in Mauritius" },
  { v: "∞", k: "Meals served with love" },
  { v: "🐾", k: "Strays reached" },
];

export default function StreetSmartPage() {
  return (
    <>
      <SiteNav />

      {/* hero */}
      <section
        style={{
          position: "relative", overflow: "hidden",
          background: "var(--ink)", padding: "80px 24px 72px",
          textAlign: "center",
        }}
      >
        {/* subtle pattern overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: .06, backgroundImage: "url(/stickers/pattern-transparent.png)", backgroundSize: 200 }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            style={{
              display: "inline-block", fontFamily: "var(--font-head)", fontWeight: 600,
              letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".72rem",
              color: "var(--blush)", marginBottom: 12,
            }}
          >
            Our mission
          </span>
          <h1 style={{ fontSize: "clamp(2.6rem,8vw,4.5rem)", color: "var(--cream)", lineHeight: 1 }}>
            StreetSmart
          </h1>
          <p style={{ color: "var(--blush-soft)", fontFamily: "var(--font-head)", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", fontSize: ".9rem", marginTop: 8 }}>
            Every pack feeds a stray.
          </p>
          <p style={{ color: "rgba(251,244,233,.7)", fontWeight: 500, marginTop: 20, maxWidth: "52ch", margin: "20px auto 0", lineHeight: 1.8 }}>
            Mauritius&apos;s beautiful streets are sadly home to a rapidly growing stray population. StreetSmart is our promise to every dog and cat waiting for their second chance.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            <a href="#sponsor" className="btn" style={{ fontSize: "1rem" }}>🐾 Sponsor a Stray</a>
            <a href="https://wa.me/23058233898?text=I'd%20like%20to%20support%20StreetSmart%20🐾" target="_blank" rel="noopener noreferrer" className="btn sage" style={{ fontSize: "1rem" }}>
              💬 Get in Touch
            </a>
          </div>
        </div>
      </section>

      <main style={{ background: "var(--cream)" }}>
        {/* ===== ABOUT THE MISSION ===== */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p className="eyebrow">Who we are</p>
              <h2 style={{ fontSize: "2.2rem" }}>Born from a rescue, built on purpose.</h2>
              <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8 }}>
                Founded by Destinee Ray Jones and Daniel Freitag, Paw Pack Pantry was created as a way to turn a lifelong passion for animal rescue into sustainable impact.
              </p>
              <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8 }}>
                A portion of every purchase is contributed directly to our StreetSmart Campaign, helping fund stray animal feeding programmes, sterilisation initiatives, medical care, rehabilitation efforts, and community education projects across Mauritius.
              </p>
              <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8 }}>
                By choosing Paw Pack Pantry, you&apos;re not only nourishing your own pet — you&apos;re helping create a better future for countless others still waiting for their second chance.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                {["Feeding programmes", "Sterilisation", "Vet care", "Rehabilitation", "Community education"].map(t => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {MISSION_PHOTOS.slice(0, 4).map((id, i) => (
                  <div key={id} className={`sticker ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ overflow: "hidden", borderRadius: 18, aspectRatio: "1", position: "relative" }}>
                    <Image src={`/photos/${id}.jpeg`} alt="Mission" fill style={{ objectFit: "cover" }} sizes="200px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== IMPACT STATS ===== */}
        <section style={{ maxWidth: 900, margin: "60px auto 0", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {IMPACT_STATS.map((s, i) => (
              <div key={i} className={`macro ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ padding: "20px 14px" }}>
                <div className="v" style={{ fontSize: "1.8rem" }}>{s.v}</div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MISSION GALLERY ===== */}
        <section style={{ maxWidth: 1100, margin: "72px auto 0", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="eyebrow">In the field</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Mission Gallery</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {[...MISSION_PHOTOS, "c9d7561e-a362-41f6-978a-d7d768655552", "ef95bc3d-fc3a-4ae4-beb4-84aff97716ef"].map((id, i) => (
              <div key={id} className={`sticker ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ overflow: "hidden", borderRadius: 20, aspectRatio: "1", position: "relative" }}>
                <Image src={`/photos/${id}.jpeg`} alt="StreetSmart mission" fill style={{ objectFit: "cover" }} sizes="200px" />
              </div>
            ))}
          </div>
        </section>

        {/* ===== SPONSOR TIERS ===== */}
        <section id="sponsor" style={{ maxWidth: 1100, margin: "72px auto 0", padding: "0 24px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="eyebrow">Make a difference</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Sponsor a Stray</h2>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 8, maxWidth: "52ch", margin: "8px auto 0" }}>
              On top of every order&apos;s contribution, you can directly sponsor a stray&apos;s care. Every rupee goes straight to the animals.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
            {SPONSOR_TIERS.map((tier, i) => (
              <div
                key={tier.title}
                className={`card ${i % 2 ? "tilt-r" : "tilt-l"}`}
                style={{ gap: 14, padding: "24px 20px" }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 20, background: tier.accent, display: "grid", placeItems: "center", fontSize: "2rem", border: "5px solid var(--white)", boxShadow: "0 8px 20px -10px rgba(74,53,40,.35)" }}>
                  {tier.icon}
                </div>
                <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.15rem" }}>{tier.title}</p>
                <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".9rem", lineHeight: 1.6, flex: 1 }}>{tier.desc}</p>
                <a
                  href={`https://wa.me/23058233898?text=Hi!%20I'd%20like%20to%20sponsor%20a%20stray%20via%20the%20${encodeURIComponent(tier.title)}%20option%20🐾`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn"
                  style={{ textAlign: "center", background: tier.accent, fontSize: ".9rem", padding: "10px 18px", marginTop: "auto" }}
                >
                  Sponsor Now — Rs ___
                </a>
              </div>
            ))}
          </div>

          {/* quote */}
          <div
            style={{
              marginTop: 60, textAlign: "center",
              padding: "40px 32px",
              background: "var(--ink)",
              borderRadius: 28,
              boxShadow: "0 20px 40px -20px rgba(74,53,40,.5)",
            }}
          >
            <p style={{ fontSize: "1.4rem", color: "var(--cream)", fontFamily: "var(--font-head)", fontWeight: 600, lineHeight: 1.5, maxWidth: "54ch", margin: "0 auto" }}>
              &ldquo;When the right humans come your way, you can trust them. Don&apos;t take 8 months like I did — just accept the love.&rdquo;
            </p>
            <p style={{ color: "var(--blush)", fontFamily: "var(--font-head)", fontWeight: 600, marginTop: 14, fontSize: ".9rem", letterSpacing: ".1em", textTransform: "uppercase" }}>
              — Molly, Health &amp; Safety Officer 🐕
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
