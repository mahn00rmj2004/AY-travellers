"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { CheckCircle } from "lucide-react";

const packages = {
  hajj: [
    { name:"Economy", price:"PKR 1,250,000", badge:"Standard", color:"from-teal-800 to-teal-900", inclusions:["Return Air Ticket (PIA)","Mina Camp Accommodation","Hotel Near Haram (Sharing)","All Meals During Hajj Days","Saudi Hajj Visa Processing","Pre-Departure Training Sessions"] },
    { name:"Premium", price:"PKR 1,750,000", badge:"Most Popular", color:"from-gold-700 to-gold-800", inclusions:["Business Class Option Available","4-Star Hotel, 200m from Haram","Private Room Accommodation","Full Board Meals Included","Dedicated Group Guide","All Ziyarat Tours Included"] },
    { name:"VIP", price:"PKR 2,500,000", badge:"Luxury", color:"from-[#1A2A5A] to-[#0D1A3A]", inclusions:["Business Class Flights","5-Star Hotel, Walking to Haram","Luxury Suite Rooms","Private Transport Throughout","Personal Guide & Coordinator","All Ziyarat + Special Access"] },
  ],
  umrah: [
    { name:"Economy", price:"PKR 195,000", badge:"Budget", color:"from-teal-700 to-teal-900", inclusions:["Return Air Ticket","3-Star Hotel Accommodation","Shared Room (4 Persons)","Breakfast Included","Group Ziyarat Tour","Saudi Visa Processing"] },
    { name:"Silver", price:"PKR 290,000", badge:"Popular", color:"from-slate-600 to-slate-800", inclusions:["Return Air Ticket","4-Star Hotel Near Haram","Double Room Accommodation","Breakfast & Dinner","Guided Ziyarat Tours","Saudi Visa & Insurance"] },
    { name:"Gold", price:"PKR 420,000", badge:"Premium", color:"from-gold-600 to-gold-800", inclusions:["Direct Return Flights","5-Star Hotel, Haram View","Private Room (Couple/Single)","Full Board All Meals","VIP Ziyarat Private Tour","Visa, Insurance & Airport VIP"] },
  ],
};

const itinerary = [
  { days:"Days 1–3", title:"Arrival in Madinah", desc:"Check-in to hotel, Ziyarat of Masjid Nabawi, historical sites visit, orientation briefing." },
  { days:"Days 4–8", title:"Makkah — Spiritual Preparation", desc:"Enter Ihram, perform Tawaf & Sa'ee, settle near Haram, attend pre-Hajj briefings." },
  { days:"Day 9", title:"Arafat — Wuqoof", desc:"The most important day of Hajj. Stand on the plains of Arafat from noon until sunset in du'a." },
  { days:"Day 10", title:"Muzdalifah, Mina & Eid", desc:"Collect pebbles at Muzdalifah, Rami al-Jamarat, Qurbani, Tawaf al-Ifadah, Eid celebrations." },
  { days:"Days 11–13", title:"Ayyam at-Tashriq", desc:"Remaining Rami rituals at Mina, final Tawaf al-Wida, visit Madinah if not done, return home." },
];

export default function HajjPage() {
  const [active, setActive] = useState<"hajj"|"umrah">("hajj");
  return (
    <>
      <section className="relative h-[65vh] min-h-[500px] flex items-end pb-0">
        <Image src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1600&q=80&auto=format&fit=crop" alt="Makkah" fill className="object-cover" unoptimized/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E1E] via-teal-900/60 to-transparent"/>
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Sacred Journeys</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Hajj & Umrah<br/><span className="italic text-yellow-300">Packages 2025</span>
          </h1>
          <p className="text-white/65 text-[15px] max-w-lg">Every detail handled with care and devotion — so you can focus entirely on worship.</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-0 bg-white border border-stone-200 rounded-2xl overflow-hidden w-fit mb-12 shadow-sm">
            {(["hajj","umrah"] as const).map(t => (
              <button key={t} onClick={() => setActive(t)}
                className={`px-10 py-3.5 text-[13.5px] font-semibold transition-all capitalize ${active===t ? "bg-teal-600 text-white" : "text-stone-400 hover:text-teal-600"}`}>
                {t === "hajj" ? "🕌 Hajj" : "🌙 Umrah"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {packages[active].map((pkg, i) => (
              <AnimateOnScroll key={pkg.name} delay={i*100}>
                <div className="rounded-2xl overflow-hidden border border-stone-100 shadow-md hover:shadow-xl transition-shadow">
                  <div className={`bg-gradient-to-br ${pkg.color} p-7 relative overflow-hidden`}>
                    <div className="absolute right-4 top-4 text-[60px] opacity-20">🕌</div>
                    <span className="text-[10px] font-bold bg-white/15 text-white px-3 py-1 rounded-full uppercase tracking-wider">{pkg.badge}</span>
                    <h3 className="font-display text-2xl font-bold text-white mt-3">{pkg.name} Package</h3>
                    <p className="text-3xl font-bold text-yellow-300 mt-2">{pkg.price}</p>
                    <p className="text-white/50 text-[12px]">per person</p>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">What's Included</p>
                    <ul className="space-y-3 mb-6">
                      {pkg.inclusions.map(inc => (
                        <li key={inc} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="text-teal-600 mt-0.5 flex-shrink-0"/>
                          <span className="text-[13.5px] text-stone-600">{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="block w-full text-center bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-800 transition-colors">
                      Enquire Now →
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Itinerary */}
          {active === "hajj" && (
            <AnimateOnScroll>
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8">
                <h3 className="font-display text-3xl font-bold text-[#1E2A2A] mb-8">Hajj Itinerary Overview</h3>
                <div className="space-y-0">
                  {itinerary.map((item, i) => (
                    <div key={item.days} className={`flex gap-6 py-6 ${i < itinerary.length-1 ? "border-b border-stone-100" : ""}`}>
                      <div className="flex-shrink-0 w-24 h-14 rounded-xl bg-yellow-50 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wide">Day</span>
                        <span className="font-display font-bold text-[#1E2A2A] text-sm leading-tight">{item.days.replace("Days ","").replace("Day ","")}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[15px] text-[#1E2A2A] mb-1">{item.title}</h4>
                        <p className="text-[13.5px] text-stone-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-teal-800 text-white text-center">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-bold mb-3">Register for Hajj 2025</h2>
          <p className="text-white/60 mb-8 text-[15px]">Limited seats available. Early registration is strongly recommended.</p>
          <Link href="/contact" className="bg-yellow-400 text-[#1E2A2A] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-xl text-[15px]">
            Register Now →
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}
