import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterForm from "@/components/NewsletterForm";
import PawScatter from "@/components/PawScatter";
import { supabase, type NewsPost } from "@/lib/supabase";

async function getPosts(): Promise<NewsPost[]> {
  try {
    const { data } = await supabase
      .from("news_posts")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleString("en", { month: "short" }).toUpperCase(),
    full: d.toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" }),
  };
}

/* Placeholder posts shown when Supabase has no data yet */
const PLACEHOLDER_POSTS: NewsPost[] = [
  {
    id: "1", slug: "welcome-to-the-pantry", published: true, created_at: "",
    title: "Welcome to the Pantry! 🐾",
    body: "Paw Pack Pantry is officially open. We're so excited to start nourishing your pets and supporting Mauritius's strays — one meal at a time.",
    date: "2026-06-10", image_url: null,
  },
  {
    id: "2", slug: "luna-approves", published: true, created_at: "",
    title: "Luna has approved the new menu",
    body: "After an extensive (and very thorough) taste-testing session, Little Miss Luna has given her stamp of approval on the new seasonal additions. Watch this space.",
    date: "2026-06-03", image_url: null,
  },
  {
    id: "3", slug: "streetsmart-june", published: true, created_at: "",
    title: "StreetSmart June Update",
    body: "5 strays fed, 2 sterilisations completed, and 1 very happy rescue family. Thank you to everyone who sponsored a stray this month — you made this possible.",
    date: "2026-05-27", image_url: null,
  },
];

export default async function NewsPage() {
  const dbPosts = await getPosts();
  const posts = dbPosts.length > 0 ? dbPosts : PLACEHOLDER_POSTS;

  return (
    <>
      <SiteNav />

      <section
        style={{
          position: "relative", overflow: "hidden",
          background: "var(--cream)", padding: "72px 24px 56px",
          textAlign: "center",
        }}
      >
        <PawScatter />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="eyebrow">From the kitchen</p>
          <h1 style={{ fontSize: "clamp(2.4rem,7vw,4rem)", marginTop: 8 }}>Latest News</h1>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 12, maxWidth: "48ch", margin: "12px auto 0", lineHeight: 1.7 }}>
            Weekly updates from the pantry — new meals, rescue stories, and everything in between.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "0 22px 100px" }}>
        {/* posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 64 }}>
          {posts.map((post, i) => {
            const d = formatDate(post.date);
            return (
              <article
                key={post.id}
                style={{
                  display: "flex", gap: 20, alignItems: "flex-start",
                  background: "var(--white)", border: "6px solid var(--white)",
                  borderRadius: 24, padding: "24px 22px",
                  boxShadow: "0 12px 24px -14px rgba(74,53,40,.35)",
                  transform: i % 2 ? "rotate(.4deg)" : "rotate(-.4deg)",
                  transition: "transform .2s, box-shadow .2s",
                  textDecoration: "none",
                }}
              >
                <div
                  className={`news-date ${i % 2 ? "tilt-l" : "tilt-r"}`}
                  style={{ flexShrink: 0 }}
                >
                  <div className="d">{d.day}</div>
                  <div className="m">{d.month}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "1.25rem", marginBottom: 8 }}>{post.title}</h2>
                  <p style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.7, fontSize: ".95rem" }}>
                    {post.body.length > 200 ? post.body.slice(0, 200) + "…" : post.body}
                  </p>
                  <Link
                    href={`/news/${post.slug}`}
                    style={{
                      display: "inline-block", marginTop: 12,
                      fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".88rem",
                      color: "var(--ink-soft)", textDecoration: "none",
                    }}
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* newsletter */}
        <div className="newsletter">
          <p className="eyebrow">Stay in the loop</p>
          <h3 style={{ fontSize: "1.6rem", marginTop: 6 }}>Get our weekly update</h3>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 6 }}>
            Fresh menus &amp; rescue stories, once a week. Just pups, no spam 🐾
          </p>
          <NewsletterForm />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
