import Link from "next/link";
import { FileText, Mail, Phone, MapPin, AlertCircle } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-teal-900 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-800/50 px-4 py-2 rounded-full mb-4">
            <FileText size={16} className="text-yellow-300" />
            <span className="text-yellow-300 text-[12px] font-bold uppercase tracking-widest">
              Terms & Conditions
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">
            Our Terms & Conditions
          </h1>
          <p className="text-white/60 text-[15px] max-w-2xl mx-auto">
            Please read these terms carefully before booking any travel services with AY Travel & Tours.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-white/40 text-[12px]">
              <p className="font-semibold text-white/60">Licence No:</p>
              <p>10072</p>
            </div>
            <div className="text-white/40 text-[12px]">
              <p className="font-semibold text-white/60">IATA Code:</p>
              <p>27352964</p>
            </div>
          </div>
          <p className="text-white/40 text-[12px] mt-4">
            Last Updated: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Booking Confirmation */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Booking Confirmation
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              All bookings are subject to availability and will only be considered confirmed once the required payment has been received and a written confirmation has been issued by our team.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Customers are advised to carefully review all booking details upon receiving their confirmation and notify us immediately of any discrepancies.
            </p>
          </div>
        </section>

        {/* Required Documents */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Required Documents
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Customers are responsible for providing all required travel documents, including valid passports, visas, identification cards, photographs, and any supporting documentation requested by airlines, embassies, or immigration authorities.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Failure to provide the necessary documents may result in delays, denied boarding, or cancellation of travel.
            </p>
          </div>
        </section>

        {/* Passport Validity */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Passport Validity Requirements
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              It is the customer's responsibility to ensure that their passport meets the validity requirements of the destination country.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Many countries require passports to remain valid for at least six months beyond the intended date of travel.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We recommend verifying passport validity well before your departure date.
            </p>
          </div>
        </section>

        {/* Visa Responsibilities */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Visa Responsibilities
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Visa requirements vary depending on your nationality and destination. While we may assist with the visa application process, the final decision rests solely with the relevant embassy or consulate.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We cannot guarantee visa approval and are not liable for delays, refusals, or any losses arising from visa-related decisions.
            </p>
          </div>
        </section>

        {/* Customer Obligations */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Customer Obligations
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Customers are responsible for ensuring the accuracy of all personal information provided during the booking process.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              They must comply with the laws, immigration regulations, customs requirements, and airline policies of all countries included in their travel itinerary.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Any costs resulting from incorrect information or non-compliance shall be the responsibility of the customer.
            </p>
          </div>
        </section>

        {/* Travel Insurance */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Travel Insurance Recommendation
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              We strongly recommend that all customers obtain comprehensive travel insurance prior to departure.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Travel insurance can provide valuable protection against unforeseen circumstances, including trip cancellations, medical emergencies, lost baggage, travel delays, and other unexpected events.
            </p>
          </div>
        </section>

        {/* Itinerary Changes */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Itinerary Changes
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Travel itineraries may be subject to changes due to airline schedules, weather conditions, operational requirements, government regulations, or other circumstances beyond our control.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              We will make every reasonable effort to inform customers promptly of any significant changes and provide suitable alternatives whenever possible.
            </p>
          </div>
        </section>

        {/* Check-in Requirements */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Check-in Requirements
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Customers are responsible for arriving at the airport or departure point within the check-in time specified by the airline or service provider.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Failure to meet check-in deadlines may result in denied boarding, ticket cancellation, or additional charges, for which we cannot be held responsible.
            </p>
          </div>
        </section>

        {/* Airline Policies */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Airline Policies
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              All flights are subject to the terms, conditions, baggage allowances, cancellation policies, and operational procedures of the respective airline.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Customers are encouraged to familiarize themselves with the applicable airline policies before travel, as these may differ between carriers and may change without prior notice.
            </p>
          </div>
        </section>

        {/* Refund & Cancellation */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Refund & Cancellation
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#1E2A2A] text-[16px] mb-3">
                  Tour Cancellations
                </h3>
                <p className="text-stone-600 text-[15px] leading-relaxed mb-2">
                  Customers may request the cancellation of their tour booking by contacting our customer support team in writing.
                </p>
                <p className="text-stone-600 text-[15px] leading-relaxed">
                  Cancellation charges may apply depending on the date of cancellation, supplier policies, and any non-refundable services already confirmed. We recommend informing us as early as possible to minimize cancellation fees.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E2A2A] text-[16px] mb-3">
                  Flight Cancellations
                </h3>
                <p className="text-stone-600 text-[15px] leading-relaxed mb-2">
                  Flight cancellations and refunds are subject to the terms and conditions of the respective airline.
                </p>
                <p className="text-stone-600 text-[15px] leading-relaxed">
                  Any applicable cancellation charges, fare rules, or administrative fees imposed by the airline will be deducted from the refundable amount. We will assist you throughout the cancellation process and communicate the airline's refund decision promptly.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E2A2A] text-[16px] mb-3">
                  Hotel Cancellations
                </h3>
                <p className="text-stone-600 text-[15px] leading-relaxed mb-2">
                  Hotel booking cancellations are governed by the cancellation policy of the respective hotel or accommodation provider.
                </p>
                <p className="text-stone-600 text-[15px] leading-relaxed">
                  Depending on the booking conditions, cancellation requests may incur partial or full cancellation charges. Refund eligibility will be determined according to the hotel's terms at the time of booking.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E2A2A] text-[16px] mb-3">
                  Visa Application Fees
                </h3>
                <p className="text-stone-600 text-[15px] leading-relaxed">
                  Visa application fees, embassy charges, and service fees are generally nonrefundable once the application has been submitted or processing has commenced. Refunds will only be considered where permitted by the relevant embassy, consulate, or immigration authority.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E2A2A] text-[16px] mb-3">
                  Umrah Package Cancellations
                </h3>
                <p className="text-stone-600 text-[15px] leading-relaxed mb-2">
                  Cancellation requests for Umrah packages are subject to the policies of airlines, hotels, transport providers, and other service partners involved in the package.
                </p>
                <p className="text-stone-600 text-[15px] leading-relaxed">
                  Applicable cancellation charges will be deducted before any eligible refund is processed. We encourage customers to review package terms carefully before confirming their booking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Non-Refundable Services */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Non-Refundable Services
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle size={18} className="text-yellow-600 mt-1" />
              <p className="text-stone-600 text-[15px] leading-relaxed">
                Certain services, including promotional offers, special discounted packages, visa processing fees, travel insurance, and other supplier-designated non-refundable services, cannot be refunded under any circumstances.
              </p>
            </div>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              These conditions will be clearly communicated at the time of booking whenever applicable.
            </p>
          </div>
        </section>

        {/* Refund Processing Timelines */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Refund Processing Timelines
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Once a refund request has been approved, we will initiate the refund process as soon as possible.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Refund processing times may vary depending on the payment method, banking procedures, airlines, hotels, or other third-party service providers.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Customers will be kept informed regarding the status of their refund whenever possible.
            </p>
          </div>
        </section>

        {/* Bank Transfer Refunds */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Bank Transfer Refunds
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Refunds made through bank transfer will only be processed to the original bank account used for payment unless otherwise agreed in writing.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-4">
              Customers may be required to provide accurate banking information to avoid delays.
            </p>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Any bank charges or transaction fees imposed by financial institutions may be deducted from the refunded amount where applicable.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1E2A2A] mb-4">
            Contact Us
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <p className="text-stone-600 text-[15px] leading-relaxed mb-6">
              If you have any questions about these Terms & Conditions, please contact us.
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