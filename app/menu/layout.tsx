import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu & Pantry — Paw Pack Pantry",
  description: "Browse our full menu of handcrafted pet meals and treats made in Mauritius — gourmet cooked portions, raw packs, biscuits, jerky, bone broth, birthday cakes and more.",
  openGraph: {
    title: "Menu & Pantry — Paw Pack Pantry",
    description: "Gourmet homemade pet meals & treats hand-cooked in Mauritius. Fresh cooked portions, raw packs, biscuits, jerky, bone broth and birthday specials.",
    images: ["/logos/logo.png"],
  },
  keywords: ["homemade dog food Mauritius", "gourmet pet meals Mauritius", "dog treats Mauritius", "raw dog food Mauritius", "pet food delivery Mauritius", "Paw Pack Pantry menu"],
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
