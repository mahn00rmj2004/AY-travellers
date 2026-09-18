import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

// ── helpers ────────────────────────────────────────────────────────────────
const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parsePrice = (s: string): number | null => {
  if (/not available/i.test(s)) return null;
  const n = parseInt(s.replace(/[^0-9]/g, ""), 10);
  return Number.isNaN(n) ? null : n;
};

const lowestPrice = (
  entries: { price: string }[]
): { display: string; num: number | null } => {
  let best: { display: string; num: number } | null = null;
  for (const { price } of entries) {
    const num = parsePrice(price);
    if (num === null) continue;
    if (!best || num < best.num) best = { display: price, num };
  }
  return { display: best?.display ?? "", num: best?.num ?? null };
};

const slugFor = (title: string, subtitle?: string | null): string =>
  slugify(`${title} ${subtitle ?? ""}`);

// ── source data (app/international/page.tsx) ───────────────────────────────
const internationalRegions = [
  {
    name: "Southeast Asia",
    tours: [
      { image: "/images/international/m1.jpg", badge: "Culture", badgeColor: "teal", title: "Malaysia", subtitle: "6 Months Multiple Entry Visa", meta: ["🛕 Batu Caves", "🍜 Street Food", "🏨 4-Star"], price: "PKR 19,000" },
      { image: "/images/international/m2.jpg", badge: "Urgent", badgeColor: "gold", title: "Malaysia", subtitle: "Urgent Processing (72h) Visa", meta: ["🛕 Batu Caves", "🍜 Street Food", "🏨 4-Star"], price: "PKR 35,000" },
      { image: "/images/international/t1.jpg", badge: "Luxury", badgeColor: "gold", title: "Thailand", subtitle: "2 Months Tourist Visa", meta: ["🤿 Snorkelling", "🏨 5-Star", "🌴 Beaches"], price: "PKR 20,000" },
      { image: "/images/international/t2.jpg", badge: "Transit", badgeColor: "teal", title: "Thailand", subtitle: "2 Months Transit Visa", meta: ["🤿 Snorkelling", "🏨 5-Star", "🌴 Beaches"], price: "PKR 22,000" },
      { image: "/images/international/t3.jpg", badge: "Transit", badgeColor: "teal", title: "Thailand", subtitle: "Double Entry Transit Visa", meta: ["🤿 Snorkelling", "🏨 5-Star", "🌴 Beaches"], price: "PKR 35,000" },
      { image: "/images/international/t4.jpg", badge: "Multiple", badgeColor: "gold", title: "Thailand", subtitle: "Tourist Multiple Entry Visa", meta: ["🤿 Snorkelling", "🏨 5-Star", "🌴 Beaches"], price: "PKR 75,000" },
      { image: "/images/international/t5.jpg", badge: "Adventure", badgeColor: "teal", title: "Indonesia", subtitle: "90 Days Tourist Visa", meta: ["🌋 Volcanoes", "🛕 Temples", "🏨 4-Star"], price: "PKR 35,000" },
    ],
  },
  {
    name: "Central Asia",
    tours: [
      { image: "/images/international/u.jpg", badge: "Heritage", badgeColor: "teal", title: "Uzbekistan", subtitle: "Normal Visa", meta: ["🕌 Registan", "🛒 Bazaars", "🏨 4-Star"], price: "PKR 30,000" },
      { image: "/images/international/u1.jpg", badge: "Heritage", badgeColor: "teal", title: "Uzbekistan", subtitle: "Urgent Visa", meta: ["🕌 Registan", "🛒 Bazaars", "🏨 4-Star"], price: "PKR 38,000" },
    ],
  },
  {
    name: "West Asia",
    tours: [
      { image: "/images/international/a.jpg", badge: "City Break", badgeColor: "dark", title: "Azerbaijan", subtitle: "Normal Visa", meta: ["🔥 Flame Towers", "🏰 Old City", "🌊 Caspian Sea"], price: "PKR 15,500" },
      { image: "/images/international/a1.jpg", badge: "City Break", badgeColor: "dark", title: "Azerbaijan", subtitle: "Urgent Visa (5 to 10 hours)", meta: ["🔥 Flame Towers", "🏰 Old City", "🌊 Caspian Sea"], price: "PKR 25,000" },
    ],
  },
];

// ── source data (app/domestic/page.tsx) ────────────────────────────────────
const domesticTours = [
  {
    image: "/images/domestic/d1.jpg",
    badge: "Adventure",
    title: "Skardu & Deosai",
    subtitle: "5 Days · 4 Nights",
    meta: ["🏕️ Camp Nights", "🥾 Trek", "🌄 K2 Views"],
    pricing: [
      { occupancy: "Single", price: "PKR 179,000" },
      { occupancy: "Double", price: "PKR 101,500" },
      { occupancy: "Triple", price: "PKR 78,000" },
      { occupancy: "Quad", price: "PKR 77,000" },
    ],
    priceNote: "Without Air Ticket (Per Person)",
    inclusions: [
      "Activities excluded",
      "Entry fees excluded",
      "Complimentary breakfast",
      "Lunch/Dinner on request",
    ],
    bookHref: "/book/skardu-deosai",
  },
];

