import React from "react";
import { ArrowRight } from "lucide-react";

export default function CtaSection({ onOpenModal }) {
  return (
    <section className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      
      {/* Ambient background teal radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#049788]/15 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">

        {/* Massive Bold Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02] max-w-4xl mx-auto">
          KAMI SIAP <br className="hidden sm:inline" />
          MEMBANTU
        </h2>

        {/* Centered Primary CTA Button */}
        <div className="flex items-center justify-center pt-2">
          <button
            onClick={() => onOpenModal && onOpenModal("Final CTA")}
            className="px-9 py-4 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] font-bold rounded-xl text-sm sm:text-base text-white flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#049788]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
          >
            <span>Daftar Trial Class</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Subtitle & Guarantee Footnote */}
        <div className="space-y-2 pt-2">
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Bergabunglah bersama ribuan santri yang telah merasakan kemudahan dan keberkahan bimbingan belajar Al-Qur'an bersama para ustadz & ustadzah kami.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Garansi ganti guru jika belum merasa cocok · Jadwal fleksibel 24/7
          </p>
        </div>

      </div>
    </section>
  );
}
