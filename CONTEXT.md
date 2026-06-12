# Paw Pack Pantry — Full Project Context

> **AI assistant reference document.** Read this before making any changes. It contains the full design system, every page, every component, all decisions made, and the complete request history. Treat this as the single source of truth alongside the source code.

---

## 1. The Brand

**Paw Pack Pantry** — gourmet homemade pet meals & treats, hand-cooked in **Mauritius**.
A portion of every order funds the **StreetSmart Campaign** — feeding, sterilising, and caring for stray animals across the island.

- **Tagline:** *Packed with Purpose* / *Serving meals with purpose, one paw at a time.*
- **Hashtag:** `#packedwithpurpose`
- **Voice:** warm, purposeful, community-minded, playful but not silly. No emojis in headings or tab labels.
- **Location:** Mauritius

### Founders
| Person | Role | Email |
|---|---|---|
| Destinee Ray Jones ("Dr Doolittle") | Co-founder, heart & brain | d.r.jones@pawpackpantry.com |
| Daniel Freitag ("Dan the Man") | Co-founder, muscle & logistics | d.p.freitag@pawpackpantry.com |

### Team mascots (used in Gallery/About)
| Name | Role | Animal |
|---|---|---|
| Tigger | Mr Trouble — OG Street King | Cat |
| Luna | Professional Taste Tester | French Bulldog |
| Daisy | The Secretary | Cat (rescued from highway at 4 weeks) |
| Molly | Health & Safety Officer | Dog (rescued with 6 pups from trash bags, 2024) |

---

## 2. Contact Details

| Channel | Detail |
|---|---|
| **Call** | +230 5823 3897 |
| **WhatsApp** | +230 5823 3898 |
| **Orders email** | orders@pawpackpantry.com |
| **Info email** | info@pawpackpantry.com |
| **Stray support / StreetSmart** | straysupport@pawpackpantry.com |
| **Destinee** | d.r.jones@pawpackpantry.com |
| **Daniel** | d.p.freitag@pawpackpantry.com |
| **Instagram** | @pawpackpantry |
| **TikTok** | @pawpackpantry *(placeholder — real handle TBC)* |
| **WhatsApp order link** | `https://wa.me/23058233898?text=Hi%20Paw%20Pack%20Pantry!%20I%27d%20like%20to%20place%20an%20order` |

---

## 3. Colour Palette

Defined as CSS variables in `app/globals.css`. **Always use these — never invent new hex values.**

### Primary palette

| CSS Variable | Hex | Role |
|---|---|---|
| `--cream` | `#F6F4F0` | Page background |
| `--cream-deep` | `#D5CDC8` | Subtle borders, dotted lines, placeholder lines |
| `--amber` | `#D18244` | Primary accent (orange-brown) |
| `--amber-soft` | `#D8A983` | Softer orange, hover states, sub-bars |
| `--neutral` | `#B4A998` | Greige — secondary accent |
| `--neutral-soft` | `#CCBEAF` | Light neutral — hero nav buttons, cards |
| `--warm-gray` | `#D5CDC8` | Warm grey fills |
| `--brown-dark` | `#8a5a45` | Deep brown accent — StreetSmart tile |
| `--ink` | `#44312B` | Primary text (dark warm brown) |
| `--ink-soft` | `#735240` | Secondary / muted text |
| `--white` | `#ffffff` | Sticker borders, card fills |

### Hero nav specific
| Element | Hex |
|---|---|
| Outer dark container | `#2A1F1A` (deepest brown) |
| Button blocks | `#CCBEAF` (neutral-soft) |
| Button hover | `var(--amber-soft)` / `#D8A983` |

### Old pastel names (kept as aliases — map to new values)
`--blush` → `#D18244` | `--blush-soft` → `#D8A983` | `--peach` → `#D18244` | `--sage` → `#8a5a45` | `--sky` → `#B4A998`

---

## 4. Typography

