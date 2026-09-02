import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const initialGalleryItems = [
  {
    id: 1,
    type: "image",
    title: "Belajar Al-Qur'an Bersama",
    desc: "Kegiatan pembelajaran Al-Qur'an interaktif 1-on-1 bersama guru bersanad.",
    url: "/hero-tutor.jpg",
    span: "col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Kelas Tahsin & Tajwid",
    desc: "Pembelajaran tahsin intensif memperbaiki artikulasi makhraj huruf.",
    url: "/teachers-banner.jpg",
    span: "col-span-1 sm:col-span-1 sm:row-span-1",
  },
  {
    id: 3,
    type: "image",
    title: "Bimbingan Tahfidz Personal",
    desc: "Santri mengikuti program hafalan Al-Qur'an dengan target fleksibel.",
    url: "/persona-office.jpg",
    span: "col-span-1 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Belajar Bersama Ustadz",
    desc: "Sesi bimbingan sabar dari nol untuk santri pemula dewasa.",
    url: "/persona-engineer.jpg",
    span: "col-span-1 sm:col-span-2 sm:row-span-1",
  },
  {
    id: 5,
    type: "image",
    title: "Aktivitas Santri & Keluarga",
    desc: "Momen kegiatan belajar mengaji anak di rumah dengan suasana menyenangkan.",
    url: "/persona-family.jpg",
    span: "col-span-1 sm:col-span-1 sm:row-span-1",
  },
  {
    id: 6,
    type: "image",
    title: "Kelas Khusus Pra-Nikah",
    desc: "Akselerasi membaca Al-Qur'an tartil untuk persiapan momen sakral.",
    url: "/persona-bride.jpg",
    span: "col-span-1 sm:col-span-1 sm:row-span-1",
  },
];

export function InteractiveBentoGallery({
  mediaItems = initialGalleryItems,
  title = "Galeri Kegiatan",
  description = "Lihat berbagai momen pembelajaran dan kegiatan bersama komunitas NgajiQ.",
  className,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const total = mediaItems.length;
  const currentIndex = selectedItem
    ? mediaItems.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex === -1 || total <= 1) return;
    const nextIdx = (currentIndex + 1) % total;
    setSelectedItem(mediaItems[nextIdx]);
  }, [currentIndex, total, mediaItems]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1 || total <= 1) return;
    const prevIdx = (currentIndex - 1 + total) % total;
    setSelectedItem(mediaItems[prevIdx]);
  }, [currentIndex, total, mediaItems]);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedItem) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, handleClose, handleNext, handlePrev]);

  return (
    <section id="galeri" className={cn("py-24 bg-white border-b border-slate-200/80 relative overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[220px] sm:auto-rows-[200px]">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onClick={() => setSelectedItem(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedItem(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Buka galeri: ${item.title}`}
              className={cn(
                "group relative rounded-3xl overflow-hidden cursor-pointer border border-slate-200/80 shadow-2xs hover:shadow-xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]",
                item.span || "col-span-1 row-span-1"
              )}
            >
              {/* Image / Video Media */}
              {item.type === "video" ? (
                <video
                  src={item.url}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              )}

              {/* Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Action Icon */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-300 border border-white/20">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Card Bottom Meta */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-xs">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-200/90 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 md:p-8"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-10 text-white">
              <div className="space-y-0.5">
                <span className="text-xs text-emerald-400 font-mono font-semibold uppercase tracking-wider">
                  Foto {currentIndex + 1} dari {total}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {selectedItem.title}
                </h2>
              </div>

              <button
                onClick={handleClose}
                aria-label="Tutup galeri"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Main Stage */}
            <div
              className="relative flex-1 flex items-center justify-center my-3 max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {total > 1 && (
                <button
                  onClick={handlePrev}
                  aria-label="Foto sebelumnya"
                  className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>
              )}

              {/* Active Image / Video View */}
              <motion.div
                key={selectedItem.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="max-h-[60vh] sm:max-h-[68vh] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center justify-center bg-slate-900"
              >
                {selectedItem.type === "video" ? (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain select-none"
                  />
                )}
              </motion.div>

              {/* Next Button */}
              {total > 1 && (
                <button
                  onClick={handleNext}
                  aria-label="Foto berikutnya"
                  className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* Modal Bottom */}
            <div
              className="w-full max-w-3xl mx-auto text-center space-y-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                {selectedItem.desc}
              </p>

              {/* Thumbnail Dock */}
              {total > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 px-2 scrollbar-none">
                  {mediaItems.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      aria-label={`Lihat foto ${idx + 1}: ${item.title}`}
                      className={cn(
                        "relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]",
                        selectedItem.id === item.id
                          ? "border-[#049788] ring-2 ring-[#049788]/40 scale-105"
                          : "border-white/20 opacity-50 hover:opacity-80"
                      )}
                    >
                      <img
                        src={item.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default InteractiveBentoGallery;
