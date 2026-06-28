import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TourCard from "@/components/TourCard";

const regions = [
  {
    name:"Middle East", emoji:"🌙",
    tours:[
      { image:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop", badge:"Popular", badgeColor:"gold" as const, title:"Dubai & Abu Dhabi", subtitle:"UAE · 7 Days All-Inclusive", meta:["🏙️ Burj Khalifa","🏨 4-Star","🎡 Desert Safari"], price:"$850" },
      { image:"https://images.unsplash.com/photo-1539818816354-37c0f85e0621?w=800&q=80&auto=format&fit=crop", badge:"Heritage", badgeColor:"teal" as const, title:"Jordan — Petra & Dead Sea", subtitle:"8 Days Cultural Tour", meta:["🏛️ Petra City","🌊 Dead Sea Float","🏨 4-Star"], price:"$1,100" },
      { image:"https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80&auto=format&fit=crop", badge:"Combo", badgeColor:"dark" as const, title:"Bahrain & Qatar", subtitle:"5 Days Combo Tour", meta:["🏎️ F1 Circuit","🏨 4-Star","🌆 Skyline"], price:"$650" },
    ]
  },
  {
    name:"Europe", emoji:"🗺️",
    tours:[
      { image:"https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80&auto=format&fit=crop", badge:"Best Seller", badgeColor:"gold" as const, title:"Turkey & Cappadocia", subtitle:"10 Days · Hot Air Balloon", meta:["🎈 Balloon Ride","🏨 5-Star","🌊 Bosphorus"], price:"$1,200" },
      { image:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80&auto=format&fit=crop", badge:"Group Tour", badgeColor:"teal" as const, title:"Paris, Amsterdam & Brussels", subtitle:"12 Days Escorted Tour", meta:["🗼 Eiffel Tower","🚂 Rail Pass","🏨 4-Star"], price:"$2,400" },
      { image:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&auto=format&fit=crop", badge:"Premium", badgeColor:"dark" as const, title:"London & Scotland", subtitle:"10 Days · UK Visa Assist", meta:["🎡 London Eye","🏰 Edinburgh","🏨 4-Star"], price:"$2,800" },
    ]
  },
  {
    name:"Asia", emoji:"🌏",
    tours:[
      { image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop", badge:"Honeymoon", badgeColor:"gold" as const, title:"Maldives & Sri Lanka", subtitle:"8 Days · Water Bungalow", meta:["🤿 Snorkelling","🏨 5-Star","🌴 Beaches"], price:"$1,800" },
      { image:"https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=800&q=80&auto=format&fit=crop", badge:"Culture", badgeColor:"teal" as const, title:"Malaysia & Thailand", subtitle:"9 Days Combo", meta:["🛕 Temples","🍜 Street Food","🏨 4-Star"], price:"$1,050" },
      { image:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&auto=format&fit=crop", badge:"City Break", badgeColor:"dark" as const, title:"Singapore & Kuala Lumpur", subtitle:"7 Days · Gardens by the Bay", meta:["🌃 Night Safari","🏙️ Petronas","🏨 4-Star"], price:"$1,350" },
    ]
  },
];

export default function InternationalPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[450px] flex items-end pb-0">
        <Image src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80&auto=format&fit=crop" alt="World Travel" fill className="object-cover" unoptimized/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A4A] via-blue-900/50 to-transparent"/>
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Around the Globe</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            International<br/><span className="italic text-yellow-300">Tour Packages</span>
          </h1>
          <p className="text-white/65 text-[15px] max-w-lg">Visa assistance included. All-inclusive packages across 30+ countries — crafted by experts who've been there.</p>
        </div>
      </section>

      {/* Features strip */}
      <div className="bg-[#0A1A4A] py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
          {["✅ Visa Assistance","✈️ Best Airfares","🏨 Handpicked Hotels","🎫 All Inclusive","📞 24/7 Support"].map(f=>(
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
                  <AnimateOnScroll key={t.title} delay={i*80}>
                    <TourCard {...t} />
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
