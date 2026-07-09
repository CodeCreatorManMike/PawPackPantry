import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PawScatter from "@/components/PawScatter";

export const metadata: Metadata = {
  title: "StreetSmart Campaign — Paw Pack Pantry",
  description: "Every purchase helps feed, sterilise, and rehome stray dogs and cats across Mauritius. Meet the animals we've rescued and learn how our StreetSmart mission goes beyond the bowl.",
  openGraph: {
    title: "StreetSmart Campaign — Paw Pack Pantry",
    description: "A portion of every order funds our long-term mission for the strays of Mauritius — feeding, vet care, rehabilitation and rehoming, one paw at a time.",
    images: ["/logos/logo.png"],
  },
  keywords: ["stray dog rescue Mauritius", "animal welfare Mauritius", "dog adoption Mauritius", "Paw Pack Pantry StreetSmart", "pet food Mauritius rescue"],
};

const MISSION_PHOTOS = [
  "/mission-gallery/539230c7-b5fb-475d-9389-a501e0b5faa1.JPG",
  "/mission-gallery/686fc809-1538-4d32-8b7d-692667c31f78.JPG",
  "/mission-gallery/954c683d-4ed7-4233-909a-53c6bd6ba2e0.JPG",
  "/mission-gallery/9FE24C8C-120D-46AD-BCFF-612F09479E57.JPG",
  "/mission-gallery/IMG_0426.jpg",
  "/mission-gallery/IMG_2307.PNG",
  "/mission-gallery/IMG_2310.PNG",
  "/mission-gallery/IMG_2680.jpg",
  "/mission-gallery/IMG_5071.jpg",
  "/mission-gallery/IMG_7936.PNG",
  "/mission-gallery/IMG_7937.PNG",
  "/mission-gallery/IMG_7938.PNG",
  "/mission-gallery/IMG_7976.PNG",
  "/mission-gallery/IMG_8585.jpg",
  "/mission-gallery/cc82b838-cd4c-4106-9891-12cf20f4196d.JPG",
  "/mission-gallery/e7fbea07-a929-460a-bf1e-5c81263a60be.JPG",
  "/mission-gallery/f38b1dc1-5c2a-4fd5-b233-3eea38f1d44e.JPG",
];

const TESTIMONIES = [
  {
    name: "Yael Golan",
    short: "Destinee helped save a litter of puppies with parvo against the odds. She doesn't just rescue — she carefully screens every adopter because she genuinely wants the best possible life for every animal. I have complete confidence in the treats she's created.",
    accent: "var(--blush-soft)",
    image: "/photos/a44623a4-8ad2-438c-ad40-9b776a8a11b7.jpeg",
  },
  {
    name: "Camille & Michel Chui Chun Lam",
    short: "Destiny and Dan are exceptional fosters. They prepared Lupita for life with a forever family — calm, confident, and wonderfully social. Whenever we had questions they were always just a phone call away. Thank you for giving her such a wonderful start in life.",
    accent: "var(--peach-soft)",
    image: "/testimonials/lupita.jpg",
  },
  {
    name: "Vaanes Bacheccy",
    short: "Poppy is just a spoilt girl loving her best life. She has been a much loved member of our family since we adopted her from Destinee and Dan all those years ago.",
    accent: "var(--sage-soft)",
    image: "/photos/32ddb287-f8b1-4342-829a-2690c297fc7c.jpeg",
  },
  {
    name: "Sarah, Balaclava",
    short: "Destinee and Dan are truly generous, compassionate and loving individuals who care deeply for the wellbeing of animals. I am truly excited about Paw Pack Pantry — this venture is being taken on with passion, commitment, and a genuine heart for the betterment of the island's animals.",
    accent: "var(--sky-soft)",
    image: "/testimonials/sarah.jpg",
  },
  {
    name: "Destiny",
    short: "Destiny has grown to become a very cuddly dog who demands a lot of attention and snacks 😊 We cannot imagine our lives without her. She brings us joy everyday and seeing her after work is the best part of my day.",
    accent: "var(--amber-soft)",
    image: "/testimonials/destiny.jpg",
  },
  {
    name: "Gracie",
    short: "Gracie moved home with her forever family and is living happily. A gentle soul who deserved every bit of love she now receives every single day. 🐱",
    accent: "var(--neutral)",
    image: "/testimonials/gracie.jpg",
  },
];

