"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setStatus("err");
      setMsg("Oops — that doesn't look like an email 🐶");
      return;
    }
    setStatus("loading");
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: clean });
    if (error && error.code !== "23505") {
      setStatus("err");
      setMsg("Something went wrong — try again! 🙈");
    } else {
      setStatus("ok");
      setMsg("Welcome to the pack! Check your inbox 💌");
      setEmail("");
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 16 }} noValidate>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        disabled={status === "loading"}
        style={{
          flex: 1,
          minWidth: 200,
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "1rem",
          padding: "13px 18px",
          borderRadius: 999,
          border: "4px solid var(--white)",
          background: "var(--white)",
          color: "var(--ink)",
          outline: "none",
          boxShadow: "inset 0 0 0 1px var(--cream-deep)",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn sage"
        style={{ opacity: status === "loading" ? .7 : 1 }}
      >
        {status === "loading" ? "Joining…" : "Join the Pack"}
      </button>
      {msg && (
        <p
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: 600,
            fontSize: ".92rem",
            color: status === "err" ? "#c0584f" : "#5a8a4e",
            marginTop: 4,
          }}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
