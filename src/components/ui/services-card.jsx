import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Award,
  Star,
  RotateCcw,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TeacherCardItem({ teacher, onTeacherClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="relative h-[480px] w-full" style={{ perspective: 1200 }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* ================= FRONT SIDE (Foto Saja & Nama) ================= */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
        >
          {/* Full Teacher Portrait Image */}
          <div className="relative w-full h-full bg-[#0c584f] overflow-hidden group">
            <img
              src={teacher.image}
              alt={`Foto ${teacher.name}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {/* Gradient Scrim for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            {/* Top Number Indicator */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-xl border border-white/15">
                {teacher.number}
              </span>
            </div>

            {/* Top Specialty Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="text-xs font-bold px-3 py-1 bg-[#049788] text-white rounded-xl shadow-xs">
                {teacher.tag || teacher.specialty}
              </span>
            </div>

            {/* Bottom Floating Info & Lihat Profil Action */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-10 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-300">{teacher.specialty}</span>
                <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
                  {teacher.name}
                </h3>
              </div>

              <button
                onClick={handleFlip}
                className="w-full py-3 px-4 bg-white/95 hover:bg-white text-slate-900 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-between transition-all shadow-md active:scale-[0.98] group/btn"
                aria-label={`Lihat profil ${teacher.name}`}
              >
                <span>Lihat Profil</span>
                <div className="flex items-center gap-1 text-[#049788] text-xs font-semibold">
                  <RotateCcw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
                  <span>Buka Info</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE (Deskripsi Guru & Detail) ================= */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 w-full h-full rounded-3xl bg-white border border-[#049788]/30 shadow-xl p-7 flex flex-col justify-between overflow-hidden"
        >
          {/* Header with return flip button */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EBF8F6] text-[#049788] flex items-center justify-center font-bold text-xs">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#049788] uppercase tracking-wider block">
                    Profil Pengajar
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {teacher.number}</span>
                </div>
              </div>

              <button
                onClick={handleFlip}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                title="Kembali ke foto"
                aria-label="Kembali ke foto"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Teacher Name & Specialty */}
            <h3 className="text-xl font-black text-slate-950 leading-snug tracking-tight mb-1">
              {teacher.name}
            </h3>
            <span className="inline-block text-xs font-semibold text-[#049788] mb-4">
              {teacher.specialty}
            </span>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              {teacher.description}
            </p>

            {/* Stats & Credentials */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Award className="w-4 h-4 text-[#049788] shrink-0" />
                <span className="line-clamp-1">{teacher.credential}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <BookOpen className="w-4 h-4 text-[#049788] shrink-0" />
                <span>{teacher.experience}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span>
                  <strong>{teacher.rating}</strong> ({teacher.reviews} Ulasan Santri)
                </span>
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Button
              onClick={() => {
                if (onTeacherClick) {
                  onTeacherClick(teacher);
                }
              }}
              className="w-full justify-between"
            >
              <span>Daftar Bersama {teacher.name.split(" ")[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <button
              onClick={handleFlip}
              className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors py-1"
            >
              ← Lihat Foto
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TeacherCarousel({
  teachers = [],
  heading = "Guru Unggulan",
  subheading = "Belajar bersama guru berpengalaman yang siap membantu meningkatkan kemampuan mengaji kamu.",
  className,
  onTeacherClick,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const shouldReduceMotion = useReducedMotion();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("init", onInit);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);
    return () => {
      emblaApi.off("init", onInit);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInit);
    };
  }, [emblaApi, onInit, onSelect]);

  if (!teachers || teachers.length === 0) return null;

  return (
    <section className={cn("py-20 bg-slate-50/70 border-b border-slate-200/80 relative overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {heading}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {subheading}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled && !emblaApi?.canScrollPrev()}
              aria-label="Guru sebelumnya"
              className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#049788] hover:border-[#049788] flex items-center justify-center transition-all shadow-2xs hover:shadow-sm active:scale-95 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled && !emblaApi?.canScrollNext()}
              aria-label="Guru berikutnya"
              className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#049788] hover:border-[#049788] flex items-center justify-center transition-all shadow-2xs hover:shadow-sm active:scale-95 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" ref={emblaRef}>
          <div className="flex gap-6 pb-4 pt-1">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.number || index}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <TeacherCardItem
                  teacher={teacher}
                  onTeacherClick={onTeacherClick}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]",
                  selectedIndex === idx 
                    ? "w-6 bg-[#049788]" 
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Ke slide guru ke-${idx + 1}`}
                aria-current={selectedIndex === idx ? "true" : undefined}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export { TeacherCarousel as ServiceCarousel };
export default TeacherCarousel;
