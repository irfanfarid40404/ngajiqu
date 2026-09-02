import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cva } from "class-variance-authority";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group relative rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#049788]/40 transition-all duration-300 overflow-hidden flex",
  {
    variants: {
      variant: {
        default: "flex-col justify-between hover:-translate-y-1.5",
        featured: "flex-col md:flex-row items-stretch hover:-translate-y-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const imageContainerVariants = cva(
  "relative overflow-hidden bg-slate-100",
  {
    variants: {
      variant: {
        default: "w-full aspect-[16/10] border-b border-slate-100",
        featured: "w-full md:w-1/2 aspect-[16/10] md:aspect-auto min-h-[260px] md:min-h-full border-b md:border-b-0 md:border-r border-slate-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function BlogPostCard({
  article,
  variant = "default",
  onRead,
  className,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(cardVariants({ variant }), className)}
    >
      {/* Article Image Container */}
      <div className={imageContainerVariants({ variant })}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

        {/* Floating Category Badge over image on mobile/cards */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-[#049788] shadow-xs border border-white/40 uppercase tracking-wider">
            {article.tag}
          </span>
        </div>
      </div>

      {/* Article Content Area */}
      <div className={cn(
        "p-6 sm:p-7 flex flex-col justify-between flex-grow",
        variant === "featured" && "md:p-9 md:w-1/2"
      )}>
        <div className="space-y-3.5">
          {/* Metadata: Tag • Date • Read Time */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-[#049788] font-bold uppercase tracking-wider">
              {article.tag}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-normal text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </span>
            {article.readTime && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 font-normal text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </>
            )}
          </div>

          {/* Title with Animated Underline Effect on Hover */}
          <h3 className={cn(
            "font-black text-slate-950 leading-snug tracking-tight group-hover:text-[#049788] transition-colors duration-200",
            variant === "featured" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl line-clamp-2"
          )}>
            <span className="relative inline after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#049788] group-hover:after:w-full after:transition-all after:duration-300">
              {article.title}
            </span>
          </h3>

          {/* Description / Summary */}
          <p className={cn(
            "text-xs sm:text-sm text-slate-600 leading-relaxed",
            variant === "featured" ? "line-clamp-3 sm:line-clamp-4" : "line-clamp-2"
          )}>
            {article.description}
          </p>
        </div>

        {/* Card Footer with Author & CTA */}
        <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          {article.author ? (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#EBF8F6] text-[#049788] flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 truncate">
                {article.author}
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-medium">NgajiQ Editorial</span>
          )}

          {/* CTA Action Button */}
          <button
            onClick={() => onRead && onRead(article)}
            className="group/btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#049788] hover:text-[#038073] shrink-0 transition-colors cursor-pointer py-1"
            aria-label={`Baca artikel: ${article.title}`}
          >
            <span>Baca Artikel</span>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default BlogPostCard;

