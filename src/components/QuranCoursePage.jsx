import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  Video,
  Layers,
  Award,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Volume2,
  BookmarkCheck,
  Brain,
  Star,
} from "lucide-react";
import { FeatureSteps } from "@/components/ui/feature-steps";
import { TeacherCardItem } from "@/components/ui/services-card";
import { GradientCard } from "@/components/ui/gradient-card";
import { teachers, siteConfig } from "@/data/content";

const quranPrograms = [
  {
    id: "tahsin-dasar",
    title: "Tahsin Al-Qur'an Dasar",
    level: "Untuk Pemula",
    gradient: "teal",
    badgeColor: "#049788",
    imageUrl: "/persona-family.jpg",
    description:
      "Belajar memperbaiki bacaan Al-Qur'an mulai dari makharijul huruf hingga penerapan tajwid dasar dengan bimbingan sabar dari nol.",
    sessions: "16 Pertemuan",
    duration: "60 Menit / Sesi",
    type: "Live 1-on-1 bersama Guru",
    highlights: [
      "Pengenalan & artikulasi makhraj huruf hijaiyah",
      "Kaidah harakat & panjang pendek dasar (Mad Asli)",
      "Latihan talaqqi & koreksi langsung ayat demi ayat",
    ],
  },
  {
    id: "tajwid-menengah",
    title: "Tajwid Al-Qur'an",
    level: "Level Menengah",
    gradient: "green",
    badgeColor: "#059669",
    imageUrl: "/teachers-banner.jpg",
    description:
      "Memahami kaidah tajwid secara lebih mendalam dan menerapkannya secara tartil dan presisi dalam bacaan Al-Qur'an.",
    sessions: "16 Pertemuan",
    duration: "60 Menit / Sesi",
    type: "Live 1-on-1 bersama Guru",
    highlights: [
      "Hukum Nun Sukun, Tanwin, & Mim Sukun",
      "Hukum Mad Far'i, Idgham, & Waqaf Ibtida'",
      "Praktik tilawah surat-surat pertengahan Juz 30 & Juz 1",
    ],
  },
  {
    id: "tahfidz-quran",
    title: "Tahfidz Al-Qur'an",
    level: "Semua Tingkat",
    gradient: "amber",
    badgeColor: "#D97706",
    imageUrl: "/hero-tutor.jpg",
    description:
      "Program menghafal Al-Qur'an dengan metode bertahap, bimbingan muraja'ah terstruktur, dan pendampingan intensif guru bersanad.",
    sessions: "Jadwal Fleksibel",
    duration: "Pendampingan Guru",
    type: "Evaluasi Hafalan Berkala",
    highlights: [
      "Metode menghafal mudah untuk santri & profesional",
      "Setoran hafalan 1-on-1 & koreksi tajwid ketat",
      "Bimbingan muraja'ah agar hafalan tetap kuat & mutqin",
    ],
  },
];

const learningLevels = [
  {
    level: "Pemula",
    subtitle: "Mulai dari Nol",
    description: "Untuk yang baru mulai belajar membaca Al-Qur'an atau masih terbata-bata dalam melafalkan huruf hijaiyah.",
    icon: BookOpen,
  },
  {
    level: "Menengah",
    subtitle: "Perbaikan Tajwid",
    description: "Untuk yang sudah dapat membaca Al-Qur'an dan ingin memperbaiki kualitas bacaan serta memperdalam hukum tajwid.",
    icon: Layers,
  },
  {
    level: "Lanjutan",
    subtitle: "Tilawah & Tahfidz",
    description: "Untuk yang ingin memperdalam fashahah tilawah tartil standar Madinah, matn tajwid, atau menambah hafalan Al-Qur'an.",
    icon: Award,
  },
];

const curriculumTopics = [
  {
    title: "Makharijul Huruf",
    description: "Mengenal 5 tempat keluarnya huruf hijaiyah dan melatih artikulasi pelafalan yang benar dan fasih.",
    icon: Volume2,
  },
  {
    title: "Hukum Tajwid",
    description: "Memahami hukum bacaan (Ghunnah, Ikhfa, Idgham, Mad, Qalqalah) dan menerapkannya saat tilawah.",
    icon: BookmarkCheck,
  },
  {
    title: "Tahsin Tilawah",
    description: "Memperbaiki kesalahan bacaan (Lahn Jali & Lahn Khafi) agar lantunan Al-Qur'an lebih tartil dan tenang.",
    icon: CheckCircle2,
  },
  {
    title: "Hafalan Al-Qur'an",
    description: "Membangun hafalan surat-surat pendek hingga Juz 30 secara bertahap dengan metode muraja'ah terarah.",
    icon: Brain,
  },
  {
    title: "Kelancaran & Fashahah",
    description: "Meningkatkan kualitas, irama tartil, dan kelancaran membaca mushaf standar Madinah tanpa rasa canggung.",
    icon: Sparkles,
  },
];

