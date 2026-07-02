"use client";
import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PawScatter from "@/components/PawScatter";

type CartItem = { name: string; qty: number };

type MenuItem = {
  name: string;
  desc: string;
  ingredients: string[];
  subSection?: string;
};

type Category = {
  name: string;
  description: string;
  accent: string;
  emoji: string;
  items: MenuItem[];
};

const CATEGORIES: Category[] = [
  {
    name: "The Pawfect Pawtions",
    description: "Gourmet Pet Meals Homemade to meet your pet's satisfaction & their nutrition needs. Made to order. Min weight per meal 250g.",
    accent: "var(--amber)",
    emoji: "🍖",
    items: [
      {
        subSection: "Pawfect Meals",
        name: "Cluckin' Good Bowl",
        desc: "Chicken, veggies and whole grain rice — balanced and nourishing.",
        ingredients: ["Chicken meat", "Chicken organs", "Chicken broth (water, apple cider vinegar, chicken bones, celery, carrot, parsley, turmeric)", "Carrot", "Zucchini", "Spinach", "Brown rice", "Crushed egg shell (calcium source)", "Parsley", "Turmeric", "Basil", "Pepper", "Omega 3 & 6, blend of multivitamins & minerals"],
      },
      {
        subSection: "Pawfect Meals",
        name: "Beefy Bark Bowl",
        desc: "Hearty beef mince with pumpkin, spinach, peas and whole grain rice.",
        ingredients: ["Beef mince", "Beef organs", "Beef broth (water, apple cider vinegar, beef bones, celery, carrot, parsley, turmeric)", "Pumpkin", "Spinach", "Crushed egg shell (calcium source)", "Peas", "Brown rice", "Parsley", "Turmeric", "Pepper", "Omega 3 & 6, blend of multivitamins & minerals"],
      },
      {
        subSection: "Pawfect Meals",
        name: "Fintastic Bowl",
        desc: "Omega-rich tuna with carrot, pumpkin and whole grain rice.",
        ingredients: ["Tuna", "Carrot", "Pumpkin", "Brown rice", "Zucchini", "Parsley", "Crushed egg shells (calcium source)", "Omega 3 & 6, blend of multivitamins & minerals"],
      },
      {
        subSection: "Protein Pawtions",
        name: "Shredded Chicken in Broth",
        desc: "Tender shredded chicken in homemade broth. Perfect to pair with Veg Pawtions or add to kibble as a topper.",
        ingredients: ["Shredded chicken", "Parsley", "Chicken broth (water, apple cider vinegar, chicken bones, celery, carrot, parsley, turmeric)"],
      },
      {
        subSection: "Protein Pawtions",
        name: "Beef Mince in Broth",
        desc: "Lean beef mince simmered in rich homemade bone broth. Pairs perfectly with Veg Pawtions.",
        ingredients: ["Beef mince", "Parsley", "Pepper", "Beef broth (water, apple cider vinegar, beef bones, celery, carrot, parsley, turmeric)"],
      },
      {
        subSection: "Protein Pawtions",
        name: "Puppy Pop",
        desc: "Soft chicken meatballs with veggies — great for puppies and senior dogs.",
        ingredients: ["Chicken mince", "Carrot", "Zucchini", "Parsley", "Basil"],
      },
      {
        subSection: "Veg Pawtions",
        name: "Pumpkin & Carrot",
        desc: "Classic, gentle on the tummy and full of vitamins. Min weight 100g.",
        ingredients: ["Pumpkin", "Parsley", "Carrot"],
      },
      {
        subSection: "Veg Pawtions",
        name: "Carrot, Zucchini, Spinach & Rice",
        desc: "A wholesome veggie medley with brown rice in homemade broth. Min weight 100g.",
        ingredients: ["Carrot", "Zucchini", "Spinach", "Brown rice", "Chicken broth (water, apple cider vinegar, carrots, celery, parsley, turmeric, pepper, chicken bones)"],
      },
    ],
  },
  {
    name: "The Rawr Packs",
    description: "Prepacked & Frozen Raw Meals portioned for your pet. All meats/animal products are raw; vegetables are pre-steamed with bone broth. Packaged in vacuum-sealed bags and sold frozen. Min weight per meal 250g.",
    accent: "var(--neutral)",
    emoji: "🥩",
    items: [
      {
        name: "Coop-to-Bowl",
        desc: "A balanced raw chicken pack with egg, sardine, Greek yogurt and veggies.",
        ingredients: ["Chicken foot/neck", "Chicken liver & heart", "Egg & crushed egg shell", "Greek yogurt", "Sardine", "Pumpkin cubes & zucchini"],
      },
      {
        name: "T-Bone Butchery Bowl",
        desc: "A hearty raw beef pack loaded with organs, egg, blueberries and spinach.",
        ingredients: ["Beef balls", "Beef liver", "Egg & crushed egg shell", "Pumpkin", "Yogurt", "Blueberries", "Spinach", "Sardine (small)"],
      },
      {
        name: "Catch of the Month",
        desc: "A fish-based raw pack with mackerel, pumpkin, yogurt and apple.",
        ingredients: ["Mackerel", "Pumpkin", "Yogurt", "Chicken foot", "Apple", "Egg & crushed eggshell"],
      },
      {
        name: "Build Your Own Rawr Pack",
        desc: "Choose your own ingredients from our pantry — we portion and pack it for you. Just let us know what you'd like included.",
        ingredients: [
          "Proteins & boney bits: chicken feet/neck, beef mince balls, sardines, mackerel, tuna",
          "Organs: chicken liver, chicken heart, beef liver, eggs",
          "Veg & starch: pumpkin cubes, spinach, carrot, zucchini, blueberries, apple, banana",
          "Extras: coconut oil, yogurt, peanut butter, broth",
        ],
      },
    ],
  },
  {
    name: "The Treat Pantry",
    description: "Homemade gourmet biscuits, pawsicles, jerky, chew sticks and more. Available in S / L bags.",
    accent: "var(--amber-soft)",
    emoji: "🍪",
    items: [
      {
        name: "Bone Appétit Biscuits",
        desc: "Homemade gourmet pet biscuits in a variety of flavours picked monthly.",
        ingredients: [
          "Flavours: Chicken, Carrot & Zucchini / Peanut Butter & Pumpkin / Blueberry, Banana & Oat",
          "Base: whole wheat flour, rolled oats, egg, carrot or pumpkin purée, banana purée, natural peanut butter, chicken broth or blueberries, water",
        ],
      },
      {
        name: "Fishy Fin Biscuits",
        desc: "Homemade gourmet tuna biscuits — a fish lover's dream.",
        ingredients: ["Tuna", "Egg", "Oats", "Whole wheat flour"],
      },
      {
        name: "'Good Dog!' Sweethearts",
        desc: "Heart-shaped biscuits in a variety of flavours picked monthly.",
        ingredients: [
          "Flavours: Blueberry, Banana & Oat / Peanut Butter & Oat",
          "Ingredients: whole wheat flour, rolled oats, banana purée, blueberries, large egg, natural peanut butternut, water",
        ],
      },
      {
        name: "Pawsicles",
        desc: "Homemade gourmet pet popsicles, set with gelatin and served chilled.",
        ingredients: [
          "Blueberry & Banana: blueberries, banana purée, Greek yogurt, gelatin, water",
          "Pumpkin & Carrot: carrot, pumpkin purée, Greek yogurt, gelatin, water",
        ],
      },
      {
        name: "Chew Sticks",
        desc: "Homemade gourmet pet chew sticks & jerky in a variety of flavours.",
        ingredients: [
          "Chicken Jerky: chicken, apple cider vinegar",
          "Apple, Zucchini & Carrot chew sticks (great for digestion!): apple & apple purée, zucchini, carrot, natural peanut butter, oat, coconut oil",
        ],
      },
    ],
  },
  {
    name: "The Pantry Staples",
    description: "Bone broth, gravies, sprinkles and healthy meal toppers — the perfect addition to any bowl.",
    accent: "var(--brown-dark)",
    emoji: "✨",
    items: [
      {
        name: "Bone Broth",
        desc: "Full of nutrients, vitamins and minerals. Add to kibble or any meal for benefits to joints, gut health, skin & coat and immune system. Available: Chicken or Beef.",
        ingredients: ["Chicken or beef bones", "Water", "Apple cider vinegar", "Carrot", "Celery", "Parsley", "Turmeric"],
      },
      {
        name: "Gravy",
        desc: "Homemade gourmet pet gravy — perfect to add flavour and top off any meal. Available: Chicken or Beef.",
        ingredients: ["Chicken or beef broth", "Carrot", "Pumpkin", "Parsley", "Turmeric"],
      },
      {
        name: "Bone Broth Gummies",
        desc: "Homemade gourmet pet bone broth gelatin gummies. Available: Chicken or Beef.",
        ingredients: ["Bone broth (chicken or beef — water, apple cider vinegar, bones, celery, carrot, parsley, turmeric)", "Gelatin"],
      },
      {
        name: "Training Treats",
        desc: "Homemade gourmet training treats in a variety of flavours — Chicken, Beef or Tuna.",
        ingredients: [
          "Chicken: whole wheat flour, rolled oats, chicken pate, egg, chicken broth",
          "Beef: whole wheat flour, rolled oats, beef pate, egg, beef broth",
          "Tuna: tuna, egg, oats, whole wheat flour",
        ],
      },
      {
        name: "Allergy Support Chewies",
        desc: "Gelatin chewies served chilled to help smooth itchy allergy flare ups!",
        ingredients: ["Blueberry", "Apple", "Honey", "Coconut oil", "Greek yogurt", "Gelatin", "Water"],
      },
      {
        name: "Snouty Sprinkles",
        desc: "A magical sprinkle of ground biscuits — packed with surprising flavours. Sprinkle over any meal for extra flavour, crunch, or to entice fussy eaters.",
        ingredients: ["Whole wheat flour", "Rolled oats", "Carrot", "Zucchini", "Egg", "Chicken broth", "Pumpkin purée", "Natural peanut butter", "Banana purée", "Blueberries", "Tuna"],
      },
      {
        name: "Breath Mints",
        desc: "Keep those sloppy snouty kisses nice & fresh!",
        ingredients: ["Mint", "Spinach", "Parsley", "Cucumber", "Greek yogurt", "Gelatin", "Water"],
      },
    ],
  },
  {
    name: "The Birfday Pantry",
    description: "Celebrate birthdays with pupcakes and special celebration feasts.",
    accent: "var(--amber)",
    emoji: "🎂",
    items: [
      {
        name: "Mighty Meaty Birfday Feast",
        desc: "A selection of meat portions bundled into a mighty meat feast for your pet's special day. Available raw or cooked. Min feast weight 200g.",
        ingredients: ["Pawfect steak", "Pig feet", "Chicken feet/necks", "Beef balls", "Beef chunks", "Shredded chicken", "Chicken/beef liver", "Chicken organs", "Sardines", "Mackerel", "Tuna"],
      },
      {
        name: "Pupcakes",
        desc: "Homemade gourmet pet cupcakes for their special day! Available in 6 or 12.",
        ingredients: [
          "Zucchini, Carrot & Chicken",
          "Blueberries, Banana, Peanut Butter & Oats",
        ],
      },
    ],
  },
  {
    name: "The Stray Packs",
    description: "Sponsor a stray as part of our StreetSmart Campaign. Funds stray feeding, sterilisation, rehabilitation and education across Mauritius.",
    accent: "var(--neutral)",
    emoji: "🐾",
    items: [
      {
        name: "Sponsor a Meal for a Stray",
        desc: "Pay for one meal for a stray of Mauritius. Every belly filled is a step forward.",
        ingredients: [],
      },
      {
        name: "Sponsor Meals for a Stray for 1 Month",
        desc: "Pay for thirty meals for a stray of Mauritius — consistent nutrition makes a real difference.",
        ingredients: [],
      },
      {
        name: "Sponsor a StreetSmart Starter Pack",
        desc: "Pay to have one stray vet checked, dewormed & sterilised. Life-changing care.",
        ingredients: [],
      },
    ],
  },
];

