"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Tile accent colours (neutral/warm palette) ── */
const A = {
  amber:       "#D18244",
  amberSoft:   "#D8A983",
  neutral:     "#B4A998",
  neutralSoft: "#CCBEAF",
  warmGray:    "#D5CDC8",
  brownDark:   "#8a5a45",
  cream:       "#F6F4F0",
};

/* ── SVG icons (no emojis) ── */
const I: Record<string, React.ReactNode> = {
  heart:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  bowl:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M3 11h18"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M8 7c0-1 1-2 2-2M12 6c0-1 1-2 2-2"/></svg>,
  cart:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 7H6"/></svg>,
  camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.5" r="3.2"/></svg>,
  mega:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1z"/><path d="M18 8a4 4 0 0 1 0 8"/></svg>,
  news:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h7M7 12h7M7 16h5M17 8v8"/></svg>,
  users:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  mail:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  plus:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" style={{width:18,height:18}}><path d="M12 5v14M5 12h14"/></svg>,
  arrow:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  wa:     <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.306A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.944 7.944 0 0 1-4.031-1.1l-.29-.173-2.952.775.789-2.878-.189-.302A7.964 7.964 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>,
};

/* ─────────────────────────────────────────────
   1. ABOUT US
───────────────────────────────────────────── */
function AboutContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ fontSize: "1.6rem" }}>Every meal has a purpose.</h3>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".95rem", lineHeight: 1.8, color: "var(--ink-soft)" }}>
            Founded by <strong style={{ color: "var(--ink)" }}>Destinee Ray Jones</strong> and <strong style={{ color: "var(--ink)" }}>Daniel Freitag</strong>, Paw Pack Pantry was born from a simple belief: every animal deserves a full belly, a healthy life, and a chance to be loved.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".95rem", lineHeight: 1.8, color: "var(--ink-soft)" }}>
            Over the past 5 years on the island, Destinee and Daniel have tirelessly balanced emergency rescues, rehabilitation efforts, and a shared mission to help Mauritius&apos;s stray animals — playing a role in rescuing, rehabilitating, and rehoming well over one hundred dogs and cats.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".95rem", lineHeight: 1.8, color: "var(--ink-soft)" }}>
            Paw Pack Pantry was created as a way to turn that passion into sustainable impact. Our gourmet meals and treats are lovingly prepared using carefully researched recipes and quality ingredients chosen to both delight your pet&apos;s taste and support their optimal health and nutrition needs.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Mission statement box */}
          <div style={{ border: "2px solid var(--ink)", borderRadius: 16, padding: "20px 22px", background: "var(--cream)", boxShadow: "3px 3px 0 var(--cream-deep)" }}>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 }}>
              Our Mission
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: ".95rem", lineHeight: 1.7, color: "var(--ink)", fontStyle: "italic" }}>
              &ldquo;But our mission goes beyond the bowl.&rdquo;
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".88rem", lineHeight: 1.7, color: "var(--ink-soft)", marginTop: 8 }}>
              A portion of every purchase is contributed directly to our StreetSmart Campaign, helping fund stray animal feeding programmes, sterilisation initiatives, medical care, rehabilitation efforts, and community education projects across Mauritius.
            </p>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".88rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
            By choosing Paw Pack Pantry, you&apos;re not only nourishing your own pet — you&apos;re helping create a better future for countless others still waiting for their second chance.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".88rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
            We believe that when animal lovers come together, meaningful change becomes possible. Through future collaboration with fellow rescuers, animal welfare organisations, veterinary professionals, and compassionate members of our community, we hope to continue expanding our impact.
          </p>
          <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".9rem", color: "var(--ink)", marginTop: 4 }}>
            Thank you for being part of our pack.<br />
            Together, we&apos;re serving meals with purpose, one paw at a time.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".82rem", color: "var(--ink-soft)" }}>
            With love, The Paw Pack Pantry Team
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   2. OUR PRODUCTS
───────────────────────────────────────────── */
const MENU_PREVIEW = [
  { name: "Beefy Bark Bowl", cat: "Pawfect Meals", accent: A.amberSoft },
  { name: "Cluck Cluck Chicken Bowl", cat: "Pawfect Meals", accent: A.neutral },
  { name: "Fish Fin Bowl", cat: "Pawfect Meals", accent: A.warmGray },
  { name: "Hounds Gold — Gravy", cat: "Mealtime Madness", accent: A.amberSoft },
  { name: "Pupcakes", cat: "Celebration", accent: A.neutral },
  { name: "Bone Appétite Biscuits", cat: "Treats", accent: A.warmGray },
];

