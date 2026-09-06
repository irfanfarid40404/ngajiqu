import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check, ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const promos = [
  {
    id: 1,
    code: "BERKAH25",
    badge: "Santri Baru",
    discount: "25% OFF",
    title: "Diskon Bulan Pertama",
    desc: "Potongan 25% biaya bimbingan privat 1-on-1 Al-Qur'an atau Fiqih (hemat s/d Rp195.000).",
    isFeatured: true,
  },
  {
    id: 2,
    code: "KELUARGA30",
    badge: "Paket Keluarga",
    discount: "30% OFF",
    title: "Subsidi Multi Santri",
    desc: "Diskon 30% untuk pendaftaran 2 santri atau lebih dalam satu keluarga dengan jadwal terpisah.",
    isFeatured: false,
  },
  {
    id: 3,
    code: "MUSHAFPLUS",
    badge: "Paket 3 Bulan",
    discount: "GRATIS MUSHAF",
    title: "Hadiah Mushaf & Tajwid",
    desc: "Ambil paket kuartalan dan dapatkan Mushaf Madinah rasm Utsmani serta buku tajwid ke rumah.",
    isFeatured: false,
  },
];

export default function PromoSection({ onOpenModal }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2200);
  };

  return (
    <section
      id="promo"
      aria-label="Voucher dan Promo Spesial"
      className="py-16 md:py-24 bg-[#FBFBFC] border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Subtle Islamic Motif Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.2] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23049788' stroke-width='1' stroke-opacity='0.25'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%23049788' stroke-width='0.75' stroke-opacity='0.2'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%23049788' fill-opacity='0.08' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Header — The Heading Self-Weight Rule */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2.5">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Voucher & <span className="text-[#049788]">Promo Spesial</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Gunakan voucher berikut saat pendaftaran untuk menikmati potongan biaya dan fasilitas belajar eksklusif.
          </p>
        </div>

        {/* 3 Clean Voucher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {promos.map((promo, index) => {
            const isCopied = copiedCode === promo.code;

            return (
              <motion.article
                key={promo.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className={cn(
                  "relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 overflow-hidden",
                  promo.isFeatured
                    ? "bg-white border-2 border-[#049788] shadow-sm ring-4 ring-[#049788]/10"
                    : "bg-white border border-slate-200 hover:border-slate-300 shadow-2xs"
                )}
              >
                {/* Content Top */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={cn(
                        "text-xs font-bold px-2.5 py-0.5 rounded-full",
                        promo.isFeatured
                          ? "bg-[#049788] text-white"
                          : "bg-slate-100 text-slate-700"
                      )}
                    >
                      {promo.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#049788]" />
                      <span>Kupon Aktif</span>
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {promo.discount}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {promo.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                    {promo.desc}
                  </p>
                </div>

                {/* Perforated Divider with Ticket Notches */}
                <div className="relative my-5 -mx-6">
                  <div
                    className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#FBFBFC] border-r border-slate-200 shadow-inner"
                    aria-hidden="true"
                  />
                  <div
                    className="border-t border-dashed border-slate-200 mx-5"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#FBFBFC] border-l border-slate-200 shadow-inner"
                    aria-hidden="true"
                  />
                </div>

                {/* Voucher Code & Action */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 tracking-wider">
                      {promo.code}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(promo.code)}
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[44px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]",
                        isCopied
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-white text-[#049788] hover:bg-[#EBF8F6] border border-slate-200"
                      )}
                      aria-label={`Salin kode voucher ${promo.code}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenModal) onOpenModal(`Klaim Promo ${promo.code}`);
                    }}
                    className="w-full py-2.5 px-4 min-h-[44px] bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
                  >
                    <span>Gunakan Voucher</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Single Quiet Trust Line */}
        <p className="text-xs text-slate-500 text-center mt-10">
          Garansi ganti guru jika merasa belum cocok • Biaya transparan tanpa biaya tersembunyi
        </p>
      </div>
    </section>
  );
}
