"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useAuth } from "@/lib/useAuth";

export interface PricingRow {
  occupancy: string;
  price: string;
}

export interface PackageOptionRow {
  type: string;
  price: string;
}

export interface PackageDetails {
  pricing?: PricingRow[];
  options?: PackageOptionRow[];
  inclusions?: string[];
  services?: string;
  color?: string;
}

export interface BookingPackage {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  category: string | null;
  region: string | null;
  image: string | null;
  badge: string | null;
  badgeColor: string | null;
  priceDisplay: string | null;
  priceNote: string | null;
  bookHref: string | null;
  pricePerPerson: number | null;
  durationDays: number | null;
  meta: string[] | null;
  details: PackageDetails | null;
}

interface BookingFormProps {
  package: BookingPackage;
  slug: string;
}

const FALLBACK_IMAGE = "/images/banners/international.jpg";

const badgeStyles: Record<string, string> = {
  gold: "bg-yellow-400 text-[#1E2A2A]",
  teal: "bg-teal-600 text-white",
  dark: "bg-white/90 text-[#1E2A2A]",
};

function parsePrice(s: string | null | undefined): number | null {
  if (!s || /not available/i.test(s)) return null;
  const n = parseInt(s.replace(/[^0-9]/g, ""), 10);
  return Number.isNaN(n) ? null : n;
}

function categoryToUrl(category: string | null | undefined): string {
  switch (category) {
    case "domestic":
      return "/domestic";
    case "umrah":
    case "hajj":
      return "/hajj";
    case "international":
    default:
      return "/international";
  }
}

function getChoices(
  details: PackageDetails | null
): { label: string; price: string }[] | null {
  if (details?.pricing && details.pricing.length > 0) {
    return details.pricing.map((p) => ({ label: p.occupancy, price: p.price }));
  }
  if (details?.options && details.options.length > 0) {
    return details.options.map((o) => ({ label: o.type, price: o.price }));
  }
  return null;
}

