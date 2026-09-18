"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { CheckCircle } from "lucide-react";
import { slugify } from "@/lib/slugify";

const packages = {
  // Hajj data is kept here (not deleted), but it won't be displayed
  hajj: [
    { name: "Economy", price: "PKR 1,250,000", badge: "Standard", color: "from-teal-800 to-teal-900", inclusions: ["Return Air Ticket (PIA)", "Mina Camp Accommodation", "Hotel Near Haram (Sharing)", "All Meals During Hajj Days", "Saudi Hajj Visa Processing", "Pre-Departure Training Sessions"] },
    { name: "Premium", price: "PKR 1,750,000", badge: "Most Popular", color: "from-gold-700 to-gold-800", inclusions: ["Business Class Option Available", "4-Star Hotel, 200m from Haram", "Private Room Accommodation", "Full Board Meals Included", "Dedicated Group Guide", "All Ziyarat Tours Included"] },
    { name: "VIP", price: "PKR 2,500,000", badge: "Luxury", color: "from-[#1A2A5A] to-[#0D1A3A]", inclusions: ["Business Class Flights", "5-Star Hotel, Walking to Haram", "Luxury Suite Rooms", "Private Transport Throughout", "Personal Guide & Coordinator", "All Ziyarat + Special Access"] },
  ],
  umrah: [
    {
      name: "Economy",
      badge: "Budget",
      color: "from-teal-700 to-teal-900",
      services: "Visa - Ticket - Transport",
      options: [
        { type: "Sharing", price: "PKR 285,000" },
        { type: "Quad", price: "PKR 290,000" },
        { type: "Triple", price: "PKR 305,000" },
        { type: "Double", price: "PKR 325,000" }
      ],
      inclusions: [
        "Return Air Ticket",
        "3-Star Hotel Accommodation",
        "Accommodation(Depends on Package)",
        "Group Tours",
        "Saudi Visa Processing"
      ]
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
        { type: "Double", price: "PKR 382,000" }
      ],
      inclusions: [
        "Return Air Ticket",
        "4-Star Hotel Near Haram",
        "Accommodation(Depends on Package)",
        "Group Tours",
        "Saudi Visa Processing"
      ]
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
        { type: "Double", price: "PKR 378,000" }
      ],
      inclusions: [
        "Return Air Ticket",
        "5-Star Hotel, Haram View",
        "Accommodation(Depends on Package)",
        "VIP Private Tour",
        "Saudi Visa Processing"
      ]
    }
  ]
};

export default function HajjPage() {
  // ✅ Default is now "umrah" – Hajj button will never show
  const [active, setActive] = useState<"umrah">("umrah");

  return (
    <>
      <section className="relative h-[65vh] min-h-[500px] flex items-end pb-0">
        <Image src="/images/banners/hajj&Umrah.jpg" alt="Makkah" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E1E] via-teal-900/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Sacred Journeys</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Umrah<br /><span className="italic text-yellow-300">Packages 2026</span>
          </h1>
          <br className="hidden lg:block" />
          <Link href="/umrah" className="bg-yellow-300 text-[#1E2A2A] font-bold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-all shadow-xl text-[15px]">
            Customise Umrah →
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto">
          {/* ✅ Only Umrah button remains – Hajj button is gone */}
          {/* <div className="flex gap-0 bg-white border border-stone-200 rounded-2xl overflow-hidden w-fit mb-12 shadow-sm">
            {(["umrah"] as const).map(t => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-10 py-3.5 text-[13.5px] font-semibold transition-all capitalize ${
                  active === t ? "bg-teal-600 text-white" : "text-stone-400 hover:text-teal-600"
                }`}
              >
                🌙 Umrah
              </button>
            ))}
          </div> */}

          {/* ✅ Umrah packages rendering – unchanged */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {packages.umrah.map((pkg, i) => (
              <AnimateOnScroll key={pkg.name} delay={i * 100}>
                <div className="rounded-2xl overflow-hidden border border-stone-100 shadow-md hover:shadow-xl transition-shadow">
                  <div className={`bg-gradient-to-br ${pkg.color} p-7 relative overflow-hidden`}>
                    <div className="absolute right-4 top-4 text-[60px] opacity-20">🕌</div>
                    <span className="text-[10px] font-bold bg-white/15 text-white px-3 py-1 rounded-full uppercase tracking-wider">{pkg.badge}</span>
                    <h3 className="font-display text-2xl font-bold text-white mt-3">{pkg.name} Package</h3>

                    <p className="text-white/60 text-[11px] mt-2 uppercase tracking-wider">{pkg.services}</p>
                    <div className="mt-3 space-y-1.5">
                      {pkg.options.map(opt => (
                        <div key={opt.type} className="flex justify-between items-center bg-white/10 rounded-lg px-3 py-1.5">
                          <span className="text-white/80 text-[13px]">{opt.type}</span>
                          <span className="text-yellow-300 font-bold text-[13px]">{opt.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">What's Included</p>
                    <ul className="space-y-3 mb-6">
                      {pkg.inclusions.map(inc => (
                        <li key={inc} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-[13.5px] text-stone-600">{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/book/${slugify(`${pkg.name} Package`, pkg.services)}`}
                      className="block w-full text-center bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-800 transition-colors"
                    >
                      Book Now →
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* ❌ Hajj Itinerary section removed completely */}
        </div>
      </section>
    </>
  );
}