"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const NAV_ICON = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17, flexShrink: 0 }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  pantry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17, flexShrink: 0 }}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  bulb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17, flexShrink: 0 }}>
      <path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
  news: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17, flexShrink: 0 }}>
      <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 8h7M7 12h7M7 16h5M17 8v8" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17, flexShrink: 0 }}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17, flexShrink: 0 }}>
      <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.4a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 7H6" />
    </svg>
  ),
};

const links = [
  { href: "/",            label: "Home",              icon: NAV_ICON.home   },
  { href: "/menu",        label: "The Pantry",        icon: NAV_ICON.pantry },
  { href: "/streetsmart", label: "StreetSmart",       icon: NAV_ICON.bulb   },
  { href: "/news",        label: "News",              icon: NAV_ICON.news   },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleContact = useCallback(() => {
    setOpen(false);
    if (window.location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-tile", { detail: "contact" }));
    } else {
      router.push("/?open=contact");
    }
  }, [router]);

  const linkStyle = {
    fontFamily: "var(--font-head)",
    fontWeight: 600 as const,
    fontSize: ".9rem",
    color: "var(--ink-soft)",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: 999,
    letterSpacing: ".02em",
    transition: "color .15s, background .15s",
  };

  return (
    <nav style={{
      background: "var(--white)",
      borderBottom: "1px solid var(--cream-deep)",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 60,
      }}>
        {/* Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logos/logo-cutout.png" alt="Paw Pack Pantry" width={38} height={38} style={{ objectFit: "contain" }} />
          <span style={{
            fontFamily: "var(--font-brand)",
            fontWeight: 400,
            fontSize: "1.15rem",
            color: "var(--ink)",
            letterSpacing: ".01em",
          }}>
            Paw Pack Pantry
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 2 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={linkStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; (e.currentTarget as HTMLElement).style.background = "var(--cream)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink-soft)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {l.label}
            </Link>
          ))}
          <button onClick={handleContact} style={{ ...linkStyle, color: "var(--ink-soft)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; (e.currentTarget as HTMLElement).style.background = "var(--cream)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink-soft)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Contact
          </button>
          <a
            href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order"
            target="_blank" rel="noopener noreferrer"
            style={{
              marginLeft: 8,
              fontFamily: "var(--font-head)",
              fontWeight: 600,
              fontSize: ".88rem",
              background: "var(--ink)",
              color: "var(--cream)",
              padding: "9px 20px",
              borderRadius: 999,
              textDecoration: "none",
              letterSpacing: ".03em",
              boxShadow: "0 4px 14px -4px rgba(68,49,43,.4)",
              transition: "opacity .15s",
            }}
          >
            Order Now
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: "var(--cream)",
            border: "2px solid var(--cream-deep)",
            borderRadius: 10,
            width: 42, height: 42,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 5,
            cursor: "pointer",
          }}
        >
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 18, height: 2, background: "var(--ink)", borderRadius: 2 }} />)}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          background: "var(--white)",
          borderTop: "1px solid var(--cream-deep)",
          padding: "14px 20px 18px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem",
              color: "var(--ink)", textDecoration: "none",
              padding: "10px 14px", borderRadius: 12, background: "var(--cream)",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              {l.icon}
              {l.label}
            </Link>
          ))}
          <button onClick={handleContact} style={{
            fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem",
            color: "var(--ink)", border: "none", cursor: "pointer",
            padding: "10px 14px", borderRadius: 12, background: "var(--cream)",
            display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
          }}>
            {NAV_ICON.mail}
            Contact
          </button>
          <a
            href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order"
            target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem",
              color: "var(--white)", textDecoration: "none",
              padding: "10px 14px", borderRadius: 12, background: "var(--ink)",
              display: "flex", alignItems: "center", gap: 10,
              marginTop: 6,
            }}
          >
            {NAV_ICON.cart}
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
}
