"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&q=85&auto=format&fit=crop" alt="Makkah" fill className="object-cover" unoptimized/>
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
            <p className="text-yellow-300 text-[11px] font-bold uppercase tracking-widest mb-4">Trusted Since 2009</p>
            <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
              Your Journey<br/>Begins Here
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8">Login to manage your bookings, view itineraries, and get exclusive member-only offers.</p>
            <div className="space-y-3">
              {["8,000+ Pilgrims Served","50+ Global Destinations","ATAB & IATA Certified"].map(f => (
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

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 bg-cream">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-[40px] h-[40px] rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
              <span className="font-display font-bold text-white text-[16px]">AY</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[15px] text-[#1E2A2A]">AY Travel & Tours</span>
              <span className="text-[8px] font-medium tracking-widest uppercase text-gold-700">Your Dreams Our Responsibility</span>
            </div>
          </Link>

          <h1 className="font-display text-3xl font-bold text-[#1E2A2A] mb-1">Welcome Back</h1>
          <p className="text-stone-400 text-[14px] mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"/>
                <input type="email" placeholder="you@example.com" required className="w-full border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 text-[14px] bg-white"/>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[12px] font-semibold text-stone-500 uppercase tracking-wide">Password</label>
                <Link href="#" className="text-[12px] text-teal-600 hover:underline font-medium">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"/>
                <input type={show ? "text" : "password"} placeholder="Enter your password" required className="w-full border border-stone-200 rounded-xl pl-11 pr-12 py-3.5 text-[14px] bg-white"/>
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-teal-600">
                  {show ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-stone-300 text-teal-600"/>
              <label htmlFor="remember" className="text-[13px] text-stone-500">Keep me signed in</label>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-800 transition-all shadow-md text-[15px] disabled:opacity-60">
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"/></div>
            <div className="relative text-center"><span className="bg-cream px-4 text-stone-400 text-[12px]">or continue with</span></div>
          </div>

          <button className="w-full border border-stone-200 bg-white text-[#1E2A2A] font-medium py-3.5 rounded-xl hover:bg-stone-50 transition-colors text-[14px] flex items-center justify-center gap-3 shadow-sm">
            <span className="text-lg">G</span> Continue with Google
          </button>

          <p className="text-center mt-8 text-[14px] text-stone-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-teal-600 font-semibold hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
