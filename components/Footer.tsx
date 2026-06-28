import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#071E1E] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
                <span className="font-display font-bold text-white text-[17px]">AY</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-[16px] text-white">AY Travel & Tours</span>
                <span className="text-[8px] font-medium tracking-widest uppercase text-yellow-300/80">Your Dreams Our Responsibility</span>
              </div>
            </Link>
            <p className="text-white/35 text-[13px] leading-relaxed mb-6">Pakistan's trusted travel partner for Hajj, Umrah, international & domestic tours since 2009. ATAB certified. IATA accredited.</p>
            <div className="flex gap-2">
              {["f","in","ig","𝕏"].map(s => (
                <button key={s} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-white/30 hover:bg-yellow-400 hover:text-[#071E1E] hover:border-yellow-400 transition-all duration-200">{s}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-yellow-400/80 uppercase tracking-widest mb-5">Our Services</h4>
            <ul className="space-y-3">
              {["Hajj Packages","Umrah Packages","International Tours","Domestic Tours","Flight Ticketing","Visa Assistance"].map(s=>(
                <li key={s}><Link href="/contact" className="text-[13px] text-white/35 hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-yellow-400/80 uppercase tracking-widest mb-5">Top Destinations</h4>
            <ul className="space-y-3">
              {["Makkah & Madinah","Dubai & Abu Dhabi","Turkey & Istanbul","Hunza Valley","Skardu & Deosai","Paris & Amsterdam"].map(d=>(
                <li key={d}><Link href="/international" className="text-[13px] text-white/35 hover:text-white transition-colors">{d}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-yellow-400/80 uppercase tracking-widest mb-5">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start"><MapPin size={14} className="text-yellow-400 mt-0.5 flex-shrink-0"/><span className="text-[13px] text-white/35">Gulshan-e-Iqbal, Block 13-D, Karachi, 75300</span></li>
              <li className="flex gap-3 items-center"><Phone size={14} className="text-yellow-400 flex-shrink-0"/><span className="text-[13px] text-white/35">+92 21 3XXX XXXX</span></li>
              <li className="flex gap-3 items-center"><Mail size={14} className="text-yellow-400 flex-shrink-0"/><span className="text-[13px] text-white/35">info@aytravel.pk</span></li>
              <li className="flex gap-3 items-center"><Clock size={14} className="text-yellow-400 flex-shrink-0"/><span className="text-[13px] text-white/35">Mon–Sat · 9am – 7pm</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-white/20">© 2025 AY Travel & Tours. All rights reserved.</p>
          <p className="text-[12px] text-white/20">ATAB Certified · IATA Accredited · Pakistan Tourism License</p>
        </div>
      </div>
    </footer>
  );
}
