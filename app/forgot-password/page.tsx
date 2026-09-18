"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setMessage(data.message || "Reset link sent to your email!");
        setEmail("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-cream">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <Link href="/login" className="inline-flex items-center text-xs text-stone-500 hover:text-teal-600 mb-6 font-medium">
          <ArrowLeft size={14} className="mr-1" /> Back to Login
        </Link>

        <h1 className="font-display text-2xl font-bold text-[#1E2A2A] mb-1">Forgot Password?</h1>
        <p className="text-stone-400 text-[14px] mb-6">Enter your email and we'll send you a link to reset your password.</p>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px] mb-4">{error}</div>}
        {message && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-[13px] mb-4">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl hover:bg-teal-800 transition-all text-[15px] disabled:opacity-60"
          >
            {loading ? "Sending Link..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}