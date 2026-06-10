"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---- icon SVGs ---- */
const I: Record<string, React.ReactNode> = {
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  bowl:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}><path d="M3 11h18"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M8 7c0-1 1-2 2-2M12 6c0-1 1-2 2-2"/></svg>,
  cart:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 7H6"/></svg>,
  camera:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.5" r="3.2"/></svg>,
  mega:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}><path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1z"/><path d="M18 8a4 4 0 0 1 0 8"/></svg>,
  news:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h7M7 12h7M7 16h5M17 8v8"/></svg>,
  share: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  mail:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  plus:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" style={{width:20,height:20}}><path d="M12 5v14M5 12h14"/></svg>,
  wa:    <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.306A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.944 7.944 0 0 1-4.031-1.1l-.29-.173-2.952.775.789-2.878-.189-.302A7.964 7.964 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>,
};

type Subtab = { id: string; label: string; content: React.ReactNode };
type Section = {
  key: string;
  accent: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  content?: React.ReactNode;
  subtabs?: Subtab[];
  fullPage?: string;
};

/* ---- About section ---- */
function AboutContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h3 style={{ fontSize: "1.7rem" }}>Homemade, with a whole lot of love.</h3>
      <p className="lead" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-soft)", fontWeight: 500, maxWidth: "62ch" }}>
        Paw Pack Pantry was born from a simple belief — every animal deserves a full belly, a healthy life, and a chance to be loved. Founded by <strong style={{ color: "var(--ink)" }}>Destinee Ray Jones</strong> &amp; <strong style={{ color: "var(--ink)" }}>Daniel Freitag</strong>, two passionate rescuers who&apos;ve helped rehome over 100 dogs and cats across Mauritius.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["Fresh & small-batch", "Vet-considered recipes", "Homemade in Mauritius", "Funds stray care"].map(t => (
          <span key={t} className="pill">{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
        <Link href="/streetsmart" className="btn sage" style={{ fontSize: ".9rem", padding: "10px 20px" }}>Our Mission →</Link>
      </div>
    </div>
  );
}

/* ---- Products section ---- */
const MENU_PREVIEW = [
  { name: "Beefy Bark Bowl", cat: "Pawfect Meals", accent: "var(--blush-soft)", emoji: "🥩" },
  { name: "Cluck Cluck Chicken Bowl", cat: "Pawfect Meals", accent: "var(--peach-soft)", emoji: "🍗" },
  { name: "Fish Fin Bowl", cat: "Pawfect Meals", accent: "var(--sky-soft)", emoji: "🐟" },
  { name: "Hounds Gold (Gravy)", cat: "Mealtime Madness", accent: "var(--sage-soft)", emoji: "✨" },
  { name: "Pupcakes", cat: "Celebration", accent: "var(--blush-soft)", emoji: "🎂" },
  { name: "Bone Appétite Biscuits", cat: "Treats", accent: "var(--peach-soft)", emoji: "🦴" },
];

const REVIEWS = [
  { name: "Tara & Mochi", stars: 5, text: "Mochi goes absolutely crazy for the Cluck Cluck Chicken Bowl. She used to be such a fussy eater — not anymore! 🐾" },
  { name: "Devon", stars: 5, text: "The quality is insane for homemade food. You can actually SEE the real ingredients. My boy has so much more energy." },
  { name: "Priya & Biscuit", stars: 5, text: "Biscuit has been on the Fish Fin Bowl for 3 weeks and his coat is glowing. Cannot recommend enough!" },
  { name: "The Lim Family", stars: 5, text: "All three of our dogs are obsessed. The Pupcakes for birthdays are the cutest thing we've ever seen 😭" },
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
    { id: "menu", label: "🍖 The Menu" },
    { id: "reviews", label: "⭐ Reviews" },
    { id: "breakdown", label: "🔬 Meal Breakdown" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* sub-tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".92rem",
              padding: "8px 18px", borderRadius: 999, cursor: "pointer",
              background: tab === t.id ? "var(--peach)" : "var(--white)",
              color: tab === t.id ? "var(--ink)" : "var(--ink-soft)",
              border: "3px solid var(--white)",
              boxShadow: "0 6px 14px -8px rgba(74,53,40,.4)",
              transition: ".2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* THE MENU */}
      {tab === "menu" && (
        <div style={{ animation: "fade .3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
            {MENU_PREVIEW.map((m, i) => (
              <div key={i} className={`card ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ gap: 8 }}>
                <div style={{ height: 72, borderRadius: 14, background: m.accent, display: "grid", placeItems: "center", fontSize: "2rem" }}>{m.emoji}</div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".95rem" }}>{m.name}</div>
                <span className="pill">{m.cat}</span>
              </div>
            ))}
          </div>
          <Link href="/menu" className="btn peach" style={{ alignSelf: "flex-start", fontSize: ".9rem", padding: "10px 20px", marginTop: 16, display: "inline-flex" }}>
            Full Menu →
          </Link>
        </div>
      )}

      {/* REVIEWS */}
      {tab === "reviews" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, animation: "fade .3s ease" }}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={`card ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ gap: 10 }}>
              <div style={{ fontSize: "1.1rem", letterSpacing: 2 }}>{"⭐".repeat(r.stars)}</div>
              <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".92rem", lineHeight: 1.6, fontStyle: "italic" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".9rem", color: "var(--ink)" }}>— {r.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* MEAL BREAKDOWN */}
      {tab === "breakdown" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center", animation: "fade .3s ease" }}>
          <div style={{ width: "100%", height: 120, borderRadius: 20, background: "var(--peach-soft)", display: "grid", placeItems: "center", fontSize: "3rem" }}>🍲</div>
          <div>
            <h3 style={{ fontSize: "1.5rem" }}>The Full Bowl</h3>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 6, maxWidth: "46ch" }}>
              Every meal is balanced and portioned — here&apos;s what goes into a complete serving.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
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
          <Link href="/menu" className="btn peach" style={{ fontSize: ".9rem", padding: "10px 20px" }}>
            Full Menu →
          </Link>
        </div>
      )}
    </div>
  );
}

/* ---- Order section ---- */
function OrderContent() {
  const [copied, setCopied] = useState(false);
  function copyDetails() {
    navigator.clipboard?.writeText(
      "Paw Pack Pantry\nBank: MCB Bank\nReference: Your pet's name"
    ).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.6 }}>
        Ordering is simple — pick your packs, transfer, and we cook fresh for your pet.
      </p>
      <div className="steps">
        {[
          ["Choose your meals", "Message us your pet's name, size & meal picks."],
          ["Transfer payment", "Use the bank details below — copy in one tap."],
          ["We cook & deliver", "Fresh packs, ready within the week. 🐾"],
        ].map(([title, desc], i) => (
          <div key={i} className="step">
            <div className="num">{i + 1}</div>
            <div style={{ paddingTop: 6 }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1.1rem" }}>{title}</div>
              <div style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 3 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bank tilt-r">
        <div className="bank-row"><span className="k">Account name</span><span className="v">Paw Pack Pantry</span></div>
        <div className="bank-row"><span className="k">Reference</span><span className="v">Your pet&apos;s name</span></div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={copyDetails} className={`btn ${copied ? "sage" : ""}`} style={{ fontSize: ".9rem", padding: "10px 20px" }}>
          {copied ? "✓ Copied!" : "📋 Copy bank details"}
        </button>
        <a
          href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order%20🐾"
          target="_blank" rel="noopener noreferrer"
          className="btn sage"
          style={{ fontSize: ".9rem", padding: "10px 20px", display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          {I.wa} Order on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ---- Gallery preview ---- */
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
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.6 }}>
        Happy pups, rescue heroes, and tails that wag non-stop. 🐾
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {GALLERY_PHOTOS.map((id, i) => (
          <div key={id} className={`sticker ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ overflow: "hidden", borderRadius: 18, aspectRatio: "1", position: "relative" }}>
            <Image
              src={`/photos/${id}.jpeg`}
              alt="Happy pup"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width:600px) 30vw, 15vw"
            />
          </div>
        ))}
      </div>
      <Link href="/gallery" className="btn sky" style={{ alignSelf: "flex-start", fontSize: ".9rem", padding: "10px 20px" }}>
        See Full Gallery →
      </Link>
    </div>
  );
}

/* ---- StreetSmart ---- */
function StreetSmartContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h3 style={{ fontSize: "1.6rem" }}>Every pack feeds a stray.</h3>
      <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.7, maxWidth: "60ch" }}>
        StreetSmart is our promise to the dogs and cats without a home. A share of every order goes directly to feeding and caring for strays — and you can sponsor a pup directly.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {[
          { label: "A meal for a stray", icon: "🍽️" },
          { label: "Feed a stray for a month", icon: "📅" },
          { label: "Adopt & sponsor monthly meals", icon: "❤️" },
          { label: "StreetSmart Starter Pack", icon: "🐾" },
        ].map((s) => (
          <div key={s.label} className="card tilt-l" style={{ textAlign: "center", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "2rem" }}>{s.icon}</span>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".95rem" }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/streetsmart" className="btn" style={{ fontSize: ".9rem", padding: "10px 20px" }}>🐾 Sponsor a stray →</Link>
        <a href="https://wa.me/23058233898?text=I'd%20like%20to%20support%20the%20StreetSmart%20campaign%20🐾" target="_blank" rel="noopener noreferrer" className="btn ghost" style={{ fontSize: ".9rem", padding: "10px 20px" }}>Learn more</a>
      </div>
    </div>
  );
}

/* ---- News ---- */
const NEWS_PREVIEW = [
  { d: "10", m: "Jun", title: "This week at the Pantry", body: "New menu items dropping soon — Luna has been taste-testing all week and she approves! 🐾" },
  { d: "03", m: "Jun", title: "StreetSmart update", body: "5 strays fed, 2 sterilisations complete. Thank you to everyone who sponsored this month." },
  { d: "27", m: "May", title: "Welcome Molly to the team", body: "Our newest Health & Safety Officer has officially taken up her post. Absolutely zero safety issues to report." },
];

function NewsContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {NEWS_PREVIEW.map((n, i) => (
        <div key={i} className="news-item">
          <div className={`news-date ${i % 2 ? "tilt-l" : "tilt-r"}`}>
            <div className="d">{n.d}</div>
            <div className="m">{n.m}</div>
          </div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1.1rem" }}>{n.title}</div>
            <div style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 6, fontSize: ".9rem", lineHeight: 1.5 }}>{n.body}</div>
          </div>
        </div>
      ))}
      <Link href="/news" className="btn peach" style={{ alignSelf: "flex-start", fontSize: ".9rem", padding: "10px 20px" }}>
        All Updates →
      </Link>
    </div>
  );
}

/* ---- Follow / Socials ---- */
const SOCIALS = [
  { name: "Instagram", handle: "@pawpackpantry", href: "https://instagram.com/pawpackpantry", color: "#E1306C", bg: "#fce4ec" },
  { name: "WhatsApp", handle: "+230 5823 3898", href: "https://wa.me/23058233898", color: "#25D366", bg: "#e8f5e9" },
  { name: "Email", handle: "orders@pawpackpantry.com", href: "mailto:orders@pawpackpantry.com", color: "#4A3528", bg: "var(--peach-soft)" },
];

function FollowContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.6 }}>
        Follow our journey — new meals, rescue stories, and plenty of paw-esome content. 🐾
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SOCIALS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 14, textDecoration: "none",
              background: s.bg, border: "4px solid var(--white)", borderRadius: 18,
              padding: "14px 18px", boxShadow: "0 8px 20px -10px rgba(74,53,40,.3)",
              transition: "transform .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "none")}
          >
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "var(--white)", display: "grid", placeItems: "center", color: s.color, boxShadow: "0 4px 10px -4px rgba(74,53,40,.25)", fontSize: "1.4rem" }}>
              {s.name === "Instagram" ? "📸" : s.name === "WhatsApp" ? "💬" : "📧"}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{s.name}</div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>{s.handle}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---- Contact ---- */
function ContactContent() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
      {[
        { icon: "📞", k: "Call / WhatsApp", v: "+230 5823 3898", href: "tel:+23058233898" },
        { icon: "📧", k: "Orders", v: "orders@pawpackpantry.com", href: "mailto:orders@pawpackpantry.com" },
        { icon: "🐾", k: "Stray Support", v: "straysupport@pawpackpantry.com", href: "mailto:straysupport@pawpackpantry.com" },
        { icon: "📸", k: "Instagram", v: "@pawpackpantry", href: "https://instagram.com/pawpackpantry" },
        { icon: "ℹ️", k: "General", v: "info@pawpackpantry.com", href: "mailto:info@pawpackpantry.com" },
        { icon: "📍", k: "Kitchen", v: "Made in Mauritius 🇲🇺", href: "#" },
      ].map((c) => (
        <a
          key={c.k}
          href={c.href}
          target={c.href.startsWith("http") ? "_blank" : undefined}
          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="contact-card tilt-l"
          style={{ textDecoration: "none" }}
        >
          <div style={{ width: 46, height: 46, flex: "0 0 auto", borderRadius: 14, background: "var(--peach-soft)", display: "grid", placeItems: "center", fontSize: "1.3rem" }}>
            {c.icon}
          </div>
          <div>
            <div style={{ fontSize: ".74rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700 }}>{c.k}</div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>{c.v}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ==============================
   SECTIONS CONFIG
   ============================== */
const SECTIONS: Section[] = [
  { key: "about",       accent: "var(--blush)",  icon: I.heart,  title: "About Us",            sub: "Our story & mission",               content: <AboutContent />,       fullPage: undefined },
  { key: "products",    accent: "var(--peach)",  icon: I.bowl,   title: "Our Products",         sub: "Menu · Reviews · Meal breakdown",   content: <ProductsContent />,    fullPage: "/menu" },
  { key: "order",       accent: "var(--sage)",   icon: I.cart,   title: "How to Order",         sub: "Easy bank-transfer in 3 steps",     content: <OrderContent />,       fullPage: undefined },
  { key: "gallery",     accent: "var(--sky)",    icon: I.camera, title: "Gallery",              sub: "Happy pups · rescue stories",       content: <GalleryContent />,     fullPage: "/gallery" },
  { key: "street",      accent: "var(--blush)",  icon: I.mega,   title: "StreetSmart Campaign", sub: "Sponsor & support strays",          content: <StreetSmartContent />, fullPage: "/streetsmart" },
  { key: "news",        accent: "var(--peach)",  icon: I.news,   title: "Latest News",          sub: "Weekly updates from the kitchen",   content: <NewsContent />,        fullPage: "/news" },
  { key: "follow",      accent: "var(--sky)",    icon: I.share,  title: "Follow Us",            sub: "Instagram · WhatsApp · Email",      content: <FollowContent />,      fullPage: undefined },
  { key: "contact",     accent: "var(--sage)",   icon: I.mail,   title: "Contact Us",           sub: "Say hello — we love a chat",        content: <ContactContent />,     fullPage: undefined },
];

/* ==============================
   TILE GRID COMPONENT
   ============================== */
export default function HomeTiles() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback((idx: number) => {
    setOpenIdx(prev => (prev === idx ? null : idx));
  }, []);

  const s = openIdx !== null ? SECTIONS[openIdx] : null;

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "70px 22px 100px", position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p className="eyebrow">Have a sniff around</p>
        <h2 style={{ fontSize: "clamp(2.2rem,6vw,3.4rem)", marginTop: 8 }}>Welcome to the Pantry</h2>
        <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 8 }}>Tap any sticker to peek inside.</p>
      </div>

      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
        }}
        className="tile-grid"
      >
        {SECTIONS.map((sec, idx) => (
          <button
            key={sec.key}
            onClick={() => toggle(idx)}
            aria-expanded={openIdx === idx}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 9,
              textAlign: "center", cursor: "pointer",
              padding: "22px 14px 18px",
              background: sec.accent,
              border: "6px solid var(--white)",
              borderRadius: "var(--r-lg)",
              boxShadow: openIdx === idx
                ? "0 22px 34px -14px rgba(74,53,40,.55)"
                : "0 12px 24px -14px rgba(74,53,40,.45)",
              transform: openIdx === idx
                ? "translateY(-3px) scale(1.04)"
                : idx % 2 ? "rotate(2.2deg)" : "rotate(-2.2deg)",
              transition: "transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s",
              fontFamily: "var(--font-head)",
              color: "var(--ink)",
            }}
          >
            <span style={{
              width: 62, height: 62, borderRadius: 18,
              background: "rgba(255,255,255,.72)", boxShadow: "inset 0 0 0 3px var(--white)",
              display: "grid", placeItems: "center", color: "var(--ink)",
            }}>
              {sec.icon}
            </span>
            <span style={{ fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.1 }}>{sec.title}</span>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: ".74rem", color: "var(--ink-soft)", lineHeight: 1.25 }}>{sec.sub}</span>
          </button>
        ))}

        {/* inline detail panel — spans full row */}
        {s && (
          <div
            key={openIdx}
            style={{
              gridColumn: "1 / -1",
              borderTop: `10px solid ${s.accent}`,
              background: "var(--cream)",
              border: `6px solid var(--white)`,
              borderTopColor: s.accent,
              borderTopWidth: 10,
              borderRadius: "var(--r-lg)",
              padding: "32px 28px",
              boxShadow: "0 18px 34px -18px rgba(74,53,40,.45)",
              animation: "fade .35s ease",
              position: "relative",
            }}
          >
            {/* close */}
            <button
              onClick={() => setOpenIdx(null)}
              aria-label="Close"
              style={{
                position: "absolute", top: 14, right: 14,
                width: 38, height: 38, borderRadius: "50%",
                border: "4px solid var(--white)", background: "var(--white)",
                color: "var(--ink-soft)", display: "grid", placeItems: "center",
                cursor: "pointer", boxShadow: "0 6px 12px -6px rgba(74,53,40,.4)",
                transition: "background .2s",
                transform: "rotate(45deg)",
              }}
            >
              {I.plus}
            </button>

            {/* header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{
                width: 50, height: 50, flex: "0 0 auto", borderRadius: 15,
                background: s.accent, border: "4px solid var(--white)",
                display: "grid", placeItems: "center", color: "var(--ink)",
                boxShadow: "0 8px 16px -8px rgba(74,53,40,.4)",
              }}>
                {s.icon}
              </span>
              <h3 style={{ fontSize: "1.7rem" }}>{s.title}</h3>
            </div>

            {s.content}

            {s.fullPage && (
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "2px dotted var(--cream-deep)" }}>
                <Link href={s.fullPage} style={{ fontFamily: "var(--font-head)", fontWeight: 600, color: "var(--ink-soft)", fontSize: ".9rem", textDecoration: "none" }}>
                  View full page →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .tile-grid { }
        @media (max-width: 860px) { .tile-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 620px) { .tile-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 380px) { .tile-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
