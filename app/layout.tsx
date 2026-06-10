import type { Metadata } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Paw Pack Pantry — Packed with Purpose",
  description:
    "Gourmet homemade pet meals & treats, hand-cooked in Mauritius. A share of every order feeds and cares for strays — our StreetSmart mission.",
  openGraph: {
    title: "Paw Pack Pantry",
    description: "Packed with Purpose — homemade pet meals & treats in Mauritius",
    images: ["/logos/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${quicksand.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