export default function BookingForm({ package: pkg, slug }: BookingFormProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const choices = getChoices(pkg.details);
  const [choiceIndex, setChoiceIndex] = useState(() => {
    if (!choices) return 0;
    const firstAvailable = choices.findIndex((c) => parsePrice(c.price) !== null);
    return firstAvailable >= 0 ? firstAvailable : 0;
  });

  // --- Auth guard: only redirect if NOT logged in ---
  useEffect(() => {
    if (!loading && !user) {
      const here = `/book/${slug}`;
      router.replace(`/login?redirect=${encodeURIComponent(here)}`);
    }
  }, [user, loading, slug, router]);

  // Loading / not logged in state
  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDFAF4]">
        <p className="text-[#0A1A4A] font-medium">Checking your session…</p>
      </div>
    );
  }

  const backHref = categoryToUrl(pkg.category);
  const activeChoice = choices?.[choiceIndex];
  const displayPrice = activeChoice?.price || pkg.priceDisplay || "—";
  const numericPrice = parsePrice(activeChoice?.price) ?? pkg.pricePerPerson;
  const imageSrc = pkg.image || FALLBACK_IMAGE;
  const badgeClass = badgeStyles[pkg.badgeColor ?? ""] ?? badgeStyles.gold;

  function saveToCart() {
    const entry = {
      slug,
      title: pkg.title,
      category: pkg.category,
      travelers,
      date,
      notes,
      priceDisplay: displayPrice,
      pricePerPerson: numericPrice,
      image: imageSrc,
    };
    let cart: unknown[] = [];
    try {
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      cart = [];
    }
    const next = [
      ...(Array.isArray(cart)
        ? cart.filter((c) => (c as { slug?: string }).slug !== slug)
        : []),
      entry,
    ];
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function handleBookAnother() {
    saveToCart();
    router.push(categoryToUrl(pkg.category));
  }

  function handleCheckout() {
    saveToCart();
    router.push("/checkout");
  }

  return (
    <section className="py-16 px-6 bg-[#FDFAF4] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link
          href={backHref}
          className="text-[13px] text-teal-600 font-semibold mb-6 inline-block"
        >
          ← Back to packages
        </Link>

        <AnimateOnScroll>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* LEFT — Package preview */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5">
              <div className="relative h-64">
                <Image
                  src={imageSrc}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {pkg.badge && (
                  <span
                    className={`absolute top-4 left-4 ${badgeClass} text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
                  >
                    {pkg.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h1 className="font-display text-2xl font-bold text-[#1E2A2A]">
                  {pkg.title}
                </h1>
                {pkg.subtitle && (
                  <p className="text-[#1E2A2A]/60 text-[14px] mb-4">{pkg.subtitle}</p>
                )}

                {pkg.meta && pkg.meta.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pkg.meta.map((m) => (
                      <span
                        key={m}
                        className="text-[12px] bg-[#FDFAF4] text-[#1E2A2A]/70 px-3 py-1 rounded-full border border-black/5"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                {choices && (
                  <div className="mb-4">
                    <label className="block">
                      <span className="text-[12px] font-bold text-[#1E2A2A]/70 uppercase tracking-widest">
                        {pkg.details?.options ? "Sharing type" : "Select occupancy"}
                      </span>
                      <select
                        value={choiceIndex}
                        onChange={(e) => setChoiceIndex(Number(e.target.value))}
                        className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-[15px] focus:outline-none focus:border-teal-500"
                      >
                        {choices.map((c, idx) => (
                          <option key={idx} value={idx}>
                            {c.label} — {c.price}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}

                <div className="border-t border-black/5 pt-4 flex items-baseline justify-between">
                  <span className="text-[12px] text-[#1E2A2A]/50 uppercase tracking-widest">
                    From
                  </span>
                  <span className="font-display text-2xl font-bold text-teal-700">
                    {displayPrice}
                  </span>
                </div>
                {pkg.priceNote && (
                  <p className="text-[12px] text-[#1E2A2A]/40 mt-2">
                    {pkg.priceNote}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT — Booking form */}
            <div className="bg-white rounded-2xl shadow-lg border border-black/5 p-8">
              <h2 className="font-display text-xl font-bold text-[#1E2A2A] mb-1">
                Booking details
              </h2>
              <p className="text-[13px] text-[#1E2A2A]/50 mb-6">
                Logged in as{" "}
                <span className="text-teal-600 font-semibold">{user.email}</span>
              </p>

              <label className="block mb-4">
                <span className="text-[12px] font-bold text-[#1E2A2A]/70 uppercase tracking-widest">
                  Number of travelers
                </span>
                <input
                  type="number"
                  min={1}
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-[15px] focus:outline-none focus:border-teal-500"
                />
              </label>

              <label className="block mb-4">
                <span className="text-[12px] font-bold text-[#1E2A2A]/70 uppercase tracking-widest">
                  Preferred travel date
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-[15px] focus:outline-none focus:border-teal-500"
                />
              </label>

              <label className="block mb-6">
                <span className="text-[12px] font-bold text-[#1E2A2A]/70 uppercase tracking-widest">
                  Notes (optional)
                </span>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know?"
                  className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-[15px] focus:outline-none focus:border-teal-500 resize-none"
                />
              </label>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCheckout}
                  className="bg-[#0A1A4A] text-white font-bold py-4 rounded-xl hover:bg-[#0A1A4A]/90 transition-all shadow-lg text-[15px]"
                >
                  Proceed to Payment →
                </button>
                <button
                  onClick={handleBookAnother}
                  className="bg-yellow-400 text-[#1E2A2A] font-bold py-3 rounded-xl hover:bg-yellow-300 transition-all text-[14px]"
                >
                  + Add & Book Another Package
                </button>
              </div>

              <p className="text-[12px] text-[#1E2A2A]/40 mt-4 text-center">
                You're already logged in — no need to sign in again.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}