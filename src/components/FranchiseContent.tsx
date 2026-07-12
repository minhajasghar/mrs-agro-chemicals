"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import ContactForm from "@/components/ContactForm";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function FranchiseContent() {
  const { t, language } = useTranslation();
  const isUrdu = language === "ur";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-brand-dark-green to-[#0F2B12]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMHYyMEgwdjBIMjB2MjBIMjBWMjBoMjB2MEgyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMjUpIi8+PC9zdmc+')] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-brand-wheat-gold mb-4"
          >
            {isUrdu ? "فرنچائز" : "Franchise"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-white font-fraunces leading-tight"
          >
            {isUrdu ? "ہمارے نیٹ ورک کا حصہ بنیں" : "Join Our Network"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-brand-wheat-gold text-xl md:text-2xl font-bold mt-4 tracking-wide font-fraunces font-urdu-heading"
          >
            {isUrdu ? "بلندی کی طرف گامزن" : "Rising Towards New Heights"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            {isUrdu
              ? "پنجاب بھر میں ہمارے مجاز فرنچائز نیٹ ورک کے ذریعے کسانوں کو معیاری مصنوعات فراہم کرنے میں ہمارا ساتھ دیں۔"
              : "Partner with MRS Agro Chemicals and bring premium crop protection solutions to farmers in your region."}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-10">
              <FadeUp>
                <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden bg-gradient-to-br from-brand-cream to-brand-dark-green/5 border border-brand-dark-green/5">
                  <Image
                    src="/images/franchise.jpeg"
                    alt={t("franchise.shopImageAlt")}
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark-green font-fraunces">
                  {isUrdu ? "ہماری موجودگی" : "Our Presence"}
                </h2>
                <p className="text-brand-charcoal/60 leading-relaxed">
                  {isUrdu
                    ? "ہماری فرنچائز شاپ کسانوں کے لیے معیاری مصنوعات اور ماہرانہ رہنمائی کا ایک قابلِ اعتماد مرکز ہے۔"
                    : "Our franchise shop stands as a trusted destination for farmers seeking quality pesticides and expert guidance."}
                </p>
              </FadeUp>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: isUrdu ? "مقام" : "Location",
                    value: "Plot 106, Phase II, Industrial Estate, Multan",
                  },
                  {
                    label: isUrdu ? "نیٹ ورک" : "Network",
                    value: isUrdu ? "پنجاب بھر میں مجاز فرنچائز نیٹ ورک" : "Authorized network across Punjab",
                  },
                ].map((item, i) => (
                  <FadeUp key={i} delay={0.2 + i * 0.1}>
                    <div className="rounded-2xl bg-gradient-to-b from-brand-cream to-white border border-brand-dark-green/5 p-6">
                      <p className="text-xs font-bold tracking-widest uppercase text-brand-wheat-gold mb-2">{item.label}</p>
                      <p className="text-sm font-medium text-brand-charcoal">{item.value}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.3}>
                <div className="rounded-2xl bg-gradient-to-br from-brand-dark-green/5 to-brand-light-green/5 border border-brand-dark-green/10 p-8">
                  <h3 className="text-lg font-bold text-brand-dark-green font-fraunces mb-4">
                    {isUrdu ? "فرنچائز کے فوائد" : "Franchise Benefits"}
                  </h3>
                  <ul className="space-y-3">
                    {[
                      isUrdu ? "معیاری مصنوعات کی فراہمی" : "Premium product portfolio",
                      isUrdu ? "مارکیٹنگ اور تکنیکی معاونت" : "Marketing & technical support",
                      isUrdu ? "منافع بخش کاروباری ماڈل" : "Profitable business model",
                      isUrdu ? "مستقل سپلائی" : "Consistent supply chain",
                      isUrdu ? "برانڈ سپورٹ" : "Brand recognition & support",
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-brand-charcoal/70">
                        <svg className="w-5 h-5 text-brand-dark-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.2}>
              <div className="lg:sticky lg:top-28">
                <div className="rounded-[32px] bg-white border border-brand-dark-green/5 p-8 lg:p-10 shadow-xl shadow-brand-dark-green/5">
                  <h3 className="text-2xl font-bold text-brand-dark-green font-fraunces mb-2">
                    {isUrdu ? "درخواست دیں" : "Apply Now"}
                  </h3>
                  <p className="text-brand-charcoal/50 text-sm mb-8 leading-relaxed">
                    {isUrdu
                      ? "فرنچائز کے لیے درخواست دینے کے لیے نیچے دیا گیا فارم پُر کریں۔"
                      : "Fill out the form below and our team will get back to you within 48 hours."}
                  </p>
                  <ContactForm
                    endpoint="/api/franchise"
                    fields={[
                      { name: "name", label: t("franchise.formNameLabel"), type: "text" },
                      { name: "phone", label: t("franchise.formPhoneLabel"), type: "tel" },
                      { name: "city", label: t("franchise.formCityLabel"), type: "text" },
                      { name: "message", label: t("franchise.formMessageLabel"), type: "textarea", required: false },
                    ]}
                    submitLabel={t("franchise.formSubmitButton")}
                    successMessage={t("franchise.formSuccessMessage")}
                    errorMessage={t("franchise.formErrorMessage")}
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