function ItemCard({
  item,
  emoji,
  accent,
  tiltClass,
  onAddToCart,
}: {
  item: MenuItem;
  emoji: string;
  accent: string;
  tiltClass: string;
  onAddToCart: (name: string) => void;
}) {
  const [showIng, setShowIng] = useState(false);

  return (
    <div
      className={`card ${tiltClass}`}
      style={{ flexDirection: "row", gap: 16, padding: "16px", alignItems: "stretch" }}
    >
      {/* emoji block left */}
      <div
        style={{
          width: 90, flexShrink: 0,
          borderRadius: 14,
          background: accent,
          opacity: .75,
          display: "grid", placeItems: "center",
          fontSize: "2rem",
        }}
      >
        {emoji}
      </div>
      {/* info right */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.05rem" }}>{item.name}</p>
        <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".86rem", lineHeight: 1.5 }}>{item.desc}</p>

        {item.ingredients.length > 0 && (
          <div style={{ marginTop: 4 }}>
            <button
              onClick={() => setShowIng(p => !p)}
              style={{
                fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".72rem",
                padding: "3px 10px", borderRadius: 999, cursor: "pointer",
                background: "var(--cream)", color: "var(--ink-soft)",
                border: "1px solid var(--cream-deep)",
                letterSpacing: ".03em",
              }}
            >
              {showIng ? "Hide ingredients ↑" : "Ingredients ↓"}
            </button>
            {showIng && (
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".72rem",
                      padding: "3px 8px", borderRadius: 999,
                      background: "var(--cream)", color: "var(--ink-soft)",
                      border: "1px solid var(--cream-deep)",
                      lineHeight: 1.4,
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, color: "var(--ink-soft)", fontSize: ".9rem" }}>Rs ___</span>
          <button
            onClick={() => onAddToCart(item.name)}
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
  );
}

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
          <h1 style={{ fontSize: "clamp(2.4rem,7vw,4rem)", marginTop: 8 }}>Our Launch Menu</h1>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 12, maxWidth: "50ch", margin: "12px auto 0", lineHeight: 1.7 }}>
            Every meal is hand-crafted with quality ingredients chosen for taste <em>and</em> optimal pet nutrition. Add to cart, then send your order in one tap.
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
        {CATEGORIES.map((cat, ci) => {
          // group items by subSection for display
          const groups: { label: string | null; items: (MenuItem & { originalIndex: number })[] }[] = [];
          cat.items.forEach((item, idx) => {
            const ss = item.subSection ?? null;
            const last = groups[groups.length - 1];
            if (!last || last.label !== ss) {
              groups.push({ label: ss, items: [{ ...item, originalIndex: idx }] });
            } else {
              last.items.push({ ...item, originalIndex: idx });
            }
          });

          return (
            <section key={cat.name} style={{ marginBottom: 80 }}>
              {/* category header */}
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

              {/* items grouped by sub-section */}
              {groups.map(group => (
                <div key={group.label ?? "default"} style={{ marginBottom: 24 }}>
                  {group.label && (
                    <p style={{
                      fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".75rem",
                      letterSpacing: ".18em", textTransform: "uppercase",
                      color: "var(--ink-soft)", marginBottom: 10, paddingLeft: 4,
                    }}>
                      {group.label}
                    </p>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {group.items.map((item, ii) => (
                      <ItemCard
                        key={item.name}
                        item={item}
                        emoji={cat.emoji}
                        accent={cat.accent}
                        tiltClass={item.originalIndex % 2 ? "tilt-r" : "tilt-l"}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })}

        {/* ready to order CTA */}
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
