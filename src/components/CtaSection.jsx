import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaSection({ onOpenModal, onNavigate }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      
      {/* Ambient background teal radial glow with slow breathing */}
      <motion.div 
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#049788]/15 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">

        {/* Heading */}
        <motion.h2 
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto"
        >
          Mulai Langkah Pertama <br className="hidden sm:inline" />
          <span className="text-[#049788]">Membaca Al-Qur'an Lebih Tartil</span>
        </motion.h2>

        {/* Centered Primary CTA Button */}
        <motion.div 
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center pt-2"
        >
          <a
            href="/daftar-kelas"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("/daftar-kelas");
              } else if (onOpenModal) {
                e.preventDefault();
                onOpenModal("Final CTA");
              }
            }}
            className="px-9 py-4 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] font-bold rounded-xl text-sm sm:text-base text-white flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#049788]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
          >
            <span>Daftar Trial Class</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Subtitle & Guarantee Footnote */}
        <motion.div 
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 pt-2"
        >
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Bergabunglah bersama ribuan santri yang telah merasakan kemudahan dan keberkahan bimbingan belajar Al-Qur'an bersama para ustadz & ustadzah kami.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Garansi ganti guru jika belum merasa cocok · Jadwal fleksibel 24/7
          </p>
        </motion.div>

      </div>
    </section>
  );
}
