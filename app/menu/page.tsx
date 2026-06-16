"use client";
import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PawScatter from "@/components/PawScatter";

type CartItem = { name: string; qty: number };

const CATEGORIES = [
  {
    name: "Pawfect Meals",
    description: "Portioned meals with protein, veg and rice — balanced and delicious.",
    accent: "var(--amber)",
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
    accent: "var(--amber-soft)",
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
    accent: "var(--brown-dark)",
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
    accent: "var(--neutral)",
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
    accent: "var(--amber)",
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
    accent: "var(--amber-soft)",
    emoji: "🎂",
    items: [
      { name: "Pupcakes", desc: "Adorable pet-safe cupcakes — the perfect birthday treat." },
      { name: "Meaty Birthday Plate", desc: "Chicken, beef or fish — cooked or raw. A full celebration spread." },
    ],
  },
  {
    name: "Treats",
    description: "Good-dog rewards made with real, wholesome ingredients.",
    accent: "var(--brown-dark)",
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
    accent: "var(--neutral)",
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
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(name: string) {
    setCart(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name, qty: 1 }];
    });
  }

  const totalItems = cart.reduce((a, i) => a + i.qty, 0);

  function buildCartMessage() {
    const lines = cart.map(i => `- ${i.qty}x ${i.name}`).join("\n");
    return encodeURIComponent(`Hi Paw Pack Pantry! I'd like to order:\n\n${lines}\n\nMy pet's name: `);
  }

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
            Every meal is hand-cooked with quality ingredients chosen for taste <em>and</em> optimal pet nutrition. Add to cart, then send your order in one tap.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <a href="https://wa.me/23058233898?text=Hi!%20I'd%20like%20to%20order%20from%20the%20menu" target="_blank" rel="noopener noreferrer" className="btn sage">
              Order on WhatsApp
            </a>
            <a href="mailto:orders@pawpackpantry.com" className="btn peach">Email Order</a>
          </div>
        </div>
      </section>

      {/* categories */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 22px 140px" }}>
        {CATEGORIES.map((cat, ci) => (
          <section key={cat.name} style={{ marginBottom: 80 }}>
            {/* category header — slightly faded fill */}
            <div
              style={{
                position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", gap: 16, marginBottom: 24,
                padding: "20px 24px",
                border: "6px solid var(--white)",
                borderRadius: 24,
                boxShadow: "0 12px 24px -14px rgba(74,53,40,.4)",
                transform: ci % 2 ? "rotate(.5deg)" : "rotate(-.5deg)",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: cat.accent, opacity: .72 }} />
              <span style={{ position: "relative", fontSize: "2.4rem" }}>{cat.emoji}</span>
              <div style={{ position: "relative" }}>
                <h2 style={{ fontSize: "1.6rem" }}>{cat.name}</h2>
                <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".9rem", marginTop: 3 }}>{cat.description}</p>
              </div>
            </div>

            {/* items — image left, info right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cat.items.map((item, ii) => (
                <div
                  key={item.name}
                  className={`card ${ii % 2 ? "tilt-r" : "tilt-l"}`}
                  style={{ flexDirection: "row", gap: 16, padding: "16px", alignItems: "stretch" }}
                >
                  {/* image placeholder left */}
                  <div
                    style={{
                      width: 90, flexShrink: 0,
                      borderRadius: 14,
                      background: cat.accent,
                      opacity: .75,
                      display: "grid", placeItems: "center",
                      fontSize: "2rem",
                    }}
                  >
                    {cat.emoji}
                  </div>
                  {/* info right */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.05rem" }}>{item.name}</p>
                    <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".86rem", lineHeight: 1.5, flex: 1 }}>{item.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, color: "var(--ink-soft)", fontSize: ".9rem" }}>Rs ___</span>
                      <button
                        onClick={() => addToCart(item.name)}
                        style={{
                          fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".78rem",
                          padding: "6px 12px", borderRadius: 999, cursor: "pointer",
                          background: "var(--ink)", color: "var(--cream)", border: "none",
                          display: "inline-flex", alignItems: "center", gap: 4,
                          boxShadow: "0 4px 10px -4px rgba(68,49,43,.4)",
                        }}
                      >
                        + Add to cart
                      </button>
                      <a
                        href={`https://wa.me/23058233898?text=Hi!%20I'd%20like%20to%20order%20${encodeURIComponent(item.name)}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                          fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".78rem",
                          padding: "6px 12px", borderRadius: 999,
                          background: "var(--amber-soft)", color: "var(--ink)", textDecoration: "none",
                          border: "3px solid var(--white)",
                          boxShadow: "0 4px 10px -4px rgba(68,49,43,.3)",
                        }}
                      >
                        Order now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* ready to order CTA — faded bg */}
        <div
          style={{
            position: "relative", overflow: "hidden",
            border: "6px solid var(--white)", borderRadius: 28,
            padding: "36px 32px", textAlign: "center",
            boxShadow: "0 16px 32px -16px rgba(74,53,40,.4)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "var(--amber-soft)", opacity: .65 }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: "1.8rem" }}>Ready to order?</h2>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 8, maxWidth: "48ch", margin: "8px auto 0" }}>
              Message us your pet&apos;s name, size &amp; meal picks — we&apos;ll do the rest.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
              <a href="https://wa.me/23058233898?text=Hi!%20I'd%20like%20to%20order" target="_blank" rel="noopener noreferrer" className="btn sage" style={{ fontSize: "1rem" }}>
                WhatsApp Us
              </a>
              <a href="mailto:orders@pawpackpantry.com" className="btn peach" style={{ fontSize: "1rem" }}>
                orders@pawpackpantry.com
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Floating cart */}
      {totalItems > 0 && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 200,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8,
        }}>
          <div style={{
            background: "var(--white)", border: "3px solid var(--cream-deep)",
            borderRadius: 16, padding: "12px 16px", maxWidth: 260,
            boxShadow: "0 16px 32px -12px rgba(68,49,43,.45)",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".88rem", color: "var(--ink)" }}>
              Cart — {totalItems} item{totalItems > 1 ? "s" : ""}
            </p>
            {cart.map(i => (
              <div key={i.name} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: ".78rem", color: "var(--ink-soft)", fontWeight: 500 }}>{i.name}</span>
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".78rem", color: "var(--ink)" }}>×{i.qty}</span>
              </div>
            ))}
          </div>
          <a
            href={`https://wa.me/23058233898?text=${buildCartMessage()}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".95rem",
              background: "var(--ink)", color: "var(--cream)",
              padding: "14px 24px", borderRadius: 999, textDecoration: "none",
              boxShadow: "0 12px 24px -8px rgba(68,49,43,.55)",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.306A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.944 7.944 0 0 1-4.031-1.1l-.29-.173-2.952.775.789-2.878-.189-.302A7.964 7.964 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
            Send order via WhatsApp
          </a>
          <button
            onClick={() => setCart([])}
            style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: ".78rem", background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer", padding: "4px 8px" }}
          >
            Clear cart
          </button>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