const stepsData = [
  {
    step: "01",
    title: "Pilih Program",
    content: "Pilih program Al-Qur'an (Tahsin Dasar, Tajwid, atau Tahfidz) yang sesuai dengan target kemampuanmu.",
    image: "/hero-tutor.jpg",
  },
  {
    step: "02",
    title: "Tentukan Jadwal",
    content: "Pilih jadwal belajar 24/7 yang fleksibel dan sesuai dengan rutinitas harian atau waktu luang Anda.",
    image: "/persona-engineer.jpg",
  },
  {
    step: "03",
    title: "Belajar Bersama Guru",
    content: "Ikuti pembelajaran privat 1-on-1 dan dapatkan bimbingan langsung via Google Meet atau Zoom dari guru bersanad.",
    image: "/teachers-banner.jpg",
  },
  {
    step: "04",
    title: "Pantau Perkembangan",
    content: "Lihat perkembangan kemampuan tilawah melalui catatan evaluasi guru dan lanjutkan ke tahap berikutnya.",
    image: "/persona-family.jpg",
  },
];

const courseBenefits = [
  {
    title: "Guru Berpengalaman",
    description: "Belajar bersama ustadz dan ustadzah bersanad yang sabar mengarahkan dan mengoreksi setiap huruf bacaan.",
    icon: Award,
  },
  {
    title: "Materi Bertahap",
    description: "Materi disusun secara terstruktur dari tingkat dasar hingga mahir sehingga proses belajar terasa mudah dan menyenangkan.",
    icon: Layers,
  },
  {
    title: "Pembelajaran Interaktif",
    description: "Sesi privat 1-on-1 memungkinkan santri bertanya leluasa dan menerima koreksi tajwid langsung secara real-time.",
    icon: Video,
  },
  {
    title: "Perkembangan Terpantau",
    description: "Kemajuan belajar dan catatan makhraj dievaluasi secara berkala di setiap sesi agar hasil belajar terukur.",
    icon: TrendingUp,
  },
];

const quranTestimonials = [
  {
    name: "Aisyah Putri",
    program: "Tahsin Al-Qur'an Dasar",
    quote: "Sekarang saya jauh lebih percaya diri membaca Al-Qur'an karena setiap kesalahan bacaan dan makhraj saya bisa langsung dikoreksi dengan sabar oleh ustadzah.",
    role: "Karyawan Swasta",
    image: "/persona-bride.jpg",
    rating: 5,
  },
  {
    name: "Rizky Maulana",
    program: "Tajwid & Fashahah",
    quote: "Bimbingan 1-on-1 sangat membantu saya yang sibuk. Ustadz selalu tepat waktu dan menjelaskan kaidah tajwid dengan contoh yang sangat mudah dipahami.",
    role: "Civil Engineer",
    image: "/persona-engineer.jpg",
    rating: 5,
  },
  {
    name: "Hj. Siti Rahmawati",
    program: "Tahfidz & Muraja'ah",
    quote: "Di usia 50 tahun saya sempat khawatir sulit menghafal, ternyata metode muraja'ah di NgajiQ sangat nyaman dan penuh kehangatan.",
    role: "Ibu Rumah Tangga",
    image: "/persona-family.jpg",
    rating: 5,
  },
];

