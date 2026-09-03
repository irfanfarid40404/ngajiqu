import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  User,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/data/content";

export default function TrialPromoModal({ isOpen, onClose, onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    interest: "Al-Qur'an (Tahsin & Tajwid)",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `Halo Admin NgajiQ, saya ingin klaim PROMO KELAS PERCOBAAN GRATIS:
- Nama: ${formData.name || "Calon Santri"}
- WhatsApp: ${formData.whatsapp || "-"}
- Peminatan: ${formData.interest}

Mohon konfirmasi ketersediaan jadwal trial class bersama Ustadz/Ustadzah. Terima kasih!`;

    setTimeout(() => {
      window.open(
        `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  const handleGoToRegister = () => {
    onClose();
    if (onNavigate) {
      onNavigate("/daftar-kelas");
    } else {
      window.location.pathname = "/daftar-kelas";
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm">
        {/* Overlay dismiss click */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-trial-title"
          className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/90 max-h-[92vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors backdrop-blur-xs border border-white/20 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]"
            aria-label="Tutup penawaran promosi"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
            {/* Visual Left Banner (Desktop) */}
            <div className="md:col-span-5 relative bg-gradient-to-br from-[#024E46] via-[#038073] to-[#049788] text-white p-6 sm:p-7 flex flex-col justify-between min-h-[220px] md:min-h-[460px] overflow-hidden">
              {/* Background Image with soft opacity */}
              <img
                src="/hero-tutor.jpg"
                alt="Bimbingan Mengaji NgajiQ"
                className="absolute inset-0 w-full h-full object-cover object-center mix-blend-overlay opacity-35 pointer-events-none"
              />

              {/* Ambient Glow & Islamic Star SVG */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L38 15 L53 8 L45 23 L60 30 L45 37 L53 52 L38 45 L30 60 L22 45 L7 52 L15 37 L0 30 L15 23 L7 8 L22 15 Z' fill='none' stroke='white' stroke-width='0.75'/%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
              />

              {/* Top Badge */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-teal-50 text-[11px] font-bold border border-white/25 shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Promo Terbatas Santri Baru</span>
                </span>
              </div>

              {/* Middle / Bottom Content */}
              <div className="relative z-10 space-y-3 mt-6 md:mt-0">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    Coba Kelas Privat <br />
                    <span className="text-amber-300">100% Gratis</span>
                  </h4>
                  <p className="text-xs text-teal-100/90 mt-1 leading-relaxed">
                    Sesi evaluasi bacaan 30 menit live bersama ustadz/ustadzah bersanad tanpa komitmen biaya.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-teal-50">
                  <span className="inline-flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-amber-300" />
                    30 Menit Sesi
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-3 h-3 text-emerald-300" />
                    Guru Bersanad
                  </span>
                </div>
              </div>
            </div>

            {/* Right Form & Benefit Area */}
            <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between bg-white space-y-5">
              <div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#049788] uppercase tracking-wider block">
                    Penawaran Eksklusif
                  </span>
                  <h3
                    id="promo-trial-title"
                    className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight"
                  >
                    Klaim Sesi Kelas Percobaan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ketahui level bacaan Anda dan rasakan kemudahan belajar mengaji dari rumah.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="mt-4 space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#049788] shrink-0 mt-0.5" />
                    <span>Asesmen makhraj huruf & tajwid dari nol</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#049788] shrink-0 mt-0.5" />
                    <span>Bimbingan sabar 1-on-1 (bebas pilih Ustadz/Ustadzah)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#049788] shrink-0 mt-0.5" />
                    <span>Rekomendasi kurikulum & jadwal tanpa paksaan</span>
                  </div>
                </div>

                {/* Quick Claim Form */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#049788]" />
                      Nama Anda
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#049788]" />
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08xxxxxxxxxx"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Program yang Diminati
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData({ ...formData, interest: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 transition-all text-slate-800"
                    >
                      <option value="Al-Qur'an (Tahsin & Tajwid)">Kursus Al-Qur'an (Tahsin & Tajwid)</option>
                      <option value="Fiqih Ibadah & Muamalah">Kursus Fiqih Ibadah & Muamalah</option>
                      <option value="Nahwu & Shorof (Bahasa Arab)">Kursus Nahwu & Shorof (Bahasa Arab)</option>
                      <option value="Program Mengaji Anak">Program Mengaji Anak & Remaja</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full py-3 px-5 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-[#049788]/25 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788] cursor-pointer mt-2"
                  >
                    {submitted ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Meneruskan ke Admin...</span>
                      </>
                    ) : (
                      <>
                        <span>Klaim Kelas Percobaan Sekarang</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Bottom Alternative Link */}
              <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={handleGoToRegister}
                  className="text-[#049788] hover:underline font-semibold cursor-pointer"
                >
                  Lihat Formulir Lengkap
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Nanti Saja
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

