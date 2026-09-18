import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TourCard from "@/components/TourCard";
import { slugify } from "@/lib/slugify";

const regions = [
  {
    name: "Southeast Asia", emoji: "🏝️",
    tours: [
      {
        image: "/images/international/m1.jpg",
        badge: "Culture",
        badgeColor: "teal" as const,
        title: "Malaysia",
        subtitle: "6 Months Multiple Entry Visa",
        meta: ["🛕 Batu Caves", "🍜 Street Food", "🏨 4-Star"],
        price: "PKR 19,000"
      },
      {
        image: "/images/international/m2.jpg",
        badge: "Urgent",
        badgeColor: "gold" as const,
        title: "Malaysia",
        subtitle: "Urgent Processing (72h) Visa",
        meta: ["🛕 Batu Caves", "🍜 Street Food", "🏨 4-Star"],
        price: "PKR 35,000"
      },
      {
        image: "/images/international/t1.jpg",
        badge: "Luxury",
        badgeColor: "gold" as const,
        title: "Thailand",
        subtitle: "2 Months Tourist Visa",
        meta: ["🤿 Snorkelling", "🏨 5-Star", "🌴 Beaches"],
        price: "PKR 20,000"
      },
      {
        image: "/images/international/t2.jpg",
        badge: "Transit",
        badgeColor: "teal" as const,
        title: "Thailand",
        subtitle: "2 Months Transit Visa",
        meta: ["🤿 Snorkelling", "🏨 5-Star", "🌴 Beaches"],
        price: "PKR 22,000"
      },
      {
        image: "/images/international/t3.jpg",
        badge: "Transit",
        badgeColor: "teal" as const,
        title: "Thailand",
        subtitle: "Double Entry Transit Visa",
        meta: ["🤿 Snorkelling", "🏨 5-Star", "🌴 Beaches"],
        price: "PKR 35,000"
      },
      {
        image: "/images/international/t4.jpg",
        badge: "Multiple",
        badgeColor: "gold" as const,
        title: "Thailand",
        subtitle: "Tourist Multiple Entry Visa",
        meta: ["🤿 Snorkelling", "🏨 5-Star", "🌴 Beaches"],
        price: "PKR 75,000"
      },
      {
        image: "/images/international/t5.jpg",
        badge: "Adventure",
        badgeColor: "teal" as const,
        title: "Indonesia",
        subtitle: "90 Days Tourist Visa",
        meta: ["🌋 Volcanoes", "🛕 Temples", "🏨 4-Star"],
        price: "PKR 35,000"
      }
    ]
  },
  {
    name: "Central Asia", emoji: "🏛️",
    tours: [
      {
        image: "/images/international/u.jpg",
        badge: "Heritage",
        badgeColor: "teal" as const,
        title: "Uzbekistan",
        subtitle: "Normal Visa",
        meta: ["🕌 Registan", "🛒 Bazaars", "🏨 4-Star"],
        price: "PKR 30,000"
      },
      {
        image: "/images/international/u1.jpg",
        badge: "Heritage",
        badgeColor: "teal" as const,
        title: "Uzbekistan",
        subtitle: "Urgent Visa",
        meta: ["🕌 Registan", "🛒 Bazaars", "🏨 4-Star"],
        price: "PKR 38,000"
      },
    ]
  },
  {
    name: "West Asia", emoji: "🕌",
    tours: [
      {
        image: "/images/international/a.jpg",
        badge: "City Break",
        badgeColor: "dark" as const,
        title: "Azerbaijan",
        subtitle: "Normal Visa",
        meta: ["🔥 Flame Towers", "🏰 Old City", "🌊 Caspian Sea"],
        price: "PKR 15,500"
      },
      {
        image: "/images/international/a1.jpg",
        badge: "City Break",
        badgeColor: "dark" as const,
        title: "Azerbaijan",
        subtitle: "Urgent Visa (5 to 10 hours)",
        meta: ["🔥 Flame Towers", "🏰 Old City", "🌊 Caspian Sea"],
        price: "PKR 25,000"
      },
    ]
  }
];

export default function InternationalPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[450px] flex items-end pb-0">
        <Image src="/images/banners/international.jpg" alt="World Travel" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A4A] via-blue-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Around the Globe</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            International<br /><span className="italic text-yellow-300">Tour Packages</span>
          </h1>
          <p className="text-white/65 text-[15px] max-w-lg">Visa assistance included. All-inclusive packages across 30+ countries — crafted by experts who've been there.</p>
        </div>
      </section>

      {/* Features strip */}
      <div className="bg-[#0A1A4A] py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
          {["✅ Visa Assistance", "✈️ Best Airfares", "🏨 Handpicked Hotels", "🎫 All Inclusive", "📞 24/7 Support"].map(f => (
            <span key={f} className="text-white/70 text-[13px] font-medium">{f}</span>
          ))}
        </div>
      </div>

      <section className="py-20 px-6 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto">
          {regions.map((region, ri) => (
            <div key={region.name} className="mb-20 last:mb-0">
              <AnimateOnScroll>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">{region.emoji}</span>
                  <div>
                    <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest">Destinations</p>
                    <h2 className="font-display text-3xl font-bold text-[#1E2A2A]">{region.name}</h2>
                  </div>
                </div>
              </AnimateOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {region.tours.map((t, i) => (
                  <AnimateOnScroll key={t.title + t.subtitle + i} delay={i * 80}>
                    <TourCard {...t} bookHref={`/book/${slugify(t.title, t.subtitle)}`} />
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0A1A4A] text-white text-center">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-bold mb-3">Need a Custom International Package?</h2>
          <p className="text-white/50 mb-8 text-[15px]">Tell us your destination, dates and budget — we'll craft the perfect itinerary.</p>
          <Link href="/contact" className="bg-yellow-400 text-[#1E2A2A] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-xl text-[15px]">
            Plan My Trip →
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}