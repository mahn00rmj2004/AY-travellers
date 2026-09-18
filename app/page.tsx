"use client";
import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TourCard from "@/components/TourCard";
import { ChevronLeft, ChevronRight, Star, Shield, Award, Phone, Users, MapPin, Plane } from "lucide-react";

const heroSlides = [
  { img: "/images/homebanners/hb-1.jpg", title: "Sacred Journeys to", highlight: "Makkah & Madinah", sub: "Perform Hajj & Umrah with complete peace of mind. Expert guidance, premium hotels, seamless service.", cta: "View Hajj Packages", href: "/hajj" },
  { img: "/images/homebanners/hb-2.jpg", title: "Explore the Wonders of", highlight: "Northern Pakistan", sub: "From Hunza to K2 base camp — discover Pakistan's breathtaking beauty with our guided tours.", cta: "Explore Domestic Tours", href: "/domestic" },
  { img: "/images/homebanners/hb-3.jpg", title: "Discover the World with", highlight: "AY Travel & Tours", sub: "Dubai, Istanbul, Paris and beyond. All-inclusive international packages crafted just for you.", cta: "Browse International Tours", href: "/international" },
  { img: "/images/homebanners/hb-4.jpg", title: "Best Fares on", highlight: "All Major Airlines", sub: "IATA-accredited ticketing for PIA, Emirates, Turkish Airlines, Qatar Airways and more.", cta: "Get Flight Quotes", href: "/ticketing" },
];

const featuredTours = [
  {
    image: "/images/featured-packages/fp-2.jpg",
    badge: "Most Popular",
    badgeColor: "gold" as const,
    title: "Umrah Package — Silver",
    subtitle: "Makkah · Madinah · Ziyarat · 15 Days",
    meta: ["🏨 4-Star Hotel", "📅 15 Days", "🍽️ Breakfast"],
    price: "PKR 290,000",
    bookHref: "/book/silver-package-visa-ticket-transport",
  },
  {
    image: "/images/featured-packages/fp-3.jpg",
    badge: "Heritage",
    badgeColor: "teal" as const,
    title: "Uzbekistan",
    subtitle: "Silk Road Cities",
    meta: ["🕌 Registan", "🛒 Bazaars", "🏨 4-Star"],
    price: "PKR 30,000",
    bookHref: "/book/uzbekistan-normal-visa",
  },
  {
    image: "/images/featured-packages/fp-4.jpg",
    badge: "City Break",
    badgeColor: "dark" as const,
    title: "Azerbaijan | Baku",
    subtitle: "Flame Towers & Old City",
    meta: ["🔥 Flame Towers", "🏰 Old City", "🌊 Caspian Sea"],
    price: "PKR 15,500",
    bookHref: "/book/azerbaijan-normal-visa",
  },
  {
    image: "/images/featured-packages/fp-5.jpg",
    badge: "Adventure",
    badgeColor: "teal" as const,
    title: "Skardu & Deosai",
    subtitle: "Northern Pakistan · 5 Days 4 Nights",
    meta: ["🏕️ Camp Nights", "🥾 Guided Trek", "Quad(Occupancy) "],
    price: "PKR 67,000",
    bookHref: "/book/skardu-deosai-5-days-4-nights",
  },
];

const whyUs = [

  {
    icon: <Users size={22} />, title: "8,000+ Pilgrims", text: "Trusted by thousands of pilgrims for their sacred journeys across the globe."
    , color: "bg-teal-50 text-teal-600"
  },
  { icon: <MapPin size={22} />, title: "50+ Destinations", text: "Curated packages across Middle East, Europe, Southeast Asia, and across beautiful Pakistan.", color: "bg-yellow-50 text-yellow-600" },
  { icon: <Phone size={22} />, title: "24/7 Support", text: "Round-the-clock assistance especially during your travels — we're always one call away.", color: "bg-teal-50 text-teal-600" },
  { icon: <Plane size={22} />, title: "Best Fare Guarantee", text: "We compare fares across all GDS systems to ensure you always get the lowest available price.", color: "bg-yellow-50 text-yellow-600" },
];

const testimonials = [
  { name: "Mehmood Ali", location: "- Rawalpindi", tour: "Umrah Silver Package", rating: 5, text: "I had an excellent experience with AY Travel & Tours for my Umrah journey. Everything was well organized, from visa processing to hotel arrangements and transportation. The staff remained supportive throughout the trip and guided us whenever we needed assistance. Alhamdulillah, it was a smooth and spiritually fulfilling experience. I highly recommend AY Travel & Tours to anyone planning Umrah." },
  { name: "Bilal Ahmed", location: "Karachi", tour: "Hunza Valley Tour", rating: 5, text: "Our Skardu trip with AY Travel & Tours was fantastic. The itinerary was well planned, the transport was comfortable, and the hotels exceeded our expectations. The team ensured everything ran on time, allowing us to enjoy the breathtaking beauty of Skardu without any worries. Looking forward to booking another trip with them soon!" },
  { name: "Ayesha Khan", tour: "Skardu Trip", location: "Islamabad", rating: 5, text: "I recently traveled to Skardu with AY Travel & Tours, and it was an unforgettable experience. Their professionalism, attention to detail, and friendly customer service made the entire journey stress-free. Every destination was worth visiting, and all arrangements were exactly as promised. I would definitely choose AY Travel & Tours again for my future vacations." },
  { name: "Haris Ali", location: "Gilgit", tour: "Umrah Gold Package", rating: 5, text: "I sincerely appreciate AY Travel & Tours for making my Umrah journey comfortable and memorable. From the initial booking process to our return, everything was handled with great care and professionalism. The accommodations were excellent, transportation was punctual, and the staff was always available to help. May Allah bless their team for providing such reliable service. Highly recommended." },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "8,000+", label: "Happy Pilgrims" },
  { value: "50+", label: "Destinations" },
  { value: "98%", label: "Satisfaction Rate" },
];