| Role | Font | Google Fonts variable | Notes |
|---|---|---|---|
| **Brand name** | Gochi Hand | `--font-brand` | Used in nav logo, footer brand name |
| **Headings / tabs** | Fredoka (600–700) | `--font-head` | Gulfs Display substitute (not on GFonts) |
| **Body / subheadings** | Montserrat (400–600) | `--font-body` / `--font-sub` | Marykate substitute |

**Rules:**
- No emojis in headings or tab/tile labels
- Tile sub-labels use `var(--font-body)` at `.7rem`
- Eyebrow labels: `--font-head`, `.68rem`, `letter-spacing: .22em`, `text-transform: uppercase`

**Pending:** Client wants to self-host Gulfs Display, Marykate, Lucky Bones when licensed files are available. Swap `--font-head` and `--font-body` at that point.

---

## 5. Design System

### Sticker primitive
```css
background: white; border: 5px solid white; border-radius: 18px;
box-shadow: 0 10px 26px -10px rgba(68,49,43,.28);
```

### Tilt classes
`.tilt-l` = `rotate(-2.2deg)` | `.tilt-r` = `rotate(2.2deg)` | `.tilt-ll` = `rotate(-3.5deg)` | `.tilt-rr` = `rotate(3.5deg)`

### Welcome text box (hero)
```css
border: 3px solid var(--ink); border-radius: 6px; padding: 16px 28px;
background: white; box-shadow: 4px 4px 0 var(--ink);
```

### Mission text box (below tiles)
```css
border: 3px solid var(--ink); border-radius: 10px; padding: 26px 30px;
background: white; box-shadow: 4px 4px 0 var(--cream-deep);
```

### Buttons (`.btn`)
- Rounded pills: `border-radius: 999px; border: 4px solid white`
- `.btn.dark` → `background: var(--ink); color: var(--cream)`
- `.btn.muted` → `background: var(--neutral); color: var(--ink)`
- `.btn.sage` → `background: var(--brown-dark); color: white`

### Logo animation
`animation: bob 3.5s ease-in-out infinite` — gentle float up/down

---

## 6. Site Architecture

### Tech stack
| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS + inline `style={}` props (CSS variables) |
| Backend | Supabase |
| Hosting | Vercel (auto-deploy on `git push main`) |
| Fonts | Google Fonts via `next/font/google` |

### Repository
- **GitHub:** `https://github.com/CodeCreatorManMike/PawPackPantry.git`
- **Branch:** `main`
- **Vercel:** `https://paw-pack-pantry.vercel.app`

### Environment variables (in Vercel dashboard + `.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=https://rnyfdjndvsbbmfdpgqjn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_BaRWfytv4zRTMyCzMxq1qQ_Wr68XZN-
NEXT_PUBLIC_ADMIN_PASSWORD=PawPack2026!   ← change this
```

> ⚠️ The `sb_secret_` key was accidentally shared in chat — **regenerate it** in Supabase → Settings → API.

---

## 7. Pages

| Route | File | Type | Purpose |
|---|---|---|---|
| `/` | `app/page.tsx` | Static | Home — hero + tile grid + mission box + newsletter |
| `/menu` | `app/menu/page.tsx` | Static | Full menu — all product categories |
| `/gallery` | `app/gallery/page.tsx` | Server (Supabase) | Team mascots + photo grid + testimonies |
| `/streetsmart` | `app/streetsmart/page.tsx` | Static | Mission, sponsor tiers, mission gallery |
| `/news` | `app/news/page.tsx` | Server (Supabase) | News archive with placeholder posts |
| `/news/[slug]` | `app/news/[slug]/page.tsx` | Dynamic | Individual news post |
| `/admin` | `app/admin/page.tsx` | Client | Password-protected CMS panel — NOT linked anywhere |

---

## 8. Components

| File | What it does |
|---|---|
| `components/SiteNav.tsx` | Sticky top nav: Paw Pack Pantry logo | Home | The Pantry | StreetSmart | News | Contact | Order Now button |
| `components/SiteFooter.tsx` | Dark brown footer: brand col, explore links, contact details, bottom bar |
| `components/HeroNav.tsx` | Hero squared-block nav buttons: dark `#2A1F1A` outer, `#CCBEAF` light blocks, 6 direct links, no dropdowns |
| `components/HomeTiles.tsx` | 8 inline-expanding tile grid (main home interaction) |
| `components/PawScatter.tsx` | Decorative scattered sticker PNGs (paws, bones, stars) |
| `components/NewsletterForm.tsx` | Email capture → Supabase `newsletter_subscribers` table |

