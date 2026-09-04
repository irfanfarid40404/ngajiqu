import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Languages,
  Award,
  Layers,
  Clock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const learningPrograms = [
  {
    id: "sd",
    badge: "SD • Usia 7–12 Tahun",
    title: "Dasar Al-Qur'an & Fiqih",
    description:
      "Membangun dasar membaca Al-Qur'an dengan benar sekaligus mengenal doa, ibadah, dan fiqih dasar melalui pembelajaran yang menyenangkan.",
    icon: BookOpen,
    subjects: [
      "Membaca Al-Qur'an",
      "Tajwid dasar",
      "Hafalan surat pendek",
      "Doa sehari-hari",
      "Fiqih ibadah dasar",
      "Adab sehari-hari",
    ],
    ctaText: "Lihat Program SD",
    theme: {
      cardBg: "bg-[#EDF8F5]",
      border: "border-[#D2EFE9]",
      iconBg: "bg-white text-[#049788] border-[#C8EDE9]",
      badgeBg: "bg-white/95 text-[#049788] border-[#C8EDE9]",
      tagBg: "bg-white/85 text-emerald-950 border-emerald-100",
      ctaColor: "text-[#049788] hover:text-[#038073]",
    },
  },
  {
    id: "smp",
    badge: "SMP • Usia 13–15 Tahun",
    title: "Al-Qur'an, Fiqih & Bahasa Arab",
    description:
      "Memperkuat kemampuan membaca dan memahami Al-Qur'an sekaligus memperdalam fiqih dan dasar bahasa Arab.",
    icon: Languages,
    subjects: [
      "Tajwid",
      "Tahsin",
      "Hafalan Al-Qur'an",
      "Fiqih",
      "Akhlak",
      "Dasar Nahwu",
      "Dasar Shorof",
    ],
    ctaText: "Lihat Program SMP",
    theme: {
      cardBg: "bg-[#EEF4FF]",
      border: "border-[#D6E4FF]",
      iconBg: "bg-white text-indigo-700 border-indigo-200",
      badgeBg: "bg-white/95 text-indigo-700 border-indigo-200",
      tagBg: "bg-white/85 text-indigo-950 border-indigo-100",
      ctaColor: "text-indigo-700 hover:text-indigo-800",
    },
  },
  {
    id: "sma",
    badge: "SMA • Usia 16–18 Tahun",
    title: "Pendalaman Al-Qur'an & Nahwu Shorof",
    description:
      "Mendalami Al-Qur'an dan ilmu agama dengan materi yang lebih terstruktur, termasuk Nahwu dan Shorof sebagai dasar memahami bahasa Arab.",
    icon: Award,
    subjects: [
      "Tahsin lanjutan",
      "Tahfidz",
      "Tafsir dasar",
      "Fiqih",
      "Nahwu",
      "Shorof",
      "Bahasa Arab",
    ],
    ctaText: "Lihat Program SMA",
    theme: {
      cardBg: "bg-[#FFF5ED]",
      border: "border-[#FFE3D1]",
      iconBg: "bg-white text-amber-800 border-amber-200",
      badgeBg: "bg-white/95 text-amber-800 border-amber-200",
      tagBg: "bg-white/85 text-amber-950 border-amber-100",
      ctaColor: "text-amber-800 hover:text-amber-900",
    },
  },
  {
    id: "semua",
    badge: "SEMUA JENJANG",
    title: "Belajar Sesuai Kemampuan",
    description:
      "Tidak semua anak belajar dengan kecepatan yang sama. NgajiQ membantu menyesuaikan materi dengan kemampuan dan perkembangan setiap pelajar.",
    icon: Layers,
    subjects: [
      "Al-Qur'an",
      "Fiqih",
      "Nahwu",
      "Shorof",
      "Tahsin",
      "Tahfidz",
    ],
    ctaText: "Cari Program yang Tepat",
    theme: {
      cardBg: "bg-[#EBF8F6]",
      border: "border-[#C8EDE9]",
      iconBg: "bg-white text-[#049788] border-[#C8EDE9]",
      badgeBg: "bg-white/95 text-[#049788] border-[#C8EDE9]",
      tagBg: "bg-white/85 text-teal-950 border-teal-100",
      ctaColor: "text-[#049788] hover:text-[#038073]",
    },
  },
];

