import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * GradientCard — reusable animated card with a decorative background image,
 * colored dot badge, title, description, and an arrow CTA link.
 *
 * gradient prop: "teal" | "green" | "amber" | "emerald" | "slate"
 */
const gradientMap = {
  teal: "bg-gradient-to-br from-teal-50 via-[#E8F7F5] to-cyan-100/60",
  green: "bg-gradient-to-br from-emerald-50 via-[#F0FDF9] to-teal-100/50",
  amber: "bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-100/40",
  emerald: "bg-gradient-to-br from-emerald-100 to-teal-200/50",
  slate: "bg-gradient-to-br from-slate-100 to-slate-200/50",
};

/**
 * @param {object} props
 * @param {string} props.gradient     - one of the keys in gradientMap
 * @param {string} props.badgeText    - small label above the title
 * @param {string} props.badgeColor   - hex color for the dot accent, e.g. "#049788"
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.ctaText
 * @param {function|string} props.ctaAction - href string OR onClick callback
 * @param {string} props.imageUrl     - decorative BG image, positioned bottom-right
 * @param {React.ReactNode} props.children  - optional slot for metadata/checklist
 * @param {string} props.className
 */
const GradientCard = React.forwardRef(function GradientCard(
  {
    className,
    gradient = "teal",
    badgeText,
    badgeColor = "#049788",
    title,
    description,
    ctaText,
    ctaAction,
    imageUrl,
    children,
    ...props
  },
  ref
) {
  const cardAnimation = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.025, y: -6 },
  };

  const imageAnimation = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.12, rotate: 4 },
  };

  const isHref = typeof ctaAction === "string";

  return (
    <motion.div
      ref={ref}
      variants={cardAnimation}
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <div
        className={cn(
          "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-3xl p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl",
          gradientMap[gradient] ?? gradientMap.teal,
          className
        )}
        {...props}
      >
        {/* Decorative background image */}
        {imageUrl && (
          <motion.div
            variants={imageAnimation}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none select-none rounded-br-3xl overflow-hidden"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse at 110% 110%, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 110% 110%, black 20%, transparent 70%)",
              opacity: 0.22,
            }}
          />
        )}

        {/* Content layer */}
        <div className="z-10 flex flex-col h-full">
          {/* Badge */}
          {badgeText && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm w-fit border border-white/80 shadow-2xs">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: badgeColor }}
              />
              {badgeText}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-snug mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {description}
          </p>

          {/* Optional slot for metadata chips / checklists */}
          {children && <div className="flex-grow">{children}</div>}

          {/* CTA */}
          {ctaText && ctaAction && (
            <div className="mt-6 pt-4 border-t border-white/60">
              {isHref ? (
                <a
                  href={ctaAction}
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#049788] hover:text-[#038073] transition-colors"
                >
                  {ctaText}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <button
                  onClick={ctaAction}
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#049788] hover:text-[#038073] transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
                >
                  {ctaText}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export { GradientCard };
