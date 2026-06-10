import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PawScatter from "@/components/PawScatter";
import { supabase, type GalleryItem } from "@/lib/supabase";

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

/* Static photos from /public/photos for initial display */
const STATIC_PACK = [
  "15bf4229-c85a-4f77-ac74-927cedc33c22",
  "181c4e1f-31de-481f-bae9-9ddf8ca59a18",
  "187e265d-d7d8-4718-9989-7b76c054ae94",
  "43a81cdc-1598-4678-bc54-1c57781ddefb",
  "4a648c1b-eff1-43f2-8c4f-390cd714ca22",
  "5b8a8755-f9bf-4223-9d10-1f40d4d80283",
  "5be7484e-c715-4359-ba66-65b42fa2b790",
  "84f0eaae-13c2-4750-8450-88d6bbe8a47b",
  "96a26de5-4f88-4c8f-ad8c-e1d3cdb082c1",
  "b5cb37f8-32dc-4dfb-916c-173eebfb2405",
  "19beaea3-ad48-452e-8f31-277f0702f31c",
  "62a3280a-2dd8-4815-9406-e78556ba1f2d",
  "a6c21158-8984-49df-bbfd-8a48f019309e",
  "bc1dc31e-61d7-4076-bb87-3d76d6d21f71",
  "dffe42ab-a47b-4ec7-a9d0-4b0f279520f7",
  "ebae1757-dac6-44d9-ac9c-e607607da760",
  "42fe986c-2485-4f27-b54f-905430d76b00",
  "8282e557-9f15-46e8-8c64-e062b8b0f86e",
];

/* Team mascots */
const TEAM = [
  {
    name: "Tigger",
    role: "Mr Trouble — OG Street King",
    bio: "You'll find me prowling the streets, sizing up anyone 4 times my size. I like to eat, sleep and cause havoc. Basically the modern day Garfield.",
    emoji: "😼",
    accent: "var(--blush-soft)",
  },
  {
    name: "Luna",
    role: "Professional Taste Tester",
    bio: "I test & taste every new creation before it goes out for orders. NO foul tastes around here — every meal is Luna APPROVED. I'm the Frenchie, after all.",
    emoji: "🐶",
    accent: "var(--peach-soft)",
  },
  {
    name: "Daisy",
    role: "The Secretary",
    bio: "I'm prim & proper but I don't take nonsense. Rescued off the highway at 4 weeks old. Somewhere deep down I truly love them.",
    emoji: "🐱",
    accent: "var(--sage-soft)",
  },
  {
    name: "Molly",
    role: "Official Health & Safety Officer",
    bio: "I joined the pack in 2024 when Dest & Dan rescued me and my 6 pups from trash bags on the side of the road. We're all living happily now.",
    emoji: "🐕",
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

        {/* ===== MEET THE TEAM ===== */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="eyebrow">The crew behind the kitchen</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Meet the Team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 18 }}>
            {TEAM.map((m, i) => (
              <div
                key={m.name}
                className={`card ${i % 2 ? "tilt-r" : "tilt-l"}`}
                style={{ textAlign: "center", alignItems: "center", gap: 12, padding: "24px 16px" }}
              >
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: m.accent, display: "grid", placeItems: "center", fontSize: "2.6rem", border: "5px solid var(--white)", boxShadow: "0 8px 20px -10px rgba(74,53,40,.35)" }}>
                  {m.emoji}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.3rem" }}>{m.name}</p>
                  <span className="pill" style={{ marginTop: 4 }}>{m.role}</span>
                </div>
                <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".88rem", lineHeight: 1.6 }}>{m.bio}</p>
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
              {dbItems.filter(i => i.type === "pack").map((item, i) => (
                <div key={item.id} className={`sticker ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ overflow: "hidden", borderRadius: 20, aspectRatio: "1", position: "relative" }}>
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
              {STATIC_PACK.map((id, i) => (
                <div key={id} className={`sticker ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ overflow: "hidden", borderRadius: 20, aspectRatio: "1", position: "relative" }}>
                  <Image
                    src={`/photos/${id}.jpeg`}
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
                <div key={item.id} className={`card ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ gap: 14 }}>
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
