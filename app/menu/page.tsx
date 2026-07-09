"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PawScatter from "@/components/PawScatter";

type SizeOption = { label: string; price: number };
type CartItem = { key: string; name: string; size: string; price: number; qty: number };

type MenuItem = {
  name: string;
  desc: string;
  ingredients: string[];
  subSection?: string;
  sizes: SizeOption[];
};

type Category = {
  name: string;
  description: string;
  accent: string;
  icon: ReactNode;
  items: MenuItem[];
};

const CATEGORIES: Category[] = [
  {
    name: "The Pawfect Pawtions",
    description: "Gourmet Pet Meals Homemade to meet your pet's satisfaction & their nutrition needs. Made to order. Min weight per meal 250g.",
    accent: "var(--amber)",
    icon: <img src="/icons/pawfect-pawtions.svg" alt="" width={32} height={32} />,
    items: [
      {
        subSection: "Pawfect Meals",
        name: "Cluckin’ Good Bowl",
        desc: "Chicken, veggies and whole grain rice — balanced and nourishing.",
        sizes: [{ label: "250g", price: 260 }, { label: "500g", price: 380 }, { label: "750g", price: 500 }, { label: "1kg", price: 590 }],
        ingredients: ["Chicken meat", "Chicken organs", "Chicken broth (water, apple cider vinegar, chicken bones, celery, carrot, parsley, turmeric)", "Carrot", "Zucchini", "Spinach", "Brown rice", "Crushed egg shell (calcium source)", "Parsley", "Turmeric", "Basil", "Pepper", "Omega 3 & 6, blend of multivitamins & minerals"],
      },
      {
        subSection: "Pawfect Meals",
        name: "Beefy Bark Bowl",
        desc: "Hearty beef mince with pumpkin, spinach, peas and whole grain rice.",
        sizes: [{ label: "250g", price: 290 }, { label: "500g", price: 410 }, { label: "750g", price: 540 }, { label: "1kg", price: 670 }],
        ingredients: ["Beef mince", "Beef organs", "Beef broth (water, apple cider vinegar, beef bones, celery, carrot, parsley, turmeric)", "Pumpkin", "Spinach", "Crushed egg shell (calcium source)", "Peas", "Brown rice", "Parsley", "Turmeric", "Pepper", "Omega 3 & 6, blend of multivitamins & minerals"],
      },
      {
        subSection: "Pawfect Meals",
        name: "Fintastic Bowl",
        desc: "Omega-rich tuna with carrot, pumpkin and whole grain rice.",
        sizes: [{ label: "250g", price: 240 }, { label: "500g", price: 330 }, { label: "750g", price: 410 }, { label: "1kg", price: 500 }],
        ingredients: ["Tuna", "Carrot", "Pumpkin", "Brown rice", "Zucchini", "Parsley", "Crushed egg shells (calcium source)", "Omega 3 & 6, blend of multivitamins & minerals"],
      },
      {
        subSection: "Protein Pawtions",
        name: "Shredded Chicken in Broth / Puppy Pops",
        desc: "Tender shredded chicken in homemade broth, or soft chicken meatball pops — great for puppies and seniors. Perfect paired with Veg Pawtions or as a kibble topper. Min 150g.",
        sizes: [{ label: "150g", price: 220 }, { label: "300g", price: 300 }, { label: "450g", price: 390 }, { label: "600g", price: 440 }],
        ingredients: ["Shredded chicken", "Parsley", "Chicken broth (water, apple cider vinegar, chicken bones, celery, carrot, parsley, turmeric)"],
      },
      {
        subSection: "Protein Pawtions",
        name: "Beef Mince in Broth",
        desc: "Lean beef mince simmered in rich homemade bone broth. Pairs perfectly with Veg Pawtions or over kibble. Min 150g.",
        sizes: [{ label: "150g", price: 250 }, { label: "300g", price: 380 }, { label: "450g", price: 480 }, { label: "600g", price: 590 }],
        ingredients: ["Beef mince", "Parsley", "Pepper", "Beef broth (water, apple cider vinegar, beef bones, celery, carrot, parsley, turmeric)"],
      },
      {
        subSection: "Veg Pawtions",
        name: "Pumpkin & Carrot",
        desc: "Classic, gentle on the tummy and full of vitamins. Pair with any Protein Pawtion for a complete meal. Min 100g.",
        sizes: [{ label: "150g", price: 190 }, { label: "300g", price: 220 }, { label: "450g", price: 260 }, { label: "600g", price: 290 }],
        ingredients: ["Pumpkin", "Parsley", "Carrot"],
      },
      {
        subSection: "Veg Pawtions",
        name: "Carrot, Zucchini, Spinach & Rice",
        desc: "A wholesome veggie medley with brown rice in homemade broth. Pair with any Protein Pawtion. Min 100g.",
        sizes: [{ label: "150g", price: 190 }, { label: "300g", price: 220 }, { label: "450g", price: 260 }, { label: "600g", price: 290 }],
        ingredients: ["Carrot", "Zucchini", "Spinach", "Brown rice", "Chicken broth (water, apple cider vinegar, carrots, celery, parsley, turmeric, pepper, chicken bones)"],
      },
    ],
  },
  {
    name: "The Rawr Packs",
    description: "Prepacked & Frozen Raw Meals portioned for your pet. All meats/animal products are raw; vegetables are pre-steamed with bone broth. Packaged in vacuum-sealed bags and sold frozen. Min weight per meal 250g.",
    accent: "var(--neutral)",
    icon: <img src="/icons/rawr-packs.svg" alt="" width={32} height={32} />,
    items: [
      {
        name: "Coop-to-Bowl",
        desc: "A balanced raw chicken pack with egg, sardine, Greek yogurt and veggies. Sold frozen.",
        sizes: [{ label: "250g", price: 220 }, { label: "500g", price: 350 }, { label: "750g", price: 430 }, { label: "1kg", price: 580 }],
        ingredients: ["Chicken foot/neck", "Chicken liver & heart", "Egg & crushed egg shell", "Greek yogurt", "Sardine", "Pumpkin cubes & zucchini"],
      },
      {
        name: "T-Bone Butchery Pack",
        desc: "A hearty raw beef pack loaded with organs, egg, blueberries and spinach. Sold frozen.",
        sizes: [{ label: "250g", price: 300 }, { label: "500g", price: 460 }, { label: "750g", price: 610 }, { label: "1kg", price: 730 }],
        ingredients: ["Beef balls", "Beef liver", "Egg & crushed egg shell", "Pumpkin", "Yogurt", "Blueberries", "Spinach", "Sardine (small)"],
      },
      {
        name: "Catch of the Month",
        desc: "A fish-based raw pack with mackerel, pumpkin, yogurt and apple. Sold frozen.",
        sizes: [{ label: "250g", price: 270 }, { label: "500g", price: 380 }, { label: "750g", price: 470 }, { label: "1kg", price: 560 }],
        ingredients: ["Mackerel", "Pumpkin", "Yogurt", "Chicken foot", "Apple", "Egg & crushed eggshell"],
      },
      {
        name: "Build Your Own Rawr Pack",
        desc: "Choose your own ingredients from our pantry — we portion and pack it for you. Message us what you’d like included.",
        sizes: [{ label: "250g", price: 250 }, { label: "500g", price: 360 }, { label: "750g", price: 490 }, { label: "1kg", price: 650 }],
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
    icon: <img src="/icons/treat-pantry.svg" alt="" width={32} height={32} />,
    items: [
      {
        name: "Bone Appétit Biscuits",
        desc: "Homemade gourmet pet biscuits in a variety of flavours picked monthly. Flavours: Chicken, Carrot & Zucchini / Peanut Butter & Pumpkin / Blueberry, Banana & Oat.",
        sizes: [{ label: "S", price: 250 }, { label: "L", price: 350 }],
        ingredients: ["Whole wheat flour", "Rolled oats", "Egg", "Chicken broth or blueberries", "Carrot or pumpkin purée", "Banana purée", "Natural peanut butter", "Water"],
      },
      {
        name: "Fishy Fin Biscuits",
        desc: "Homemade gourmet tuna biscuits — a fish lover’s dream.",
        sizes: [{ label: "S", price: 260 }, { label: "L", price: 410 }],
        ingredients: ["Tuna", "Egg", "Oats", "Whole wheat flour"],
      },
      {
        name: "‘Good Dog!’ Sweethearts",
        desc: "Heart-shaped biscuits in a variety of flavours picked monthly. Flavours: Blueberry, Banana & Oat / Peanut Butter & Oat.",
        sizes: [{ label: "S", price: 230 }, { label: "L", price: 360 }],
        ingredients: ["Whole wheat flour", "Rolled oats", "Banana purée", "Blueberries", "Large egg", "Natural peanut butter", "Water"],
      },
      {
        name: "Pawsicles",
        desc: "Homemade gourmet pet popsicles, set with gelatin and served chilled. Flavours: Blueberry & Banana / Pumpkin & Carrot.",
        sizes: [{ label: "S", price: 280 }, { label: "L", price: 500 }],
        ingredients: ["Blueberries / Carrot", "Banana purée / Pumpkin purée", "Greek yogurt", "Gelatin", "Water"],
      },
      {
        name: "Chicken Jerky",
        desc: "Homemade gourmet chicken jerky — chewy, delicious and packed with protein.",
        sizes: [{ label: "One size", price: 340 }],
        ingredients: ["Chicken", "Apple cider vinegar"],
      },
      {
        name: "Apple, Zucchini & Carrot Chew Sticks",
        desc: "Homemade gourmet chew sticks — great for digestion!",
        sizes: [{ label: "S", price: 220 }, { label: "L", price: 310 }],
        ingredients: ["Apple & apple purée", "Zucchini", "Carrot", "Natural peanut butter", "Oat", "Coconut oil"],
      },
    ],
  },
  {
    name: "The Pantry Staples",
    description: "Bone broth, gravies, sprinkles and healthy meal toppers — the perfect addition to any bowl.",
    accent: "var(--brown-dark)",
    icon: <img src="/icons/pantry-staples.svg" alt="" width={32} height={32} />,
    items: [
      {
        name: "Bone Broth",
        desc: "Full of nutrients, vitamins and minerals. Add to kibble or any meal for benefits to joints, gut health, skin & coat and immune system. Available: Chicken or Beef.",
        sizes: [{ label: "300ml", price: 260 }, { label: "500ml", price: 340 }],
        ingredients: ["Chicken or beef bones", "Water", "Apple cider vinegar", "Carrot", "Celery", "Parsley", "Turmeric"],
      },
      {
        name: "Gravy",
        desc: "Homemade gourmet pet gravy — perfect to add flavour and top off any meal. Available: Chicken or Beef.",
        sizes: [{ label: "300ml", price: 250 }, { label: "500ml", price: 330 }],
        ingredients: ["Chicken or beef broth", "Carrot", "Pumpkin", "Parsley", "Turmeric"],
      },
      {
        name: "Bone Broth Gummies",
        desc: "Homemade gourmet pet bone broth gelatin gummies. Available: Chicken or Beef.",
        sizes: [{ label: "S", price: 220 }, { label: "L", price: 450 }],
        ingredients: ["Bone broth (chicken or beef — water, apple cider vinegar, bones, celery, carrot, parsley, turmeric)", "Gelatin"],
      },
      {
        name: "Training Treats",
        desc: "Homemade gourmet training treats in a variety of flavours — Chicken, Beef or Tuna.",
        sizes: [{ label: "XS", price: 125 }, { label: "S", price: 250 }, { label: "L", price: 300 }],
        ingredients: [
          "Chicken: whole wheat flour, rolled oats, chicken pate, egg, chicken broth",
          "Beef: whole wheat flour, rolled oats, beef pate, egg, beef broth",
          "Tuna: tuna, egg, oats, whole wheat flour",
        ],
      },
      {
        name: "Allergy Support Chewies",
        desc: "Gelatin chewies served chilled to help smooth itchy allergy flare ups!",
        sizes: [{ label: "One size", price: 360 }],
        ingredients: ["Blueberry", "Apple", "Honey", "Coconut oil", "Greek yogurt", "Gelatin", "Water"],
      },
      {
        name: "Snouty Sprinkles",
        desc: "A magical sprinkle of ground biscuits — packed with surprising flavours. Sprinkle over any meal for extra flavour, crunch, or to entice fussy eaters.",
        sizes: [{ label: "One size", price: 220 }],
        ingredients: ["Whole wheat flour", "Rolled oats", "Carrot", "Zucchini", "Egg", "Chicken broth", "Pumpkin purée", "Natural peanut butter", "Banana purée", "Blueberries", "Tuna"],
      },
      {
        name: "Breath Mints",
        desc: "Keep those sloppy snouty kisses nice & fresh!",
        sizes: [{ label: "One size", price: 400 }],
        ingredients: ["Mint", "Spinach", "Parsley", "Cucumber", "Greek yogurt", "Gelatin", "Water"],
      },
    ],
  },
  {
    name: "The Birfday Pantry",
    description: "Celebrate birthdays with pupcakes and special celebration feasts.",
    accent: "var(--amber)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3l2 5h5l-4 3.5 1.5 5.5L14 14l-4.5 3 1.5-5.5L7 8h5z"/>
        <line x1="14" y1="14" x2="14" y2="25"/>
        <path d="M9 25h10"/>
      </svg>
    ),
    items: [
      {
        name: "Mighty-Meaty Birfday Feast",
        desc: "A selection of meat portions bundled into a mighty meat feast for your pet’s special day. Available raw or cooked. Min feast weight 200g.",
        sizes: [{ label: "One size", price: 395 }],
        ingredients: ["Pawfect steak", "Pig feet", "Chicken feet/necks", "Beef balls", "Beef chunks", "Shredded chicken", "Chicken/beef liver", "Chicken organs", "Sardines", "Mackerel", "Tuna"],
      },
      {
        name: "Pupcakes",
        desc: "Homemade gourmet pet cupcakes for their special day! Available in 6 or 12. Flavours: Zucchini, Carrot & Chicken / Blueberries, Banana, Peanut Butter & Oats.",
        sizes: [{ label: "One size", price: 350 }],
        ingredients: ["Zucchini, Carrot & Chicken", "Blueberries, Banana, Peanut Butter & Oats"],
      },
    ],
  },
  {
    name: "The Stray Packs",
    description: "Sponsor a stray as part of our StreetSmart Campaign. Funds stray feeding, sterilisation, rehabilitation and education across Mauritius.",
    accent: "var(--neutral)",
    icon: <img src="/icons/stray-packs.svg" alt="" width={32} height={32} />,
    items: [
      {
        name: "Sponsor a Meal for a Stray",
        desc: "Pay for one meal for a stray of Mauritius. Every belly filled is a step forward.",
        sizes: [{ label: "1 meal", price: 65 }],
        ingredients: [],
      },
      {
        name: "Sponsor Meals for a Stray for 1 Month",
        desc: "Pay for thirty meals for a stray of Mauritius — consistent nutrition makes a real difference.",
        sizes: [{ label: "30 meals", price: 950 }],
        ingredients: [],
      },
      {
        name: "StreetSmart Starter Pack",
        desc: "Pay to have one stray vet checked, dewormed & sterilised. Life-changing care.",
        sizes: [{ label: "Full care", price: 1500 }],
        ingredients: [],
      },
    ],
  },
];

/* ─── Item Card ─────────────────────────────── */
function ItemCard({
  item,
  icon,
  accent,
  onAddToCart,
}: {
  item: MenuItem;
  icon: ReactNode;
  accent: string;
  onAddToCart: (name: string, size: string, price: number) => void;
}) {
  const [showIng, setShowIng] = useState(false);
  const [selIdx, setSelIdx] = useState(0);
  const sel = item.sizes[selIdx];
  const multiSize = item.sizes.length > 1;

  const waItem = encodeURIComponent(
    `${item.name}${multiSize ? ` (${sel.label})` : ""}`
  );

  return (
    <div className="card" style={{ flexDirection: "row", gap: 14, padding: "14px", alignItems: "stretch" }}>

      {/* left: icon thumbnail */}
      <div
        style={{
          width: 100, minHeight: 100, flexShrink: 0,
          borderRadius: 14, overflow: "hidden",
          background: accent,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{ color: "var(--ink)", opacity: .75, transform: "scale(2.2)", display: "flex" }}>{icon}</span>
      </div>

      {/* right: info */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
        <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.02rem", lineHeight: 1.2 }}>{item.name}</p>
        <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".84rem", lineHeight: 1.5 }}>{item.desc}</p>

        {/* size selector */}
        {multiSize && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 2 }}>
            {item.sizes.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSelIdx(i)}
                style={{
                  fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".72rem",
                  padding: "4px 10px", borderRadius: 999, cursor: "pointer",
                  background: selIdx === i ? "var(--ink)" : "var(--cream)",
                  color: selIdx === i ? "var(--cream)" : "var(--ink-soft)",
                  border: selIdx === i ? "2px solid var(--ink)" : "2px solid var(--cream-deep)",
                  transition: "all .12s",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* ingredients toggle */}
        {item.ingredients.length > 0 && (
          <div style={{ marginTop: 2 }}>
            <button
              onClick={() => setShowIng(p => !p)}
              style={{
                fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".7rem",
                padding: "3px 10px", borderRadius: 999, cursor: "pointer",
                background: "var(--cream)", color: "var(--ink-soft)",
                border: "1px solid var(--cream-deep)", letterSpacing: ".03em",
              }}
            >
              {showIng ? "Hide ingredients ↑" : "Ingredients ↓"}
            </button>
            {showIng && (
              <div style={{ marginTop: 7, display: "flex", flexWrap: "wrap", gap: 5 }}>
                {item.ingredients.map((ing, i) => (
                  <span key={i} style={{
                    fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".7rem",
                    padding: "3px 8px", borderRadius: 999,
                    background: "var(--cream)", color: "var(--ink-soft)",
                    border: "1px solid var(--cream-deep)", lineHeight: 1.4,
                  }}>{ing}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* price + actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, color: "var(--ink)", fontSize: "1.05rem" }}>
            Rs {sel.price.toLocaleString()}
          </span>
          {multiSize && (
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".75rem", color: "var(--ink-soft)" }}>
              — {sel.label}
            </span>
          )}
          <button
            onClick={() => onAddToCart(item.name, sel.label, sel.price)}
            style={{
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".78rem",
              padding: "6px 13px", borderRadius: 999, cursor: "pointer",
              background: "var(--ink)", color: "var(--cream)", border: "none",
              display: "inline-flex", alignItems: "center", gap: 4,
              boxShadow: "0 4px 10px -4px rgba(68,49,43,.4)",
            }}
          >
            + Add to cart
          </button>
          <a
            href={`https://wa.me/23058233898?text=Hi!%20I%27d%20like%20to%20order%20${waItem}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".78rem",
              padding: "6px 13px", borderRadius: 999,
              background: "var(--amber-soft)", color: "var(--ink)", textDecoration: "none",
              border: "3px solid var(--white)",
              boxShadow: "0 4px 10px -4px rgba(68,49,43,.3)",
              whiteSpace: "nowrap",
            }}
          >
            Order now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Lightbox ──────────────────────────────── */

/* ─── Page ──────────────────────────────────── */
export default function MenuPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(name: string, size: string, price: number) {
    const key = `${name}|${size}`;
    setCart(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { key, name, size, price, qty: 1 }];
    });
    setCartOpen(true);
  }

  function adjustQty(key: string, delta: number) {
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  }

  const totalItems = cart.reduce((a, i) => a + i.qty, 0);
  const totalPrice = cart.reduce((a, i) => a + i.price * i.qty, 0);

  const SINGLE_LABELS = new Set(["One size", "1 meal", "30 meals", "Full care"]);

  function buildCartMessage() {
    const lines = cart.map(i => {
      const sizeNote = SINGLE_LABELS.has(i.size) ? "" : ` (${i.size})`;
      return `- ${i.qty}× ${i.name}${sizeNote} — Rs ${(i.price * i.qty).toLocaleString()}`;
    }).join("\n");
    return encodeURIComponent(`Hi Paw Pack Pantry! I’d like to order:\n\n${lines}\n\nTotal: Rs ${totalPrice.toLocaleString()}\n\nMy pet’s name: `);
  }

  return (
    <>
      <SiteNav />

      {/* hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--cream)", padding: "72px 24px 56px", textAlign: "center" }}>
        <PawScatter />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="eyebrow">What’s cooking</p>
          <h1 style={{ fontSize: "clamp(2.4rem,7vw,4rem)", marginTop: 8 }}>Our Launch Menu</h1>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 12, maxWidth: "50ch", margin: "12px auto 0", lineHeight: 1.7 }}>
            Every meal is hand-crafted with quality ingredients chosen for taste <em>and</em> optimal pet nutrition. Pick a size, add to cart, then send your order in one tap.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <a href="https://wa.me/23058233898?text=Hi!%20I%27d%20like%20to%20order%20from%20the%20menu" target="_blank" rel="noopener noreferrer" className="btn sage">
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* categories */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 22px 180px" }}>
        {CATEGORIES.map((cat) => {
          const groups: { label: string | null; items: MenuItem[] }[] = [];
          cat.items.forEach(item => {
            const ss = item.subSection ?? null;
            const last = groups[groups.length - 1];
            if (!last || last.label !== ss) groups.push({ label: ss, items: [item] });
            else last.items.push(item);
          });

          return (
            <section key={cat.name} style={{ marginBottom: 72 }}>
              <div style={{
                position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", gap: 16, marginBottom: 24,
                padding: "20px 24px",
                border: "6px solid var(--white)", borderRadius: 24,
                boxShadow: "0 12px 24px -14px rgba(74,53,40,.4)",
              }}>
                <div style={{ position: "absolute", inset: 0, background: cat.accent, opacity: .72 }} />
                <span style={{ position: "relative", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", flexShrink: 0 }}>{cat.icon}</span>
                <div style={{ position: "relative" }}>
                  <h2 style={{ fontSize: "1.6rem" }}>{cat.name}</h2>
                  <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".9rem", marginTop: 3 }}>{cat.description}</p>
                </div>
              </div>

              {groups.map(group => (
                <div key={group.label ?? "default"} style={{ marginBottom: 20 }}>
                  {group.label && (
                    <p style={{
                      fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".72rem",
                      letterSpacing: ".18em", textTransform: "uppercase",
                      color: "var(--ink-soft)", marginBottom: 10, paddingLeft: 4,
                    }}>
                      {group.label}
                    </p>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {group.items.map(item => (
                      <ItemCard
                        key={item.name}
                        item={item}
                        icon={cat.icon}
                        accent={cat.accent}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })}

        {/* order CTA */}
        <div style={{
          position: "relative", overflow: "hidden",
          border: "6px solid var(--white)", borderRadius: 28,
          padding: "36px 32px", textAlign: "center",
          boxShadow: "0 16px 32px -16px rgba(74,53,40,.4)",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "var(--amber-soft)", opacity: .65 }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: "1.8rem" }}>Ready to order?</h2>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 8, maxWidth: "48ch", margin: "8px auto 0" }}>
              Message us your pet’s name, size & meal picks — we’ll do the rest.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
              <a href="https://wa.me/23058233898?text=Hi!%20I%27d%20like%20to%20order" target="_blank" rel="noopener noreferrer" className="btn sage" style={{ fontSize: "1rem" }}>
                WhatsApp Us
              </a>
              <a href="mailto:info@pawpackpantry.com" className="btn peach" style={{ fontSize: "1rem" }}>
                info@pawpackpantry.com
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Floating cart */}
      {totalItems > 0 && (
        <div style={{ position: "fixed", bottom: 24, right: 16, zIndex: 300, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>

          {/* cart panel */}
          {cartOpen && (
            <div style={{
              background: "var(--white)", border: "3px solid var(--cream-deep)",
              borderRadius: 18, padding: "14px 16px",
              width: "min(300px, calc(100vw - 32px))",
              boxShadow: "0 20px 40px -14px rgba(68,49,43,.5)",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".9rem" }}>
                  Your cart
                </p>
                <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "var(--ink-soft)", padding: "0 2px" }}>
                  ×
                </button>
              </div>

              {cart.map(i => (
                <div key={i.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: ".78rem", color: "var(--ink)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {i.name}
                    </p>
                    {!SINGLE_LABELS.has(i.size) && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 500 }}>{i.size}</p>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    <button onClick={() => adjustQty(i.key, -1)} style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid var(--cream-deep)", background: "var(--cream)", cursor: "pointer", display: "grid", placeItems: "center", color: "var(--ink-soft)", fontSize: ".9rem" }}>
                      −
                    </button>
                    <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".82rem", minWidth: 16, textAlign: "center" }}>{i.qty}</span>
                    <button onClick={() => adjustQty(i.key, 1)} style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid var(--cream-deep)", background: "var(--cream)", cursor: "pointer", display: "grid", placeItems: "center", color: "var(--ink-soft)", fontSize: ".9rem" }}>
                      +
                    </button>
                  </div>
                  <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".8rem", color: "var(--ink)", flexShrink: 0, minWidth: 60, textAlign: "right" }}>
                    Rs {(i.price * i.qty).toLocaleString()}
                  </span>
                </div>
              ))}

              <div style={{ borderTop: "1.5px solid var(--cream-deep)", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".9rem" }}>Total</span>
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1rem", color: "var(--ink)" }}>
                  Rs {totalPrice.toLocaleString()}
                </span>
              </div>

              <a
                href={`https://wa.me/23058233898?text=${buildCartMessage()}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".88rem",
                  background: "var(--ink)", color: "var(--cream)",
                  padding: "12px 16px", borderRadius: 999, textDecoration: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  boxShadow: "0 8px 18px -6px rgba(68,49,43,.45)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.306A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.944 7.944 0 0 1-4.031-1.1l-.29-.173-2.952.775.789-2.878-.189-.302A7.964 7.964 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                Send order via WhatsApp
              </a>

              <button
                onClick={() => { setCart([]); setCartOpen(false); }}
                style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: ".75rem", background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer", padding: "2px", textAlign: "center" }}
              >
                Clear cart
              </button>
            </div>
          )}

          {/* cart toggle button */}
          <button
            onClick={() => setCartOpen(p => !p)}
            style={{
              fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".95rem",
              background: "var(--ink)", color: "var(--cream)",
              padding: "13px 20px", borderRadius: 999, border: "none", cursor: "pointer",
              boxShadow: "0 12px 28px -8px rgba(68,49,43,.6)",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            🛒 Rs {totalPrice.toLocaleString()} · {totalItems} item{totalItems !== 1 ? "s" : ""}
          </button>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
