// Paw Pack Pantry price list — July 2026
// Source of truth for invoice line-item pricing. Update here when the monthly menu changes.

export type SizeOption = {
  size: string;
  price: number;
};

export type CatalogItem = {
  id: string;
  category: string;
  name: string;
  sizes: SizeOption[];
  note?: string;
};

export const CATEGORIES = [
  "The Treat Pantry",
  "The Pantry Stables",
  "The Pawfect Pawtions",
  "The Rawr Packs",
  "The Birfday Pantry",
  "The Stray Packs",
] as const;

export const CATALOG: CatalogItem[] = [
  // The Treat Pantry
  { id: "bone-appetit-biscuits", category: "The Treat Pantry", name: "Bone Appétit Biscuits", sizes: [{ size: "S", price: 250 }, { size: "L", price: 350 }] },
  { id: "fishy-fin-biscuits", category: "The Treat Pantry", name: "Fishy Fin Biscuits", sizes: [{ size: "S", price: 260 }, { size: "L", price: 410 }] },
  { id: "good-dog-sweethearts", category: "The Treat Pantry", name: "'Good Dog!' Sweethearts", sizes: [{ size: "S", price: 230 }, { size: "L", price: 360 }] },
  { id: "pawsicles", category: "The Treat Pantry", name: "Pawsicles", sizes: [{ size: "S", price: 280 }, { size: "L", price: 500 }] },
  { id: "chicken-jerky", category: "The Treat Pantry", name: "Chicken Jerky", sizes: [{ size: "", price: 340 }] },
  { id: "veg-chew-sticks", category: "The Treat Pantry", name: "Apple, Zucchini & Carrot Chew Sticks", sizes: [{ size: "S", price: 220 }, { size: "L", price: 310 }] },

  // The Pantry Stables
  { id: "breath-mints", category: "The Pantry Stables", name: "Breath Mints", sizes: [{ size: "", price: 400 }] },
  { id: "bone-broth-gummies", category: "The Pantry Stables", name: "Bone Broth Gummies", sizes: [{ size: "S", price: 220 }, { size: "L", price: 450 }] },
  { id: "allergy-support-chewies", category: "The Pantry Stables", name: "Allergy Support Chewies", sizes: [{ size: "", price: 360 }] },
  { id: "training-treats", category: "The Pantry Stables", name: "Training Treats", sizes: [{ size: "XS", price: 125 }, { size: "S", price: 250 }, { size: "L", price: 300 }] },
  { id: "gravy", category: "The Pantry Stables", name: "Gravy", sizes: [{ size: "300ml", price: 250 }, { size: "500ml", price: 330 }] },
  { id: "bone-broth", category: "The Pantry Stables", name: "Bone Broth", sizes: [{ size: "300ml", price: 260 }, { size: "500ml", price: 340 }] },
  { id: "snouty-sprinkles", category: "The Pantry Stables", name: "Snouty Sprinkles", sizes: [{ size: "", price: 220 }] },

  // The Pawfect Pawtions (meals)
  { id: "cluckin-good-bowl", category: "The Pawfect Pawtions", name: "Cluckin' Good Bowl", sizes: [{ size: "250g", price: 260 }, { size: "500g", price: 380 }, { size: "750g", price: 500 }, { size: "1kg", price: 590 }] },
  { id: "beefy-bark-bowl", category: "The Pawfect Pawtions", name: "Beefy Bark Bowl", sizes: [{ size: "250g", price: 290 }, { size: "500g", price: 410 }, { size: "750g", price: 540 }, { size: "1kg", price: 670 }] },
  { id: "fintastic-bowl", category: "The Pawfect Pawtions", name: "Fintastic Bowl", sizes: [{ size: "250g", price: 240 }, { size: "500g", price: 330 }, { size: "750g", price: 410 }, { size: "1kg", price: 500 }] },
  { id: "shredded-chicken-broth", category: "The Pawfect Pawtions", name: "Shredded Chicken in Broth / Puppy Pop", sizes: [{ size: "150g", price: 220 }, { size: "300g", price: 300 }, { size: "450g", price: 390 }, { size: "600g", price: 440 }] },
  { id: "beef-mince-broth", category: "The Pawfect Pawtions", name: "Beef Mince in Broth", sizes: [{ size: "150g", price: 250 }, { size: "300g", price: 380 }, { size: "450g", price: 480 }, { size: "600g", price: 590 }] },
  { id: "veg-pawtions", category: "The Pawfect Pawtions", name: "Veg Pawtions", sizes: [{ size: "150g", price: 190 }, { size: "300g", price: 220 }, { size: "450g", price: 260 }, { size: "600g", price: 290 }] },

  // The Rawr Packs
  { id: "coop-to-bowl", category: "The Rawr Packs", name: "Coop-to-Bowl", sizes: [{ size: "250g", price: 220 }, { size: "500g", price: 350 }, { size: "750g", price: 430 }, { size: "1kg", price: 580 }] },
  { id: "catch-of-the-month", category: "The Rawr Packs", name: "Catch of the Month", sizes: [{ size: "250g", price: 270 }, { size: "500g", price: 380 }, { size: "750g", price: 470 }, { size: "1kg", price: 560 }] },
  { id: "tbone-pack", category: "The Rawr Packs", name: "T-Bone Pack", sizes: [{ size: "250g", price: 300 }, { size: "500g", price: 460 }, { size: "750g", price: 610 }, { size: "1kg", price: 730 }] },
  { id: "build-your-own-rawr", category: "The Rawr Packs", name: "Build Your Own Rawr Pack", sizes: [{ size: "250g", price: 250 }, { size: "500g", price: 360 }, { size: "750g", price: 490 }, { size: "1kg", price: 650 }] },

  // The Birfday Pantry
  { id: "birfday-feast", category: "The Birfday Pantry", name: "Mighty-Meaty Birfday Feast", sizes: [{ size: "", price: 395 }] },
  { id: "pupcakes", category: "The Birfday Pantry", name: "Pupcakes", sizes: [{ size: "6 pk", price: 350 }], note: "Confirm price if 12 pk requested" },

  // The Stray Packs (StreetSmart sponsorship)
  { id: "sponsor-meal", category: "The Stray Packs", name: "Sponsor a Meal for a Stray", sizes: [{ size: "", price: 65 }] },
  { id: "sponsor-month", category: "The Stray Packs", name: "Sponsor Meals for a Stray — 1 Month", sizes: [{ size: "", price: 950 }] },
  { id: "sponsor-starter-pack", category: "The Stray Packs", name: "Sponsor a StreetSmart Starter Pack", sizes: [{ size: "", price: 1500 }] },
];

export function findCatalogPrice(itemId: string, size: string): { name: string; price: number } | null {
  const item = CATALOG.find(i => i.id === itemId);
  if (!item) return null;
  const match = item.sizes.find(s => s.size === size) ?? item.sizes[0];
  if (!match) return null;
  return { name: item.name, price: match.price };
}

export const DEFAULT_DELIVERY_FEE = 100;

export const BANK_DETAILS = {
  bank: "Absa Mauritius",
  accountName: "DR Jones",
  branchCode: "011",
  accountNumber: "0114080918",
  swiftCode: "BARCMUMU",
};
