"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { logout } from "@/lib/logout";

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  // Read destination from URL parameter (?redirect=/ticketing), fallback to homepage
  const redirectTo = searchParams.get("redirect") || "/";

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          const firstField = Object.keys(data.details)[0];
          setError(`${firstField}: ${data.details[firstField]?.[0]}`);
        } else {
          setError(data.message || data.error || "Login failed");
        }
        setLoading(false);
        return;
      }

      // Store token & user data
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Also set token in cookie so middleware/server components can read auth state
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      }

      // Redirect dynamically back to the saved route (/ticketing)
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-stone-400 text-[14px]">Checking session…</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex">
        {/* Left panel — image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <Image 
            src="/images/login/login.jpg" 
            alt="Makkah" 
            fill 
            className="object-cover" 
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-teal-700/70"/>
          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
                Your Journey<br/>Begins Here
              </h2>
              <p className="text-white/60 text-[15px] leading-relaxed mb-8">You're already signed in — continue where you left off.</p>
              <div className="space-y-3">
                {["8,000+ Pilgrims Served","50+ Global Destinations","ATAB & IATA Certified"].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-300 flex items-center justify-center text-xs">✓</span>
                    <span className="text-white/70 text-[14px]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-white/25 text-[12px]">© 2026 AY Travel & Tours</p>
          </div>
        </div>

        {/* Right panel — already signed in */}
        <div className="flex-1 flex items-center justify-center px-6 py-20 bg-cream">
          <div className="w-full max-w-md">
            <h1 className="font-display text-3xl font-bold text-[#1E2A2A] mb-2">You're already signed in</h1>
            <p className="text-stone-400 text-[14px] mb-8">
              Logged in as <span className="text-teal-600 font-semibold">{user.email}</span>
            </p>

            <Link 
              href="/" 
              className="block w-full bg-teal-600 text-white font-bold text-center py-4 rounded-xl hover:bg-teal-800 transition-all shadow-md text-[15px]"
            >
              Go to Home →
            </Link>

            <button
              type="button"
              onClick={() => logout("/login")}
              className="mt-3 w-full border border-stone-200 bg-white text-red-600 font-medium py-3 rounded-xl hover:bg-stone-50 transition-colors text-[14px]"
            >
              Logout
            </button>

            <p className="text-center mt-8 text-[14px] text-stone-400">
              Not you?{" "}
              <button
                type="button"
                onClick={() => logout("/login")}
                className="text-teal-600 font-semibold hover:underline"
              >
                Sign in with a different account
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image 
          src="/images/login/login.jpg" 
          alt="Makkah" 
          fill 
          className="object-cover" 
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-teal-700/70"/>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
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
          <p className="text-white/25 text-[12px]">© 2026 AY Travel & Tours</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 bg-cream">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold text-[#1E2A2A] mb-1">Welcome Back</h1>
          <p className="text-stone-400 text-[14px] mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px] mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"/>
                <input 
                  type="email" 
                  name="email"
                  placeholder="you@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[12px] font-semibold text-stone-500 uppercase tracking-wide">Password</label>
                <Link href="/forgot-password" className="text-[12px] text-teal-600 hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"/>
                <input 
                  type={show ? "text" : "password"} 
                  name="password"
                  placeholder="Enter your password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-xl pl-11 pr-12 py-3.5 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button 
                  type="button" 
                  onClick={() => setShow(!show)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-teal-600"
                >
                  {show ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-stone-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="remember" className="text-[13px] text-stone-500">Keep me signed in</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-800 transition-all shadow-md text-[15px] disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"/>
            </div>
            <div className="relative text-center">
              <span className="bg-cream px-4 text-stone-400 text-[12px]">or continue with</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl: redirectTo })}
            className="w-full border border-stone-200 bg-white text-[#1E2A2A] font-medium py-3.5 rounded-xl hover:bg-stone-50 transition-colors text-[14px] flex items-center justify-center gap-3 shadow-sm"
          >
            <span className="text-lg font-bold">G</span> Continue with Google
          </button>

          <p className="text-center mt-8 text-[14px] text-stone-400">
            Don't have an account?{" "}
            <Link href={`/signup?redirect=${encodeURIComponent(redirectTo)}`} className="text-teal-600 font-semibold hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}