export default function BentoLearningSection({ onOpenModal }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="program" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Program Pembelajaran NgajiQ
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Belajar Al-Qur'an dan ilmu agama sesuai usia, kemampuan, dan jenjang pendidikan anak.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="space-y-6 sm:space-y-7 max-w-6xl mx-auto">
          
          {/* Top Row: SD, SMP, SMA (3 Columns on desktop, 1 column on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {learningPrograms.slice(0, 3).map((prog, index) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.id}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => {
                    if (onOpenModal) onOpenModal(`Program ${prog.badge}`);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={prog.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (onOpenModal) onOpenModal(`Program ${prog.badge}`);
                    }
                  }}
                  className={cn(
                    "group rounded-[28px] border p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative",
                    prog.theme.cardBg,
                    prog.theme.border
                  )}
                >
                  <div>
                    {/* Top Header with Icon and Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center border shadow-2xs group-hover:scale-110 transition-transform duration-300",
                        prog.theme.iconBg
                      )}>
                        <Icon className="w-7 h-7 stroke-[2.2]" />
                      </div>
                      
                      <span className={cn(
                        "inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs border",
                        prog.theme.badgeBg
                      )}>
                        {prog.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-black text-slate-950 tracking-tight leading-snug mb-3">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                      {prog.description}
                    </p>

                    {/* Subject Materi Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {prog.subjects.map((sub, i) => (
                        <span
                          key={i}
                          className={cn(
                            "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border",
                            prog.theme.tagBg
                          )}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#049788] shrink-0" />
                          <span>{sub}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom CTA Arrow Link */}
                  <div className="pt-4 border-t border-slate-900/5 flex items-center justify-between">
                    <span className={cn("text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-colors", prog.theme.ctaColor)}>
                      <span>{prog.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs text-slate-400 font-medium">1-on-1 Talaqqi</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row: Card 4 (Semua Jenjang - 1 Col) + Card 5 (Large CTA - 2 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
            
            {/* Card 4: Semua Jenjang */}
            {(() => {
              const prog = learningPrograms[3];
              const Icon = prog.icon;
              return (
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  onClick={() => {
                    if (onOpenModal) onOpenModal("Program Semua Jenjang");
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={prog.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (onOpenModal) onOpenModal("Program Semua Jenjang");
                    }
                  }}
                  className={cn(
                    "group lg:col-span-1 rounded-[28px] border p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative",
                    prog.theme.cardBg,
                    prog.theme.border
                  )}
                >
                  <div>
                    {/* Top Header with Icon & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center border shadow-2xs group-hover:scale-110 transition-transform duration-300",
                        prog.theme.iconBg
                      )}>
                        <Icon className="w-7 h-7 stroke-[2.2]" />
                      </div>
                      
                      <span className={cn(
                        "inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs border",
                        prog.theme.badgeBg
                      )}>
                        {prog.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-950 tracking-tight leading-snug mb-3">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                      {prog.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {prog.subjects.map((sub, i) => (
                        <span
                          key={i}
                          className={cn(
                            "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border",
                            prog.theme.tagBg
                          )}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#049788] shrink-0" />
                          <span>{sub}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-900/5 flex items-center justify-between">
                    <span className={cn("text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-colors", prog.theme.ctaColor)}>
                      <span>{prog.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Fleksibel</span>
                  </div>
                </motion.div>
              );
            })()}

            {/* Card 5: Large CTA Focal Point (2 Columns on desktop) with Clean Vector Features */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="lg:col-span-2 rounded-[28px] bg-slate-950 text-white p-7 sm:p-10 flex flex-col justify-between border border-slate-800 shadow-xl relative overflow-hidden"
            >
              {/* Subtle background ambient mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-35 pointer-events-none" />
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#049788]/20 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
                
                {/* Left Text & CTA */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Belum yakin program mana yang cocok untuk anak Anda?
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Kenali kebutuhan belajar anak dan temukan program NgajiQ yang sesuai dengan usia, kemampuan, dan tujuan belajarnya.
                  </p>

                  <p className="text-xs font-semibold text-[#74CEC3]">
                    Mulai dari jenjang dan kemampuan anak Anda.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (onOpenModal) onOpenModal("Konsultasi Program Jenjang");
                      }}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-[#049788]/30 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
                    >
                      <span>Konsultasikan Program</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Feature Highlights Box with Icons */}
                <div className="md:col-span-5 space-y-3 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#049788]/20 border border-[#049788]/30 text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Guru Tersertifikasi</h4>
                      <p className="text-xs text-slate-400">Pemisahan pengajar ikhwan & akhwat</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#049788]/20 border border-[#049788]/30 text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Waktu Fleksibel</h4>
                      <p className="text-xs text-slate-400">Bebas atur dan reschedule jadwal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#049788]/20 border border-[#049788]/30 text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Garansi Ganti Guru</h4>
                      <p className="text-xs text-slate-400">Jaminan kenyamanan belajar 100%</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
