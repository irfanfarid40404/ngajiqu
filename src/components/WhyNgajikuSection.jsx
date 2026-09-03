import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  BookOpen,
  Clock,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Heart,
} from "lucide-react";
import { Card3D } from "@/components/ui/card-3d";
import { cn } from "@/lib/utils";

const cards = [
  {
    id: 1,
    title: "Guru Berpengalaman",
    description:
      "Belajar mengaji bersama guru dan ustadz yang berpengalaman serta siap membimbing proses belajar secara bertahap.",
    icon: Users,
    theme: "primary",
  },
  {
    id: 2,
    title: "Belajar Sesuai Kemampuan",
    description:
      "Materi pembelajaran dapat disesuaikan dengan kemampuan dan perkembangan setiap pelajar, dari pemula hingga tingkat lanjutan.",
    icon: BookOpen,
    theme: "secondary",
  },
  {
    id: 3,
    title: "Belajar Lebih Fleksibel",
    description:
      "Atur waktu belajar dengan lebih fleksibel tanpa harus datang ke tempat les. Belajar bisa dilakukan dari mana saja.",
    icon: Clock,
    theme: "info",
  },
  {
    id: 4,
    title: "Pembelajaran Interaktif",
    description:
      "Proses belajar dibuat lebih menarik dengan interaksi langsung bersama guru dan materi yang mudah dipahami.",
    icon: MessageCircle,
    theme: "success",
  },
  {
    id: 5,
    title: "Kemajuan Belajar Terpantau",
    description:
      "Pantau perkembangan belajar secara lebih terstruktur agar pelajar mengetahui kemampuan dan materi yang sudah dikuasai.",
    icon: TrendingUp,
    theme: "accent",
  },
  {
    id: 6,
    title: "Lingkungan Belajar Aman",
    description:
      "NgajiQ menghadirkan lingkungan belajar yang nyaman dan positif untuk membantu pelajar fokus meningkatkan kemampuan mengaji.",
    icon: ShieldCheck,
    theme: "neutral",
  },
  {
    id: 7,
    title: "Mudah Digunakan",
    description:
      "Antarmuka sederhana dan mudah dipahami sehingga pelajar maupun orang tua dapat menggunakan NgajiQ tanpa kesulitan.",
    icon: Sparkles,
    theme: "warning",
  },
  {
    id: 8,
    title: "Membangun Kebiasaan Mengaji",
    description:
      "Bantu membangun kebiasaan belajar mengaji secara konsisten melalui proses pembelajaran yang terarah dan berkelanjutan.",
    icon: Heart,
    theme: "danger",
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
                className={cn("h-full", index === 6 && "lg:col-start-1 lg:col-span-1", index === 7 && "lg:col-span-1")}
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
