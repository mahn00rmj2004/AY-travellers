import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Shield, Award, Users, Clock, Star, CheckCircle } from "lucide-react";

const team = [
  { name:"Sheikh Sufyan Abdullah, Zubi ", role:"CEO & Founder", img:"images/aboutus/p4.png" },
  { name:"Habib ur Rehman ", role:"Head of Hajj & Umrah", img:"images/aboutus/p1.png" },
  { name:" Anwar Ahmed ", role:"International Tours Manager", img:"images/aboutus/p2.png" },
  { name:"Saqib Muhammad Afraz", role:"Customer Relations", img:"images/aboutus/p3.png" },
];

const values = [
  { icon:"🤝", title:"Trust & Integrity", text:"We build relationships on honesty and transparency — no hidden fees, no surprise charges, ever." },
  { icon:"❤️", title:"Genuine Care", text:"Every client is treated like family. Your journey matters to us as much as it matters to you." },
  { icon:"🌟", title:"Excellence", text:"We constantly raise the bar on service quality, hotel selection, and travel experiences." },
  { icon:"🕌", title:"Spiritual Respect", text:"Hajj & Umrah are sacred duties — we handle them with the reverence and attention they deserve." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center">
        <Image src="/images/banners/aboutus.jpg" alt="About AY Travel" fill className="object-cover" sizes="100vw"/>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 to-teal-700/50"/>
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Turning Dreams Into<br/><span className="italic text-yellow-300">Unforgettable Journeys</span>
          </h1>
          <p className="text-white/70 text-[15px] max-w-lg">At AY Travel & Tours, we don't just book trips — we craft spiritual experiences. As Pakistan's most reliable pilgrimage partner, we ensure every traveler steps into the Haram with complete peace of mind.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-teal-700 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[["15+","Years in Business"],["8,000+","Pilgrims Served"],["50+","Destinations"],["98%","Satisfaction"]].map(([v,l])=>(
            <div key={l}><div className="font-display text-3xl font-bold text-yellow-300">{v}</div><div className="text-white/50 text-[12px] uppercase tracking-wide mt-1">{l}</div></div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-3">Who We Are</p>
            <h2 className="font-display text-4xl font-bold text-[#1E2A2A] mb-5">More Than a Travel Agency</h2>
            <p className="text-stone-500 text-[15px] leading-relaxed mb-5">AY Travel & Tours was founded in Karachi in 2009 with a simple promise: to make travel accessible, memorable, and stress-free for every Pakistani family. What began as a small team of passionate travel enthusiasts has grown into one of Pakistan's most trusted travel agencies.</p>
            <p className="text-stone-500 text-[15px] leading-relaxed mb-8">Our team has personally visited most destinations we offer — so when we recommend a hotel, a route, or an experience, we do so with genuine knowledge and passion. From sacred Hajj pilgrimages to breathtaking northern Pakistan adventures, every journey we plan carries our personal commitment to excellence.</p>
            <div className="grid grid-cols-2 gap-4">
              {[["✈️","IATA Accredited"],["🌙","Umrah Specialists"],["📞","24/7 Support"] , ["📅","Flexible Departures"]].map(([icon,label])=>(
                <div key={label} className="flex items-center gap-3 bg-teal-50 rounded-xl p-4">
                  <span className="text-xl">{icon}</span>
                  <span className="font-semibold text-[13.5px] text-teal-700">{label}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
            <div className="grid grid-cols-2 gap-3">
              <Image src="/images/aboutus/ab1.jpg" alt="Makkah" width={300} height={350} className="rounded-2xl object-cover w-full h-72 shadow-lg" unoptimized/>
              <div className="flex flex-col gap-3 mt-6">
                <Image src="/images/aboutus/ab2.jpg" alt="Skardu" width={300} height={160} className="rounded-2xl object-cover w-full h-[140px] shadow-lg" unoptimized/>
                <Image src="/images/aboutus/ab3.jpg" alt="airline" width={300} height={160} className="rounded-2xl object-cover w-full h-[140px] shadow-lg" unoptimized/>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-cream-dark">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">What Drives Us</p>
            <h2 className="font-display text-4xl font-bold text-[#1E2A2A]">Our Core Values</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i*80}>
                <div className="bg-white rounded-2xl p-7 border border-stone-100 shadow-sm hover:shadow-lg transition-shadow text-center">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-semibold text-[15px] text-[#1E2A2A] mb-2">{v.title}</h3>
                  <p className="text-stone-400 text-[13.5px] leading-relaxed">{v.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">Meet the Experts</p>
            <h2 className="font-display text-4xl font-bold text-[#1E2A2A]">Our Leadership Team</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <AnimateOnScroll key={m.name} delay={i*80}>
                <div className="text-center group">
                  <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white ring-2 ring-teal-100 group-hover:ring-teal-400 transition-all">
                    <Image src={m.img} alt={m.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized/>
                  </div>
                  <h3 className="font-semibold text-[15px] text-[#1E2A2A]">{m.name}</h3>
                  <p className="text-teal-600 text-[12.5px] font-medium">{m.role}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-teal-800 text-white text-center">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-bold mb-4">Ready to Travel With Us?</h2>
          <p className="text-white/60 mb-8 text-[15px]">Free consultation with our travel experts. No obligations.</p>
          <Link href="/contact" className="bg-yellow-400 text-[#1E2A2A] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-xl text-[15px]">
            Get in Touch →
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}
