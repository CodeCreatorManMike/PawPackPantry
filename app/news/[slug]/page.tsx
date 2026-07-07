import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { supabase, type NewsPost } from "@/lib/supabase";

const PLACEHOLDER_POSTS: NewsPost[] = [
  {
    id: "1", slug: "welcome-to-the-pack", published: true, created_at: "",
    title: "Welcome to the Pack — Paw Pack Pantry Launches in Mauritius",
    body: "We're so excited to have you here!\n\nAt Paw Pack Pantry, we are more than just a supplier of gourmet Pet Meals & Treats — we believe every meal should do more than satisfy an empty bowl. It should nourish. It should bring joy. And it should make a difference.\n\nThat's why every recipe we create is lovingly prepared using carefully selected ingredients to support your pet's health while helping us work towards something much bigger than pet food.\n\nOur promise has always been simple: Every meal is Packed With Purpose.\n\nMauritius is home to thousands of stray dogs and cats who struggle every day to find food, safety, and care. That's why a portion of every purchase helps support our StreetSmart Campaign — funding our long-term mission of making a difference in the lives of Strays across the island.\n\nOur mission goes beyond the bowl. When you shop with us, you're not simply feeding your own pet — you're helping to feed, sterilise, rehabilitate, rehome and advocate for the Strays of Mauritius.\n\nYou're becoming part of a community determined to create lasting change — one paw, one meal, and one life at a time.\n\nMark your calendar!\n1 July — Paw Pack Pantry goes live & pre-orders open.\n15 July — Our kitchen officially opens and the first meals begin making their way to happy tails across Mauritius.\n\nWith love,\nDestinee & Daniel\nFounders of Paw Pack Pantry\nPacked With Purpose",
    date: "2026-06-30", image_url: null,
  },
  {
    id: "2", slug: "luna-has-spoken", published: true, created_at: "",
    title: "Luna Has Spoken — Our Launch Menu is Here & Pre-Orders Are Open",
    body: "After plenty of sniffing, taste testing, and enthusiastic tail wags, our Professional Taste Tester, Luna, has officially given her paw of approval…\n\nThe Paw Pack Pantry Launch Menu has arrived!\n\nAnd even more exciting… Pre-orders are OPEN from 1 July!\n\nFrom today you can officially reserve your pet's favourite meals before our pantry opens on 15 July.\n\nWhat's On The Launch Menu?\nWhether your pet enjoys fresh cooked meals, raw feeding, or simply deserves a tasty treat, there's something for every wagging tail:\n\n🐾 The Pawfect Pawtions — Fresh gourmet cooked meals made to order.\n🐾 The Rawr Packs — Balanced frozen raw meals packed and portioned for convenience.\n🐾 The Treat Pantry — Homemade biscuits, pawsicles, jerky, chew sticks, gummies and training treats.\n🐾 The Pantry Staples — Bone broth, gravies, sprinkles and healthy meal toppers.\n🐾 The Birfday Pantry — Celebrate birthdays with pupcakes and special celebration feasts.\n🐾 The Stray Packs — Sponsor meals and care for Mauritius' strays through our StreetSmart Campaign.\n\nOrdering Is Easy:\n1. Browse our launch menu.\n2. Send us your order via WhatsApp, including your pet's name, meal selections and preferred collection or delivery option.\n3. Complete payment via bank transfer or cash on collection/delivery.\n4. We'll freshly prepare your order.\n5. We'll deliver your order or have it ready for collection.\n\nDelivery Across Mauritius:\nWe deliver every week across Mauritius.\n🚗 Sunday Afternoon — North & East\n🚗 Monday Morning — Port Louis, Centre, West & South\n\nWe also offer convenient collection points throughout the island on select days of the week, as well as collection directly from us in Pereybere. Full collection locations and times are available on our website.\n\nOur StreetSmart Campaign Starts Today:\nFriday isn't just about opening pre-orders. It's also the beginning of something much bigger. From today, you can also sponsor meals for Mauritius' stray dogs through our StreetSmart Campaign. Every order and every sponsorship helps us work towards feeding, rehabilitating and supporting the island's stray animals.\n\nEvery order truly is… Packed With Purpose.\n\nWith love,\nDestinee, Daniel & Luna\nFounders of Paw Pack Pantry",
    date: "2026-07-01", image_url: null,
  },
  {
    id: "3", slug: "every-bowl-can-change-a-life", published: true, created_at: "",
    title: "Every Bowl Can Change a Life — Introducing the StreetSmart Campaign",
    body: "At Paw Pack Pantry, we often say that every meal is Packed With Purpose. But what does that really mean?\n\nIt means that every time you choose Paw Pack Pantry, you're doing more than feeding your own pet. You're helping the Stray community in Mauritius.\n\nToday, we're incredibly proud to introduce the StreetSmart Campaign — the heart of everything we hope to achieve.\n\nOur vision has never been to simply make gourmet pet food. Our vision is to create a sustainable and lasting impact for the thousands of stray dogs and cats across Mauritius that deserve a second chance.\n\nMore Than a Campaign:\nStreetSmart is our long-term commitment to improving the lives of stray animals across Mauritius. As the campaign grows, our goal is to support:\n\n🐾 Daily stray feeding programmes\n🐾 Sterilisation initiatives\n🐾 Veterinary care and rehabilitation\n🐾 Community education on responsible pet ownership\n🐾 Partnerships with local rescuers and animal welfare organisations\n\nEvery meal purchased helps us move one step closer to those goals.\n\nOur First Mission:\nOne of our very first goals is to establish a StreetSmart Sponsorship Pool — a fund dedicated to providing consistent meals for stray dogs across the island.\n\nAlongside this, we're launching our Feeder Pack — a community of compassionate volunteers who want to help us reach more hungry animals by assisting with daily feeding routes in different regions of Mauritius.\n\nOur Launch Promise:\nFor every pre-order placed before our official opening day on 15 July, Paw Pack Pantry will personally feed one additional stray dog every day for one month.\n\nWhen you place a pre-order, you're not only preparing a healthy meal for your own pet. You're also helping another dog receive a month of nourishment and care.\n\nHow You Can Help:\n❤️ Place a pre-order.\n❤️ Sponsor a stray meal.\n❤️ Sponsor a month's worth of meals.\n❤️ Sponsor a StreetSmart Starter Pack to help provide veterinary care, deworming and sterilisation.\n❤️ Join our Feeder Pack as a volunteer.\n❤️ Share our mission with friends and family.\n\nNo act of kindness is ever too small. Together, those small acts become extraordinary change.\n\nPaw Pack Pantry started with one simple belief: Every animal deserves a full belly, a healthy life, and the chance to be loved.\n\nWith your support, we're turning that belief into action. One bowl. One life. One community.\n\nWith love,\nDestinee & Daniel\nFounders of Paw Pack Pantry\nPacked With Purpose",
    date: "2026-07-02", image_url: null,
  },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = PLACEHOLDER_POSTS.find(p => p.slug === slug);
  const title = post ? `${post.title} — Paw Pack Pantry` : "News — Paw Pack Pantry";
  const description = post ? post.body.slice(0, 160) : "Latest news from Paw Pack Pantry Mauritius.";
  return {
    title,
    description,
    openGraph: { title, description, images: ["/logos/logo.png"] },
    keywords: ["Paw Pack Pantry", "dog food Mauritius", "homemade pet meals", "stray rescue Mauritius", "StreetSmart campaign"],
  };
}

