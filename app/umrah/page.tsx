"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Calendar, Bus, Hotel, Plane, Send, ChevronDown, CheckCircle } from "lucide-react";

const airlines = [
  { name: "none", flag: "🏳️", routes: "No Airline Selected" },
  { name: "PIA", flag: "🇵🇰", routes: "Domestic & International" },
  { name: "FlyJinnah", flag: "🇵🇰", routes: "Budget · Domestic & Gulf" },
  { name: "Airblue", flag: "🇵🇰", routes: "Domestic & International" },
  { name: "Etihad", flag: "🇦🇪", routes: "Abu Dhabi Hub" },
  { name: "Emirates", flag: "🇦🇪", routes: "Dubai Hub" },
  { name: "Qatar", flag: "🇶🇦", routes: "Doha Hub" },
  { name: "Saudi", flag: "🇸🇦", routes: "Jeddah · Riyadh" },
  { name: "Thai Airways", flag: "🇹🇭", routes: "Bangkok Hub" },
];

// 🆕 Makkah Hotels List
const makkahHotels = [
  "Select a Makkah Hotel",
  "Maidan Bait 2 — Old Area",
  "Loulout Touheed — 4-Star",
  "Maidan Bait 1 — Old Area",
  "Saif Al Majd — 4-Star",
  "Fajar Badih 5 — 3-Star",
  "Yasmin Al Majd — 4-Star",
  "Clock Tower — 5-Star",
  "Safa Tower — 4-Star",
  "Makkah Tower — 5-Star",
];

// 🆕 Madina Hotels List
const madinaHotels = [
  "Select a Madina Hotel",
  "Maidan Al Bait — Central Area",
  "Safa Park — 3-Star",
  "Rahatul Abour — Old Rose Diamond",
  "Qamar Taiba — 3-Star",
  "Argwan Madina — 4-Star",
  "Marjan International — 4-Star",
  "Al-Muna Kareem — 3-Star",
  "Dallah Taibah — 4-Star",
  "Safwat Al Madinah — 5-Star",
  "Anwar Al Madinah Mövenpick — 5-Star",
  "Taiba Front — 4-Star",
  "Golden Tulip — 4-Star",
];

const customizationOptions = {
  dates: [
    "Muharram 2026 — Economy Season",
    "Safar 2026 — Low Season",
    "Rabi' al-Awwal 2026 — Mid Season",
    "Rabi' al-Thani 2026 — Mid Season",
    "Jumada al-Awwal 2026 — Mid Season",
    "Jumada al-Thani 2026 — Mid Season",
    "Rajab 2026 — High Season",
    "Sha'ban 2026 — Pre-Ramadan",
    "Ramadan 2026 — Peak Season",
    "Shawwal 2026 — Post-Umrah",
    "Dhul-Qi'dah 2026 — Hajj Prep",
    "December 2026 — Winter Break",
  ],
  transport: [
    "none",
    "Shared Bus (Group Transport)",
    "Private SUV (4-Seater)",
    "Private Hiace (10-Seater)",
    "Private Coaster (20-Seater)",
    "VIP Mercedes V-Class",
    "Luxury GMC Yukon XL",
    "Economy Sedan (Camry/Corolla)",
    "Airport Transfer Only",
    "Full Package Transport",
    "Self-Arranged / No Transport",
  ],
};

