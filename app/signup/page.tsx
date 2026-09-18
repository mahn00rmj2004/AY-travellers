"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

export default function SignupPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    password: "",
    interest: "Hajj & Umrah",
    agreedToTerms: false, // CHANGE 1: ADDED
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if terms agreed before submitting
    if (!formData.agreedToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          const firstField = Object.keys(data.details)[0];
          const errorMessage = data.details[firstField]?.[0] || "Validation failed";
          setError(`${firstField}: ${errorMessage}`);
        } else {
          setError(data.message || data.error || "Something went wrong");
        }
        setLoading(false);
        return;
      }
      setLoading(false);
      setDone(true);
    } catch (err) {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left image panel */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop" 
          alt="Pakistan Mountains" 
          fill 
          className="object-cover" 
          unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-teal-700/70" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <p className="text-yellow-300 text-[11px] font-bold uppercase tracking-widest mb-4">Join 8,000+ Happy Travellers</p>
            <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
              The World<br />Awaits You
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8">Create your free account and unlock exclusive deals on Hajj, Umrah, international and domestic packages.</p>
            <div className="space-y-3">
              {["Exclusive member discounts", "Early access to Hajj 2026 packages", "Priority customer support", "Personalised tour recommendations"].map(f => (
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
          <h1 className="font-display text-3xl font-bold text-[#1E2A2A] mb-1">Create Account</h1>
          <p className="text-stone-400 text-[14px] mb-8">Join thousands of travellers. Free to sign up.</p>

          {done ? (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
              <h3 className="font-display text-2xl font-bold text-teal-700 mb-2">Welcome to AY Travel!</h3>
              <p className="text-teal-600 text-[14px] mb-6">Your account has been created successfully.</p>
              <Link href="/login" className="bg-teal-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-teal-800 transition-colors">
                Sign In Now →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px]">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">First Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input 
                      type="text" 
                      name="firstName" 
                      placeholder="firstname" 
                      required 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-[14px] bg-white" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="lastname" 
                    required 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-white" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="example@gmail.com" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-[14px] bg-white" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Phone / WhatsApp</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input 
                    type="tel" 
                    name="phoneNumber" 
                    placeholder="+923001234567 Please write in this format" 
                    required 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-[14px] bg-white" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">City</label>
                <select 
                  name="city" 
                  required 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-white"
                >
                  <option value="">Select your city</option>
                  {["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Quetta", "Faisalabad", "Multan", "Other"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input 
                    type={show ? "text" : "password"} 
                    name="password" 
                    placeholder="Create a strong password" 
                    required 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="w-full border border-stone-200 rounded-xl pl-10 pr-12 py-3 text-[14px] bg-white" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShow(!show)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-teal-600"
                  >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">I'm Interested In</label>
                <select 
                  name="interest" 
                  value={formData.interest} 
                  onChange={handleChange} 
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] bg-white"
                >
                  <option>Hajj & Umrah</option>
                  <option>International Tours</option>
                  <option>Domestic Tours</option>
                  <option>Flight Ticketing</option>
                  <option>Everything!</option>
                </select>
              </div>

              {/* CHANGE 2: UPDATED CHECKBOX WITH CONTROLLED COMPONENT */}
              <div className="flex gap-3 items-start pt-1">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    agreedToTerms: e.target.checked 
                  })}
                  className="w-4 h-4 mt-0.5 rounded border-stone-300" 
                />
                <label htmlFor="terms" className="text-[13px] text-stone-500 leading-snug">
                  I agree to the <Link href="terms-conditions" className="text-teal-600 hover:underline">Terms & Conditions</Link> and <Link href="privacy-policy" className="text-teal-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-800 transition-all shadow-md text-[15px] disabled:opacity-60 mt-2"
              >
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