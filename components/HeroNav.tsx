"use client";
import Link from "next/link";

const BUTTONS = [
  { label: "Home",                 href: "/" },
  { label: "The Pantry",           href: "/menu" },
  { label: "StreetSmart Campaign", href: "/streetsmart" },
  { label: "News",                 href: "/news" },
  { label: "Order Now",            href: "https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order", external: true },
  { label: "Contact Us",           href: "/#contact" },
];

export default function HeroNav() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 680,
        background: "#2A1F1A",   /* deep dark brown outer padding */
        padding: 7,
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        borderRadius: 0,
      }}
    >
      {BUTTONS.map(btn => (
        btn.external ? (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            style={btnStyle}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--amber-soft)")}
            onMouseLeave={e => (e.currentTarget.style.background = "#CCBEAF")}
          >
            {btn.label}
          </a>
        ) : (
          <Link
            key={btn.label}
            href={btn.href}
            style={btnStyle}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--amber-soft)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#CCBEAF"}
          >
            {btn.label}
          </Link>
        )
      ))}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  flex: "1 1 auto",
  padding: "12px 10px",
  background: "#CCBEAF",             /* lighter neutral-soft */
  color: "var(--ink)",
  fontFamily: "var(--font-head)",
  fontWeight: 700,
  fontSize: ".82rem",
  letterSpacing: ".05em",
  textTransform: "uppercase",
  textAlign: "center",
  textDecoration: "none",
  display: "block",
  borderRadius: 0,
  border: "none",
  cursor: "pointer",
  transition: "background .15s",
  whiteSpace: "nowrap",
};
