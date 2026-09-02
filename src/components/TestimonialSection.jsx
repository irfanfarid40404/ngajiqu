import React from "react";
import { Star } from "lucide-react";
import { testimonials as defaultTestimonials } from "../data/content";
import { cn } from "@/lib/utils";

function TestimonialCard({ item }) {
  return (
    <div className="w-[340px] sm:w-[380px] shrink-0 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:border-[#049788]/40 hover:-translate-y-1 transition-all duration-300 select-none">
      <div className="space-y-3.5">
        
        {/* Profile Header */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 shrink-0 shadow-2xs">
            <img
              src={item.image || item.avatar}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-950 truncate">
              {item.name}
            </h4>
            <p className="text-xs text-slate-500 font-medium truncate">
              {item.role}
            </p>
          </div>
        </div>

        {/* Dynamic Star Rating */}
        <div className="flex items-center gap-1 text-amber-400" aria-label={`Rating ${item.rating || 5} dari 5 bintang`}>
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star
              key={starIndex}
              className={cn(
                "w-4 h-4",
                starIndex < (item.rating || 5)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200"
              )}
            />
          ))}
        </div>

        {/* Testimonial Message */}
        <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic line-clamp-4">
          "{item.message || item.quote}"
        </blockquote>

      </div>

      {/* Bottom Footer Meta */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-[#049788]">Santri Terverifikasi</span>
        <span className="text-slate-400">1-on-1 Live Talaqqi</span>
      </div>
    </div>
  );
}

export default function TestimonialSection({
  testimonials = defaultTestimonials,
  title = "Apa Kata Pelajar Kami",
  description = "Cerita dan pengalaman pelajar yang belajar bersama guru-guru NgajiQ.",
  onOpenModal,
  className,
}) {
  // Split into 2 balanced rows
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  // Duplicate for seamless infinite marquee loop
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];

  return (
    <section id="testimoni" className={cn("py-24 bg-white border-b border-slate-200/80 relative overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

      </div>

      {/* Marquee Container with Gradient Scrim Edges */}
      <div className="relative w-full overflow-hidden space-y-6">
        
        {/* Left & Right Gradient Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Row 1: Marquee Left */}
        <div className="flex overflow-hidden py-1">
          <div className="animate-marquee-left gap-5 sm:gap-6 pr-5 sm:pr-6">
            {marqueeRow1.map((item, idx) => (
              <TestimonialCard key={`row1-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Marquee Right */}
        <div className="flex overflow-hidden py-1">
          <div className="animate-marquee-right gap-5 sm:gap-6 pr-5 sm:pr-6">
            {marqueeRow2.map((item, idx) => (
              <TestimonialCard key={`row2-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

      </div>

      {/* CTA Button */}
      {onOpenModal && (
        <div className="mt-14 text-center relative z-10">
          <button
            onClick={() => onOpenModal("Testimonial Section")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-sm sm:text-base shadow-lg shadow-[#049788]/25 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
          >
            <span>Mulai Cerita Belajarmu Hari Ini</span>
          </button>
        </div>
      )}

    </section>
  );
}
