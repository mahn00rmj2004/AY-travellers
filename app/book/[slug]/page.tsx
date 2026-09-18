import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookingForm, { type BookingPackage } from "./BookingForm";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await prisma.package.findUnique({ where: { slug } });

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#FDFAF4]">
        <p className="text-[#1E2A2A] font-display text-2xl">Package not found</p>
        <Link href="/international" className="text-teal-600 font-semibold">
          ← Browse packages
        </Link>
      </div>
    );
  }

  const bookingPackage: BookingPackage = {
    id: pkg.id,
    title: pkg.title,
    slug: pkg.slug,
    subtitle: pkg.subtitle,
    category: pkg.category,
    region: pkg.region,
    image: pkg.image,
    badge: pkg.badge,
    badgeColor: pkg.badgeColor,
    priceDisplay: pkg.priceDisplay,
    priceNote: pkg.priceNote,
    bookHref: pkg.bookHref,
    pricePerPerson: pkg.pricePerPerson === null ? null : Number(pkg.pricePerPerson),
    durationDays: pkg.durationDays,
    meta: (pkg.meta as string[] | null) ?? null,
    details: (pkg.details as BookingPackage["details"]) ?? null,
  };

  return <BookingForm package={bookingPackage} slug={slug} />;
}