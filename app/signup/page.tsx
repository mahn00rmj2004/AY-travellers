"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

export default function SignupPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left image panel */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop" alt="Pakistan Mountains" fill className="object-cover" unoptimized/>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-teal-700/70"/>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
              <span className="font-display font-bold text-white text-[17px]">AY</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[16px] text-white">AY Travel & Tours</span>
              <span className="text-[8px] font-medium tracking-widest uppercase text-yellow-300/80">Your Dreams Our Responsibility</span>
            </div>
          </Link>
          <div>
            <p className="text-yellow-300 text-[11px] font-bold uppercase tracking-widest mb-4">Join 8,000+ Happy Travellers</p>
            <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
              The World<br/>Awaits You
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8">Create your free account and unlock exclusive deals on Hajj, Umrah, international and domestic packages.</p>
            <div className="space-y-3">
              {["Exclusive member discounts","Early access to Hajj 2026 packages","Priority customer support","Personalised tour recommendations"].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-300 flex items-center justify-center text-xs">✓</span>
                  <span className="text-white/70 text-[14px]">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/25 text-[12px]">© 2025 AY Travel & Tours</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 bg-cream overflow-y-auto">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-[40px] h-[40px] rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
              <span className="font-display font-bold text-white text-[16px]">AY</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[15px] text-[#1E2A2A]">AY Travel & Tours</span>
              <span className="text-[8px] font-medium tracking-widest uppercase text-gold-700">Your Dreams Our Responsibility</span>
            </div>
          </Link>

          <h1 className="font-display text-3xl font-bold text-[#1E2A2A] mb-1">Create Account</h1>
          <p className="text-stone-400 text-[14px] mb-8">Join thousands of travellers. Free to sign up.</p>

          {done ? (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display text-2xl font-bold text-teal-700 mb-2">Welcome to AY Travel!</h3>
              <p className="text-teal-600 text-[14px] mb-6">Your account has been created. A travel consultant will reach out to you shortly.</p>
              <Link href="/login" className="bg-teal-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-teal-800 transition-colors">
                Sign In Now →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">First Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"/>
                    <input type="text" placeholder="Ahmed" required className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-[14px] bg-white"/>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Last Name</label>
                  <input type="text" placeholder="Khan" required className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-white"/>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"/>
                  <input type="email" placeholder="ahmed@example.com" required className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-[14px] bg-white"/>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Phone / WhatsApp</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"/>
                  <input type="tel" placeholder="+92 300 XXXXXXX" required className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-[14px] bg-white"/>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">City</label>
                <select required className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-white">
                  <option value="">Select your city</option>
                  {["Karachi","Lahore","Islamabad","Rawalpindi","Peshawar","Quetta","Faisalabad","Multan","Other"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"/>
                  <input type={show ? "text" : "password"} placeholder="Create a strong password" required className="w-full border border-stone-200 rounded-xl pl-10 pr-12 py-3 text-[14px] bg-white"/>
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-teal-600">
                    {show ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">I'm Interested In</label>
                <select className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-white">
                  <option>Hajj & Umrah</option>
                  <option>International Tours</option>
                  <option>Domestic Tours</option>
                  <option>Flight Ticketing</option>
                  <option>Everything!</option>
                </select>
              </div>
              <div className="flex gap-3 items-start pt-1">
                <input type="checkbox" id="terms" required className="w-4 h-4 mt-0.5 rounded border-stone-300"/>
                <label htmlFor="terms" className="text-[13px] text-stone-500 leading-snug">
                  I agree to the <Link href="#" className="text-teal-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-teal-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-800 transition-all shadow-md text-[15px] disabled:opacity-60 mt-2">
                {loading ? "Creating Account…" : "Create Free Account →"}
              </button>
            </form>
          )}

          {!done && (
            <p className="text-center mt-7 text-[14px] text-stone-400">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 font-semibold hover:underline">Sign in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