const quranFaqs = [
  {
    q: "Apakah kursus Al-Qur'an cocok untuk pemula?",
    a: "Sangat cocok. Lebih dari 60% santri kami memulai dari nol mutlak (belum mengenal huruf hijaiyah). Guru membimbing secara privat 1-on-1 dengan sabar dan bebas dari rasa malu.",
  },
  {
    q: "Bagaimana menentukan level belajar saya?",
    a: "Pada sesi trial class atau pertemuan awal, guru akan melakukan asesmen singkat untuk mendengar bacaan Anda dan merekomendasikan program yang paling tepat.",
  },
  {
    q: "Apakah belajar dilakukan bersama guru secara langsung?",
    a: "Ya, seluruh sesi pembelajaran dilakukan secara live 1-on-1 melalui video call (Google Meet atau Zoom) dengan tampilan mushaf digital beresolusi tinggi.",
  },
  {
    q: "Apakah saya bisa memilih jadwal belajar?",
    a: "Ya, jadwal sangat fleksibel 24/7. Anda dapat memilih sesi pagi, siang, sore, atau malam hari sepulang kerja, serta dapat mengatur jadwal ulang jika berhalangan.",
  },
  {
    q: "Berapa lama durasi setiap pertemuan?",
    a: "Setiap pertemuan privat berlangsung selama 60 menit penuh yang difokuskan pada praktik tilawah, teori tajwid ringkas, dan evaluasi bacaan santri.",
  },
  {
    q: "Apakah ada evaluasi kemampuan membaca?",
    a: "Ya, guru memberikan catatan evaluasi makhraj dan laporan capaian belajar secara berkala di setiap akhir sesi pembelajaran.",
  },
  {
    q: "Apakah tersedia trial class?",
    a: "Ya, kami menyediakan sesi trial class agar calon santri dapat mencoba metode belajar dan merasakan kenyamanan berinteraksi bersama guru kami.",
  },
  {
    q: "Apakah tersedia program tahfidz?",
    a: "Ya, program Tahfidz Al-Qur'an tersedia untuk hafalan surat-surat pilihan, Juz 30, maupun juz lainnya dengan bimbingan muraja'ah mutqin.",
  },
];