const airlines = [
  { name: "PIA", flag: "🇵🇰", routes: "Domestic & International" },
  { name: "FlyJinnah", flag: "🇵🇰", routes: "Budget · Domestic & Gulf" },
  { name: "Airblue", flag: "🇵🇰", routes: "Domestic & International" },
  { name: "Etihad", flag: "🇦🇪", routes: "Abu Dhabi Hub" },
  { name: "Emirates", flag: "🇦🇪", routes: "Dubai Hub" },
  { name: "Qatar", flag: "🇶🇦", routes: "Doha Hub" },
  { name: "Saudi", flag: "🇸🇦", routes: "Jeddah · Riyadh" },
  { name: "Thai Airways", flag: "🇹🇭", routes: "Bangkok Hub" },
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => { clearInterval(timer); emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <>
      {/* ── HERO SLIDER ── */}
      <section className="relative h-screen min-h-[600px]">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full">
            {heroSlides.map((s, i) => (
              <div key={i} className="embla__slide h-screen min-h-[600px] relative">
                <Image src={s.img} alt={s.title} fill className="object-cover" priority={i === 0} sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        <span className="text-white/80 text-xs font-medium tracking-wide uppercase">AY Travel & Tours</span>
                      </div>
                      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 text-shadow">
                        {s.title}<br />
                        <span className="text-yellow-300 italic">{s.highlight}</span>
                      </h1>
                      <p className="text-white/75 text-[15px] leading-relaxed mb-8 max-w-md">{s.sub}</p>
                      <div className="flex flex-wrap gap-3">
                        <Link href={s.href} className="bg-yellow-400 text-[#1E2A2A] font-bold px-7 py-3 rounded-xl hover:bg-yellow-300 transition-all shadow-xl hover:shadow-yellow-400/30 text-[14px]">
                          {s.cta} →
                        </Link>
                        <Link href="/contact" className="border border-white/30 text-white font-medium px-7 py-3 rounded-xl hover:bg-white/10 transition-all text-[14px] backdrop-blur-sm">
                          Get Free Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm z-10">
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => emblaApi?.scrollTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "bg-yellow-400 w-7 h-2" : "bg-white/40 w-2 h-2"}`} />
          ))}
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-teal-800/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-bold text-yellow-300">{s.value}</div>
                <div className="text-white/50 text-[11px] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      {/* <section className="bg-teal-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-5">
            {[
              { icon: "🕌", label: "Hajj & Umrah", href: "/hajj" },
              { icon: "✈️", label: "International", href: "/international" },
              { icon: "🏔️", label: "Domestic Tours", href: "/domestic" },
              { icon: "🎫", label: "Ticketing", href: "/ticketing" },
              { icon: "📞", label: "Contact Us", href: "/contact" },
            ].map(s => (
              <Link key={s.href} href={s.href} className="flex flex-col items-center gap-1.5 py-5 px-3 border-r border-white/15 last:border-0 hover:bg-teal-700 transition-colors group">
                <span className="text-2xl group-hover:scale-110 transition-transform">{s.icon}</span>
                <span className="text-white/80 text-[11.5px] font-medium text-center">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── FEATURED TOURS ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">Handpicked For You</p>
                <h2 className="font-display text-4xl font-bold text-[#1E2A2A]">Featured Packages</h2>
                <p className="text-stone-400 mt-2 text-[15px]">From sacred pilgrimages to mountain adventures — curated for every traveller.</p>
              </div>
              <Link href="/hajj" className="bg-yellow-400 text-[#1E2A2A] font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-all text-[13px] whitespace-nowrap shadow-md flex-shrink-0">
                View All Packages →
              </Link>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 80}>
                <TourCard {...t} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 px-6 bg-cream-dark">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">Why AY Travel?</p>
            <h2 className="font-display text-4xl font-bold text-[#1E2A2A]">The AY Travel Difference</h2>
            <p className="text-stone-400 mt-3 text-[15px] max-w-lg mx-auto">Fifteen years of trust, expertise, and thousands of happy travellers across Pakistan.</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((w, i) => (
              <AnimateOnScroll key={w.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-7 border border-stone-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${w.color}`}>{w.icon}</div>
                  <h3 className="font-semibold text-[15px] text-[#1E2A2A] mb-2">{w.title}</h3>
                  <p className="text-stone-400 text-[13.5px] leading-relaxed">{w.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── HAJJ BANNER ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <Image src="/images/homebanners/hajj-banner.jpg" alt="Hajj" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-800/70" />
        <div className="relative max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="max-w-xl">
              <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">2026 Season Open</p>
              <h2 className="font-display text-5xl font-bold text-white mb-5 leading-tight">
                Umrah<br /><span className="italic text-yellow-300">Packages 2026</span>
              </h2>
              <p className="text-white/70 text-[15px] leading-relaxed mb-8">Embark on your spiritual journey with complete peace of mind. From Saudi visa to Ziyarat — we handle every detail so you can focus on worship.</p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/hajj" className="bg-yellow-400 text-[#1E2A2A] font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 transition-all shadow-xl text-[14px]">
                  View Hajj Packages
                </Link>
                <Link href="/contact" className="border border-white/30 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all text-[14px]">
                  Speak to an Advisor
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── DOMESTIC HIGHLIGHT ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimateOnScroll>
              <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">Explore Pakistan</p>
              <h2 className="font-display text-4xl font-bold text-[#1E2A2A] mb-4">Beautiful Pakistan<br />Awaits You</h2>
              <p className="text-stone-400 text-[15px] leading-relaxed mb-7">From the snow-capped peaks of Gilgit-Baltistan to the ancient ruins of Mohenjo-daro, Pakistan is breathtaking. Our domestic tours are crafted for families, adventurers and solo explorers alike.</p>
              <div className="space-y-3 mb-8">
                {["Skardu & Deosai — 5 Days 4 Nights · Single: PKR 169,000",
                  "Skardu & Deosai — 5 Days 4 Nights · Double: PKR 91,500",
                  "Skardu & Deosai — 5 Days 4 Nights · Triple: PKR 80,000",
                  "Skardu & Deosai — 5 Days 4 Nights · Quad: PKR 67,000"].map(t => (
                    <div key={t} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                      <span className="text-[14px] text-[#2C3A3A]">{t}</span>
                    </div>
                  ))}
              </div>
              <Link href="/domestic" className="inline-block bg-teal-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-teal-800 transition-all shadow-md text-[14px]">
                Explore All Domestic Tours →
              </Link>
            </AnimateOnScroll>
            <div className="grid grid-cols-2 gap-3">
              {[
                "/images/homebanners/d1.jpg",
                "/images/homebanners/d2.jpg",
                "/images/homebanners/d3.jpg",
                "/images/homebanners/d4.jpg",
              ].map((img, i) => (
                <AnimateOnScroll key={i} delay={i * 100}>
                  <div className={`relative overflow-hidden rounded-2xl shadow-md ${i === 0 ? "h-56" : i === 3 ? "h-56" : "h-44"}`}>
                    <Image src={img} alt="Pakistan" fill className="object-cover hover:scale-110 transition-transform duration-700" unoptimized />
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AIRLINES ── */}
      <section className="py-16 px-6 bg-cream-dark">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-10">
            <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">Ticketing Partners</p>
            <h2 className="font-display text-3xl font-bold text-[#1E2A2A]">We Issue Tickets For All Major Airlines</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {airlines.map((a, i) => (
              <AnimateOnScroll key={a.name} delay={i * 60}>
                <div className="bg-white rounded-2xl p-5 text-center border border-stone-100 hover:border-teal-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="text-3xl mb-2">{a.flag}</div>
                  <div className="font-semibold text-[13px] text-[#1E2A2A]">{a.name}</div>
                  <div className="text-[11px] text-stone-400">{a.routes}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll className="text-center mt-8">
            <Link href="/ticketing" className="inline-block bg-teal-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-teal-800 transition-all shadow-md text-[14px]">
              Get Best Flight Fares →
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">Client Stories</p>
            <h2 className="font-display text-4xl font-bold text-[#1E2A2A]">What Our Travellers Say</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 80}>
                <div className="bg-cream rounded-2xl p-6 border border-stone-100 hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="flex mb-3">{[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />)}</div>
                  <p className="text-[13.5px] text-stone-600 leading-relaxed italic mb-5 flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
                      {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-[13px] text-[#1E2A2A]">{t.name}</div>
                      <div className="text-[11px] text-stone-400">{t.tour} · {t.location}</div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-6 bg-teal-800 text-white text-center">
        <AnimateOnScroll>
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Ready to Travel?</p>
          <h2 className="font-display text-5xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-white/60 text-[15px] max-w-md mx-auto mb-10">Talk to our travel experts — we'll design the perfect package just for you. Free consultation, no obligations.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-yellow-400 text-[#1E2A2A] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-xl text-[15px]">
              📞 Contact Us Now
            </Link>
            <Link href="/hajj" className="border border-white/25 text-white font-medium px-10 py-4 rounded-xl hover:bg-white/10 transition-all text-[15px]">
              Browse All Packages
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
