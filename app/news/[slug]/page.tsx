import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";

async function getPost(slug: string) {
  try {
    const { data } = await supabase
      .from("news_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    return data;
  } catch {
    return null;
  }
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const d = new Date(post.date);
  const dateStr = d.toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <SiteNav />
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 100px" }}>
        <Link href="/news" style={{ fontFamily: "var(--font-head)", fontWeight: 600, color: "var(--ink-soft)", textDecoration: "none", fontSize: ".9rem" }}>
          ← Back to news
        </Link>

        <article
          style={{
            marginTop: 32,
            background: "var(--white)", border: "6px solid var(--white)",
            borderRadius: 28, padding: "36px 32px",
            boxShadow: "0 16px 32px -16px rgba(74,53,40,.4)",
          }}
        >
          <p style={{ fontSize: ".8rem", fontFamily: "var(--font-head)", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
            {dateStr}
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)", marginTop: 10 }}>{post.title}</h1>
          <div
            style={{ marginTop: 24, color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8, fontSize: "1.05rem" }}
          >
            {post.body.split("\n\n").map((para: string, i: number) => (
              <p key={i} style={{ marginBottom: 18 }}>{para}</p>
            ))}
          </div>
        </article>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link href="/news" className="btn peach" style={{ fontSize: ".95rem" }}>← All news</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
