"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "The Pantry" },
  { href: "/streetsmart", label: "StreetSmart" },
  { href: "/news", label: "News" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

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
          <Link href="/#contact" style={{ ...linkStyle, color: "var(--ink-soft)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; (e.currentTarget as HTMLElement).style.background = "var(--cream)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink-soft)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Contact
          </Link>
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
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)} style={{
            fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "1rem",
            color: "var(--ink)", textDecoration: "none",
            padding: "10px 14px", borderRadius: 12, background: "var(--cream)",
          }}>
            Contact
          </Link>
          <a
            href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order"
            target="_blank" rel="noopener noreferrer"
            className="btn dark"
            style={{ textAlign: "center", marginTop: 6 }}
          >
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
}