---

## 9. Home Page Layout (top to bottom)

```
[SiteNav — sticky]

[HERO]
  Floating logo (bob animation)
  Welcome text box (thick brown border)
    "Welcome to Paw Pack Pantry — where every meal is homemade
     with love in Mauritius and packed with purpose!"
  HeroNav bar
    [#2A1F1A dark outer] [#CCBEAF light blocks]:
    HOME | THE PANTRY | STREETSMART CAMPAIGN | NEWS | ORDER NOW | CONTACT US
  ── bottom of hero ──
  "TAP ANY TILE TO PEEK INSIDE"
  "Welcome to the Pantry" (h2, peeks at bottom of viewport)

[MAIN]
  "Have a sniff around" (sub-label)
  8-tile grid (2 rows of 4, reflows 3/2/1 on mobile)
  Mission text box (wide sticker box)
    "We sell a variety of delicious gourmet pet meals..."
  Newsletter box
    "JOIN THE PACK / Get our weekly newsletter..."

[SiteFooter]
```

---

## 10. The 8 Tiles (HomeTiles.tsx)

Each tile expands an inline detail panel below its row. The panel has a coloured top border matching the tile accent.

| # | Tile title | Accent colour | Sub-label | Full page link |
|---|---|---|---|---|
| 1 | About Us | `#D8A983` amber-soft | Our story & mission | — |
| 2 | Our Products | `#D18244` amber | Menu · Reviews · Meal breakdown | `/menu` |
| 3 | Place an Order | `#B4A998` neutral | How to order · Delivery · WhatsApp | — |
| 4 | StreetSmart Campaign | `#8a5a45` brown-dark | Sponsor a stray · Latest campaign | `/streetsmart` |
| 5 | Stray Gallery | `#D5CDC8` warm-gray | Rescue stories & happy pups | `/gallery` |
| 6 | Latest News | `#D8A983` amber-soft | Weekly updates from the kitchen | `/news` |
| 7 | Contact Us | `#CCBEAF` neutral-soft | Get in touch · Collaborate | — |
| 8 | Join the Pack | `#B4A998` neutral | Instagram · WhatsApp · TikTok | — |

### Tile content detail

**About Us** — Two-column layout: left = shortened bio text, right = inset "Our Mission" box + closing statement. No "vet approved" language.

**Our Products** — 3 sub-tabs: *The Menu* (6 preview cards) | *Reviews* (4 star cards) | *Meal Breakdown* (macros + ingredient pills).

**Place an Order** — 3 clickable sub-cards: *How to Order* (expands → 3-step flow + bank details copy button) | *Delivery & Collection* (expands → placeholder + WhatsApp link) | *Order Now* (direct WhatsApp link).

**StreetSmart Campaign** — "Learn more" link at top → `/streetsmart`. 4 click-to-reveal info widgets (StreetSmart Starter Pack / Monthly Meal / A Meal for a Stray / Latest Campaign) + 1 link card (Success Stories & Stray Gallery → `/gallery`).

**Stray Gallery** — 6-photo grid from `/public/photos/` + link to full gallery page.

**Latest News** — 3 dated news items + 3 split link cards: *Menu & Operations Updates* | *Latest Stray News* | *Monthly Newsletter*.

**Contact Us** — 4 structured cards: Call/WhatsApp | Emails (orders/info/stray support) | Connect with Founders (Destinee + Daniel) | Socials (Instagram + TikTok).

**Join the Pack** — 3 social link cards: Instagram | WhatsApp | TikTok.

---

## 11. Supabase Schema

Run `supabase-schema.sql` in Supabase SQL Editor to create all tables.

