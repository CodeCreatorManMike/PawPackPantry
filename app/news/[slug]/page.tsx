import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { supabase, type NewsPost } from "@/lib/supabase";

const PLACEHOLDER_POSTS: NewsPost[] = [
  {
    id: "1", slug: "welcome-to-the-pantry", published: true, created_at: "",
    title: "Welcome to the Pantry!",
    body: "Paw Pack Pantry is officially open. We are so excited to start nourishing your pets and supporting Mauritius's strays — one meal at a time.\n\nEvery meal is hand-cooked with quality ingredients chosen for taste and optimal pet nutrition. We believe every animal deserves a full belly, a healthy life, and a chance to be loved.\n\nThank you for joining our pack. This is just the beginning.",
    date: "2026-06-10", image_url: null,
  },
  {
    id: "2", slug: "luna-approves", published: true, created_at: "",
    title: "Luna has approved the new menu",
    body: "After an extensive (and very thorough) taste-testing session, Little Miss Luna has given her stamp of approval on the new seasonal additions. Watch this space.\n\nLuna — our resident Professional Taste Tester and French Bulldog extraordinaire — took her role very seriously, working through each new recipe with the focus and dedication it deserved.\n\nNew menu items dropping soon. Stay tuned.",
    date: "2026-06-03", image_url: null,
  },
  {
    id: "3", slug: "streetsmart-june", published: true, created_at: "",
    title: "StreetSmart June Update",
    body: "5 strays fed, 2 sterilisations completed, and 1 very happy rescue family. Thank you to everyone who sponsored a stray this month — you made this possible.\n\nEvery rupee contributed through your orders and direct sponsorships goes straight to the animals. The StreetSmart Campaign is growing and we couldn't do it without the pack behind us.\n\nIf you'd like to get involved or sponsor a stray directly, reach out on WhatsApp or visit our StreetSmart page.",
    date: "2026-05-27", image_url: null,
  },
];

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
  const post = await getPost(slug) ?? PLACEHOLDER_POSTS.find(p => p.slug === slug) ?? null;
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
          <div style={{ marginTop: 24, color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8, fontSize: "1.05rem" }}>
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
