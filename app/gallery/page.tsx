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
  "/photos/a44623a4-8ad2-438c-ad40-9b776a8a11b7.jpeg",
  "/photos/c292e9fa-8575-4b78-9224-611d537066fb.jpeg",
  "/photos/8be5cd36-1fbf-4ba3-9751-61940c6d9668.jpeg",
  "/photos/ffae3270-42f0-4f5b-b026-05b6c7d80a2d.jpeg",
  "/photos/531928b0-640f-4313-98c8-8146a3d04fec.jpeg",
  "/photos/7527f766-5e85-46fa-bdf6-4d4b8e14ccfe.jpeg",
  "/photos/32ddb287-f8b1-4342-829a-2690c297fc7c.jpeg",
  "/photos/78984ba1-b93c-45bd-be54-c44375d1c97e.jpeg",
  "/photos/0ac3a345-2661-495f-bc94-83c0a96459c6.jpeg",
  "/photos/97fa385b-8920-4791-999b-e04a4ab1fd6c.jpeg",
  "/photos/f2868212-5371-4506-8c89-19b4234ca303.jpeg",
  "/photos/f17a7d19-abb9-48fe-8a6d-7cd378b3b637.jpeg",
  "/photos/c0f29809-bfd6-471d-b0d3-eda21d793763.jpeg",
  "/stray-gallery/61c62691-bfde-4af3-aa98-6f38afd50224.JPG",
];

/* Founders */
const FOUNDERS = [
  {
    name: "Destinee Ray Jones",
    role: "Co-founder",
    bio: 'Nicknamed "Dr Doolittle" from a young age. Destinee has spent years rescuing, rehabilitating and rehoming over 100 animals across Mauritius while pursuing her Medical degree. The heart and soul of Paw Pack Pantry.',
    initials: "DJ",
    accent: "var(--amber-soft)",
  },
  {
    name: "Daniel Freitag",
    role: "Co-founder",
    bio: "The logistics force and steadfast partner. Daniel brings the muscle, the dedication, and a passion for animal welfare that only grows with every rescue. Equal parts backbone and big heart.",
    initials: "DF",
    accent: "var(--neutral)",
  },
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

        {/* ===== MEET THE FOUNDERS ===== */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="eyebrow">The humans behind the mission</p>
            <h2 style={{ fontSize: "2rem", marginTop: 6 }}>Meet the Founders</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18, maxWidth: 720, margin: "0 auto" }}>
            {FOUNDERS.map((f, i) => (
              <div
                key={f.name}
                className="card"
                style={{ alignItems: "center", gap: 16, padding: "28px 20px", textAlign: "center" }}
              >
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: f.accent, display: "grid", placeItems: "center", border: "5px solid var(--white)", boxShadow: "0 8px 20px -10px rgba(74,53,40,.35)", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.3rem", color: "var(--ink)" }}>
                  {f.initials}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.25rem" }}>{f.name}</p>
                  <span className="pill" style={{ marginTop: 4 }}>{f.role}</span>
                </div>
                <p style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".88rem", lineHeight: 1.6 }}>{f.bio}</p>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 18 }}>
            {TEAM.map((m, i) => (
              <div
                key={m.name}
                className="card"
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
