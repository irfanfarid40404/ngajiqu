import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Heart,
  Users,
  Clock,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Card3D } from "@/components/ui/card-3d";
import { cn } from "@/lib/utils";

const cards = [
  {
    id: 1,
    title: "Guru Bersanad & Terpilih",
    description:
      "Bimbingan langsung dari ustadz dan ustadzah teruji lulusan universitas Islam terkemuka yang memegang sanad bacaan muttashil.",
    icon: Award,
    theme: "primary",
  },
  {
    id: 2,
    title: "Bimbingan Ramah Tanpa Canggung",
    description:
      "Pendekatan sabar dan telaten dari nol mutlak. Sangat ramah bagi santri dewasa yang ingin belajar mengaji tanpa rasa malu.",
    icon: Heart,
    theme: "secondary",
  },
  {
    id: 3,
    title: "Talaqqi 1-on-1 Eksklusif",
    description:
      "Sesi privat menyimak bacaan ayat demi ayat, koreksi makhraj huruf langsung, dan tanya jawab hukum tajwid secara leluasa.",
    icon: Users,
    theme: "info",
  },
  {
    id: 4,
    title: "Jadwal Fleksibel 24/7",
    description:
      "Tentukan jam belajar pagi, siang, sore, atau malam sesuai kesibukan Anda, lengkap dengan fasilitas reschedule sesi gratis.",
    icon: Clock,
    theme: "success",
  },
  {
    id: 5,
    title: "Kurikulum Bertahap & Jelas",
    description:
      "Materi disusun sistematis dari pengenalan huruf hijaiyah, sifatul huruf, hukum nun sukun, hingga praktik tartil juz 30.",
    icon: BookOpen,
    theme: "accent",
  },
  {
    id: 6,
    title: "Laporan Evaluasi & Rekaman",
    description:
      "Dapatkan catatan perkembangan berkala dari ustadz serta arsip rekaman video sesi untuk diulang mandiri di rumah.",
    icon: TrendingUp,
    theme: "neutral",
  },
];

const themeStyles = {
  primary: {
    bg: "bg-[#EBF8F6]",
    text: "text-[#049788]",
    border: "border-[#C8EDE9]",
    hoverBg: "group-hover:bg-[#049788]",
    hoverText: "group-hover:text-white",
  },
  secondary: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    hoverBg: "group-hover:bg-emerald-600",
    hoverText: "group-hover:text-white",
  },
  info: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    hoverBg: "group-hover:bg-sky-600",
    hoverText: "group-hover:text-white",
  },
  success: {
    bg: "bg-teal-50",
    text: "text-teal-800",
    border: "border-teal-200",
    hoverBg: "group-hover:bg-teal-700",
    hoverText: "group-hover:text-white",
  },
  accent: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    hoverBg: "group-hover:bg-indigo-600",
    hoverText: "group-hover:text-white",
  },
  neutral: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    hoverBg: "group-hover:bg-slate-700",
    hoverText: "group-hover:text-white",
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    hoverBg: "group-hover:bg-amber-600",
    hoverText: "group-hover:text-white",
  },
  danger: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    hoverBg: "group-hover:bg-rose-600",
    hoverText: "group-hover:text-white",
  },
};

export default function WhyNgajikuSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="kenapa" className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Kenapa Anda Perlu Memilih NgajiQ?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Belajar mengaji menjadi lebih mudah, fleksibel, dan terarah bersama guru yang siap membimbing setiap langkah perjalanan belajar Anda.
          </p>
        </div>

        {/* 8 3D Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const style = themeStyles[card.theme] || themeStyles.primary;

            return (
              <motion.div
                key={card.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
              >
                <Card3D>
                  <div>
                    {/* Icon Container */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 transition-all duration-300 shadow-2xs",
                        style.bg,
                        style.text,
                        style.border,
                        style.hoverBg,
                        style.hoverText
                      )}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-lg font-bold text-slate-950 mb-2 leading-snug tracking-tight">
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Subtle Card Accent Footnote */}
                  <div className="pt-4 border-t border-slate-100" />
                </Card3D>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