// ── source data (app/hajj/page.tsx → packages.umrah only) ──────────────────
const umrahPackages = [
  {
    name: "Economy",
    badge: "Budget",
    color: "from-teal-700 to-teal-900",
    services: "Visa - Ticket - Transport",
    options: [
      { type: "Sharing", price: "PKR 285,000" },
      { type: "Quad", price: "PKR 290,000" },
      { type: "Triple", price: "PKR 305,000" },
      { type: "Double", price: "PKR 325,000" },
    ],
    inclusions: [
      "Return Air Ticket",
      "3-Star Hotel Accommodation",
      "Accommodation(Depends on Package)",
      "Group Tours",
      "Saudi Visa Processing",
    ],
  },
  {
    name: "Silver",
    badge: "Popular",
    color: "from-slate-600 to-slate-800",
    services: "Visa - Ticket - Transport",
    options: [
      { type: "Sharing", price: "PKR 305,000" },
      { type: "Quad", price: "PKR 316,000" },
      { type: "Triple", price: "PKR 340,000" },
      { type: "Double", price: "PKR 382,000" },
    ],
    inclusions: [
      "Return Air Ticket",
      "4-Star Hotel Near Haram",
      "Accommodation(Depends on Package)",
      "Group Tours",
      "Saudi Visa Processing",
    ],
  },
  {
    name: "Gold",
    badge: "Premium",
    color: "from-amber-500 to-amber-700",
    services: "Visa - Ticket - Transport",
    options: [
      { type: "Sharing", price: "not available" },
      { type: "Quad", price: "PKR 312,000" },
      { type: "Triple", price: "PKR 335,000" },
      { type: "Double", price: "PKR 378,000" },
    ],
    inclusions: [
      "Return Air Ticket",
      "5-Star Hotel, Haram View",
      "Accommodation(Depends on Package)",
      "VIP Private Tour",
      "Saudi Visa Processing",
    ],
  },
];

// ── build package records ──────────────────────────────────────────────────
type Json = Prisma.InputJsonValue;

interface PackageData {
  title: string;
  slug: string;
  subtitle: string | null;
  category: string;
  region: string | null;
  image: string | null;
  badge: string | null;
  badgeColor: string | null;
  priceDisplay: string | null;
  priceNote: string | null;
  bookHref: string | null;
  isPublished: boolean;
  pricePerPerson: number | null;
  durationDays: number | null;
  meta: Json | null;
  details: Json | null;
}

const data: PackageData[] = [];

const usedSlugs = new Map<string, number>();

const uniqueSlug = (title: string, subtitle: string | null): string => {
  let slug = slugFor(title, subtitle);
  const count = usedSlugs.get(slug) ?? 0;
  if (count > 0) slug = `${slug}-${count + 1}`;
  usedSlugs.set(slugFor(title, subtitle), count + 1);
  return slug;
};

for (const region of internationalRegions) {
  for (const t of region.tours) {
    const price = parsePrice(t.price);
    data.push({
      title: t.title,
      slug: uniqueSlug(t.title, t.subtitle),
      subtitle: t.subtitle,
      category: "international",
      region: region.name,
      image: t.image,
      badge: t.badge,
      badgeColor: t.badgeColor,
      priceDisplay: t.price,
      priceNote: null,
      bookHref: null,
      isPublished: true,
      pricePerPerson: price,
      durationDays: null,
      meta: t.meta,
      details: null,
    });
  }
}

for (const t of domesticTours) {
  const lowest = lowestPrice(t.pricing);
  const daysMatch = t.subtitle?.match(/(\d+)\s*Days/i);
  data.push({
    title: t.title,
    slug: uniqueSlug(t.title, t.subtitle),
    subtitle: t.subtitle,
    category: "domestic",
    region: null,
    image: t.image,
    badge: t.badge,
    badgeColor: null,
    priceDisplay: lowest.display || t.pricing[0]?.price || null,
    priceNote: t.priceNote,
    bookHref: t.bookHref,
    isPublished: true,
    pricePerPerson: lowest.num,
    durationDays: daysMatch ? parseInt(daysMatch[1], 10) : null,
    meta: t.meta,
    details: {
      pricing: t.pricing,
      inclusions: t.inclusions,
    },
  });
}

for (const p of umrahPackages) {
  const lowest = lowestPrice(p.options);
  const title = `${p.name} Package`;
  data.push({
    title,
    slug: uniqueSlug(title, p.services),
    subtitle: p.services,
    category: "hajj",
    region: null,
    image: null,
    badge: p.badge,
    badgeColor: null,
    priceDisplay: lowest.display || null,
    priceNote: null,
    bookHref: null,
    isPublished: true,
    pricePerPerson: lowest.num,
    durationDays: null,
    meta: null,
    details: {
      services: p.services,
      color: p.color,
      options: p.options,
      inclusions: p.inclusions,
    },
  });
}

// ── seed ───────────────────────────────────────────────────────────────────
async function main() {
  await prisma.package.deleteMany({});
  const { count } = await prisma.package.createMany({
    data: data.map(({ details, meta, ...rest }) => ({
      ...rest,
      meta: meta === null ? Prisma.DbNull : (meta as Prisma.InputJsonValue),
      details: details === null ? Prisma.DbNull : (details as Prisma.InputJsonValue),
    })),
  });
  console.log(`Seeded ${count} packages`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });