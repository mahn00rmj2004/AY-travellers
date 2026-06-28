import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TourCard from "@/components/TourCard";

const northernTours = [
  { image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop", badge:"Best Seller", badgeColor:"gold" as const, title:"Hunza Valley", subtitle:"7 Days Premium Tour", meta:["🚐 AC Coach","🏔️ Viewpoints","🏨 Guesthouses"], price:"PKR 65,000" },
  { image:"https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80&auto=format&fit=crop", badge:"Adventure", badgeColor:"teal" as const, title:"Skardu & Deosai", subtitle:"8 Days Trekking Tour", meta:["🏕️ Camp Nights","🥾 Trek","🌄 K2 Views"], price:"PKR 75,000" },
  { image:"https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80&auto=format&fit=crop", badge:"Family", badgeColor:"dark" as const, title:"Swat Valley & Kalam", subtitle:"5 Days Family Tour", meta:["🏨 Hotel","🌊 Waterfalls","🌿 Lush Green"], price:"PKR 38,000" },
  { image:"https://images.unsplash.com/photo-1433838552652-f9a551b596c9?w=800&q=80&auto=format&fit=crop", badge:"Expedition", badgeColor:"teal" as const, title:"K2 Base Camp Trek", subtitle:"16 Days · Expert Guided", meta:["🏕️ Camping","🥾 Guide","🏔️ K2 Views"], price:"PKR 185,000" },
  { image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&auto=format&fit=crop", badge:"Popular", badgeColor:"gold" as const, title:"Naran & Kaghan Valley", subtitle:"4 Days Family Trip", meta:["🚐 Transport","🏨 Hotel","🌊 Lake Saif-ul-Malook"], price:"PKR 28,000" },
  { image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop", badge:"Cultural", badgeColor:"dark" as const, title:"Chitral & Kalash Valley", subtitle:"6 Days Cultural Tour", meta:["🎎 Kalash Culture","🏔️ Tirich Mir","🏨 Guesthouse"], price:"PKR 52,000" },
];

const heritageTours = [
  { image:"https://images.unsplash.com/photo-1599240211563-17b7b4e92ef5?w=800&q=80&auto=format&fit=crop", badge:"Heritage", badgeColor:"gold" as const, title:"Lahore City Tour", subtitle:"3 Days Culture & Food", meta:["🏰 Badshahi Mosque","🏨 4-Star","🍽️ Meals Incl."], price:"PKR 22,000" },
  { image:"https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80&auto=format&fit=crop", badge:"History", badgeColor:"teal" as const, title:"Islamabad & Taxila", subtitle:"3 Days Capital Tour", meta:["🏛️ Faisal Mosque","🏺 Museum","🏨 Hotel"], price:"PKR 18,000" },
  { image:"https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=800&q=80&auto=format&fit=crop", badge:"Beach", badgeColor:"dark" as const, title:"Karachi & Clifton", subtitle:"2 Days City Discovery", meta:["🌊 Beaches","🍢 Food Street","🏨 3-Star"], price:"PKR 14,000" },
];

export default function DomesticPage() {
  return (
    <>
      <section className="relative h-[65vh] min-h-[500px] flex items-end">
        <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop" alt="Pakistan Mountains" fill className="object-cover" unoptimized/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E0A] via-green-900/50 to-transparent"/>
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Explore Pakistan</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Beautiful Pakistan<br/><span className="italic text-yellow-300">Awaits You</span>
          </h1>
          <p className="text-white/65 text-[15px] max-w-lg">From K2's majestic peak to Lahore's Mughal heritage — discover the stunning diversity of Pakistan.</p>
        </div>
      </section>

      {/* Quick facts */}
      <div className="bg-green-900 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
          {["🚐 AC Transport Included","🏨 Vetted Accommodations","🥾 Expert Local Guides","📸 Photography Stops","🍽️ Meals Arrangements"].map(f=>(
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
            {northernTours.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i*80}>
                <TourCard {...t} />
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <div className="mb-10">
              <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">🏛️ Heritage & Cities</p>
              <h2 className="font-display text-3xl font-bold text-[#1E2A2A]">Heritage & City Tours</h2>
              <p className="text-stone-400 mt-1 text-[14px]">Mughal forts, ancient civilisations, and vibrant city life.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {heritageTours.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i*80}>
                <TourCard {...t} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1600&q=80&auto=format&fit=crop" alt="Pakistan" fill className="object-cover" unoptimized/>
        <div className="absolute inset-0 bg-teal-900/80"/>
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