const REVIEWS = [
  { name: "Tara & Mochi", stars: 5, text: "Mochi goes absolutely crazy for the Cluck Cluck Chicken Bowl. She used to be such a fussy eater — not anymore!" },
  { name: "Devon", stars: 5, text: "The quality is incredible for homemade food. You can actually see the real ingredients. My boy has so much more energy." },
  { name: "Priya & Biscuit", stars: 5, text: "Biscuit has been on the Fish Fin Bowl for 3 weeks and his coat is glowing. Cannot recommend enough!" },
  { name: "The Lim Family", stars: 5, text: "All three of our dogs are obsessed. The Pupcakes for birthdays are the cutest thing we have ever seen." },
];

const MACROS = [
  { v: "~40%", k: "Protein" },
  { v: "~30%", k: "Veggies" },
  { v: "~30%", k: "Grains" },
  { v: "Balanced", k: "kcal" },
];

const INGREDIENTS = ["Free-range chicken", "Pumpkin", "Brown rice", "Carrot", "Salmon oil", "Spinach", "Sweet potato", "Beef mince"];

function ProductsContent() {
  const [tab, setTab] = useState<"menu" | "reviews" | "breakdown">("menu");
  const tabs: { id: typeof tab; label: string }[] = [
    { id: "menu", label: "The Menu" },
    { id: "reviews", label: "Reviews" },
    { id: "breakdown", label: "Meal Breakdown" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".88rem",
            padding: "7px 18px", borderRadius: 999, cursor: "pointer",
            background: tab === t.id ? "var(--ink)" : "var(--white)",
            color: tab === t.id ? "var(--cream)" : "var(--ink-soft)",
            border: `2px solid ${tab === t.id ? "var(--ink)" : "var(--cream-deep)"}`,
            transition: ".15s",
          }}>{t.label}</button>
        ))}
      </div>

      {tab === "menu" && (
        <div style={{ animation: "fade .3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))", gap: 12 }}>
            {MENU_PREVIEW.map((m, i) => (
              <div key={i} className={`card ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ gap: 8 }}>
                <div style={{ height: 68, borderRadius: 12, background: m.accent, display: "grid", placeItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.5)" }} />
                </div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".9rem", color: "var(--ink)" }}>{m.name}</div>
                <span className="pill">{m.cat}</span>
              </div>
            ))}
          </div>
          <Link href="/menu" className="btn dark" style={{ alignSelf: "flex-start", fontSize: ".85rem", padding: "9px 18px", marginTop: 16, display: "inline-flex" }}>
            Full Menu
          </Link>
        </div>
      )}

      {tab === "reviews" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 14, animation: "fade .3s ease" }}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={`card ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ gap: 10 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: r.stars }).map((_, s) => (
                  <svg key={s} viewBox="0 0 20 20" fill={A.amber} style={{ width: 14, height: 14 }}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".88rem", lineHeight: 1.6, color: "var(--ink-soft)", fontStyle: "italic" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".85rem", color: "var(--ink)" }}>— {r.name}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "breakdown" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, textAlign: "center", animation: "fade .3s ease" }}>
          <div style={{ width: "100%", height: 100, borderRadius: 16, background: A.amberSoft, display: "grid", placeItems: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.4)" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.45rem" }}>The Full Bowl</h3>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", fontWeight: 500, marginTop: 6, maxWidth: "44ch", fontSize: ".9rem", lineHeight: 1.7 }}>
              Every meal is balanced and portioned — here&apos;s what goes into a complete serving.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {MACROS.map(m => (
              <div key={m.k} className="macro tilt-l">
                <div className="v">{m.v}</div>
                <div className="k">{m.k}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {INGREDIENTS.map(ing => <span key={ing} className="pill">{ing}</span>)}
          </div>
          <Link href="/menu" className="btn dark" style={{ fontSize: ".85rem", padding: "9px 18px" }}>Full Menu</Link>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. PLACE AN ORDER
───────────────────────────────────────────── */
function OrderContent() {
  const [sub, setSub] = useState<null | "how" | "delivery">(null);
  const [copied, setCopied] = useState(false);

  function copyDetails() {
    navigator.clipboard?.writeText("Paw Pack Pantry\nReference: Your pet's name").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const subCard = (id: "how" | "delivery", label: string) => ({
    background: sub === id ? "var(--ink)" : "var(--white)",
    color: sub === id ? "var(--cream)" : "var(--ink)",
    border: `2px solid ${sub === id ? "var(--ink)" : "var(--cream-deep)"}`,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, lineHeight: 1.7, color: "var(--ink-soft)", fontSize: ".95rem" }}>
        Ordering is simple — choose your meals, complete payment, and we cook fresh for your pet.
      </p>

      {/* 3 sub-option cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {/* How to Order */}
        <button
          onClick={() => setSub(sub === "how" ? null : "how")}
          style={{ ...subCard("how", "How to Order"), padding: "16px", borderRadius: 16, cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem", transition: ".2s", boxShadow: "0 6px 14px -8px rgba(68,49,43,.3)" }}
        >
          <span style={{ fontSize: "1.4rem" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 24, height: 24 }}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
          </span>
          How to Order
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".78rem", opacity: .75 }}>Bank transfer — 3 easy steps</span>
        </button>

        {/* Delivery & Collection */}
        <button
          onClick={() => setSub(sub === "delivery" ? null : "delivery")}
          style={{ ...subCard("delivery", "Delivery"), padding: "16px", borderRadius: 16, cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem", transition: ".2s", boxShadow: "0 6px 14px -8px rgba(68,49,43,.3)" }}
        >
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 24, height: 24 }}><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </span>
          Delivery & Collection
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".78rem", opacity: .75 }}>Info coming soon</span>
        </button>

        {/* Order Now → WhatsApp */}
        <a
          href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order"
          target="_blank" rel="noopener noreferrer"
          style={{ background: A.amber, color: "var(--white)", padding: "16px", borderRadius: 16, textDecoration: "none", display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem", boxShadow: "0 6px 14px -8px rgba(68,49,43,.4)", border: "2px solid transparent" }}
        >
          {I.wa}
          Order Now
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".78rem", opacity: .85 }}>Message us on WhatsApp</span>
        </a>
      </div>

      {/* How to Order expanded */}
      {sub === "how" && (
        <div style={{ animation: "fade .3s ease", display: "flex", flexDirection: "column", gap: 16, paddingTop: 4 }}>
          <div className="steps">
            {[
              ["Choose your meals", "Message us your pet's name, size & meal picks."],
              ["Transfer payment", "Use the bank details below — copy in one tap."],
              ["We cook & deliver", "Fresh packs, ready within the week."],
            ].map(([title, desc], i) => (
              <div key={i} className="step">
                <div className="num">{i + 1}</div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem" }}>{title}</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", fontWeight: 500, marginTop: 2, fontSize: ".88rem" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bank tilt-r">
            <div className="bank-row"><span className="k">Account name</span><span className="v">Paw Pack Pantry</span></div>
            <div className="bank-row"><span className="k">Bank</span><span className="v">MCB Bank</span></div>
            <div className="bank-row"><span className="k">Reference</span><span className="v">Your pet&apos;s name</span></div>
          </div>
          <button onClick={copyDetails} className={`btn ${copied ? "sage" : "dark"}`} style={{ alignSelf: "flex-start", fontSize: ".85rem", padding: "9px 18px" }}>
            {copied ? "Copied!" : "Copy transfer details"}
          </button>
        </div>
      )}

      {/* Delivery expanded */}
      {sub === "delivery" && (
        <div style={{ animation: "fade .3s ease", padding: "18px 20px", background: "var(--white)", borderRadius: 16, border: "2px solid var(--cream-deep)" }}>
          <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)", marginBottom: 6 }}>Delivery & Collection Info</p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", fontWeight: 500, fontSize: ".9rem", lineHeight: 1.7 }}>
            Detailed delivery and collection information coming soon. In the meantime, please contact us directly on WhatsApp or by email for delivery arrangements.
          </p>
          <a href="https://wa.me/23058233898?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20delivery%20and%20collection" target="_blank" rel="noopener noreferrer" className="btn dark" style={{ fontSize: ".82rem", padding: "8px 16px", marginTop: 12, display: "inline-flex" }}>
            Ask us on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   4. STREETSMART CAMPAIGN
───────────────────────────────────────────── */
type SSWidget = "pack" | "monthly" | "meal" | "campaign" | null;

const SS_WIDGETS = [
  {
    id: "pack" as const,
    title: "StreetSmart Starter Pack",
    subtitle: "Full stray care — one complete package",
    info: "The StreetSmart Starter Pack is our most comprehensive sponsorship option. It covers the cost of sterilisation, de-worming and a full vet check-up for one stray animal. These three interventions together are life-changing — sterilisation helps control the growing stray population, de-worming addresses one of the most common and uncomfortable health issues strays face, and a vet check-up ensures any underlying conditions are identified and treated. Pricing: Rs ___ (contact us to arrange).",
  },
  {
    id: "monthly" as const,
    title: "Sponsor a Monthly Meal",
    subtitle: "Once-off or recurring monthly support",
    info: "Choose to sponsor a stray's monthly meals as a once-off contribution or set up a recurring monthly subscription. Your sponsorship covers a full month of nutritious meals for one named stray animal. You'll receive a monthly update on the stray you're sponsoring. Pricing: Rs ___ / month (contact us to arrange).",
  },
  {
    id: "meal" as const,
    title: "A Meal for a Stray",
    subtitle: "One meal, one belly filled",
    info: "The simplest way to make a difference — sponsor one single meal for a stray animal on the island. Every contribution, no matter how small, adds up. Your meal donation goes directly to feeding a stray dog or cat. Pricing: Rs ___ per meal (contact us to arrange).",
  },
  {
    id: "campaign" as const,
    title: "Latest Campaign",
    subtitle: "Current & upcoming StreetSmart initiatives",
    info: "We are currently running our StreetSmart feeding and sterilisation programme across several areas in Mauritius. Community education initiatives and upcoming fundraising events are in the pipeline. Follow us on Instagram @pawpackpantry or contact us directly for the latest updates and to get involved.",
  },
];

function StreetSmartContent() {
  const [active, setActive] = useState<SSWidget>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, lineHeight: 1.7, color: "var(--ink-soft)", fontSize: ".95rem", maxWidth: "60ch" }}>
        StreetSmart is our promise to the dogs and cats without a home. A share of every order goes directly to feeding and caring for strays — and you can contribute directly below.
      </p>

      <Link href="/streetsmart" className="btn dark" style={{ alignSelf: "flex-start", fontSize: ".85rem", padding: "9px 18px" }}>
        Learn more about the campaign
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {SS_WIDGETS.map(w => (
          <button
            key={w.id}
            onClick={() => setActive(active === w.id ? null : w.id)}
            style={{
              padding: "16px", borderRadius: 16, cursor: "pointer", textAlign: "left",
              display: "flex", flexDirection: "column", gap: 6,
              background: active === w.id ? "var(--ink)" : "var(--white)",
              color: active === w.id ? "var(--cream)" : "var(--ink)",
              border: `2px solid ${active === w.id ? "var(--ink)" : "var(--cream-deep)"}`,
              boxShadow: "0 6px 14px -8px rgba(68,49,43,.3)",
              transition: ".2s", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".95rem",
            }}
          >
            {w.title}
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".78rem", opacity: .75 }}>{w.subtitle}</span>
          </button>
        ))}

        {/* Widget 4: success stories → gallery link */}
        <Link
          href="/gallery"
          style={{
            padding: "16px", borderRadius: 16, textDecoration: "none",
            display: "flex", flexDirection: "column", gap: 6,
            background: A.amberSoft,
            border: "2px solid var(--white)",
            boxShadow: "0 6px 14px -8px rgba(68,49,43,.3)",
            fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".95rem", color: "var(--ink)",
          }}
        >
          Success Stories & Stray Gallery
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".78rem", color: "var(--ink-soft)" }}>View rescue stories & photos</span>
        </Link>
      </div>

      {/* Info popup */}
      {active && (() => {
        const w = SS_WIDGETS.find(x => x.id === active)!;
        return (
          <div style={{ animation: "fade .3s ease", padding: "20px 22px", background: "var(--white)", borderRadius: 16, border: "2px solid var(--cream-deep)", position: "relative" }}>
            <button onClick={() => setActive(null)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", display: "grid", placeItems: "center" }}>
              {I.plus}
            </button>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1rem", color: "var(--ink)", marginBottom: 8 }}>{w.title}</p>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", fontWeight: 500, fontSize: ".9rem", lineHeight: 1.75 }}>{w.info}</p>
            <a href="https://wa.me/23058233898?text=Hi!%20I%27d%20like%20to%20support%20the%20StreetSmart%20campaign" target="_blank" rel="noopener noreferrer" className="btn dark" style={{ fontSize: ".82rem", padding: "8px 16px", marginTop: 14, display: "inline-flex" }}>
              Contact us to arrange
            </a>
          </div>
        );
      })()}
    </div>
  );
}

