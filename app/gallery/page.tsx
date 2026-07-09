import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PawScatter from "@/components/PawScatter";
import { supabase, type GalleryItem } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Gallery — Paw Pack Pantry",
  description: "Meet the happy pups, rescue heroes and the team behind Paw Pack Pantry. Every photo tells a story of a life well-nourished or a second chance given in Mauritius.",
  openGraph: {
    title: "Gallery — Paw Pack Pantry",
    description: "Happy pups, island rescues and the humans behind the mission. See the Paw Pack Pantry family.",
    images: ["/logos/logo.png"],
  },
  keywords: ["dog rescue Mauritius photos", "Paw Pack Pantry gallery", "rescued animals Mauritius", "pet photos Mauritius"],
};

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

/* Static stray gallery photos — from /public/stray-gallery/ only */
const STATIC_PACK = [
  "/stray-gallery/61c62691-bfde-4af3-aa98-6f38afd50224.JPG",
  "/stray-gallery/38A6AEA4-9E2E-4BDF-8755-CC5381D9826E.jpg",
  "/stray-gallery/7CF2FE1E-A841-454A-94DB-A8226BC6DC97.jpg",
  "/stray-gallery/BA56CE3B-A9D3-42C9-B5D1-82A6D6E6C050.jpg",
  "/stray-gallery/DA46A9E7-B5D5-498C-9C2C-E33482AFC3E4.jpg",
  "/stray-gallery/IMG_5001.jpg",
  "/stray-gallery/IMG_5770.jpg",
];

/* Founders */
const FOUNDERS = [
  {
    name: "Destinee Ray Jones",
    role: "Co-founder",
    bio: 'Nicknamed "Dr Doolittle" from a young age. Destinee has spent years rescuing, rehabilitating and rehoming over 100 animals across Mauritius while pursuing her Medical degree. The heart and soul of Paw Pack Pantry.',
    image: "/photos/a4fcfe25-c552-450b-a167-c267649cecc4.jpeg",
    accent: "var(--amber-soft)",
  },
  {
    name: "Daniel Freitag",
    role: "Co-founder",
    bio: "The logistics force and steadfast partner. Daniel brings the muscle, the dedication, and a passion for animal welfare that only grows with every rescue. Equal parts backbone and big heart.",
    image: "/photos/068e34f2-a9d4-4f78-a580-4b8bb3e0d850.jpeg",
    accent: "var(--neutral)",
  },
];

/* Team mascots */
const TEAM = [
  {
    name: "Tigger",
    role: "Mr Trouble — OG Street King",
    bio: "You'll find me prowling the streets, sizing up anyone 4 times my size. I like to eat, sleep and cause havoc. Basically the modern day Garfield.",
    image: "/team/tigger.png",
    accent: "var(--blush-soft)",
  },
  {
    name: "Luna",
    role: "Professional Taste Tester",
    bio: "I test & taste every new creation before it goes out for orders. NO foul tastes around here — every meal is Luna APPROVED. I'm the Frenchie, after all.",
    image: "/team/luna.png",
    accent: "var(--peach-soft)",
  },
  {
    name: "Daisy",
    role: "The Secretary",
    bio: "I'm prim & proper but I don't take nonsense. Rescued off the highway at 4 weeks old. Somewhere deep down I truly love them.",
    image: "/team/daisy.png",
    accent: "var(--sage-soft)",
  },
  {
    name: "Molly",
    role: "Official Health & Safety Officer",
    bio: "I joined the pack in 2024 when Dest & Dan rescued me and my 6 pups from trash bags on the side of the road. We're all living happily now.",
    image: "/team/molly.png",
    accent: "var(--sky-soft)",
  },
];

