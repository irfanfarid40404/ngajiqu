import React, { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card3D({ children, className }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e) => {
      if (shouldReduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Subtle tilt angles (-8 to +8 degrees) for clean premium feel
      const rX = ((mouseY / height) - 0.5) * -10;
      const rY = ((mouseX / width) - 0.5) * 10;

      setRotateX(rX);
      setRotateY(rY);
      setGlare({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 0.12,
      });
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        style={{ transformStyle: "preserve-3d" }}
        className={cn(
          "group relative h-full rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:border-[#049788]/40 transition-all duration-300 overflow-hidden",
          className
        )}
      >
        {/* Dynamic subtle radial lighting glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(4, 151, 136, ${glare.opacity}), transparent 70%)`,
          }}
        />

        {/* Card Content with 3D Depth */}
        <div style={{ transform: "translateZ(18px)" }} className="relative z-10 flex flex-col justify-between h-full space-y-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default Card3D;

