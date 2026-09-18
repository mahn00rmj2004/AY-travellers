import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#071E1E] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
             
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-[16px] text-white">AY Travel & Tours</span>
                <span className="text-[8px] font-medium tracking-widest uppercase text-yellow-300/80">Your Dreams Our Responsibility</span>
              </div>
            </Link>
            <p className="text-white/35 text-[13px] leading-relaxed mb-6">Pakistan's trusted travel partner for Hajj, Umrah, international & domestic tours agency.</p>
            <div className="flex gap-2">
              {/* {["f", "in", "ig", "𝕏"].map(s => (
                <button key={s} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-white/30 hover:bg-yellow-400 hover:text-[#071E1E] hover:border-yellow-400 transition-all duration-200">{s}</button>
              ))} */}
              {[
                { icon: "f", href: "https://www.facebook.com/aytravelandtours", label: "Facebook" },
                { icon: "ig", href: "https://www.instagram.com/_aytravelandtours", label: "Instagram" },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                  ),
                  href: "https://www.tiktok.com/@aytraveltours",
                  label: "TikTok"
                },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-white/30 hover:bg-yellow-400 hover:text-[#071E1E] hover:border-yellow-400 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-yellow-400/80 uppercase tracking-widest mb-5">Our Services</h4>
            <ul className="space-y-3">
              {["Hajj Packages", "Umrah Packages", "International Tours", "Domestic Tours", "Flight Ticketing", "Visa Assistance"].map(s => (
                <li key={s}><Link href="/contact" className="text-[13px] text-white/35 hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-yellow-400/80 uppercase tracking-widest mb-5">Top Destinations</h4>
            <ul className="space-y-3">
              {["Makkah & Madinah", "Thailand", "Malaysia","Skardu & Deosai", "Uzbekistan"].map(d => (
                <li key={d}><Link href="/international" className="text-[13px] text-white/35 hover:text-white transition-colors">{d}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-yellow-400/80 uppercase tracking-widest mb-5">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start"><MapPin size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" /><span className="text-[13px] text-white/35">V-5 Markaz Hamilton Road, Raja Bazar, Rawalpindi, 75300</span></li>
              <li className="flex gap-3 items-center"><Phone size={14} className="text-yellow-400 flex-shrink-0" /><span className="text-[13px] text-white/35">0339-5531092, 0339-5531094, 0339-5531096</span></li>
              <li className="flex gap-3 items-center"><Mail size={14} className="text-yellow-400 flex-shrink-0" /><span className="text-[13px] text-white/35">abdullahyamnahajjumrah@gmail.com</span></li>
              <li className="flex gap-3 items-center"><Clock size={14} className="text-yellow-400 flex-shrink-0" /><span className="text-[13px] text-white/35">Mon – Sun [ 8:30 AM – 8:30 PM (FridayClosed)]</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-white/20">© 2026 AY Travel & Tours. All rights reserved.</p>
          <p className="text-[12px] text-white/20">24/7 Support for Tourists & Pilgrims</p>

        </div>
      </div>
    </footer>
  );
}
