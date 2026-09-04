import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, BookOpen, ShieldCheck } from "lucide-react";

export default function Hero({ onOpenModal, onNavigate }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#E8F7F5] via-[#F3FAF8] to-white border-b border-slate-200/80 overflow-hidden">
      
      {/* Ambient Islamic Glow Orbs with Gentle Breathing Motion */}
      <motion.div 
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 left-1/4 w-[480px] h-[480px] bg-[#049788]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <motion.div 
        animate={shouldReduceMotion ? undefined : { scale: [1.06, 1, 1.06], opacity: [0.18, 0.12, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 right-0 w-[520px] h-[520px] bg-[#2DD4BF]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      {/* Islamic Geometric Star Pattern (Khatam / 8-Point Star Arabesque Motif) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.45] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23049788' stroke-width='1' stroke-opacity='0.25'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%23049788' stroke-width='0.75' stroke-opacity='0.2'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%23049788' fill-opacity='0.08' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle Top Linear Grid Line */}
      <div 
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#049788]/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Copy & CTA with Staggered Entrance */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            <motion.h1 
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-black text-slate-950 tracking-tight lg:tracking-[-0.03em] leading-[1.15]"
            >
              Belajar Mengaji <br className="hidden sm:inline" />
              Jadi <span className="text-[#049788]">Lebih Mudah</span>
            </motion.h1>

            <motion.p 
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed"
            >
              Belajar Al-Qur'an bersama guru terbaik, kapan saja dan dari mana saja. Bimbingan ramah, terstruktur, dan disesuaikan dengan ritme kemampuan santri dan keluarga.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <a
                href="/daftar-kelas"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("/daftar-kelas");
                  } else if (onOpenModal) {
                    e.preventDefault();
                    onOpenModal("Hero Primary");
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white bg-[#049788] hover:bg-[#038073] active:scale-[0.99] rounded-xl shadow-lg shadow-[#049788]/25 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
              >
                <span>Mulai Belajar</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#kelas"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 bg-white/90 hover:bg-white border border-slate-200/90 rounded-xl transition-all shadow-2xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
              >
                <span>Lihat Pilihan Kelas</span>
              </a>
            </motion.div>

            {/* Social Proof Rating */}
            <motion.div 
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex items-center gap-3"
            >
              <div className="flex items-center gap-1 text-amber-500" aria-label="Rating 5 bintang">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                <strong className="text-slate-900">4.9 / 5.0</strong> rating kepuasan dari 3.000+ pelajar & orang tua
              </p>
            </motion.div>

          </div>

          {/* Right Column - Visual & Floating Badges */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Visual Container */}
            <motion.div 
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-2xl group"
            >
              <img
                src="/hero-tutor.jpg"
                alt="Sesi Bimbingan Belajar Mengaji Al-Qur'an Online Privat 1-on-1"
                width="600"
                height="450"
                loading="eager"
                fetchPriority="high"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Floating Card: Tutor Certified with subtle floating breathing */}
            <motion.div 
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: [0, -6, 0] }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.4 }
                  : {
                      opacity: { duration: 0.5, delay: 0.3 },
                      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    }
              }
              className="absolute -bottom-4 left-3 sm:-bottom-5 sm:-left-4 bg-white/95 backdrop-blur-xs p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[240px] z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">300+ Guru Terpilih</div>
                <div className="text-xs text-slate-500">Lulus Uji & Bersanad</div>
              </div>
            </motion.div>

            {/* Floating Card: Active Classes with counter-phase floating breathing */}
            <motion.div 
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: [0, 6, 0] }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.4 }
                  : {
                      opacity: { duration: 0.5, delay: 0.4 },
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                    }
              }
              className="hidden sm:flex absolute -top-3 right-3 sm:-top-4 sm:-right-3 bg-white/95 backdrop-blur-xs p-3 sm:p-3.5 rounded-2xl shadow-xl border border-slate-100 items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="text-xs font-bold text-slate-800">
                800+ Kelas Berjalan
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
