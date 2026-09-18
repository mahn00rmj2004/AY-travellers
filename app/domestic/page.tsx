"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { CheckCircle } from "lucide-react";
import { slugify } from "@/lib/slugify";

const northernTours = [
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
  },
];

export default function DomesticPage() {
  const [selectedOccupancy, setSelectedOccupancy] = useState<{ [key: string]: number }>({});

  const handleOccupancy = (tourTitle: string, idx: number) => {
    setSelectedOccupancy(prev => ({ ...prev, [tourTitle]: idx }));
  };

  return (
    <>
      <section className="relative h-[65vh] min-h-[500px] flex items-end">
        <Image src="/images/banners/domestic.jpg" alt="Pakistan Mountains" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E0A] via-green-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Explore Pakistan</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Beautiful Pakistan<br /><span className="italic text-yellow-300">Awaits You</span>
          </h1>
          <p className="text-white/65 text-[15px] max-w-lg">From K2's majestic peak to Lahore's Mughal heritage — discover the stunning diversity of Pakistan.</p>
        </div>
      </section>

      {/* Quick facts */}
      <div className="bg-green-900 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
          {["🚐 AC Transport Included", "🏨 Vetted Accommodations", "🥾 Expert Local Guides", "📸 Photography Stops", "🍽️ Meals Arrangements"].map(f => (
            <span key={f} className="text-white/70 text-[13px] font-medium">{f}</span>
          ))}
        </div>
      </div>

      <section className="py-20 px-6 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="mb-10">
              <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">🏔️ Northern Pakistan</p>
              <h2 className="font-display text-3xl font-bold text-[#1E2A2A]">Northern Pakistan</h2>
              <p className="text-stone-400 mt-1 text-[14px]">Some of the world's most dramatic mountain scenery, right here at home.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {northernTours.map((tour, i) => {
              const activeIdx = selectedOccupancy[tour.title] || 0;
              const activePrice = tour.pricing[activeIdx];

              return (
                <AnimateOnScroll key={tour.title} delay={i * 80}>
                  <div className="rounded-2xl overflow-hidden border border-stone-100 shadow-md hover:shadow-xl transition-shadow bg-white h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image src={tour.image} alt={tour.title} fill className="object-cover" quality={90}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-teal-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {tour.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-display text-xl font-bold text-[#1E2A2A]">{tour.title}</h3>
                      <p className="text-stone-400 text-[13px] mb-3">{tour.subtitle}</p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {tour.meta.map(m => (
                          <span key={m} className="text-[11px] bg-stone-50 text-stone-500 px-2.5 py-1 rounded-lg">{m}</span>
                        ))}
                      </div>

                      {/* Occupancy Dropdown */}
                      <div className="mb-4">
                        <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 block">Select Occupancy</label>
                        <select
                          value={activeIdx}
                          onChange={(e) => handleOccupancy(tour.title, Number(e.target.value))}
                          className="w-full text-[13px] border border-stone-200 rounded-xl px-3 py-2.5 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          {tour.pricing.map((p, idx) => (
                            <option key={idx} value={idx}>{p.occupancy} — {p.price}</option>
                          ))}
                        </select>
                      </div>

                      {/* Inclusions */}
                      <ul className="space-y-2 mb-5">
                        {tour.inclusions.map(inc => (
                          <li key={inc} className="flex gap-2 items-start">
                            <CheckCircle size={13} className="text-teal-600 mt-0.5 flex-shrink-0" />
                            <span className="text-[12.5px] text-stone-500">{inc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Price */}
                      <div className="mt-auto pt-4 border-t border-stone-100">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-2xl font-bold text-teal-700">{activePrice.price}</span>
                            <p className="text-[11px] text-stone-400 mt-0.5">{tour.priceNote}</p>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link href={`/book/${slugify(tour.title, tour.subtitle)}`} className="block w-full text-center bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-800 transition-colors mt-4 text-[13px]">
                        Book Now →
                      </Link>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <Image src="/images/banners/domestic2.jpg" alt="Attabad Lake" fill className="object-cover" />
        <div className="absolute inset-0 bg-teal-900/80" />
        <div className="relative text-center text-white">
          <AnimateOnScroll>
            <h2 className="font-display text-4xl font-bold mb-3">Can't Find Your Destination?</h2>
            <p className="text-white/60 mb-8 text-[15px]">We arrange custom domestic tours for any group size. Just tell us where you want to go.</p>
            <Link href="/contact" className="bg-yellow-400 text-[#1E2A2A] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-xl text-[15px]">
              Plan a Custom Tour →
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}