const SPONSOR_TIERS = [
  {
    icon: "🍽️",
    title: "A Meal for a Stray",
    desc: "Fund one nutritious meal for a stray on the island. Every belly filled is a step forward.",
    price: "Rs 65",
    accent: "var(--blush)",
  },
  {
    icon: "📅",
    title: "Sponsor Meals for a Month",
    desc: "Pay for thirty meals for a stray of Mauritius — consistent nutrition makes a real difference.",
    price: "Rs 950",
    accent: "var(--peach)",
  },
  {
    icon: "🏥",
    title: "StreetSmart Starter Pack",
    desc: "Pay to have one stray vet checked, dewormed & sterilised. Life-changing care.",
    price: "Rs 1,500",
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

      {/* hero — keep the dark section */}
      <section
        style={{
          position: "relative", overflow: "hidden",
          background: "var(--ink)", padding: "80px 24px 72px",
          textAlign: "center",
        }}
      >
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
            <a href="#sponsor" className="btn" style={{ fontSize: "1rem" }}>Sponsor a Stray</a>
            <a href="https://wa.me/23058233898?text=I'd%20like%20to%20support%20StreetSmart%20🐾" target="_blank" rel="noopener noreferrer" className="btn sage" style={{ fontSize: "1rem" }}>
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <main style={{ background: "var(--cream)" }}>
        {/* ===== WHO WE ARE — full-width centered text ===== */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "72px 24px 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p className="eyebrow" style={{ textAlign: "center" }}>Who we are</p>
            <h2 style={{ fontSize: "2.2rem", textAlign: "center" }}>Our mission goes beyond the bowl.</h2>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8 }}>
              Paw Pack Pantry was started with one mission in mind — turning a lifelong passion for animal rescue into sustainable, lasting impact. Over our five years in Mauritius, we have rescued, rehabilitated, and rehomed over 100 strays between just the two of us. Imagine how many more we could reach with your help.
            </p>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8 }}>
              A portion of every purchase is contributed directly to our StreetSmart Campaign — funding stray animal feeding programmes, sterilisation initiatives, rehabilitation efforts, rehoming, and community education projects that raise awareness for animal wellbeing across Mauritius.
            </p>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8 }}>
              By choosing Paw Pack Pantry, you are not only nourishing your own pet — you are helping create a better future for countless animals still waiting for their second chance. We also look forward to working alongside fellow rescuers and organisations who share our vision for a more compassionate Mauritius.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4, justifyContent: "center" }}>
              {["Feeding", "Sterilisation", "Rehabilitation", "Rehoming", "Awareness & Education"].map(t => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== IMPACT STATS ===== */}
        <section style={{ maxWidth: 900, margin: "60px auto 0", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 16 }}>
            {IMPACT_STATS.map((s, i) => (
              <div key={i} className="macro" style={{ padding: "20px 14px" }}>
                <div className="v" style={{ fontSize: "1.8rem" }}>{s.v}</div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MISSION GALLERY — flat borderless grid ===== */}
        <section style={{ maxWidth: 1100, margin: "72px auto 0", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="eyebrow">In the field</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Mission Gallery</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
          }}>
            {MISSION_PHOTOS.map((src) => (
              <div key={src} style={{ overflow: "hidden", aspectRatio: "1", position: "relative" }}>
                <Image src={src} alt="StreetSmart mission" fill style={{ objectFit: "cover" }} sizes="(max-width:600px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </section>

        {/* ===== TESTIMONIES ===== */}
        <section style={{ maxWidth: 1100, margin: "72px auto 0", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="eyebrow">The pack speaks</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Testimonies</h2>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 8, maxWidth: "52ch", margin: "8px auto 0" }}>
              Words from the families Destinee and Daniel have supported over the years.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
            {TESTIMONIES.map((t, i) => (
              <div
                key={t.name}
                className="card"
                style={{ gap: 12, padding: "0 0 22px" }}
              >
                {t.image && (
                  <div style={{ position: "relative", height: 200, overflow: "hidden", borderRadius: "18px 18px 0 0" }}>
                    <Image src={t.image} alt={t.name} fill style={{ objectFit: "cover" }} sizes="(max-width:600px) 100vw, 280px" />
                  </div>
                )}
                <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".88rem", lineHeight: 1.7, color: "var(--ink-soft)", fontStyle: "italic", flex: 1 }}>
                    &ldquo;{t.short}&rdquo;
                  </p>
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".85rem", color: "var(--ink)" }}>— {t.name}</p>
                </div>
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

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
            {SPONSOR_TIERS.map((tier, i) => (
              <div
                key={tier.title}
                className="card"
                style={{ gap: 14, padding: "24px 20px", flex: "0 1 280px", minWidth: 220 }}
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
                  Sponsor Now — {tier.price}
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
              Paw Pack Pantry started with one simple belief: Every animal deserves a full belly, a healthy life, and the chance to be loved.
            </p>
            <p style={{ color: "var(--blush-soft)", fontWeight: 500, marginTop: 16, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "52ch", margin: "16px auto 0" }}>
              With your support, we&apos;re turning that belief into action. One bowl. One life. One community.
            </p>
            <p style={{ color: "var(--blush)", fontFamily: "var(--font-head)", fontWeight: 600, marginTop: 20, fontSize: ".9rem", letterSpacing: ".1em", textTransform: "uppercase" }}>
              — Destinee &amp; Daniel, Founders of Paw Pack Pantry
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
