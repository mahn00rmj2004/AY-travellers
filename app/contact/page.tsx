"use client";
import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError("Too many requests. Please wait 15 minutes.");
        } else if (data.details) {
          const firstField = Object.keys(data.details)[0];
          const errorMessage = data.details[firstField]?.[0] || "Validation failed";
          setError(errorMessage);
        } else {
          setError(data.message || data.error || "Something went wrong");
        }
        setLoading(false);
        return;
      }

      setSent(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        service: "",
        message: "",
      });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative h-[50vh] min-h-[380px] flex items-end">
        <Image
          src="/images/banners/contact.jpg"
          alt="Contact"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest mb-3">
            We're Here For You
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Get In
            <br />
            <span className="italic text-yellow-300">Touch</span>
          </h1>
          <p className="text-white/65 text-[15px]">
            Our travel experts are ready to plan your perfect journey.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <AnimateOnScroll>
              <h2 className="font-display text-3xl font-bold text-[#1E2A2A] mb-6">
                Let's Plan Your Journey Together
              </h2>
              <p className="text-stone-400 text-[14px] leading-relaxed mb-8">
                Whether you're enquiring about Hajj registration, a family vacation
                package, or just need a flight ticket — our team is here to help,
                every step of the way.
              </p>
            </AnimateOnScroll>
            <div className="space-y-4">
              {[
                {
                  icon: <MapPin size={18} />,
                  label: "Visit Our Office",
                  value: " V-5 Markaz Hamilton Road, Raja Bazar, Rawalpindi",
                  color: "bg-teal-50 text-teal-600",
                },
                {
                  icon: <Phone size={18} />,
                  label: "Call Us",
                  value:
                    "0339-5531092, 0339-5531094, 0339-5531096, 0339-5531098\n0339-5531092, 0339-5531096 (WhatsApp)",
                  color: "bg-yellow-50 text-yellow-600",
                },
                {
                  icon: <Mail size={18} />,
                  label: "Email",
                  value: "abdullahyamnahajjumrah@gmail.com",
                  color: "bg-teal-50 text-teal-600",
                },
                {
                  icon: <Clock size={18} />,
                  label: "Office Hours",
                  value:
                    "Mon – Sun: 8:30 AM – 8:30 PM\nFriday: Closed\n24/7 Support for Tourists & Pilgrims",
                  color: "bg-yellow-50 text-yellow-600",
                },
                {
                  icon: <MessageCircle size={18} />,
                  label: "LandLine Numbers",
                  value: "051-5531096, 051-5531097",
                  color: "bg-teal-50 text-teal-600",
                },
              ].map((c) => (
                <AnimateOnScroll key={c.label}>
                  <div className="flex gap-4 items-start bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.color}`}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[13px] text-[#1E2A2A] mb-0.5">
                        {c.label}
                      </p>
                      <p className="text-stone-400 text-[13px] leading-relaxed whitespace-pre-line">
                        {c.value}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <AnimateOnScroll delay={150}>
              <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
                <h3 className="font-display text-2xl font-bold text-[#1E2A2A] mb-1">
                  Send Us a Message
                </h3>
                <p className="text-stone-400 text-[13px] mb-7">
                  We'll get back to you within a few hours during office hours.
                </p>

                {sent && (
                  <div className="bg-teal-50 border border-teal-200 text-teal-700 rounded-xl p-4 mb-6 text-[14px] font-medium">
                    Message sent! We'll contact you shortly.
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-[14px] font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="firstname"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="lastname"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="+92 300 XXXXXXX"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px]"
                    >
                      <option value="">Select a service…</option>
                      <option value="Hajj Package">Hajj Package</option>
                      <option value="Umrah Package">Umrah Package</option>
                      <option value="International Tour">International Tour</option>
                      <option value="Domestic Tour">Domestic Tour</option>
                      <option value="Flight Ticketing">Flight Ticketing</option>
                      <option value="Visa Assistance">Visa Assistance</option>
                      <option value="Custom Package">Custom Package</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your travel plans, dates, group size and any specific requirements…"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-800 transition-colors shadow-md text-[15px] disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}``