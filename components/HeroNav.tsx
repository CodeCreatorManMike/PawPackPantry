"use client";
import { useState } from "react";
import Link from "next/link";

type DropItem = { label: string; href: string; external?: boolean };
type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  dropdown: DropItem[] | null;
};

const NAV: NavItem[] = [
  {
    label: "Home",
    href: "/",
    dropdown: null,
  },
  {
    label: "The Pantry",
    href: "/menu",
    dropdown: [
      { label: "Menu", href: "/menu" },
      { label: "Reviews", href: "/?tile=products" },
      { label: "Meal Breakdown", href: "/?tile=products" },
    ],
  },
  {
    label: "StreetSmart Campaign",
    href: "/streetsmart",
    dropdown: [
      { label: "The StreetSmart Campaign", href: "/streetsmart" },
      { label: "Success Stories + Stray Gallery", href: "/gallery" },
      { label: "Sponsor a Stray", href: "/streetsmart#sponsor" },
    ],
  },
  {
    label: "News",
    href: "/news",
    dropdown: [
      { label: "Menu & Operations Updates", href: "/news?cat=menu" },
      { label: "Latest Stray News", href: "/news?cat=strays" },
      { label: "Monthly Newsletter", href: "/#newsletter" },
    ],
  },
  {
    label: "Order Now",
    href: "https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order",
    external: true,
    dropdown: [
      { label: "How to Order", href: "/?tile=order" },
      { label: "Delivery / Collection Info", href: "/?tile=order" },
      { label: "Order Now on WhatsApp", href: "https://wa.me/23058233898", external: true },
    ],
  },
  {
    label: "Contact Us",
    href: "/#contact",
    dropdown: null,
  },
];

export default function HeroNav() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ width: "100%", maxWidth: 700 }}>
      {/* Main nav row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
          background: "var(--ink)",
          borderRadius: 0,
          overflow: "visible",
          position: "relative",
        }}
      >
        {NAV.map((item, idx) => {
          const isLast = idx === NAV.length - 1;
          const isOpen = hovered === idx;

          const btnStyle: React.CSSProperties = {
            flex: "1 1 auto",
            padding: "13px 14px",
            background: isOpen ? "var(--amber)" : isLast ? "var(--amber)" : "var(--ink)",
            color: "var(--cream)",
            fontFamily: "var(--font-head)",
            fontWeight: 600,
            fontSize: ".82rem",
            letterSpacing: ".04em",
            textTransform: "uppercase" as const,
            cursor: "pointer",
            border: "none",
            borderRight: idx < NAV.length - 1 ? "1px solid rgba(246,244,240,.12)" : "none",
            textAlign: "center" as const,
            position: "relative" as const,
            transition: "background .15s",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            whiteSpace: "nowrap" as const,
          };

          const chevron = item.dropdown ? (
            <svg
              viewBox="0 0 10 6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              style={{ width: 9, height: 9, opacity: .7, flexShrink: 0 }}
            >
              <path d="M1 1l4 4 4-4" />
            </svg>
          ) : null;

          const inner = (
            <>
              {item.label}
              {chevron}
            </>
          );

          return (
            <div
              key={item.label}
              style={{ position: "relative", flex: "1 1 auto" }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" style={btnStyle}>
                  {inner}
                </a>
              ) : (
                <Link href={item.href} style={btnStyle}>
                  {inner}
                </Link>
              )}

              {/* Dropdown */}
              {item.dropdown && isOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    minWidth: 230,
                    background: "var(--white)",
                    border: "1px solid var(--cream-deep)",
                    boxShadow: "0 12px 28px -8px rgba(68,49,43,.3)",
                    zIndex: 200,
                    animation: "fade .18s ease",
                  }}
                >
                  {item.dropdown.map(d => (
                    d.external ? (
                      <a
                        key={d.label}
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={dropItemStyle}
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--cream)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "var(--white)")}
                      >
                        {d.label}
                      </a>
                    ) : (
                      <Link
                        key={d.label}
                        href={d.href}
                        style={dropItemStyle}
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--cream)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "var(--white)")}
                      >
                        {d.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Paw Pack Pantry · Mauritius sub-bar */}
      <div style={{
        background: "var(--amber-soft)",
        display: "flex",
        justifyContent: "center",
        gap: 20,
        padding: "7px 14px",
      }}>
        <span style={{ fontFamily: "var(--font-brand)", fontSize: ".9rem", color: "var(--ink)" }}>
          Paw Pack Pantry.
        </span>
        <span style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: ".8rem", color: "var(--ink-soft)", letterSpacing: ".06em" }}>
          Mauritius
        </span>
      </div>
    </div>
  );
}

const dropItemStyle: React.CSSProperties = {
  display: "block",
  padding: "10px 16px",
  fontFamily: "var(--font-head)",
  fontWeight: 500,
  fontSize: ".85rem",
  color: "var(--ink)",
  textDecoration: "none",
  borderBottom: "1px solid var(--cream)",
  background: "var(--white)",
  transition: "background .12s",
  whiteSpace: "nowrap",
};