| Table | Key columns | Purpose |
|---|---|---|
| `newsletter_subscribers` | email, created_at | Email capture from newsletter forms |
| `news_posts` | title, slug, body, date, image_url, published | CMS for weekly news posts |
| `menu_items` | name, category, price, description, image_url, active | Optional DB-managed menu (site has hardcoded fallback) |
| `gallery_items` | name, story, image_url, type (pack/testimony/mission), active | DB-managed gallery |

**RLS:** Anon users can SELECT published/active rows and INSERT newsletter subscribers. Admin panel uses the same anon key but adds password check client-side.

---

## 12. Admin Panel (`/admin`)

- URL: `/admin` — **not linked anywhere on the site**
- Password: set via `NEXT_PUBLIC_ADMIN_PASSWORD` env var
- Tabs: News Posts (toggle published) | Menu Items (toggle active) | Gallery (toggle active) | Subscribers (view/delete)
- To add new news posts: use Supabase table editor directly, then toggle `published: true` in the admin panel

---

## 13. Public Assets

```
public/
  logos/
    logo-cutout.png    ← transparent die-cut sticker logo (USE THIS ONE)
    logo.png           ← original white-background version
  stickers/            ← 18 brand sticker PNGs (paws, bones, hearts, etc.)
    paw-blush.png, paw-peach.png, paw-sage.png, paw-sky.png
    bone-peach.png, bone-cream.png, heart-blush.png, star-peach.png
    sparkle-sky.png, bubble-sage.png, bowl-sage.png
    badge-blush.png, badge-peach.png
    pill-blush.png, pill-peach.png, pill-sage.png
    pattern-cream.png, pattern-transparent.png
  photos/              ← ~38 rescue animal JPEGs (UUID filenames)
```

> **Pending:** New logo image from client — swap `logo-cutout.png` when received.

---

## 14. Menu Content (from brand PDF)

### Pawfect Meals
- Beefy Bark Bowl | Cluck Cluck Chicken Bowl | Fish Fin Bowl

### Power Paw Protein Portions
- Steamed Chicken | Steamed Mince / Beef Chunks | Fishy Fillets

### PawPatch Veg & Fruit Pots
- Steamed Pumpkin & Carrot | Pawsome Veg Medley | Furtastic Fruit Medley

### Rawr & Ready (Raw Range)
- Raw Beefy Balls | Raw Beef Chunks | Organs | Chicken Feet/Necks | Fish | Egg | Yogurt | Veg Medley | Frozen Berries/Banana
- Portions: 150g | 250g | 500g

### Mealtime Madness (Toppers)
- Hounds Gold — Pet Gravy | Golden Paw Broth — Bone Broth | Crunchy Boney Sprinkles

### Celebration Goodies
- Pupcakes | Meaty Birthday Plate (chicken/beef/fish, cooked/raw)

### Treats
- Pawsicles | 'Good Dog' Sweethearts Treats | Bone Appétite Biscuits

### Stray Packs (Sponsorship)
- A Meal for a Stray | Feed a Stray for a Month | Adopt & Sponsor Monthly Meals | StreetSmart Starter Pack (sterilisation + de-worming + vet check)

> **Prices:** All listed as `Rs ___` — client to provide actual pricing.

---

## 15. Request History (chronological)

### Session 1 — Initial build
- Reviewed all HTML prototypes (`Paw Pack Pantry.html` v1 accordion + `Paw Pack Pantry v2.html` tile grid)
- Read `DESIGN.md`, `sections-v2.js`, sticker manifest, brand PDF
- Extracted all real content: contact details, menu items, team mascots, about us text, founder bios
- Built full Next.js 15 + Supabase site with 7 routes
- Pushed to GitHub, deployed to Vercel, connected Supabase

### Session 2 — Early tweaks
- Remove "Explore" scroll cue animation
- Tighten hero gap (removed `minHeight: 100svh`)
- Logo bob animation: 6s → 3.5s (faster)
- Products tile: added 3 sub-tabs (Menu / Reviews / Meal Breakdown)

