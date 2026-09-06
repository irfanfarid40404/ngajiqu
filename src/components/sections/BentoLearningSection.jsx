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

const unifiedTheme = {
  cardBg: "bg-white",
  border: "border-slate-200/90 hover:border-[#049788]/40",
  iconBg: "bg-[#EBF8F6] text-[#049788] border-[#C8EDE9]",
  badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
  tagBg: "bg-slate-50 text-slate-700 border-slate-200/80",
  ctaColor: "text-[#049788] hover:text-[#038073]",
};

const learningPrograms = [
  {
    id: "sd",
    badge: "SD • Usia 7–12 Tahun",
    title: "Dasar Al-Qur'an & Fiqih",
    description:
      "Fondasi membaca Al-Qur'an tartil, tajwid dasar, hafalan juz amma, dan adab harian santri.",
    icon: BookOpen,
    subjects: [
      "Tahsin & Tajwid Dasar",
      "Hafalan Juz 30",
      "Doa Sehari-hari",
      "Fiqih Ibadah Praktis",
    ],
    ctaText: "Lihat Program SD",
    theme: unifiedTheme,
  },
  {
    id: "smp",
    badge: "SMP • Usia 13–15 Tahun",
    title: "Al-Qur'an, Fiqih & Bahasa Arab",
    description:
      "Penguatan tahsin, hafalan terarah, fiqih aplikatif, dan dasar tata bahasa Arab.",
    icon: Languages,
    subjects: [
      "Tahsin & Tahfidz",
      "Tajwid Aplikatif",
      "Fiqih Remaja",
      "Dasar Nahwu & Shorof",
    ],
    ctaText: "Lihat Program SMP",
    theme: unifiedTheme,
  },
  {
    id: "sma",
    badge: "SMA • Usia 16–18 Tahun",
    title: "Pendalaman Al-Qur'an & Nahwu Shorof",
    description:
      "Pendalaman bacaan berstandar sanad, kajian tafsir dasar, dan gramatika bahasa Arab.",
    icon: Award,
    subjects: [
      "Tahsin Lanjutan",
      "Tafsir Ayat Pilihan",
      "Kaidah Nahwu-Shorof",
      "Fiqih Muamalah",
    ],
    ctaText: "Lihat Program SMA",
    theme: unifiedTheme,
  },
  {
    id: "semua",
    badge: "SEMUA JENJANG",
    title: "Belajar Sesuai Kemampuan",
    description:
      "Bimbingan fleksibel yang menyesuaikan tingkat pemahaman dan target belajar setiap santri.",
    icon: Layers,
    subjects: [
      "Kurikulum Personal",
      "Jadwal Fleksibel 1-on-1",
      "Semua Tingkatan Usia",
    ],
    ctaText: "Cari Program yang Tepat",
    theme: unifiedTheme,
  },
];

export default function BentoLearningSection({ onOpenModal }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="program"
      aria-label="Program Pembelajaran NgajiQ"
      className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Subtle Islamic Motif Background Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23049788' stroke-width='1' stroke-opacity='0.25'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%23049788' stroke-width='0.75' stroke-opacity='0.2'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%23049788' fill-opacity='0.08' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header — The Heading Self-Weight Rule (No kicker pill) */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Program Pembelajaran NgajiQ
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Belajar Al-Qur'an dan ilmu agama sesuai usia, kemampuan, dan jenjang pendidikan anak.
          </p>
        </div>

        {/* Bento Grid Layout (Original Structure Preserved) */}
        <div className="space-y-6 sm:space-y-7 max-w-6xl mx-auto">
          {/* Top Row: SD, SMP, SMA (3 Columns on desktop, 1 column on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {learningPrograms.slice(0, 3).map((prog, index) => {
              const Icon = prog.icon;
              return (
                <motion.article
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
                    "group rounded-[28px] border p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]",
                    prog.theme.cardBg,
                    prog.theme.border
                  )}
                >
                  <div>
                    {/* Top Header with Icon and Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs group-hover:scale-105 transition-transform duration-300",
                          prog.theme.iconBg
                        )}
                      >
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-2xs border",
                          prog.theme.badgeBg
                        )}
                      >
                        {prog.badge}
                      </span>
                    </div>

                    {/* Title & Concise Description */}
                    <h3 className="text-xl font-black text-slate-950 tracking-tight leading-snug mb-2">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                      {prog.description}
                    </p>

                    {/* Subject Materi Pills (Concise 4 key tags) */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
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
                  <div className="pt-4 border-t border-slate-900/5 flex items-center justify-between min-h-[44px]">
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-colors",
                        prog.theme.ctaColor
                      )}
                    >
                      <span>{prog.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs text-slate-400 font-medium">1-on-1 Talaqqi</span>
                  </div>
                </motion.article>
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
                <motion.article
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
                    "group lg:col-span-1 rounded-[28px] border p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]",
                    prog.theme.cardBg,
                    prog.theme.border
                  )}
                >
                  <div>
                    {/* Top Header with Icon & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs group-hover:scale-105 transition-transform duration-300",
                          prog.theme.iconBg
                        )}
                      >
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-2xs border",
                          prog.theme.badgeBg
                        )}
                      >
                        {prog.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-950 tracking-tight leading-snug mb-2">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                      {prog.description}
                    </p>

                    {/* Concise 3 key tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
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

                  <div className="pt-4 border-t border-slate-900/5 flex items-center justify-between min-h-[44px]">
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-colors",
                        prog.theme.ctaColor
                      )}
                    >
                      <span>{prog.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Fleksibel</span>
                  </div>
                </motion.article>
              );
            })()}

            {/* Card 5: Large CTA Focal Point (2 Columns on desktop) */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="lg:col-span-2 rounded-[28px] bg-slate-950 text-white p-7 sm:p-9 flex flex-col justify-between border border-slate-800 shadow-lg relative overflow-hidden"
            >
              {/* Subtle Islamic Motif in Dark Card instead of generic SaaS dots */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='1'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='white' stroke-width='0.75'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
              />
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#049788]/20 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
                {/* Left Text & CTA (Concise, no duplicate paragraph) */}
                <div className="md:col-span-7 space-y-3.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Belum yakin program yang cocok untuk anak Anda?
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Konsultasikan usia, kemampuan awal, dan target belajar anak bersama tim pengajar kami secara gratis.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenModal) onOpenModal("Konsultasi Program Jenjang");
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#049788]/20 transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
                    >
                      <span>Konsultasi Program Gratis</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Feature Highlights Box with Icons */}
                <div className="md:col-span-5 space-y-3 bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#049788]/20 border border-[#049788]/30 text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Guru Tersertifikasi</h4>
                      <p className="text-xs text-slate-400">Pemisahan guru ikhwan & akhwat</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#049788]/20 border border-[#049788]/30 text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Waktu Fleksibel</h4>
                      <p className="text-xs text-slate-400">Bebas atur dan reschedule sesi</p>
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

