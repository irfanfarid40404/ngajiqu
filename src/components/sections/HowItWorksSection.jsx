import React from "react";
import { siteConfig } from "@/data/content";
import { FeatureSteps } from "@/components/ui/feature-steps";
import { ArrowRight, MessageSquare, Laptop } from "lucide-react";

const learningSteps = [
  {
    step: "01",
    title: "Daftar / Mulai Trial",
    content:
      "Isi formulir singkat untuk mengikuti tes asesmen kemampuan awal atau langsung memulai proses belajar mengaji.",
    image: "/hero-tutor.jpg",
  },
  {
    step: "02",
    title: "Pilih Program Belajar",
    content:
      "Tentukan program pembelajaran yang sesuai dengan kebutuhan (Iqro, Tahsin, Fiqih, Tahfidz, atau Nahwu Shorof).",
    image: "/persona-office.jpg",
  },
  {
    step: "03",
    title: "Pilih Jadwal Fleksibel",
    content:
      "Tentukan jadwal belajar 24/7 yang nyaman dan sesuai dengan ritme aktivitas kerja santri atau jam sekolah anak.",
    image: "/persona-engineer.jpg",
  },
  {
    step: "04",
    title: "Belajar Bersama Ustadz",
    content:
      "Ikuti pembelajaran privat 1-on-1 interaktif bersama ustadz/ustadzah bersanad secara live melalui video call.",
    image: "/teachers-banner.jpg",
  },
  {
    step: "05",
    title: "Pantau Perkembangan",
    content:
      "Pantau perkembangan kemampuan mengaji melalui catatan evaluasi berkala dan tingkatkan bacaan secara bertahap.",
    image: "/persona-family.jpg",
  },
];

export default function HowItWorksSection({ onOpenModal }) {
  return (
    <section id="cara-kerja" className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Interactive Feature Steps Component */}
        <FeatureSteps
          features={learningSteps}
          title="Bagaimana Cara Belajar di NgajiQ?"
          subheading="Dari pendaftaran hingga sesi pertama — prosesnya mudah, terarah, dan fleksibel bersama guru berpengalaman."
          autoPlayInterval={3500}
          onOpenModal={onOpenModal}
        />

        {/* Technical Requirements & Quick CTA Footnote */}
        <div className="max-w-4xl mx-auto mt-14 sm:mt-16 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center shrink-0 border border-[#C8EDE9]">
              <Laptop className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-950">Butuh perangkat apa untuk mulai?</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                Cukup HP atau laptop dengan koneksi internet via Google Meet atau Zoom. Tidak perlu instal aplikasi tambahan.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                if (onOpenModal) onOpenModal("Daftar Cara Belajar");
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Halo Admin NgajiQ, saya ingin tanya lebih lanjut tentang proses belajarnya.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Tanya Admin</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
