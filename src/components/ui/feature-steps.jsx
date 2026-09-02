import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeatureSteps({
  features = [],
  className,
  title,
  subheading,
  autoPlayInterval = 3500,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || features.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % features.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, features.length, autoPlayInterval]);

  if (!features || features.length === 0) return null;

  return (
    <div className={cn("max-w-6xl mx-auto", className)}>
      {/* Header */}
      {(title || subheading) && (
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-3">
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {subheading && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {subheading}
            </p>
          )}
        </div>
      )}

      {/* Main Grid: Left Steps + Right Image Showcase */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Mobile View: Dynamic Image on Top */}
        <div className="block lg:hidden w-full">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={features[currentStep]?.image || currentStep}
                src={features[currentStep]?.image}
                alt={features[currentStep]?.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#049788] text-white text-xs font-bold shadow-xs">
                Langkah {features[currentStep]?.step}: {features[currentStep]?.title}
              </span>
            </div>
          </div>
        </div>

        {/* Left Column: Interactive Step Buttons List */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          {features.map((feature, index) => {
            const isActive = currentStep === index;
            const isCompleted = index < currentStep;

            return (
              <div
                key={feature.step || index}
                onClick={() => setCurrentStep(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCurrentStep(index);
                  }
                }}
                className={cn(
                  "group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 text-left cursor-pointer flex items-start gap-4 sm:gap-5",
                  isActive
                    ? "bg-white border-[#049788]/40 shadow-md ring-1 ring-[#049788]/20"
                    : "bg-white/60 hover:bg-white border-slate-200/80 opacity-70 hover:opacity-100"
                )}
              >
                {/* Step Indicator Badge */}
                <div
                  className={cn(
                    "w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all duration-300",
                    isActive
                      ? "bg-[#049788] text-white shadow-md shadow-[#049788]/25 scale-105"
                      : isCompleted
                      ? "bg-[#EBF8F6] text-[#049788] border border-[#C8EDE9]"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : isActive ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  ) : (
                    feature.step
                  )}
                </div>

                {/* Step Content */}
                <div className="space-y-1.5 flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={cn(
                        "text-base sm:text-lg font-bold tracking-tight transition-colors",
                        isActive ? "text-slate-950" : "text-slate-700"
                      )}
                    >
                      {feature.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 font-semibold shrink-0">
                      Step {feature.step}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.content}
                  </p>

                  {/* Active Step Progress Indicator Bar */}
                  {isActive && (
                    <div className="pt-2">
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <motion.div
                          key={`progress-${currentStep}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : autoPlayInterval / 1000,
                            ease: "linear",
                          }}
                          className="h-full bg-[#049788]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Desktop Dynamic Showcase Image */}
        <div className="hidden lg:block lg:col-span-6 sticky top-28">
          <div className="relative aspect-[4/3.5] rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={features[currentStep]?.image || currentStep}
                initial={{ opacity: 0, scale: 1.04, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <img
                  src={features[currentStep]?.image}
                  alt={features[currentStep]?.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Visual Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 space-y-1.5 text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#74CEC3]">
                      Langkah {features[currentStep]?.step} dari 0{features.length}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {features[currentStep]?.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {features[currentStep]?.content}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FeatureSteps;