export function generateStaticParams() {
  return PLACEHOLDER_POSTS.map((p) => ({ slug: p.slug }));
}

async function getPost(slug: string) {
  try {
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 2500)
    );
    const queryPromise = supabase
      .from("news_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    const result = await Promise.race([queryPromise, timeoutPromise]);
    if (!result || !("data" in result)) return null;
    return result.data;
  } catch {
    return null;
  }
}

function renderNewsBody(body: string) {
  const blocks = body.split("\n\n");
  return blocks.map((block, i) => {
    const lines = block.split("\n");
    const first = lines[0];

    // Sign-off
    if (first.startsWith("With love,")) {
      return (
        <div key={i} style={{ marginTop: 32, paddingTop: 24, borderTop: "2px dotted var(--cream-deep)", display: "flex", flexDirection: "column", gap: 3 }}>
          {lines.map((l, j) => (
            <p key={j} style={{
              fontFamily: j === 1 ? "var(--font-head)" : "var(--font-body)",
              fontWeight: j === 1 ? 700 : 500,
              fontSize: j === 0 ? "1rem" : j === 1 ? "1.1rem" : ".9rem",
              color: j === 1 ? "var(--ink)" : "var(--ink-soft)",
              fontStyle: j === 0 ? "italic" : "normal",
              marginBottom: 0,
            }}>{l}</p>
          ))}
        </div>
      );
    }

    // Calendar highlight block
    if (first === "Mark your calendar!") {
      return (
        <div key={i} style={{ background: "var(--amber-soft)", borderRadius: 14, padding: "16px 20px", marginBottom: 18 }}>
          <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 10 }}>Mark your calendar!</p>
          {lines.slice(1).map((l, j) => (
            <p key={j} style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".95rem", color: "var(--ink)", lineHeight: 1.6, marginBottom: 4 }}>{l}</p>
          ))}
        </div>
      );
    }

    // Heading + body combo (first line ends with ":" and is short)
    if (lines.length > 1 && first.endsWith(":") && first.length < 70) {
      const rest = lines.slice(1);
      const isAllBullets = rest.every(l => /^[🐾❤️🚗]/.test(l));
      const isNumbered = rest.every(l => /^\d+\./.test(l));
      return (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)", marginBottom: 10, marginTop: 8 }}>
            {first.slice(0, -1)}
          </h3>
          {isAllBullets ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {rest.map((l, j) => <li key={j} style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>{l}</li>)}
            </ul>
          ) : isNumbered ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rest.map((l, j) => {
                const m = l.match(/^(\d+)\.\s*(.*)/);
                if (!m) return <p key={j} style={{ color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.7, marginBottom: 0 }}>{l}</p>;
                return (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: ".82rem", background: "var(--amber-soft)", borderRadius: "50%", width: 24, height: 24, display: "grid", placeItems: "center", flexShrink: 0, marginTop: 2 }}>{m[1]}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.7 }}>{m[2]}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            rest.map((l, j) => <p key={j} style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--ink-soft)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: 6 }}>{l}</p>)
          )}
        </div>
      );
    }

    // Pure emoji bullet block
    if (lines.every(l => /^[🐾❤️🚗]/.test(l))) {
      return (
        <ul key={i} style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {lines.map((l, j) => <li key={j} style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>{l}</li>)}
        </ul>
      );
    }

    // Regular paragraph
    return <p key={i} style={{ marginBottom: 18, color: "var(--ink-soft)", fontWeight: 500, lineHeight: 1.8, fontSize: "1.05rem" }}>{block}</p>;
  });
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbPost = await getPost(slug);
  const post = dbPost ?? PLACEHOLDER_POSTS.find(p => p.slug === slug) ?? null;
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
          <div style={{ marginTop: 24 }}>
            {renderNewsBody(post.body)}
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
