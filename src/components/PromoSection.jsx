import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tag, Copy, Check, ArrowRight, Gift, Users, BookOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const promos = [
  {
    id: 1,
    badge: "Diskon 25%",
    badgeColor: "bg-emerald-500 text-white",
    code: "BERKAH25",
    title: "Promo Santri Baru",
    description: "Potongan 25% biaya belajar bulan pertama untuk pendaftaran kelas privat 1-on-1 jenjang apa saja.",
    icon: Gift,
    benefits: [
      "Berlaku untuk semua paket reguler & intensif",
      "Termasuk 1 sesi tes level kemampuan gratis",
      "Garansi ganti guru tanpa biaya tambahan"
    ],
    highlight: "Hemat s/d Rp195.000",
    theme: "border-[#049788]/30 bg-gradient-to-b from-[#F2FAF8] to-white",
  },
  {
    id: 2,
    badge: "Hemat 30%",
    badgeColor: "bg-[#049788] text-white",
    code: "KELUARGA30",
    title: "Paket Belajar Keluarga",
    description: "Daftarkan 2 santri atau lebih (kakak, adik, orang tua) dan nikmati diskon khusus keluarga bahagia.",
    icon: Users,
    benefits: [
      "Bebas tentukan guru ikhwan/akhwat masing-masing",
      "Jadwal fleksibel terpisah untuk tiap anggota",
      "Laporan kemajuan berkala setiap akhir pekan"
    ],
    highlight: "Potongan biaya langganan bulanan",
    theme: "border-indigo-200 bg-gradient-to-b from-[#F0F4FF] to-white",
  },
  {
    id: 3,
    badge: "Bonus Fisik",
    badgeColor: "bg-amber-500 text-white",
    code: "MUSHAFPLUS",
    title: "Bonus Mushaf & Buku Tajwid",
    description: "Ambil paket kuartalan (3 bulan) dan dapatkan mushaf standar Madinah serta modul tajwid dikirim ke rumah.",
    icon: BookOpen,
    benefits: [
      "Mushaf rasm Utsmani cetakan standar Kemenag",
      "Modul ringkas panduan makhraj dan hukum tajwid",
      "Gratis ongkos kirim ke seluruh Indonesia"
    ],
    highlight: "Hadiah senilai Rp150.000",
    theme: "border-amber-200 bg-gradient-to-b from-[#FFF9F2] to-white",
  },
];

export default function PromoSection({ onOpenModal }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="promo" className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Promo & Penawaran Spesial
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Dapatkan kemudahan belajar Al-Qur'an dengan potongan biaya dan bonus materi eksklusif bulan ini.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
          {promos.map((promo, index) => {
            const Icon = promo.icon;
            const isCopied = copiedCode === promo.code;

            return (
              <motion.div
                key={promo.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={cn(
                  "group rounded-[28px] border p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden",
                  promo.theme
                )}
              >
                <div>
                  {/* Top Badge & Highlight */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className={cn("text-xs font-bold px-3 py-1 rounded-full shadow-2xs", promo.badgeColor)}>
                      {promo.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {promo.highlight}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-[#049788] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight leading-snug">
                      {promo.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {promo.description}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-200/60">
                    {promo.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-[#049788] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon Code Box & CTA */}
                <div className="pt-4 border-t border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between bg-white border border-dashed border-slate-300 rounded-xl px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#049788]" />
                      <span className="text-xs font-mono font-bold text-slate-900 tracking-wider">
                        {promo.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(promo.code)}
                      className="text-xs font-semibold text-[#049788] hover:text-[#038073] flex items-center gap-1 transition-colors"
                      title="Salin kode promo"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Tersalin</span>
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
                    onClick={() => {
                      if (onOpenModal) onOpenModal(`Klaim Promo ${promo.code}`);
                    }}
                    className="w-full py-3 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Klaim Promo Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
