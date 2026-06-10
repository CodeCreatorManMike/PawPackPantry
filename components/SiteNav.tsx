"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/streetsmart", label: "StreetSmart" },
  { href: "/news", label: "News" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        background: "var(--white)",
        borderBottom: "2px solid var(--cream-deep)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logos/logo-cutout.png" alt="Paw Pack Pantry" width={44} height={44} style={{ objectFit: "contain" }} />
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)" }}>
            Paw Pack Pantry
          </span>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex" style={{ gap: 6 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-head)",
                fontWeight: 600,
                fontSize: ".95rem",
                color: "var(--ink-soft)",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 999,
                transition: "background .2s, color .2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "var(--blush-soft)";
                (e.target as HTMLElement).style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = "var(--ink-soft)";
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I'd%20like%20to%20place%20an%20order%20🐾"
            target="_blank"
            rel="noopener noreferrer"
            className="btn sage"
            style={{ padding: "8px 18px", fontSize: ".9rem", border: "3px solid var(--white)" }}
          >
            Order Now
          </a>
        </div>

        {/* mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: "var(--blush-soft)",
            border: "3px solid var(--white)",
            borderRadius: 12,
            width: 44,
            height: 44,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            cursor: "pointer",
          }}
        >
          <span style={{ display: "block", width: 20, height: 2, background: "var(--ink)", borderRadius: 2 }} />
          <span style={{ display: "block", width: 20, height: 2, background: "var(--ink)", borderRadius: 2 }} />
          <span style={{ display: "block", width: 20, height: 2, background: "var(--ink)", borderRadius: 2 }} />
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div
          style={{
            background: "var(--white)",
            borderTop: "2px solid var(--cream-deep)",
            padding: "16px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-head)",
                fontWeight: 600,
                fontSize: "1.05rem",
                color: "var(--ink)",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: 14,
                background: "var(--cream)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I'd%20like%20to%20place%20an%20order%20🐾"
            target="_blank"
            rel="noopener noreferrer"
            className="btn sage"
            style={{ textAlign: "center", marginTop: 4 }}
          >
            Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
