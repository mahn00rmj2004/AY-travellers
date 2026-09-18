import Link from "next/link";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-teal-900 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-800/50 px-4 py-2 rounded-full mb-4">
            <Shield size={16} className="text-yellow-300" />
            <span className="text-yellow-300 text-[12px] font-bold uppercase tracking-widest">
              Privacy Policy
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">
            Your Privacy Matters
          </h1>
          <p className="text-white/60 text-[15px] max-w-2xl mx-auto">
            Learn how AY Travel & Tours collects, uses, and protects your personal information.
          </p>
          <p className="text-white/40 text-[12px] mt-4">
            Last Updated: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Introduction
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Welcome to AY Travel & Tours. We are committed to protecting the privacy and personal information of everyone who uses our website and travel services. This Privacy Policy explains what data we collect, why we collect it, and how we keep it safe.
            </p>
          </div>
        </section>

        {/* Scope */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Scope of This Privacy Policy
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed">
              This policy applies to all visitors, customers, and users who interact with our website, or in-person booking services. It covers all personal data collected during browsing, inquiries, bookings, and post-travel communication. It does not apply to third-party websites you may access through links on our platform.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Information We Collect
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We collect personal information such as your name, contact details, date of birth, and identification documents when you make a booking. We also gather technical data like IP address, browser type, and device information during your visit to our website.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Additional information may be collected depending on the type of travel service you request.
            </p>
          </div>
        </section>

        {/* How We Collect */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            How We Collect Your Information
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We collect information directly from you when you fill out forms, make bookings, or contact our support team.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We don't gather data automatically through cookies, analytics tools, and tracking technologies while you browse our website.
            </p>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            How We Use Your Information
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We use your information to process bookings, confirm travel arrangements, and provide customer support. Your data helps us personalize your experience, send important travel updates, and improve our services.
            </p>
          </div>
        </section>

        {/* Travel & Booking Information */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Travel & Booking Information
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              When you book a trip with us, we collect details such as travel dates, destinations, preferences, and itinerary information. This data is shared with relevant service providers like airlines and hotels to fulfill your booking.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We retain this information to manage your reservation and assist with any future travel needs.
            </p>
          </div>
        </section>

        {/* Passport, CNIC & Visa Information */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Passport, CNIC & Visa Information
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              For international travel and visa processing, we collect sensitive documents including your passport, CNIC, and visa application details.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              This information is handled with strict confidentiality and used solely for booking and immigration purposes.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We do not store these documents longer than necessary and follow secure disposal practices.
            </p>
          </div>
        </section>

        {/* Payment & Transaction Information */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Payment & Transaction Information
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We collect payment details such as card information or bank transfer records to process your booking transactions.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              All payment data is processed through secure, encrypted payment gateways.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We do not store complete card numbers on our own servers.
            </p>
          </div>
        </section>

        {/* How We Share Your Information */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            How We Share Your Information
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We may share your personal information with airlines, hotels, tour operators, and other partners necessary to complete your travel arrangements.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Your data may also be disclosed to government or immigration authorities when required for visa processing.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We never sell your personal information to unrelated third parties for marketing purposes.
            </p>
          </div>
        </section>

        {/* Third-Party Service Providers */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Third-Party Service Providers
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              These providers only access the information necessary to perform their specific functions on our behalf.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              All third parties are required to maintain confidentiality and protect your data appropriately.
            </p>
          </div>
        </section>

        {/* International Data Transfers */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            International Data Transfers
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              As a travel agency, your information may be transferred to and processed in countries outside your own, such as when booking international travel.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We take appropriate measures to ensure your data remains protected during these transfers.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Such transfers are conducted in compliance with applicable data protection laws.
            </p>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Data Retention
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Booking and travel-related records may be kept for a specific period to comply with legal, tax, or regulatory obligations.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Once retention periods expire, your data is securely deleted or anonymized.
            </p>
          </div>
        </section>

        {/* Your Privacy Rights */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Your Privacy Rights
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              You have the right to access, correct, or request deletion of your personal information held by us at any time.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              You may also object to certain uses of your data, such as direct marketing, or request a copy of the data we hold.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              To exercise these rights, please contact us using the details provided in this policy.
            </p>
          </div>
        </section>

        {/* Marketing & Promotional Communications */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Marketing & Promotional Communications
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              With your consent, we may send you promotional offers, travel deals, and newsletters via email or SMS.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              You can opt out of these communications at any time by using the unsubscribe link or contacting our support team.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We will always respect your communication preferences.
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Children's Privacy
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Our services are not intended for use by individuals under the age of 18 without parental or guardian involvement.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We do not knowingly collect personal information directly from children without appropriate consent.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Any data related to minors is only collected as part of a family or group booking made by a responsible adult.
            </p>
          </div>
        </section>

        {/* Changes to This Privacy Policy */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Changes to This Privacy Policy
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Any updates will be posted on this page along with a revised effective date.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We encourage you to review this policy periodically to stay informed.
            </p>
          </div>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Contact Us
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-6">
              If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-teal-600 mt-1" />
                <div>
                  <p className="font-semibold text-[#1E2A2A] text-[14px]">Email</p>
                  <p className="text-stone-600 text-[14px]">abdullahyamnahajjumrah@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-teal-600 mt-1" />
                <div>
                  <p className="font-semibold text-[#1E2A2A] text-[14px]">Phone</p>
                  <p className="text-stone-600 text-[14px]">0339-5531092, 0339-5531094, 0339-5531096</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-teal-600 mt-1" />
                <div>
                  <p className="font-semibold text-[#1E2A2A] text-[14px]">Address</p>
                  <p className="text-stone-600 text-[14px]">V-5 Markaz Hamilton Road, Raja Bazar, Rawalpindi, 75300</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}