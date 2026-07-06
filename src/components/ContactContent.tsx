"use client";

import { useTranslation } from "@/lib/useTranslation";
import { contactInfo } from "@/lib/contactInfo";
import ContactForm from "@/components/ContactForm";
import type { FormField } from "@/components/ContactForm";

const contactFields: FormField[] = [
  { name: "name", label: "", type: "text", required: true },
  { name: "email", label: "", type: "email", required: true },
  { name: "message", label: "", type: "textarea", required: true },
];

export default function ContactContent() {
  const { t, language } = useTranslation();

  const fieldsWithLabels = contactFields.map((f) => ({
    ...f,
    label: t(`contact.form${f.name.charAt(0).toUpperCase() + f.name.slice(1)}Label`),
  }));

  return (
    <div className="bg-brand-cream">
      {/* Page Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16 lg:min-h-[calc(100vh-80px)] min-h-[550px] flex flex-col justify-start animate-fade-in-up">
        
        {/* Main Title Block */}
        <div className="mb-16 text-center">
          <span className="mb-3 text-xs uppercase tracking-widest text-brand-wheat-gold font-bold font-work-sans block">
            {language === "ur" ? "ہم سے رابطہ کریں" : "Get In Touch"}
          </span>
          <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-brand-dark-green font-fraunces leading-tight">
            {t("contact.pageTitle")}
          </h1>
          <div className="mx-auto mb-6 h-0.5 w-12 bg-brand-orange" />
          <p className="mx-auto max-w-3xl text-lg sm:text-xl text-brand-charcoal/80 leading-relaxed font-light">
            {t("contact.pageSubtitle")}
          </p>
        </div>

        {/* Asymmetrical Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-start">
          
          {/* Column 1: Contact Details Stack */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-s-4 border-brand-light-green ps-5 mb-8 py-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark-green font-fraunces leading-tight">
                {language === "ur" ? "رابطہ کی تفصیلات" : "Contact Details"}
              </h2>
            </div>
            
            <div className="space-y-6">
              
              {/* Phone Card */}
              <div className="group flex gap-4 rounded-2xl border border-brand-wheat-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-light-green/40">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-wheat-gold/10 text-brand-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark-green uppercase tracking-wider font-work-sans mb-1">
                    {t("contact.phoneLabel")}
                  </h3>
                  <a
                    href={contactInfo.phoneLink}
                    className="text-base text-brand-charcoal hover:text-brand-orange transition-colors font-medium font-work-sans"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="group flex gap-4 rounded-2xl border border-brand-wheat-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-light-green/40">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-wheat-gold/10 text-brand-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark-green uppercase tracking-wider font-work-sans mb-1">
                    {t("contact.whatsappLabel")}
                  </h3>
                  <a
                    href={contactInfo.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-brand-charcoal hover:text-brand-orange transition-colors font-medium font-work-sans"
                  >
                    {t("footer.whatsapp")}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="group flex gap-4 rounded-2xl border border-brand-wheat-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-light-green/40">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-wheat-gold/10 text-brand-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark-green uppercase tracking-wider font-work-sans mb-1">
                    {t("contact.emailLabel")}
                  </h3>
                  <a
                    href={contactInfo.emailLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-brand-charcoal hover:text-brand-orange transition-colors font-medium font-work-sans"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex flex-col gap-4 rounded-2xl border border-brand-wheat-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-light-green/40">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-wheat-gold/10 text-brand-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-dark-green uppercase tracking-wider font-work-sans mb-1">
                      {t("contact.addressLabel")}
                    </h3>
                    <p className="text-base text-brand-charcoal leading-relaxed font-light font-work-sans">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="rounded-xl overflow-hidden shadow-md">
                  <iframe
                    src={`https://www.google.com/maps?q=${contactInfo.addressMapQuery}&output=embed`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MRS Agro Chemicals Location"
                  />
                </div>

                {/* Get Directions Button */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.addressMapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-brand-orange px-6 py-3 text-xs font-bold text-brand-cream transition-all duration-300 hover:bg-brand-orange/95 hover:scale-103 shadow-md active:scale-95 font-work-sans"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>{language === "ur" ? "راستہ دیکھیں" : "Get Directions"}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Column 2: Direct message form card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-brand-wheat-gold/25 bg-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
              {/* Subtle top visual accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange" />
              
              <h3 className="mb-6 text-2xl font-bold text-brand-dark-green font-fraunces">
                {t("contact.formHeading")}
              </h3>
              
              <ContactForm
                endpoint="/api/contact"
                submitLabel={t("contact.formSubmitButton")}
                successMessage={t("contact.formSuccessMessage")}
                errorMessage={t("contact.formErrorMessage")}
                fields={fieldsWithLabels}
              />
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
