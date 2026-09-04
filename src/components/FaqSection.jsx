import React, { useState } from "react";
import { faqs, siteConfig } from "../data/content";
import { ChevronDown, MessageSquare } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Pertanyaan yang sering diajukan seputar bimbingan belajar mengaji di NgajiQ.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-950 text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#049788] rounded-2xl"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#049788]" : "text-slate-400"
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className={`grid transition-all duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Support Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Masih ada pertanyaan yang belum terjawab?</h4>
            <p className="text-xs text-slate-500">Tim kami siap membantu Anda berkonsultasi langsung melalui WhatsApp.</p>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Halo Admin NgajiQ, saya ingin tanya lebih lanjut mengenai kelas belajar mengaji.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shrink-0 transition-colors shadow-2xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