export default function CustomizeUmrahPage() {
  const [formData, setFormData] = useState({
    dates: "",
    transport: "",
    hotelCity: "makkah", // 🆕 Toggle between 'makkah' and 'madina'
    hotel: "",
    airline: "",
    email: "",
    phone: "",
    city: "",
    website: "", // honeypot
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/customize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        dates: "",
        transport: "",
        hotelCity: "makkah",
        hotel: "",
        airline: "",
        email: "",
        phone: "",
        city: "",
        website: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  // 🆕 Get the correct hotel list based on selected city
  const currentHotels =
    formData.hotelCity === "makkah" ? makkahHotels : madinaHotels;

  // 🆕 Update validation to include hotelCity
  const isComplete =
    formData.dates &&
    formData.transport &&
    formData.hotelCity &&
    formData.hotel &&
    formData.hotel !== "Select a Makkah Hotel" &&
    formData.hotel !== "Select a Madina Hotel" &&
    formData.airline &&
    formData.email &&
    formData.phone &&
    formData.city;

  const dropdowns = [
    { key: "dates", label: "Travel Dates", icon: Calendar, options: customizationOptions.dates },
    { key: "transport", label: "Transport", icon: Bus, options: customizationOptions.transport },
    { key: "airline", label: "Airline", icon: Plane, options: airlines.map((a) => `${a.flag} ${a.name} — ${a.routes}`) },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end pb-0">
        <Image
          src="/images/aboutus/ab1.jpg"
          alt="Makkah"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E1E] via-teal-900/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-14">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">Tailored for You</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Customize Your<br />
            <span className="italic text-yellow-300">Umrah Package</span>
          </h1>
          <p className="text-white/65 text-[15px] max-w-lg">
            Select your preferred dates, transport, hotel in Makkah & Madinah, and airline. We'll craft an Umrah package that fits your needs and budget.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6 bg-[#FDFAF4]">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">Step by Step</p>
              <h2 className="font-display text-3xl font-bold text-[#1E2A2A]">Build Your Perfect Umrah Journey</h2>
              <p className="text-stone-400 mt-2 text-[14px]">Choose from 10+ options in each category</p>
            </div>
          </AnimateOnScroll>

          <form onSubmit={handleSubmit}>
            {/* 4 Dropdown Grid — 3 mapped + 1 custom Hotel column */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {/* Mapped dropdowns: Dates, Transport, Airline */}
              {dropdowns.map((d, i) => {
                const Icon = d.icon;
                return (
                  <AnimateOnScroll key={d.key} delay={i * 100}>
                    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                      <label className="flex items-center gap-2 text-[12px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        <Icon size={15} className="text-teal-600" />
                        {d.label}
                      </label>
                      <div className="relative">
                        <select
                          value={formData[d.key as keyof typeof formData] as string}
                          onChange={(e) => handleChange(d.key, e.target.value)}
                          className="w-full appearance-none text-[13.5px] bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 pr-10 text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                        >
                          <option value="" disabled>
                            Select {d.label}
                          </option>
                          {d.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}

              {/* 🆕 Custom Hotel Column — City + Hotel Dropdowns */}
              <AnimateOnScroll delay={300}>
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <label className="flex items-center gap-2 text-[12px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                    <Hotel size={15} className="text-teal-600" />
                    Hotel
                  </label>
                  <div className="space-y-3">
                    {/* City Selector */}
                    <div className="relative">
                      <select
                        value={formData.hotelCity}
                        onChange={(e) => {
                          handleChange("hotelCity", e.target.value);
                          handleChange("hotel", ""); // Reset hotel when city changes
                        }}
                        className="w-full appearance-none text-[13.5px] bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 pr-10 text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="makkah"> Makkah Hotels</option>
                        <option value="madina"> Madina Hotels</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                    </div>

                    {/* Hotel Selector (dynamic) */}
                    <div className="relative">
                      <select
                        value={formData.hotel}
                        onChange={(e) => handleChange("hotel", e.target.value)}
                        className="w-full appearance-none text-[13.5px] bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 pr-10 text-[#1E2A2A] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        {currentHotels.map((hotel) => (
                          <option key={hotel} value={hotel}>
                            {hotel}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Contact Fields */}
            <AnimateOnScroll delay={400}>
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-8 mb-10">
                <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-5">Your Contact Details</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[12px] font-bold text-stone-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full text-[13.5px] bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-[#1E2A2A] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-stone-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full text-[13.5px] bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-[#1E2A2A] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-stone-400 uppercase tracking-wider mb-2">City</label>
                    <input
                      type="text"
                      required
                      placeholder="Lahore, Karachi, Islamabad..."
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full text-[13.5px] bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-[#1E2A2A] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Honeypot — hidden from real users, bots fill it in */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
            />

            {/* Submit */}
            <AnimateOnScroll delay={500}>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!isComplete || submitting}
                  className={`inline-flex items-center gap-2 font-bold px-12 py-4 rounded-xl text-[15px] transition-all shadow-xl ${isComplete && !submitting
                      ? "bg-teal-600 text-white hover:bg-teal-800 hover:shadow-2xl"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                >
                  <Send size={17} />
                  {submitting ? "Submitting..." : "Submit Umrah Request"}
                </button>
                <p className="text-stone-400 text-[12px] mt-3">
                  {error
                    ? <span className="text-red-500">{error}</span>
                    : isComplete
                      ? "All set! We'll get back to you within 24 hours with your Umrah quote."
                      : "Please fill all fields above to submit."}
                </p>
              </div>
            </AnimateOnScroll>
          </form>

          {/* Success Message */}
          {submitted && (
            <AnimateOnScroll>
              <div className="mt-10 bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-teal-800 mb-1">Umrah Request Received!</h3>
                <p className="text-teal-600 text-[14px]">Our Umrah specialists will contact you shortly with a tailored quote.</p>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-teal-800 text-white text-center">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-bold mb-3">Prefer a Pre-Built Umrah Package?</h2>
          <p className="text-white/60 mb-8 text-[15px]">Browse our ready-made Economy, Silver, and Gold Umrah packages.</p>
          {/* ✅ Changed href to /umrah (was /hajj) */}
          <Link href="/umrah" className="bg-yellow-400 text-[#1E2A2A] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-xl text-[15px]">
            View Umrah Packages →
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}