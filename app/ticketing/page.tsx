"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const airlines = [
  { name: "PIA", code: "PK", flag: "🇵🇰", routes: "Domestic & International" },
  { name: "FlyJinnah", code: "FJ", flag: "🇵🇰", routes: "Budget · Domestic & Gulf" },
  { name: "Airblue", code: "PA", flag: "🇵🇰", routes: "Domestic & International" },
  { name: "Etihad", code: "EY", flag: "🇦🇪", routes: "Abu Dhabi Hub" },
  { name: "Emirates", code: "EK", flag: "🇦🇪", routes: "Dubai Hub" },
  { name: "Qatar", code: "QR", flag: "🇶🇦", routes: "Doha Hub" },
  { name: "Saudi", code: "SV", flag: "🇸🇦", routes: "Jeddah · Riyadh" },
  { name: "Thai Airways", code: "TG", flag: "🇹🇭", routes: "Bangkok Hub" },
];

export default function TicketingPage() {
  const [tripType, setTripType] = useState("Return");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    passengers: "1 Adult",
    classType: "Economy",
    website: "", // honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/ticketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tripType }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        from: "",
        to: "",
        departure: "",
        returnDate: "",
        passengers: "1 Adult",
        classType: "Economy",
        website: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const isComplete =
    formData.name &&
    formData.phone &&
    formData.from &&
    formData.to &&
    formData.departure;

  return (
    <>
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <Image src="/images/banners/ticketing.jpg" alt="Airport" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3A] via-blue-900/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">IATA Accredited</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Air Ticketing<br /><span className="italic text-yellow-300">Services</span>
          </h1>
          <p className="text-white/65 text-[15px] max-w-lg">Best fares on domestic and international flights. Same-day ticket issuance with e-ticket delivery.</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#FDFAF4]">
        <div className="max-w-4xl mx-auto">
          {/* Search form */}
          <AnimateOnScroll>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 mb-16">
              <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-2">Search Flights</h2>
              <p className="text-stone-400 text-[13.5px] mb-6">Fill in your details — our team will respond with the best available fares within hours.</p>

              {/* Trip type tabs */}
              <div className="flex gap-0 bg-stone-100 rounded-xl overflow-hidden w-fit mb-6">
                {["One Way", "Return", "Multi-City"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTripType(t)}
                    className={`px-6 py-2.5 text-[13px] font-semibold transition-all ${
                      tripType === t
                        ? "bg-teal-600 text-white rounded-xl shadow"
                        : "text-stone-400 hover:text-teal-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email (optional)</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">From</label>
                  <input
                    type="text"
                    required
                    placeholder="Karachi (KHI)"
                    value={formData.from}
                    onChange={(e) => handleChange("from", e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">To</label>
                  <input
                    type="text"
                    required
                    placeholder="Dubai (DXB)"
                    value={formData.to}
                    onChange={(e) => handleChange("to", e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Departure</label>
                  <input
                    type="date"
                    required
                    value={formData.departure}
                    onChange={(e) => handleChange("departure", e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                  />
                </div>
                {tripType === "Return" && (
                  <div>
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Return</label>
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => handleChange("returnDate", e.target.value)}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Passengers</label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => handleChange("passengers", e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>2 Adults + 1 Child</option>
                    <option>Group (5+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Class</label>
                  <select
                    value={formData.classType}
                    onChange={(e) => handleChange("classType", e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                  >
                    <option>Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Your WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-stone-50"
                  />
                </div>
              </div>

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

              <button
                type="submit"
                disabled={!isComplete || submitting}
                className={`w-full font-bold py-4 rounded-xl transition-colors shadow-md text-[15px] ${
                  isComplete && !submitting
                    ? "bg-teal-600 text-white hover:bg-teal-800"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                {submitting ? "Sending..." : "Get Best Fare Quote"}
              </button>

              <p className="text-stone-400 text-[12px] mt-3 text-center">
                {error ? (
                  <span className="text-red-500">{error}</span>
                ) : isComplete ? (
                  "All set! Our team will respond with the best fares within hours."
                ) : (
                  "Please fill required fields to submit."
                )}
              </p>

              {/* Success message */}
              {submitted && (
                <div className="mt-4 bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
                  <p className="text-teal-700 font-semibold text-[14px]">
                    Flight request received! We&apos;ll contact you shortly with the best fares.
                  </p>
                </div>
              )}
            </form>
          </AnimateOnScroll>

          {/* Info cards */}
          <AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
              {[
                { icon: "🎫", title: "Instant Confirmation", text: "Tickets issued same day. E-tickets delivered directly to your email and WhatsApp." },
                { icon: "💰", title: "Lowest Fare Guarantee", text: "We compare fares across all GDS systems to get you the absolute best price." },
                { icon: "🔄", title: "Easy Changes", text: "Flexible amendment and refund support as per airline policy. We handle the paperwork." },
              ].map((c) => (
                <div key={c.title} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h4 className="font-semibold text-[14px] text-[#1E2A2A] mb-2">{c.title}</h4>
                  <p className="text-stone-400 text-[12.5px] leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Airlines grid */}
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-10">
            <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-2">Our Partners</p>
            <h2 className="font-display text-3xl font-bold text-[#1E2A2A]">Airlines We Issue Tickets For</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {airlines.map((a, i) => (
              <AnimateOnScroll key={a.name} delay={i * 50}>
                <div className="bg-white rounded-2xl p-4 text-center border border-stone-100 hover:border-teal-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="text-3xl mb-2">{a.flag}</div>
                  <div className="font-bold text-[12px] text-[#1E2A2A]">{a.code}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{a.name}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0A1A3A] text-white text-center">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-bold mb-3">Corporate & Group Bookings</h2>
          <p className="text-white/50 mb-8 text-[15px]">Special rates and dedicated account managers for businesses and travel groups.</p>
          <Link href="/contact" className="bg-yellow-400 text-[#1E2A2A] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-xl text-[15px]">
            Get Corporate Rates →
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}