export default async function GalleryPage() {
  const dbItems = await getGalleryItems();

  return (
    <>
      <SiteNav />

      {/* hero */}
      <section
        style={{
          position: "relative", overflow: "hidden",
          background: "var(--cream)", padding: "72px 24px 56px",
          textAlign: "center",
        }}
      >
        <PawScatter />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="eyebrow">Happy pups &amp; rescue heroes</p>
          <h1 style={{ fontSize: "clamp(2.4rem,7vw,4rem)", marginTop: 8 }}>Gallery</h1>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 12, maxWidth: "50ch", margin: "12px auto 0", lineHeight: 1.7 }}>
            Every photo tells a story of a life well-nourished, a second chance given, or a tail that never stopped wagging. 🐾
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 22px 100px" }}>

        {/* ===== MEET THE FOUNDERS ===== */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="eyebrow">The humans behind the mission</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Meet the Founders</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, maxWidth: 720, margin: "0 auto" }}>
            {FOUNDERS.map((f, i) => (
              <div
                key={f.name}
                className="card"
                style={{ alignItems: "center", gap: 12, padding: "20px 16px", textAlign: "center" }}
              >
                <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", border: "4px solid var(--white)", boxShadow: "0 8px 20px -10px rgba(74,53,40,.35)", position: "relative", flexShrink: 0 }}>
                  <Image src={f.image} alt={f.name} fill priority={i === 0} style={{ objectFit: "cover", objectPosition: "top" }} sizes="72px" />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem" }}>{f.name}</p>
                  <span className="pill" style={{ marginTop: 4 }}>{f.role}</span>
                </div>
                <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".85rem", lineHeight: 1.6 }}>{f.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MEET THE TEAM ===== */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="eyebrow">The crew behind the kitchen</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Meet the Team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
            {TEAM.map((m, i) => (
              <div
                key={m.name}
                className="card"
                style={{ textAlign: "center", alignItems: "center", gap: 10, padding: "18px 12px" }}
              >
                <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: "4px solid var(--white)", boxShadow: "0 8px 20px -10px rgba(74,53,40,.35)", position: "relative", flexShrink: 0 }}>
                  <Image src={m.image} alt={m.name} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="64px" />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.05rem" }}>{m.name}</p>
                  <span className="pill" style={{ marginTop: 4 }}>{m.role}</span>
                </div>
                <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".8rem", lineHeight: 1.55, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PHOTO GALLERY ===== */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="eyebrow">The pack</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Our Island Rescues</h2>
            <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 8 }}>
              A few of our special Mauritius rescues — every face has a story.
            </p>
          </div>

          {/* DB items first, then static */}
          {dbItems.filter(i => i.type === "pack").length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
              {dbItems.filter(i => i.type === "pack").map((item) => (
                <div key={item.id} style={{ overflow: "hidden", borderRadius: 20, aspectRatio: "1", position: "relative" }}>
                  <Image src={item.image_url!} alt={item.name} fill style={{ objectFit: "cover" }} sizes="200px" />
                  {item.name && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(74,53,40,.7)", color: "var(--cream)", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: ".85rem", padding: "8px 10px" }}>
                      {item.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
              {STATIC_PACK.map((src) => (
                <div key={src} style={{ overflow: "hidden", borderRadius: 20, aspectRatio: "1", position: "relative" }}>
                  <Image
                    src={src}
                    alt="Island rescue"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width:600px) 44vw, 180px"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ===== TESTIMONIES ===== */}
        {dbItems.filter(i => i.type === "testimony").length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p className="eyebrow">Happy customers</p>
              <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Testimonies</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
              {dbItems.filter(i => i.type === "testimony").map((item, i) => (
                <div key={item.id} className="card" style={{ gap: 14 }}>
                  {item.image_url && (
                    <div style={{ position: "relative", height: 180, borderRadius: 16, overflow: "hidden" }}>
                      <Image src={item.image_url} alt={item.name} fill style={{ objectFit: "cover" }} sizes="260px" />
                    </div>
                  )}
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem" }}>{item.name}</p>
                  {item.story && <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".9rem", lineHeight: 1.6 }}>{item.story}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* share CTA */}
        <div
          style={{
            background: "var(--blush-soft)", border: "6px solid var(--white)",
            borderRadius: 28, padding: "36px 32px", textAlign: "center",
            boxShadow: "0 16px 32px -16px rgba(74,53,40,.4)",
          }}
        >
          <h2 style={{ fontSize: "1.7rem" }}>Share your pup&apos;s story 🐾</h2>
          <p style={{ color: "var(--ink-soft)", fontWeight: 500, marginTop: 8, maxWidth: "46ch", margin: "8px auto 0", lineHeight: 1.6 }}>
            Tag us on Instagram or send us a photo on WhatsApp — we love featuring the pack!
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <a href="https://instagram.com/pawpackpantry" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: "1rem" }}>
              📸 @pawpackpantry
            </a>
            <a href="https://wa.me/23058233898?text=Hi!%20I'd%20love%20to%20share%20my%20pup's%20story%20🐾" target="_blank" rel="noopener noreferrer" className="btn sage">
              💬 Send us a photo
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
