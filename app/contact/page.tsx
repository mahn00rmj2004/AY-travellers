"use client";
import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); };

  return (
    <>
      <section className="relative h-[50vh] min-h-[380px] flex items-end">
        <Image src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80&auto=format&fit=crop" alt="Contact" fill className="object-cover" unoptimized/>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 to-transparent"/>
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">We're Here For You</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Get In<br/><span className="italic text-yellow-300">Touch</span>
          </h1>
          <p className="text-white/65 text-[15px]">Our travel experts are ready to plan your perfect journey.</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info column */}
          <div className="lg:col-span-2">
            <AnimateOnScroll>
              <h2 className="font-display text-3xl font-bold text-[#1E2A2A] mb-6">Let's Plan Your Journey Together</h2>
              <p className="text-stone-400 text-[14px] leading-relaxed mb-8">Whether you're enquiring about Hajj registration, a family vacation package, or just need a flight ticket — our team is here to help, every step of the way.</p>
            </AnimateOnScroll>
            <div className="space-y-4">
              {[
                { icon:<MapPin size={18}/>, label:"Visit Our Office", value:"Gulshan-e-Iqbal, Block 13-D, Karachi, 75300", color:"bg-teal-50 text-teal-600" },
                { icon:<Phone size={18}/>, label:"Call Us", value:"+92 21 3XXX XXXX\n+92 300 XXXXXXX (WhatsApp)", color:"bg-yellow-50 text-yellow-600" },
                { icon:<Mail size={18}/>, label:"Email", value:"info@aytravel.pk\nhajj@aytravel.pk", color:"bg-teal-50 text-teal-600" },
                { icon:<Clock size={18}/>, label:"Office Hours", value:"Mon – Sat: 9:00 AM – 7:00 PM\nSunday: Closed", color:"bg-yellow-50 text-yellow-600" },
                { icon:<MessageCircle size={18}/>, label:"WhatsApp", value:"Quick responses via WhatsApp\n+92 300 XXXXXXX", color:"bg-teal-50 text-teal-600" },
              ].map(c => (
                <AnimateOnScroll key={c.label}>
                  <div className="flex gap-4 items-start bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.color}`}>{c.icon}</div>
                    <div>
                      <p className="font-semibold text-[13px] text-[#1E2A2A] mb-0.5">{c.label}</p>
                      <p className="text-stone-400 text-[13px] leading-relaxed whitespace-pre-line">{c.value}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimateOnScroll delay={150}>
              <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
                <h3 className="font-display text-2xl font-bold text-[#1E2A2A] mb-1">Send Us a Message</h3>
                <p className="text-stone-400 text-[13px] mb-7">We'll get back to you within a few hours during office hours.</p>
                {sent && (
                  <div className="bg-teal-50 border border-teal-200 text-teal-700 rounded-xl p-4 mb-6 text-[14px] font-medium">
                    ✅ Message sent! We'll contact you shortly.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">First Name</label>
                      <input type="text" placeholder="Ahmed" required className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"/>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Last Name</label>
                      <input type="text" placeholder="Khan" required className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"/>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input type="email" placeholder="ahmed@example.com" required className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Phone / WhatsApp</label>
                    <input type="tel" placeholder="+92 300 XXXXXXX" required className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Service Interested In</label>
                    <select required className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]">
                      <option value="">Select a service…</option>
                      <option>Hajj Package 2025</option>
                      <option>Umrah Package</option>
                      <option>International Tour</option>
                      <option>Domestic Tour</option>
                      <option>Flight Ticketing</option>
                      <option>Visa Assistance</option>
                      <option>Custom Package</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Your Message</label>
                    <textarea placeholder="Tell us about your travel plans, dates, group size and any specific requirements…" rows={4} required className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] resize-none"/>
                  </div>
                  <button type="submit" className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-800 transition-colors shadow-md text-[15px]">
                    Send Message →
                  </button>
                </form>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
