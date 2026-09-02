import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { BlogPostCard } from "@/components/ui/blog-post-card";

const articlesData = [
  {
    id: 1,
    tag: "Panduan Pemula",
    date: "28 Februari 2026",
    readTime: "4 Menit Baca",
    author: "Ustadz H. Ahmad Fauzi, Lc.",
    title: "5 Cara Mengatasi Rasa Canggung & Malu Belajar Mengaji di Usia Dewasa",
    description:
      "Banyak santri dewasa merasa terlambat untuk memulai dari Iqro. Temukan tips psikologis dan keistimewaan metode privat 1-on-1 yang ramah dan suportif.",
    content:
      "Memulai belajar mengaji di usia dewasa bukanlah hal yang memalukan, melainkan langkah mulia yang sangat dicintai Allah. Dalam tradisi Islam, menuntut ilmu tidak dibatasi oleh usia. Langkah pertama adalah memilih lingkungan belajar privat yang aman dan tidak menghakimi, menetapkan target membaca 15 menit per hari, serta fokus pada proses perbaikan tahsin tanpa membandingkan diri dengan orang lain.",
    imageUrl: "/teachers-banner.jpg",
  },
  {
    id: 2,
    tag: "Ilmu Tajwid",
    date: "24 Februari 2026",
    readTime: "6 Menit Baca",
    author: "Ustadzah Fatimah Azzahra, M.Ag.",
    title: "Mengenal 5 Tempat Keluarnya Huruf (Makharijul Huruf) yang Wajib Diketahui",
    description:
      "Panduan ringkas memahami rongga mulut, tenggorokan, lidah, dua bibir, dan hidung agar bacaan Al-Qur'an sesuai kaidah tartil.",
    content:
      "Makharijul huruf adalah fondasi utama dalam membaca Al-Qur'an secara tartil. Terdapat 5 makraj umum: Al-Jauf (rongga mulut dan tenggorokan), Al-Halq (tenggorokan), Al-Lisan (lidah), Asy-Syafatain (kedua bibir), dan Al-Khaisyum (rongga hidung untuk gunnah). Mempraktikkan pengucapan secara langsung di hadapan guru bersanad (talaqqi) adalah cara paling akurat untuk menguasainya.",
    imageUrl: "/persona-office.jpg",
  },
  {
    id: 3,
    tag: "Tahfidz & Adab",
    date: "18 Februari 2026",
    readTime: "5 Menit Baca",
    author: "Ustadz Dr. Muhammad Zaki, M.Pd.I",
    title: "Panduan Waktu Terbaik untuk Muraja'ah dan Menghafal Al-Qur'an di Rumah",
    description:
      "Mengapa waktu setelah Subuh dan sebelum tidur sangat efektif untuk menguatkan ingatan hafalan ayat Al-Qur'an bagi anak maupun orang dewasa.",
    content:
      "Penelitian dan tradisi ulama menunjukkan bahwa waktu setelah salat Subuh adalah momen terbaik untuk menambah hafalan baru saat otak masih segar dan minim distraksi. Sementara itu, waktu 15 menit sebelum tidur ideal digunakan untuk muraja'ah (mengulang hafalan) yang tersimpan kuat di memori jangka panjang saat istirahat.",
    imageUrl: "/persona-family.jpg",
  },
  {
    id: 4,
    tag: "Keluarga & Anak",
    date: "12 Februari 2026",
    readTime: "4 Menit Baca",
    author: "Ustadzah Hanifah, S.Hum.",
    title: "Menumbuhkan Cinta Al-Qur'an pada Anak Sejak Usia Dini Tanpa Paksaan",
    description:
      "Strategi praktis bagi orang tua dalam membangun kebiasaan mengaji harian yang menyenangkan dan penuh kehangatan bersama ananda.",
    content:
      "Mengenalkan Al-Qur'an pada anak memerlukan pendekatan kasih sayang dan konsistensi. Mulailah dengan memperdengarkan murattal saat bermain santai, memberikan apresiasi atas pencapaian kecil anak saat berhasil membaca satu halaman Iqro, dan memilihkan guru mengaji privat yang komunikatif serta sabar.",
    imageUrl: "/persona-bride.jpg",
  },
];

export default function ArticlesSection() {
  const [activeArticle, setActiveArticle] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const featuredArticle = articlesData[0];
  const regularArticles = articlesData.slice(1);

  return (
    <section id="artikel" className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Temukan Insight & Tips Belajar Mengaji
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Panduan praktis, wawasan tajwid, dan motivasi harian untuk membantu perjalanan belajar Al-Qur'an Anda dan keluarga.
          </p>
        </div>

        {/* Articles Container */}
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Featured Article Card */}
          {featuredArticle && (
            <BlogPostCard
              article={featuredArticle}
              variant="featured"
              onRead={(art) => setActiveArticle(art)}
            />
          )}

          {/* Regular 3-Column Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {regularArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full"
              >
                <BlogPostCard
                  article={article}
                  variant="default"
                  onRead={(art) => setActiveArticle(art)}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-[#EBF8F6] text-[#049788] border border-[#C8EDE9] uppercase tracking-wider">
                  {activeArticle.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                  {activeArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <span>{activeArticle.author}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 transition-colors"
                aria-label="Tutup artikel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-100">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900 bg-[#FBFBFC] p-4 rounded-2xl border border-slate-100">
                {activeArticle.description}
              </p>
              <p>{activeArticle.content}</p>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
