import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TeacherCardItem } from "@/components/ui/services-card";
import { teachers } from "@/data/content";
import CtaSection from "@/components/CtaSection";

export default function TeachersPage({ onOpenModal }) {
  const shouldReduceMotion = useReducedMotion();

  const handleTeacherClick = (teacher) => {
    if (onOpenModal) {
      onOpenModal(`Guru: ${teacher.name} (${teacher.specialty || teacher.specialization || "Bimbingan Mengaji"})`);
    }
  };

  return (
    <div className="bg-[#FBFBFC] min-h-screen flex flex-col justify-between">
      
      {/* 1. Top Page Hero Banner (Identical background & Islamic geometric pattern to Home Hero) */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-[#E8F7F5] via-[#F3FAF8] to-white border-b border-slate-200/80 overflow-hidden text-center">
        
        {/* Ambient Islamic Glow Orbs */}
        <div 
          className="absolute -top-20 left-1/4 w-[480px] h-[480px] bg-[#049788]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/4 right-0 w-[520px] h-[520px] bg-[#2DD4BF]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true" 
        />

        {/* Islamic Geometric Star Pattern (Khatam / 8-Point Star Arabesque Motif) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.45] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23049788' stroke-width='1' stroke-opacity='0.25'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%23049788' stroke-width='0.75' stroke-opacity='0.2'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%23049788' fill-opacity='0.08' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
          }}
          aria-hidden="true" 
        />

        {/* Subtle Top Linear Grid Line */}
        <div 
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#049788]/30 to-transparent pointer-events-none"
          aria-hidden="true" 
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          
          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Tenaga Pengajar <span className="text-[#049788]">Kami</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Barisan asatizah yang terlatih, berpengalaman, dan bersanad resmi dalam membimbing Anda mendalami ilmu agama serta membaca Al-Qur'an secara tartil.
          </p>
        </div>
      </section>

      {/* 2. Teachers Cards Showcase Grid */}
      <section className="py-16 md:py-24 bg-white flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 max-w-6xl mx-auto">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id || index}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TeacherCardItem
                  teacher={teacher}
                  onTeacherClick={handleTeacherClick}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA Banner Section ("KAMI SIAP MEMBANTU") Above Footer */}
      <CtaSection onOpenModal={onOpenModal} />
      
    </div>
  );
}
