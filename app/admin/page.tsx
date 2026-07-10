"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { InvoiceRow } from "@/lib/supabase";
import InvoiceManager from "@/components/InvoiceManager";

type Tab = "news" | "menu" | "gallery" | "subscribers" | "invoices";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<Tab>("news");
  const [data, setData] = useState<Record<string, unknown[]>>({ news: [], menu: [], gallery: [], subscribers: [], invoices: [] });
  const [msg, setMsg] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      setAuthed(true);
      sessionStorage.setItem("ppp-admin", "1");
    } else {
      setMsg("Incorrect password.");
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    sessionStorage.removeItem("ppp-admin");
    setAuthed(false);
  }

  useEffect(() => {
    if (sessionStorage.getItem("ppp-admin") === "1") setAuthed(true);
  }, []);

  const load = useCallback(async () => {
    const [news, menu, gallery, subs, invoicesRes] = await Promise.all([
      supabase.from("news_posts").select("*").order("date", { ascending: false }),
      supabase.from("menu_items").select("*").order("category"),
      supabase.from("gallery_items").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("id,email,created_at").order("created_at", { ascending: false }),
      fetch("/api/invoices"),
    ]);
    if (invoicesRes.status === 401) {
      // Session cookie expired or missing — bounce back to the login screen.
      sessionStorage.removeItem("ppp-admin");
      setAuthed(false);
      return;
    }
    const invoicesJson = await invoicesRes.json().catch(() => ({ invoices: [] }));
    setData({
      news: news.data ?? [],
      menu: menu.data ?? [],
      gallery: gallery.data ?? [],
      subscribers: subs.data ?? [],
      invoices: invoicesJson.invoices ?? [],
    });
  }, []);

  useEffect(() => {
    if (!authed) return;
    load();
  }, [authed, load]);

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--cream)" }}>
        <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 360, padding: 32 }}>
          <h1 style={{ fontFamily: "var(--font-head)", fontSize: "1.8rem", textAlign: "center" }}>Admin</h1>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", padding: "12px 16px", borderRadius: 14, border: "4px solid var(--white)", background: "var(--white)", color: "var(--ink)", outline: "none", boxShadow: "inset 0 0 0 1px var(--cream-deep)" }}
          />
          {msg && <p style={{ color: "#c0584f", fontSize: ".88rem", fontWeight: 600 }}>{msg}</p>}
          <button type="submit" className="btn sage">Enter</button>
        </form>
      </div>
    );
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "news", label: "📰 News Posts" },
    { id: "menu", label: "🍖 Menu Items" },
    { id: "gallery", label: "📸 Gallery" },
    { id: "subscribers", label: "📧 Subscribers" },
    { id: "invoices", label: "🧾 Invoices" },
  ];

  async function togglePublished(id: string, current: boolean) {
    await supabase.from("news_posts").update({ published: !current }).eq("id", id);
    setData(d => ({ ...d, news: (d.news as Record<string, unknown>[]).map(p => p.id === id ? { ...p, published: !current } : p) }));
  }

  async function toggleActive(table: "menu_items" | "gallery_items", id: string, current: boolean) {
    await supabase.from(table).update({ active: !current }).eq("id", id);
    const key = table === "menu_items" ? "menu" : "gallery";
    setData(d => ({ ...d, [key]: (d[key] as Record<string, unknown>[]).map(i => i.id === id ? { ...i, active: !current } : i) }));
  }

  async function deleteRow(table: string, id: string, key: Tab) {
    if (!confirm("Delete this item?")) return;
    await supabase.from(table).delete().eq("id", id);
    setData(d => ({ ...d, [key]: (d[key] as Record<string, unknown>[]).filter(i => (i as Record<string, unknown>).id !== id) }));
  }

  const cell: React.CSSProperties = { padding: "10px 12px", borderBottom: "1px solid var(--cream-deep)", fontSize: ".88rem", color: "var(--ink)", fontWeight: 500, verticalAlign: "top" };
  const th: React.CSSProperties = { ...cell, fontFamily: "var(--font-head)", fontWeight: 600, background: "var(--cream-deep)", fontSize: ".78rem", letterSpacing: ".06em", textTransform: "uppercase" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <h1 style={{ fontFamily: "var(--font-head)", fontSize: "1.8rem" }}>🐾 Paw Pack Pantry — Admin</h1>
          <button
            onClick={signOut}
            className="btn ghost"
            style={{ fontSize: ".85rem", padding: "8px 16px" }}
          >
            Sign out
          </button>
        </div>

        {/* tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`btn ${tab === t.id ? "sage" : "ghost"}`}
              style={{ fontSize: ".88rem", padding: "9px 18px" }}
            >
              {t.label} ({(data[t.id] as unknown[]).length})
            </button>
          ))}
        </div>

        <div style={{ background: "var(--white)", borderRadius: 20, border: "4px solid var(--white)", boxShadow: "0 8px 24px -12px rgba(74,53,40,.3)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>

            {/* NEWS */}
            {tab === "news" && (
              <>
                <div style={{ padding: "16px 20px", borderBottom: "2px solid var(--cream-deep)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, color: "var(--ink-soft)", fontSize: ".85rem" }}>
                    Manage in Supabase to add/edit posts. Toggle Published here.
                  </p>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr><th style={th}>Date</th><th style={th}>Title</th><th style={th}>Slug</th><th style={th}>Published</th><th style={th}>Action</th></tr>
                  </thead>
                  <tbody>
                    {(data.news as Record<string, unknown>[]).map(p => (
                      <tr key={p.id as string}>
                        <td style={cell}>{p.date as string}</td>
                        <td style={cell}>{p.title as string}</td>
                        <td style={{ ...cell, color: "var(--ink-soft)", fontSize: ".8rem" }}>{p.slug as string}</td>
                        <td style={cell}>
                          <button onClick={() => togglePublished(p.id as string, p.published as boolean)} className={`btn ${p.published ? "sage" : "ghost"}`} style={{ padding: "4px 12px", fontSize: ".78rem", border: "2px solid var(--white)" }}>
                            {p.published ? "Live" : "Draft"}
                          </button>
                        </td>
                        <td style={cell}>
                          <button onClick={() => deleteRow("news_posts", p.id as string, "news")} style={{ color: "#c0584f", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".85rem" }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {data.news.length === 0 && <tr><td colSpan={5} style={{ ...cell, textAlign: "center", color: "var(--ink-soft)", padding: 32 }}>No posts yet — add them in Supabase.</td></tr>}
                  </tbody>
                </table>
              </>
            )}

            {/* MENU */}
            {tab === "menu" && (
              <>
                <div style={{ padding: "16px 20px", borderBottom: "2px solid var(--cream-deep)" }}>
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, color: "var(--ink-soft)", fontSize: ".85rem" }}>Toggle active/inactive to show/hide items on the menu page.</p>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr><th style={th}>Name</th><th style={th}>Category</th><th style={th}>Price</th><th style={th}>Active</th><th style={th}>Action</th></tr>
                  </thead>
                  <tbody>
                    {(data.menu as Record<string, unknown>[]).map(m => (
                      <tr key={m.id as string}>
                        <td style={cell}>{m.name as string}</td>
                        <td style={cell}>{m.category as string}</td>
                        <td style={cell}>{m.price as string}</td>
                        <td style={cell}>
                          <button onClick={() => toggleActive("menu_items", m.id as string, m.active as boolean)} className={`btn ${m.active ? "sage" : "ghost"}`} style={{ padding: "4px 12px", fontSize: ".78rem", border: "2px solid var(--white)" }}>
                            {m.active ? "Shown" : "Hidden"}
                          </button>
                        </td>
                        <td style={cell}>
                          <button onClick={() => deleteRow("menu_items", m.id as string, "menu")} style={{ color: "#c0584f", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".85rem" }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {data.menu.length === 0 && <tr><td colSpan={5} style={{ ...cell, textAlign: "center", color: "var(--ink-soft)", padding: 32 }}>No menu items in Supabase yet.</td></tr>}
                  </tbody>
                </table>
              </>
            )}

            {/* GALLERY */}
            {tab === "gallery" && (
              <>
                <div style={{ padding: "16px 20px", borderBottom: "2px solid var(--cream-deep)" }}>
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, color: "var(--ink-soft)", fontSize: ".85rem" }}>Toggle active to show/hide gallery items.</p>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr><th style={th}>Name</th><th style={th}>Type</th><th style={th}>Active</th><th style={th}>Action</th></tr>
                  </thead>
                  <tbody>
                    {(data.gallery as Record<string, unknown>[]).map(g => (
                      <tr key={g.id as string}>
                        <td style={cell}>{g.name as string}</td>
                        <td style={cell}>{g.type as string}</td>
                        <td style={cell}>
                          <button onClick={() => toggleActive("gallery_items", g.id as string, g.active as boolean)} className={`btn ${g.active ? "sage" : "ghost"}`} style={{ padding: "4px 12px", fontSize: ".78rem", border: "2px solid var(--white)" }}>
                            {g.active ? "Shown" : "Hidden"}
                          </button>
                        </td>
                        <td style={cell}>
                          <button onClick={() => deleteRow("gallery_items", g.id as string, "gallery")} style={{ color: "#c0584f", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".85rem" }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {data.gallery.length === 0 && <tr><td colSpan={4} style={{ ...cell, textAlign: "center", color: "var(--ink-soft)", padding: 32 }}>No gallery items yet.</td></tr>}
                  </tbody>
                </table>
              </>
            )}

            {/* SUBSCRIBERS */}
            {tab === "subscribers" && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr><th style={th}>Email</th><th style={th}>Signed up</th><th style={th}>Action</th></tr>
                </thead>
                <tbody>
                  {(data.subscribers as Record<string, unknown>[]).map(s => (
                    <tr key={s.id as string}>
                      <td style={cell}>{s.email as string}</td>
                      <td style={cell}>{new Date(s.created_at as string).toLocaleDateString()}</td>
                      <td style={cell}>
                        <button onClick={() => deleteRow("newsletter_subscribers", s.id as string, "subscribers")} style={{ color: "#c0584f", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".85rem" }}>Remove</button>
                      </td>
                    </tr>
                  ))}
                  {data.subscribers.length === 0 && <tr><td colSpan={3} style={{ ...cell, textAlign: "center", color: "var(--ink-soft)", padding: 32 }}>No subscribers yet.</td></tr>}
                </tbody>
              </table>
            )}

            {/* INVOICES */}
            {tab === "invoices" && (
              <InvoiceManager invoices={data.invoices as InvoiceRow[]} onSaved={load} />
            )}
          </div>
        </div>

        <p style={{ marginTop: 20, fontSize: ".82rem", color: "var(--ink-soft)", textAlign: "center" }}>
          This page is not linked anywhere on the site. Only accessible via direct URL.
        </p>
      </div>
    </div>
  );
}
