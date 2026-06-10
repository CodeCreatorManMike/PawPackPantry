import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PawScatter from "@/components/PawScatter";

const CATEGORIES = [
  {
    name: "Pawfect Meals",
    description: "Portioned meals with protein, veg and rice — balanced and delicious.",
    accent: "var(--blush)",
    emoji: "🍖",
    items: [
      { name: "Beefy Bark Bowl", desc: "Tender beef mince, brown rice, pumpkin & carrot." },
      { name: "Cluck Cluck Chicken Bowl", desc: "Free-range chicken, sweet potato, spinach & rice." },
      { name: "Fish Fin Bowl", desc: "Fresh fish fillets, rice, peas & zucchini." },
    ],
  },
  {
    name: "Power Paw Protein Portions",
    description: "Pure protein steamed fresh — perfect as a meal booster.",
    accent: "var(--peach)",
    emoji: "💪",
    items: [
      { name: "Steamed Chicken", desc: "Plain free-range chicken breast — no seasonings, just goodness." },
      { name: "Steamed Mince / Beef Chunks", desc: "Lean mince or hearty beef chunks, steamed to perfection." },
      { name: "Fishy Fillets", desc: "Lightly steamed fresh fish fillets — rich in omega-3." },
    ],
  },
  {
    name: "PawPatch Veg & Fruit Pots",
    description: "Nutritious, colourful veggie and fruit add-ons.",
    accent: "var(--sage)",
    emoji: "🥦",
    items: [
      { name: "Steamed Pumpkin & Carrot", desc: "Classic, gentle on the tummy and full of vitamins." },
      { name: "Pawsome Veg Medley", desc: "Broccoli, carrots, peas, zucchini, sweet potato & spinach." },
      { name: "Furtastic Fruit Medley", desc: "Frozen berries & banana — a sweet natural treat." },
    ],
  },
  {
    name: "Rawr & Ready — Raw Range",
    description: "Pick & build your pet's perfect raw meal pack. Portions of 150g | 250g | 500g.",
    accent: "var(--sky)",
    emoji: "🥩",
    items: [
      { name: "Raw Beefy Balls", desc: "Premium raw beef, shaped into easy-to-serve balls." },
      { name: "Raw Beef Chunks", desc: "Chunky cuts of raw beef — for the big appetite dogs." },
      { name: "Organs", desc: "Nutrient-dense raw organs — a raw diet essential." },
      { name: "Chicken Feet / Necks", desc: "Natural dental chews packed with glucosamine." },
      { name: "Fish", desc: "Raw fish portions — omega-rich and coat-boosting." },
      { name: "Egg, Yogurt & Extras", desc: "Raw egg, plain yogurt, and seasonal add-ons." },
    ],
  },
  {
    name: "Mealtime Madness — Toppers",
    description: "Pour-over extras that make every bowl a gourmet experience.",
    accent: "var(--blush)",
    emoji: "✨",
    items: [
      { name: "Hounds Gold — Pet Gravy", desc: "A rich, flavourful bone-based gravy your pet will lose their mind over." },
      { name: "Golden Paw Broth — Bone Broth", desc: "Slow-cooked bone broth — hydrating, gut-healthy, irresistible." },
      { name: "Crunchy Boney Sprinkles", desc: "A crunchy texture topper to add some fun to any meal." },
    ],
  },
  {
    name: "Celebration Goodies",
    description: "For birthdays, milestones, or just because they deserve it.",
    accent: "var(--peach)",
    emoji: "🎂",
    items: [
      { name: "Pupcakes", desc: "Adorable pet-safe cupcakes — the perfect birthday treat." },
      { name: "Meaty Birthday Plate", desc: "Chicken, beef or fish — cooked or raw. A full celebration spread." },
    ],
  },
  {
    name: "Treats",
    description: "Good-dog rewards made with real, wholesome ingredients.",
    accent: "var(--sage)",
    emoji: "🦴",
    items: [
      { name: "Pawsicles", desc: "Frozen fruit & yogurt treats — perfect for a hot Mauritian day." },
      { name: "'Good Dog' Sweethearts Treats", desc: "Heart-shaped training treats packed with love (and flavour)." },
      { name: "Bone Appétite Biscuits", desc: "Baked biscuits — crunchy, wholesome, completely addictive." },
    ],
  },
  {
    name: "Stray Packs — Sponsor a Stray",
    description: "On top of every order's contribution, you can directly sponsor a stray's care.",
    accent: "var(--sky)",
    emoji: "🐾",
    items: [
      { name: "A Meal for a Stray", desc: "Fund one nutritious meal for a stray on the island." },
      { name: "Feed a Stray for a Month", desc: "Monthly sponsorship — cover a stray's meals for a full month." },
      { name: "Adopt & Sponsor Monthly Meals", desc: "Follow a named stray and fund their ongoing monthly meals." },
      { name: "StreetSmart Starter Pack", desc: "Covers sterilisation, de-worming and a vet check-up for one stray." },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      <SiteNav />

      {/* page hero */}
      <section
        style={{
          position: "relative", overflow: "hidden",
          background: "var(--cream)", padding: "72px 24px 56px",
          textAlign: "center",
        }}
      >
        <PawScatter />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="eyebrow">What&apos;s cooking</p>
          <h1 style={{ fontSize: "clamp(2.4rem,7vw,4rem)", marginTop: 8 }}>Our Menu</h1>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 12, maxWidth: "50ch", margin: "12px auto 0", lineHeight: 1.7 }}>
            Every meal is hand-cooked with quality ingredients chosen for taste <em>and</em> optimal pet nutrition. Prices in Rs — contact us to order.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <a href="https://wa.me/23058233898?text=Hi!%20I'd%20like%20to%20order%20from%20the%20menu%20🐾" target="_blank" rel="noopener noreferrer" className="btn sage">
              💬 Order on WhatsApp
            </a>
            <a href="mailto:orders@pawpackpantry.com" className="btn peach">📧 Email Order</a>
          </div>
        </div>
      </section>

      {/* categories */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 22px 100px" }}>
        {CATEGORIES.map((cat, ci) => (
          <section key={cat.name} style={{ marginBottom: 60 }}>
            {/* category header */}
            <div
              style={{
                display: "flex", alignItems: "center", gap: 16, marginBottom: 24,
                padding: "20px 24px",
                background: cat.accent,
                border: "6px solid var(--white)",
                borderRadius: 24,
                boxShadow: "0 12px 24px -14px rgba(74,53,40,.4)",
                transform: ci % 2 ? "rotate(.5deg)" : "rotate(-.5deg)",
              }}
            >
              <span style={{ fontSize: "2.4rem" }}>{cat.emoji}</span>
              <div>
                <h2 style={{ fontSize: "1.6rem" }}>{cat.name}</h2>
                <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".9rem", marginTop: 3 }}>{cat.description}</p>
              </div>
            </div>

            {/* items grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {cat.items.map((item, ii) => (
                <div
                  key={item.name}
                  className={`card ${ii % 2 ? "tilt-r" : "tilt-l"}`}
                  style={{ gap: 10 }}
                >
                  <div
                    style={{
                      height: 100, borderRadius: 16, display: "grid", placeItems: "center",
                      background: cat.accent, fontSize: "2.8rem",
                    }}
                  >
                    {cat.emoji}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem" }}>{item.name}</p>
                    <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".88rem", marginTop: 4, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, color: "var(--ink-soft)" }}>Rs ___</span>
                    <a
                      href={`https://wa.me/23058233898?text=Hi!%20I'd%20like%20to%20order%20${encodeURIComponent(item.name)}%20🐾`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn sage"
                      style={{ padding: "7px 14px", fontSize: ".82rem", border: "3px solid var(--white)" }}
                    >
                      Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* how to order CTA */}
        <div
          style={{
            background: "var(--blush-soft)", border: "6px solid var(--white)", borderRadius: 28,
            padding: "36px 32px", textAlign: "center",
            boxShadow: "0 16px 32px -16px rgba(74,53,40,.4)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem" }}>Ready to order?</h2>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 8, maxWidth: "48ch", margin: "8px auto 0" }}>
            Message us your pet&apos;s name, size &amp; meal picks — we&apos;ll do the rest.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <a href="https://wa.me/23058233898?text=Hi!%20I'd%20like%20to%20order%20🐾" target="_blank" rel="noopener noreferrer" className="btn sage" style={{ fontSize: "1rem" }}>
              💬 WhatsApp Us
            </a>
            <a href="mailto:orders@pawpackpantry.com" className="btn peach" style={{ fontSize: "1rem" }}>
              📧 orders@pawpackpantry.com
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
