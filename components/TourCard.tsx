import Link from "next/link";
import Image from "next/image";

interface TourCardProps {
  image: string;
  badge?: string;
  badgeColor?: "gold"|"teal"|"dark";
  title: string;
  subtitle: string;
  meta: string[];
  price: string;
  priceLabel?: string;
  bookHref?: string;
}

const badgeStyles = {
  gold: "bg-yellow-400 text-[#1E2A2A]",
  teal: "bg-teal-600 text-white",
  dark: "bg-white/90 text-[#1E2A2A]",
};

export default function TourCard({ image, badge, badgeColor="gold", title, subtitle, meta, price, priceLabel="/person", bookHref="/contact" }: TourCardProps) {
  return (
    <div className="card-hover group bg-white rounded-2xl overflow-hidden shadow-md border border-stone-100/80">
      <div className="relative h-52 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {badge && <span className={`absolute top-3 left-3 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow ${badgeStyles[badgeColor]}`}>{badge}</span>}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-[15px] text-[#1E2A2A] mb-1">{title}</h3>
        <p className="text-[12.5px] text-stone-400 mb-3">{subtitle}</p>
        <div className="flex gap-3 flex-wrap mb-4">
          {meta.map(m => <span key={m} className="text-[11.5px] text-stone-400">{m}</span>)}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <span className="font-bold text-teal-600 text-[16px]">{price}</span>
            <span className="text-[11px] text-stone-400 ml-1">{priceLabel}</span>
          </div>
          <Link href={bookHref} className="bg-teal-600 text-white text-[12px] font-medium px-4 py-2 rounded-xl hover:bg-teal-800 transition-colors shadow-sm">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