/* ─────────────────────────────────────────────
   5. STRAY GALLERY
───────────────────────────────────────────── */
const GALLERY_PHOTOS = [
  "15bf4229-c85a-4f77-ac74-927cedc33c22",
  "181c4e1f-31de-481f-bae9-9ddf8ca59a18",
  "187e265d-d7d8-4718-9989-7b76c054ae94",
  "43a81cdc-1598-4678-bc54-1c57781ddefb",
  "5b8a8755-f9bf-4223-9d10-1f40d4d80283",
  "84f0eaae-13c2-4750-8450-88d6bbe8a47b",
];

function GalleryContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, lineHeight: 1.7, color: "var(--ink-soft)", fontSize: ".95rem" }}>
        Happy pups, rescue heroes, and tails that wag non-stop. Every photo tells a story of a life well-nourished and a second chance given.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {GALLERY_PHOTOS.map((id, i) => (
          <div key={id} className={`sticker ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ overflow: "hidden", borderRadius: 16, aspectRatio: "1", position: "relative" }}>
            <Image src={`/photos/${id}.jpeg`} alt="Rescue animal" fill style={{ objectFit: "cover" }} sizes="(max-width:600px) 30vw, 14vw" />
          </div>
        ))}
      </div>
      <Link href="/gallery" className="btn dark" style={{ alignSelf: "flex-start", fontSize: ".85rem", padding: "9px 18px" }}>
        View full gallery
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   6. LATEST NEWS
───────────────────────────────────────────── */
const NEWS_PREVIEW = [
  { d: "10", m: "Jun", title: "Welcome to the Pantry", body: "Paw Pack Pantry is officially open. We are so excited to start nourishing your pets and supporting Mauritius's strays — one meal at a time." },
  { d: "03", m: "Jun", title: "Luna has approved the new menu", body: "After an extensive taste-testing session, Little Miss Luna has given her stamp of approval on the new seasonal additions." },
  { d: "27", m: "May", title: "StreetSmart June Update", body: "5 strays fed, 2 sterilisations complete. Thank you to everyone who sponsored this month." },
];

function NewsContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {NEWS_PREVIEW.map((n, i) => (
          <div key={i} className="news-item">
            <div className={`news-date ${i % 2 ? "tilt-l" : "tilt-r"}`}>
              <div className="d">{n.d}</div>
              <div className="m">{n.m}</div>
            </div>
            <div style={{ flex: 1, paddingTop: 3 }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem" }}>{n.title}</div>
              <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", fontWeight: 500, marginTop: 5, fontSize: ".88rem", lineHeight: 1.6 }}>{n.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3-way news split */}
      <div style={{ borderTop: "1px solid var(--cream-deep)", paddingTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 10 }}>
        {[
          { label: "Menu & Operations", desc: "New meals, ingredient updates & kitchen news", href: "/news?cat=menu" },
          { label: "Latest Stray News", desc: "Rescue stories, StreetSmart updates & stray spotlights", href: "/news?cat=strays" },
          { label: "Monthly Newsletter", desc: "Subscribe to our weekly newsletter", href: "/#newsletter" },
        ].map(c => (
          <Link key={c.label} href={c.href} style={{
            padding: "14px 16px", borderRadius: 14, textDecoration: "none",
            background: "var(--white)", border: "2px solid var(--cream-deep)",
            boxShadow: "0 5px 12px -6px rgba(68,49,43,.25)",
            display: "flex", flexDirection: "column", gap: 5,
          }}>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".9rem", color: "var(--ink)" }}>{c.label}</span>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".78rem", color: "var(--ink-soft)", lineHeight: 1.5 }}>{c.desc}</span>
          </Link>
        ))}
      </div>

      <Link href="/news" className="btn dark" style={{ alignSelf: "flex-start", fontSize: ".85rem", padding: "9px 18px" }}>
        All updates
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   7. CONTACT US
───────────────────────────────────────────── */
function ContactContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, lineHeight: 1.7, color: "var(--ink-soft)", fontSize: ".95rem", maxWidth: "60ch" }}>
        We love to connect with our community and are always looking to collaborate with community members, organisations, corporations and like-minded individuals for future projects. Reach out — we&apos;d love to hear from you.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {/* Call / WhatsApp */}
        <div className="contact-card">
          <div style={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: 12, background: A.amberSoft, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth={2} style={{ width: 20, height: 20 }}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l2 4v0a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 1-2z"/></svg>
          </div>
          <div>
            <p style={{ fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700, fontFamily: "var(--font-head)" }}>Call / WhatsApp</p>
            <a href="tel:+23058233897" style={{ display: "block", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".9rem", color: "var(--ink)", textDecoration: "none" }}>Call: +230 5823 3897</a>
            <a href="https://wa.me/23058233898" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".9rem", color: "var(--ink)", textDecoration: "none" }}>WhatsApp: +230 5823 3898</a>
          </div>
        </div>

        {/* Emails */}
        <div className="contact-card">
          <div style={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: 12, background: A.neutral, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth={2} style={{ width: 20, height: 20 }}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700, fontFamily: "var(--font-head)" }}>Emails</p>
            {[
              { label: "Orders", val: "orders@pawpackpantry.com" },
              { label: "Info", val: "info@pawpackpantry.com" },
              { label: "Stray Support", val: "straysupport@pawpackpantry.com" },
            ].map(e => (
              <div key={e.label}>
                <span style={{ fontSize: ".68rem", color: "var(--ink-soft)", fontWeight: 600 }}>{e.label}: </span>
                <a href={`mailto:${e.val}`} style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: ".82rem", color: "var(--ink)", textDecoration: "none" }}>{e.val}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Founders */}
        <div className="contact-card">
          <div style={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: 12, background: A.warmGray, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth={2} style={{ width: 20, height: 20 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700, fontFamily: "var(--font-head)" }}>Connect with our Founders</p>
            {[
              { label: "Destinee", val: "d.r.jones@pawpackpantry.com" },
              { label: "Daniel", val: "d.p.freitag@pawpackpantry.com" },
            ].map(e => (
              <div key={e.label}>
                <span style={{ fontSize: ".68rem", color: "var(--ink-soft)", fontWeight: 600 }}>{e.label}: </span>
                <a href={`mailto:${e.val}`} style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: ".82rem", color: "var(--ink)", textDecoration: "none" }}>{e.val}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="contact-card">
          <div style={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: 12, background: A.amberSoft, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth={2} style={{ width: 20, height: 20 }}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700, fontFamily: "var(--font-head)" }}>Socials</p>
            <a href="https://instagram.com/pawpackpantry" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".9rem", color: "var(--ink)", textDecoration: "none" }}>Instagram: @pawpackpantry</a>
            <a href="https://tiktok.com/@pawpackpantry" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".9rem", color: "var(--ink)", textDecoration: "none" }}>TikTok: @pawpackpantry</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   8. JOIN THE PACK
───────────────────────────────────────────── */
function JoinContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, lineHeight: 1.7, color: "var(--ink-soft)", fontSize: ".95rem" }}>
        Follow our journey — new meals, rescue stories, and plenty of content that&apos;s bound to make your heart melt.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "Instagram", handle: "@pawpackpantry", href: "https://instagram.com/pawpackpantry", bg: A.amberSoft },
          { label: "WhatsApp", handle: "+230 5823 3898", href: "https://wa.me/23058233898", bg: A.neutral },
          { label: "TikTok", handle: "@pawpackpantry", href: "https://tiktok.com/@pawpackpantry", bg: A.warmGray },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: 12, textDecoration: "none",
            background: s.bg, border: "3px solid var(--white)", borderRadius: 14,
            padding: "12px 16px", boxShadow: "0 6px 14px -8px rgba(68,49,43,.28)",
            transition: "transform .2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "none")}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--white)", display: "grid", placeItems: "center", color: "var(--ink)", boxShadow: "0 3px 8px -3px rgba(68,49,43,.22)", fontSize: ".75rem", fontFamily: "var(--font-head)", fontWeight: 700 }}>
              {s.label.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: ".65rem", fontFamily: "var(--font-head)", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".95rem", color: "var(--ink)" }}>{s.handle}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTIONS CONFIG
═══════════════════════════════════════════ */
type Section = {
  key: string;
  accent: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  content: React.ReactNode;
  fullPage?: string;
};

const SECTIONS: Section[] = [
  { key: "about",       accent: A.amberSoft,    icon: I.heart,  title: "About Us",             sub: "Our story & mission",               content: <AboutContent />,       fullPage: undefined },
  { key: "products",    accent: A.amber,        icon: I.bowl,   title: "Our Products",         sub: "Menu · Reviews · Meal breakdown",   content: <ProductsContent />,    fullPage: "/menu" },
  { key: "order",       accent: A.neutral,      icon: I.cart,   title: "Place an Order",       sub: "How to order · Delivery · WhatsApp", content: <OrderContent />,      fullPage: undefined },
  { key: "streetsmart", accent: A.brownDark,    icon: I.mega,   title: "StreetSmart Campaign", sub: "Sponsor a stray · Latest campaign", content: <StreetSmartContent />, fullPage: "/streetsmart" },
  { key: "gallery",     accent: A.warmGray,     icon: I.camera, title: "Stray Gallery",        sub: "Rescue stories & happy pups",       content: <GalleryContent />,     fullPage: "/gallery" },
  { key: "news",        accent: A.amberSoft,    icon: I.news,   title: "Latest News",          sub: "Weekly updates from the kitchen",   content: <NewsContent />,        fullPage: "/news" },
  { key: "contact",     accent: A.neutralSoft,  icon: I.mail,   title: "Contact Us",           sub: "Get in touch · Collaborate",        content: <ContactContent />,     fullPage: undefined },
  { key: "join",        accent: A.neutral,      icon: I.users,  title: "Join the Pack",        sub: "Instagram · WhatsApp · TikTok",     content: <JoinContent />,        fullPage: undefined },
];

/* ═══════════════════════════════════════════
   TILE GRID
═══════════════════════════════════════════ */
export default function HomeTiles() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = useCallback((idx: number) => setOpenIdx(p => (p === idx ? null : idx)), []);
  const s = openIdx !== null ? SECTIONS[openIdx] : null;

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "56px 22px 80px", position: "relative" }}>
      {/* section header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p className="eyebrow">Tap any tile to peek inside</p>
        <h2 style={{ fontSize: "clamp(2rem,5.5vw,3rem)", marginTop: 6 }}>Welcome to the Pantry</h2>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", fontWeight: 500, marginTop: 8, fontSize: ".95rem" }}>
          Have a sniff around
        </p>
      </div>

      <div className="tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {SECTIONS.map((sec, idx) => (
          <button
            key={sec.key}
            onClick={() => toggle(idx)}
            aria-expanded={openIdx === idx}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              textAlign: "center", cursor: "pointer",
              padding: "20px 12px 16px",
              background: sec.accent,
              border: "5px solid var(--white)",
              borderRadius: "var(--r-lg)",
              boxShadow: openIdx === idx
                ? "0 18px 30px -10px rgba(68,49,43,.4)"
                : "0 8px 20px -10px rgba(68,49,43,.3)",
              transform: openIdx === idx
                ? "translateY(-3px) scale(1.03)"
                : idx % 2 ? "rotate(1.8deg)" : "rotate(-1.8deg)",
              transition: "transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s",
              fontFamily: "var(--font-head)",
              color: sec.accent === A.brownDark ? "var(--cream)" : "var(--ink)",
            }}
          >
            <span style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(255,255,255,.65)",
              display: "grid", placeItems: "center",
              color: sec.accent === A.brownDark ? A.brownDark : "var(--ink)",
            }}>
              {sec.icon}
            </span>
            <span style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.1 }}>{sec.title}</span>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: ".7rem", color: sec.accent === A.brownDark ? "rgba(246,244,240,.75)" : "var(--ink-soft)", lineHeight: 1.3 }}>
              {sec.sub}
            </span>
          </button>
        ))}

        {/* Inline detail panel */}
        {s && (
          <div
            key={openIdx}
            style={{
              gridColumn: "1 / -1",
              borderTop: `8px solid ${s.accent}`,
              background: "var(--cream)",
              border: `5px solid var(--white)`,
              borderTopColor: s.accent,
              borderTopWidth: 8,
              borderRadius: "var(--r-lg)",
              padding: "30px 26px",
              boxShadow: "0 14px 28px -14px rgba(68,49,43,.35)",
              animation: "fade .3s ease",
              position: "relative",
            }}
          >
            <button
              onClick={() => setOpenIdx(null)}
              aria-label="Close"
              style={{
                position: "absolute", top: 14, right: 14,
                width: 34, height: 34, borderRadius: "50%",
                border: "3px solid var(--white)", background: "var(--white)",
                color: "var(--ink-soft)", display: "grid", placeItems: "center",
                cursor: "pointer", boxShadow: "0 4px 10px -4px rgba(68,49,43,.3)",
                transform: "rotate(45deg)", transition: "background .15s",
              }}
            >
              {I.plus}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <span style={{
                width: 44, height: 44, flex: "0 0 auto", borderRadius: 13,
                background: s.accent, border: "4px solid var(--white)",
                display: "grid", placeItems: "center",
                color: s.accent === A.brownDark ? "var(--cream)" : "var(--ink)",
                boxShadow: "0 6px 12px -6px rgba(68,49,43,.35)",
              }}>
                {s.icon}
              </span>
              <h3 style={{ fontSize: "1.55rem" }}>{s.title}</h3>
            </div>

            {s.content}

            {s.fullPage && (
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px dotted var(--cream-deep)" }}>
                <Link href={s.fullPage} style={{ fontFamily: "var(--font-head)", fontWeight: 600, color: "var(--ink-soft)", fontSize: ".85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}>
                  View full page {I.arrow}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) { .tile-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 620px) { .tile-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 380px) { .tile-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
