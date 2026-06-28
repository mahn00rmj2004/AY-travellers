"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/hajj", label: "Hajj & Umrah" },
  { href: "/international", label: "International" },
  { href: "/domestic", label: "Domestic" },
  { href: "/ticketing", label: "Ticketing" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;
  const textClass = transparent ? "text-white/85 hover:text-white" : "text-[#4A5E5E] hover:text-teal-600";
  const activeClass = transparent ? "text-white" : "text-teal-600";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      transparent ? "bg-transparent" : "glass bg-cream/95 border-b border-stone-200 shadow-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[70px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center shadow-lg transition-shadow group-hover:shadow-teal-600/40">
            <span className="font-display font-bold text-white text-[17px]">AY</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-display font-bold text-[16px] transition-colors ${transparent ? "text-white" : "text-[#1E2A2A]"}`}>
              AY Travel & Tours
            </span>
            <span className={`text-[8.5px] font-medium tracking-widest uppercase transition-colors ${transparent ? "text-gold-300" : "text-gold-700"}`}>
              Your Dreams Our Responsibility
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}
                className={`text-[13px] font-medium transition-all duration-200 relative group ${pathname === l.href ? activeClass : textClass}`}>
                {l.label}
                <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-gold-500 rounded-full transition-all duration-300 ${pathname === l.href ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth + CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/login" className={`text-[13px] font-medium px-4 py-2 rounded-lg transition-colors ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-teal-700 hover:bg-teal-50"}`}>
            Login
          </Link>
          <Link href="/signup" className={`text-[13px] font-medium px-4 py-2 rounded-lg border transition-colors ${transparent ? "border-white/30 text-white hover:bg-white/10" : "border-teal-600 text-teal-600 hover:bg-teal-50"}`}>
            Sign Up
          </Link>
          <Link href="/contact" className="bg-gold-500 text-[#1E2A2A] text-[13px] font-bold px-5 py-2 rounded-xl hover:bg-gold-300 transition-all shadow-md hover:shadow-gold-400/30">
            Book Now ✈️
          </Link>
        </div>

        {/* Hamburger */}
        <button className={`lg:hidden p-2 rounded-lg ${transparent ? "text-white" : "text-[#1E2A2A]"}`} onClick={() => setOpen(!open)}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[500px]" : "max-h-0"} glass bg-cream/98 border-t border-stone-100`}>
        <div className="px-5 py-4 flex flex-col">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`py-3 text-[15px] font-medium border-b border-stone-100 last:border-0 ${pathname === l.href ? "text-teal-600" : "text-[#2C3A3A]"}`}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-4">
            <Link href="/login" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-[14px] font-medium border border-teal-600 text-teal-600 rounded-xl">Login</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-[14px] font-bold bg-gold-500 text-[#1E2A2A] rounded-xl">Book Now</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