export default function QuranCoursePage({ onOpenModal }) {
  const shouldReduceMotion = useReducedMotion();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filter 4 teachers for Quran courses
  const quranTeachers = teachers.slice(0, 4);

  return (
    <div className="bg-[#FBFBFC] text-slate-900 flex flex-col font-sans">
      
      {/* ================= 1. HERO SECTION (Matching Teachers Page Style) ================= */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-[#E8F7F5] via-[#F3FAF8] to-white border-b border-slate-200/80 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="absolute -top-20 left-1/4 w-[480px] h-[480px] bg-[#049788]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/4 right-0 w-[520px] h-[520px] bg-[#2DD4BF]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Islamic Arabesque Star Motif */}
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
          {/* Eyebrow badge */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-[#049788] text-xs font-bold border border-[#C8EDE9] shadow-2xs uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kursus Al-Qur'an</span>
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Belajar Al-Qur'an dengan <br className="hidden sm:inline" />
            <span className="text-[#049788]">Lebih Baik & Terarah</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tingkatkan kemampuan membaca Al-Qur'an melalui pembelajaran yang terstruktur, mulai dari dasar hingga memahami tajwid dan bacaan dengan bimbingan guru bersanad.
          </p>

          {/* Centered CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onOpenModal && onOpenModal("Kursus Al-Qur'an - Hero")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-[#049788] hover:bg-[#038073] active:scale-[0.99] rounded-xl shadow-lg shadow-[#049788]/25 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#program-quran"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all shadow-2xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
            >
              <span>Lihat Program</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= 2. PROGRAM BELAJAR AL-QUR'AN ================= */}
      <section id="program-quran" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pilih Program Al-Qur'an
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Mulai belajar dari tingkat yang sesuai dengan kemampuan dan target belajarmu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-6xl mx-auto items-start">
            {quranPrograms.map((prog) => (
              <GradientCard
                key={prog.id}
                gradient={prog.gradient}
                badgeText={prog.level}
                badgeColor={prog.badgeColor}
                imageUrl={prog.imageUrl}
                title={prog.title}
                description={prog.description}
                ctaText="Daftar Program Ini"
                ctaAction={() => onOpenModal && onOpenModal(`Program: ${prog.title}`)}
              >
                {/* Metadata Chips */}
                <div className="space-y-2 py-3 border-t border-white/60">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <Clock className="w-4 h-4 text-[#049788] shrink-0" />
                    <span>{prog.sessions} ({prog.duration})</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <Video className="w-4 h-4 text-[#049788] shrink-0" />
                    <span>{prog.type}</span>
                  </div>
                </div>

                {/* Highlights Checklist */}
                <ul className="space-y-2 pt-3 border-t border-white/60 text-xs text-slate-600">
                  {prog.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </GradientCard>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 3. TINGKAT PEMBELAJARAN ================= */}
      <section className="py-20 md:py-24 bg-[#FBFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Belajar Sesuai Kemampuanmu
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Kami menyesuaikan kurikulum dan pendekatan mengajar dengan jenjang kesiapan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {learningLevels.map((lvl, index) => {
              const Icon = lvl.icon;
              return (
                <div
                  key={index}
                  className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3 text-center transition-all hover:shadow-md hover:border-[#049788]/30"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF8F6] text-[#049788] mx-auto flex items-center justify-center border border-[#C8EDE9]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                    {lvl.level}
                  </h3>
                  <span className="text-xs font-semibold text-[#049788] block">
                    {lvl.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lvl.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 4. MATERI YANG DIPELAJARI ================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Apa yang Akan Kamu Pelajari?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Komponen ilmu membaca Al-Qur'an yang dipelajari secara menyeluruh dan bertahap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {curriculumTopics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl border border-slate-200/90 bg-[#FBFBFC] hover:bg-white transition-all duration-200 shadow-2xs hover:shadow-md space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center border border-[#C8EDE9]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                      {topic.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 5. CARA BELAJAR DI NGAJIKU ================= */}
      <section className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureSteps
            features={stepsData}
            title="Bagaimana Cara Belajar di NgajiQ?"
            subheading="Alur 4 langkah mudah dari penentuan program hingga pemantauan perkembangan bacaan Al-Qur'an."
            autoPlayInterval={3500}
            onOpenModal={onOpenModal}
          />
        </div>
      </section>

      {/* ================= 6. KEUNGGULAN KURSUS AL-QUR'AN ================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Kenapa Belajar Al-Qur'an di NgajiQ?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Kelebihan utama yang menjadikan proses belajar mengaji lebih efektif, nyaman, dan berstandar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {courseBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl border border-slate-200/90 bg-[#FBFBFC] shadow-2xs space-y-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center border border-[#C8EDE9]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-950 tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 7. GURU PENGAJAR ================= */}
      <section className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Belajar Bersama Guru
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Ustadz dan ustadzah berkompeten dan bersanad resmi yang siap mendampingi sesi kursus Al-Qur'an Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quranTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.id || index}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TeacherCardItem
                  teacher={teacher}
                  onTeacherClick={(t) => onOpenModal && onOpenModal(`Guru: ${t.name}`)}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 8. TRIAL CLASS CTA ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#EBF8F6] via-[#F2FAF9] to-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#049788] text-white mx-auto flex items-center justify-center shadow-md shadow-[#049788]/25">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Coba Kelas Al-Qur'an Terlebih Dahulu
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Ingin mengetahui metode belajar NgajiQ sebelum memilih program? Ikuti trial class dan rasakan pengalaman belajar langsung bersama guru kami.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenModal && onOpenModal("Trial Class Al-Qur'an")}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-[#049788]/25 active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
            >
              <span>Daftar Trial Class</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Halo Admin NgajiQ, saya ingin tanya info trial class Al-Qur'an.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Tanya Admin</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= 9. TESTIMONIAL ================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pengalaman Belajar Mereka
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Cerita nyata para santri yang telah merasakan kemajuan membaca Al-Qur'an di NgajiQ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {quranTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#FBFBFC] border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-950 leading-tight">
                      {t.name}
                    </h4>
                    <span className="text-xs text-[#049788] font-semibold block">
                      {t.program}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 10. FAQ ================= */}
      <section className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pertanyaan Seputar Kursus Al-Qur'an
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Jawaban lengkap atas pertanyaan yang sering diajukan seputar kursus Al-Qur'an kami.
            </p>
          </div>

          <div className="space-y-3">
            {quranFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`quran-faq-answer-${idx}`}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-950 text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788] rounded-2xl cursor-pointer"
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#049788]" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`quran-faq-answer-${idx}`}
                      className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 11. FINAL CTA ================= */}
      <section className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#049788]/15 rounded-full blur-[120px] pointer-events-none" 
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
            SIAP UNTUK MEMULAI?
          </p>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Mulai Belajar Al-Qur'an <br className="hidden sm:inline" />
            <span className="text-[#049788]">Bersama NgajiQ</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Bangun kemampuan membaca Al-Qur'an secara bertahap bersama guru yang siap membimbingmu dari nol hingga tartil.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onOpenModal && onOpenModal("Final CTA Kursus Al-Qur'an")}
              className="w-full sm:w-auto px-9 py-4 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] font-bold rounded-full text-sm sm:text-base text-white flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#049788]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