### Session 3 — Meeting brief (major redesign)
Full brief from meeting notes PDF. All implemented:

**Design system:**
- Background changed to `#F6F4F0`
- New ink: `#44312B` / `#735240`
- Removed all bright pastels — replaced with warm amber/neutral/greige palette
- New fonts: Gochi Hand (brand), Fredoka (headings), Montserrat (body)
- Removed all emojis from headings and tab labels

**Hero:**
- Thick brown-bordered welcome text box below logo
- Removed old rounded pill CTAs

**Nav:**
- Renamed: Home | The Pantry | StreetSmart | News | Contact | Order Now

**Tiles (all 8 renamed and rebuilt):**
1. About Us — full shortened bio + inset Mission box, no "vet approved"
2. Our Products — menu/reviews/breakdown tabs, no heading emojis
3. Place an Order (was "How to Order") — 3 sub-link cards
4. StreetSmart Campaign (was "Gallery") — 5 clickable widgets with inline popups + Learn More
5. Stray Gallery (was "StreetSmart") — photo grid
6. Latest News — 3 section split links
7. Contact Us — 4 structured divisions with all emails incl. founders
8. Join the Pack (was "Follow Us") — Instagram/WhatsApp/TikTok

**Footer:**
- New bottom line: "Paw Pack Pantry. Packed with Purpose." | "Made in Mauritius with love."
- Fixed logo visibility
- All emails added (incl. `info@`, `d.r.jones@`, `d.p.freitag@`)
- Explore section nav matches landing headings

### Session 4 — Hero nav redesign
- Client showed wireframe: nav items as squared block buttons below welcome blurb
- Replaced pill CTAs with `HeroNav` component
- First iteration: dark outer with dropdown menus — **rejected**
- Second iteration: dark outer, light block buttons, direct links no dropdowns ✓
- Dark outer: `#2A1F1A` | Button color: `#CCBEAF`
- Removed horizontal line between welcome box and nav
- Hero restored to `minHeight: calc(100svh - 60px)` so "Welcome to the Pantry" peeks at bottom

---

## 16. Pending / Not Yet Received from Client

1. **New logo image** — client said they'd send; swap `public/logos/logo-cutout.png` when received
2. **Pricing** — all menu items listed as `Rs ___`
3. **Delivery / collection info** — full text for the Delivery sub-card in Place an Order tile
4. **StreetSmart widget detailed statements** — popup text for each of the 5 StreetSmart widgets
5. **TikTok real handle** — using `@pawpackpantry` as placeholder
6. **Detailed product info** — meal breakdown per item (macros, ingredients per meal)
7. **StreetSmart campaign info page content** — for the full `/streetsmart` page
8. **Font files** — Gulfs Display, Marykate, Lucky Bones (licensed Canva fonts) for self-hosting

---

## 17. Known Design Rules (do not break)

1. **No emojis in headings, tile titles, or nav labels** — emojis only in body copy if needed
2. **No bright colours** — stick strictly to the palette above
3. **Sticker aesthetic** — white border + soft warm shadow on cards and photo frames
4. **Touch-first** — tap targets ≥ 44px, close buttons inside the grey/dark title area
5. **External links** always use `target="_blank" rel="noopener noreferrer"`
6. **WhatsApp order link** uses `+23058233898` (country code included)
7. **Do not commit `.env.local`** — it is gitignored
8. **Admin panel** `/admin` is never linked from the public site
9. **Font variables:** always use `var(--font-head)` for headings, `var(--font-body)` for body, `var(--font-brand)` for the "Paw Pack Pantry." brand name
10. **Box-shadow style:** `0 10px 26px -10px rgba(68,49,43,.28)` — warm brown shadow, never grey

---

## 18. Deployment

```bash
# Local dev
npm run dev    # http://localhost:3002

# Deploy — just push to main
git add -A && git commit -m "..." && git push

# Vercel auto-deploys on every push to main
# Production: https://paw-pack-pantry.vercel.app
```

To redeploy with new env vars: Vercel dashboard → Deployments → "..." → Redeploy.
