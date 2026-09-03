import React, { useState, useEffect } from "react";
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
  BookmarkCheck,
  Scale,
  RefreshCw,
  FileText,
  Star,
} from "lucide-react";
import { FeatureSteps } from "@/components/ui/feature-steps";
import { TeacherCardItem } from "@/components/ui/services-card";
import { GradientCard } from "@/components/ui/gradient-card";
import { teachers } from "@/data/content";

const nahwuPrograms = [
  {
    id: "nahwu-dasar",
    title: "Nahwu Dasar (Jurumiyyah)",
    level: "Untuk Pemula",
    gradient: "teal",
    badgeColor: "#049788",
    imageUrl: "/hero-tutor.jpg",
    description:
      "Mempelajari kaidah dasar tata bahasa Arab mulai dari pembagian kata (Kalimah), tanda-tanda I'rab, hingga susunan kalimat sempurna (Jumlah Mufidah).",
    sessions: "16 Pertemuan",
    duration: "60 Menit / Sesi",
    type: "Live 1-on-1 bersama Guru",
    highlights: [
      "Pengenalan Isim, Fi'il, & Huruf beserta ciri-cirinya",
      "Kaidah I'rab (Rafa', Nashab, Khafadh, Jazm)",
      "Latihan I'rab kalimat sederhana ayat Al-Qur'an",
    ],
  },
  {
    id: "shorof-tashrif",
    title: "Shorof & Tashrif",
    level: "Level Menengah",
    gradient: "green",
    badgeColor: "#059669",
    imageUrl: "/teachers-banner.jpg",
    description:
      "Mendalami ilmu perubahan bentuk kata bahasa Arab (Shighat, Wazan, & Bina') untuk memperkaya kosa kata dan memahami makna kata secara presisi.",
    sessions: "16 Pertemuan",
    duration: "60 Menit / Sesi",
    type: "Live 1-on-1 bersama Guru",
    highlights: [
      "Tashrif Istilahi & Lughawi 22 Bab terstruktur",
      "Pola Wazan Tsulatsi Mujarrad & Mazid",
      "Membedakan Fa'il, Maf'ul, Masdar, & Isim Zaman/Makan",
    ],
  },
  {
    id: "baca-kitab-kuning",
    title: "Praktik Baca Kitab Kuning",
    level: "Tingkat Lanjutan",
    gradient: "amber",
    badgeColor: "#D97706",
    imageUrl: "/persona-family.jpg",
    description:
      "Menerapkan kaidah Nahwu dan Shorof langsung untuk membaca dan memahami teks Arab gundul tanpa harakat dari kitab-kitab para ulama.",
    sessions: "Jadwal Fleksibel",
    duration: "Bimbingan Intensif",
    type: "Talaqqi Kitab Kuning 1-on-1",
    highlights: [
      "Praktik membaca teks Arab gundul ayat, hadits, & kitab",
      "Bedah I'rab dan kedudukan tarkib kalimat secara runut",
      "Latihan menerjemahkan & memahami maksud teks syar'i",
    ],
  },
];

const learningLevels = [
  {
    level: "Dasar",
    subtitle: "Nol Bahasa Arab",
    description:
      "Bagi santri yang baru pertama kali belajar tata bahasa Arab, dimulai dari pengenalan struktur kalimat dasar secara ramah dan mudah dipahami.",
    icon: BookOpen,
  },
  {
    level: "Menengah",
    subtitle: "Tashrif & Pola Kata",
    description:
      "Bagi yang sudah mengenal dasar dan ingin menguasai wazan shorof serta kaidah I'rab secara sistematis dan aplikatif.",
    icon: Layers,
  },
  {
    level: "Lanjutan",
    subtitle: "Baca Kitab Gundul",
    description:
      "Bagi yang ingin menguji kemampuan dengan membaca langsung teks Arab tanpa harakat dan kitab para ulama secara mandiri.",
    icon: Award,
  },
];

const curriculumTopics = [
  {
    title: "Struktur Kalimat (Tarkib)",
    description:
      "Mengenal Isim, Fi'il, Huruf, Mubtada', Khabar, Fa'il, dan Maf'ul Bih dalam kalimat bahasa Arab.",
    icon: FileText,
  },
  {
    title: "Kaidah I'rab & Harakat Akhir",
    description:
      "Menguasai 4 tanda I'rab (Rafa', Nashab, Jar, Jazm) dan hukum perubahan harakat akhir kata sesuai kedudukannya.",
    icon: Scale,
  },
  {
    title: "Wazan & Tashrif Shorof",
    description:
      "Menghafal dan mempraktikkan pola perubahan kata dari fi'il madhi, mudhari', amr, hingga isim maf'ul.",
    icon: RefreshCw,
  },
  {
    title: "Kaidah I'lal & Karakter Bina'",
    description:
      "Memahami perubahan huruf illah (waw, alif, ya) dan karakteristik bina' shohih, mudho'af, mitsal, ajwaf, naqis.",
    icon: Sparkles,
  },
  {
    title: "Aplikasi Baca Teks Arab Gundul",
    description:
      "Praktik langsung membaca ayat Al-Qur'an, hadits, dan kitab ulama tanpa harakat dengan kaidah yang tepat.",
    icon: BookmarkCheck,
  },
];

const stepsData = [
  {
    step: "01",
    title: "Tentukan Jenjang Belajar",
    content:
      "Pilih fokus pembelajaran: Nahwu dasar, hafalan tashrif shorof, atau langsung praktik membaca kitab kuning tanpa harakat.",
    image: "/hero-tutor.jpg",
  },
  {
    step: "02",
    title: "Atur Jadwal Fleksibel",
    content:
      "Tentukan jadwal sesi privat 1-on-1 yang cocok dengan waktu luang kerja, kuliah, atau aktivitas Anda 24/7.",
    image: "/persona-engineer.jpg",
  },
  {
    step: "03",
    title: "Belajar Bersama Guru Bersanad",
    content:
      "Sesi live 1-on-1 interaktif via video call bersama ustadz alumnus pesantren dengan modul dan papan tulis digital.",
    image: "/teachers-banner.jpg",
  },
  {
    step: "04",
    title: "Latihan & Evaluasi Berkala",
    content:
      "Dapatkan latihan I'rab langsung dan pantau kemampuan membaca teks Arab Anda dari pertemuan ke pertemuan.",
    image: "/persona-family.jpg",
  },
];

const courseBenefits = [
  {
    title: "Guru Alumnus Pesantren & Bersanad",
    description:
      "Bimbingan langsung dari ustadz yang mendalami kitab kuning bertahun-tahun di pesantren terkemuka.",
  },
  {
    title: "Metode Rumus Mudah & Praktis",
    description:
      "Kaidah tata bahasa dirangkum dalam bagan rumus visual yang mudah dihafal dan langsung dipraktikkan.",
  },
  {
    title: "Bedah Teks Arab Live 1-on-1",
    description:
      "Setiap sesi mempraktikkan langsung bedah I'rab kalimat dan membaca teks Arab gundul ayat demi ayat.",
  },
  {
    title: "Evaluasi Kemampuan Terukur",
    description:
      "Progres pemahaman kaidah dan kelancaran membaca dievaluasi berkala dengan modul latihan terarah.",
  },
];

const nahwuTestimonials = [
  {
    name: "Ahmad Fauzi",
    program: "Nahwu Dasar (Jurumiyyah)",
    quote:
      "Dulu belajar Nahwu terasa rumit sekali karena banyak istilah asing. Di NgajiQ dijelaskan dengan bahasa Indonesia yang santai dan rumus bagan yang sangat masuk akal.",
    role: "Mahasiswa",
    image: "/persona-engineer.jpg",
    rating: 5,
  },
  {
    name: "Nurul Hidayah",
    program: "Shorof & Tashrif",
    quote:
      "Metode menghafal tashrif di NgajiQ sangat runut dan tidak membosankan. Ustadz selalu membimbing dengan sabar sampai saya hafal dan paham wazan katanya.",
    role: "Guru Madrasah",
    image: "/persona-bride.jpg",
    rating: 5,
  },
  {
    name: "dr. Hendra Pratama",
    program: "Praktik Baca Kitab Kuning",
    quote:
      "Sebagai dokter yang ingin mendalami teks agama klasik, bimbingan privat 1-on-1 di NgajiQ adalah solusi terbaik. Sekarang saya sudah percaya diri membaca teks Arab tanpa harakat.",
    role: "Dokter Spesialis",
    image: "/persona-office.jpg",
    rating: 5,
  },
];

const nahwuFaqs = [
  {
    q: "Apakah bisa belajar dari nol jika belum pernah nyantri?",
    a: "Sangat bisa. Program Nahwu Dasar di NgajiQ dirancang khusus untuk santri awam dan dewasa yang belum pernah belajar di pesantren. Materi dijelaskan bertahap dengan analogi sederhana dan bahasa Indonesia yang mudah dimengerti.",
  },
  {
    q: "Apa bedanya ilmu Nahwu dan ilmu Shorof?",
    a: "Secara ringkas: Nahwu mempelajari harakat akhir kata dan kedudukan kata dalam kalimat (tata bahasa/sintaksis), sedangkan Shorof mempelajari perubahan bentuk asal kata menjadi berbagai kata turunan (morfologi). Keduanya saling melengkapi.",
  },
  {
    q: "Kitab apa yang digunakan sebagai kurikulum rujukan?",
    a: "Untuk Nahwu, kami mengacu pada kitab Matan Al-Ajurrumiyyah karya Ibnu Ajurrum yang legendaris, serta Matan Al-Bina' dan Al-Amtsilah At-Tashrifiyyah untuk ilmu Shorof, disajikan dengan modul modern berbagan.",
  },
  {
    q: "Berapa lama waktu yang dibutuhkan untuk bisa membaca kitab gundul?",
    a: "Dengan bimbingan privat 1-on-1 secara konsisten 2–3 kali seminggu, santri rata-rata sudah dapat memahami struktur dasar dan mulai membaca teks Arab gundul sederhana dalam waktu 3 hingga 4 bulan.",
  },
  {
    q: "Apakah sesi belajar dilakukan privat 1-on-1?",
    a: "Ya, 100% pembelajaran dilakukan secara privat 1-on-1 via video call live bersama guru. Anda bebas bertanya dan meminta pengulangan materi kapan saja tanpa merasa sungkan.",
  },
  {
    q: "Apakah disediakan modul ringkasan dan tabel wazan?",
    a: "Ya, seluruh santri mendapatkan modul PDF eksklusif yang berisi bagan rumus Nahwu praktis, tabel tashrif 22 wazan shorof, dan latihan bedah I'rab siap pakai.",
  },
  {
    q: "Berapa lama durasi setiap pertemuan?",
    a: "Setiap sesi privat berlangsung selama 60 menit penuh yang terbagi antara penjelasan kaidah teori, latihan praktik I'rab, dan sesi tanya jawab langsung bersama guru.",
  },
  {
    q: "Apakah ada asesmen awal kemampuan bahasa Arab saya?",
    a: "Ya, pada pertemuan awal guru akan melakukan evaluasi singkat untuk mengetahui sejauh mana pemahaman bahasa Arab Anda dan menyesuaikan titik awal belajar yang paling pas.",
  },
];

// ─── Bento Animation Sub-components ────────────────────────────────────────

function BentoNahwuStarAnim() {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFilled((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <motion.div
            key={s}
            animate={{ scale: filled >= s ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Star
              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 ${
                filled >= s ? "text-amber-400 fill-amber-400 drop-shadow-xs" : "text-slate-200 fill-slate-100"
              }`}
            />
          </motion.div>
        ))}
      </div>
      <motion.span
        key={filled}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-slate-500 font-medium tracking-wide"
      >
        {filled === 0 ? "Akreditasi keilmuan..." : filled < 5 ? `${filled} / 5 kurikulum pesantren` : "Sanad & Sanad Talaqqi Resmi ⭐"}
      </motion.span>
    </div>
  );
}

const BENTO_NAHWU_LAYERS = ["Al-Jurumiyyah (Dasar)", "Tashrif Shorof (Menengah)", "Fathul Qorib (Kitab Kuning)"];

function BentoNahwuLayerAnim() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % (BENTO_NAHWU_LAYERS.length + 1));
    }, 900);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2 py-1">
      {BENTO_NAHWU_LAYERS.map((label, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2.5 w-full"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: step > i ? 1 : 0.4, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            animate={{ backgroundColor: step > i ? "#049788" : "#CBD5E1" }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="h-1.5 rounded-full"
            animate={{
              width: step > i ? `${60 + i * 20}%` : "15%",
              backgroundColor: step > i ? "#049788" : "#E2E8F0",
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className={`text-xs transition-colors duration-300 ${step > i ? "text-slate-800 font-semibold" : "text-slate-400"}`}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function BentoTarkibAnim() {
  const pulses = [0, 1, 2, 3];
  return (
    <div className="relative flex items-center justify-center w-full h-full py-2">
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#049788] flex items-center justify-center shadow-lg shadow-[#049788]/25 text-white">
        <FileText className="w-7 h-7 text-white" />
      </div>
      {pulses.map((p) => (
        <motion.div
          key={p}
          className="absolute rounded-2xl border-2 border-[#049788]/30"
          style={{ width: 56, height: 56 }}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: p * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

const BENTO_NAHWU_BARS = [35, 48, 44, 66, 60, 82, 78, 96];

function BentoNahwuTrendAnim() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % BENTO_NAHWU_BARS.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full flex flex-col justify-center gap-2 py-1">
      <div className="flex items-end gap-1.5 h-12 w-full">
        {BENTO_NAHWU_BARS.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-xs"
            animate={{
              height: `${h}%`,
              backgroundColor: i === active ? "#049788" : i < active ? "#2DD4BF" : "#E2E8F0",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Sesi 1 (Teori)</span>
        <span className="text-[#049788] font-bold">✓ Kelancaran I'rab</span>
        <span>Sesi 8 (Kitab)</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function NahwuShorofCoursePage({ onOpenModal }) {
  const shouldReduceMotion = useReducedMotion();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filter 4 teachers for Nahwu & Shorof courses
  const nahwuTeachers = teachers.slice(0, 4);

  return (
    <div className="bg-[#FBFBFC] text-slate-900 flex flex-col font-sans">

      {/* ================= 1. HERO SECTION ================= */}
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
              <span>Kursus Nahwu & Shorof</span>
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Kuasai Kaidah Bahasa Arab <br className="hidden sm:inline" />
            <span className="text-[#049788]">Nahwu & Shorof dari Dasar</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pahami struktur kalimat bahasa Arab, perubahan bentuk kata, dan buka kemampuan membaca kitab gundul secara bertahap bersama guru bersanad.
          </p>

          {/* Centered CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onOpenModal && onOpenModal("Kursus Nahwu Shorof - Hero")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-[#049788] hover:bg-[#038073] active:scale-[0.99] rounded-xl shadow-lg shadow-[#049788]/25 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#program-nahwu-shorof"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all shadow-2xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
            >
              <span>Lihat Program</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= 2. PROGRAM BELAJAR NAHWU SHOROF ================= */}
      <section id="program-nahwu-shorof" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pilih Program Nahwu & Shorof
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Mulai belajar dari tingkat yang sesuai dengan latar belakang dan target pemahaman bahasamu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-6xl mx-auto items-start">
            {nahwuPrograms.map((prog) => (
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
              Kami menyusun tahapan belajar dari yang paling ramah pemula hingga siap membaca kitab kuning mandiri.
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
              Komponen ilmu tata bahasa Arab yang dipelajari secara sistematis, runut, dan praktis.
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
            subheading="Alur 4 langkah mudah dari penentuan jenjang hingga pemahaman mendalam kaidah bahasa Arab."
            autoPlayInterval={3500}
            onOpenModal={onOpenModal}
          />
        </div>
      </section>

      {/* ================= 6. KEUNGGULAN KURSUS NAHWU SHOROF ================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#049788]/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Kenapa Belajar Nahwu & Shorof di NgajiQ?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Kelebihan utama yang menjadikan proses belajar kaidah bahasa Arab lebih mudah dicerna, terstruktur, dan aplikatif.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:auto-rows-[290px] lg:auto-rows-[280px] max-w-6xl mx-auto">

            {/* 1. Guru Alumnus Pesantren — tall (col-span-2, row-span-2) */}
            <motion.div
              className="md:col-span-2 md:row-span-2 bg-[#FBFBFC] border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#049788]/40 hover:shadow-md transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1 flex items-center justify-center py-6">
                <BentoNahwuStarAnim />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">{courseBenefits[0].title}</h3>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">{courseBenefits[0].description}</p>
              </div>
            </motion.div>

            {/* 2. Metode Rumus Mudah — standard (col-span-2) */}
            <motion.div
              className="md:col-span-2 bg-[#FBFBFC] border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#049788]/40 hover:shadow-md transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 0.98 }}
            >
              <div className="flex-1 flex items-center">
                <BentoNahwuLayerAnim />
              </div>
              <div className="mt-3">
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">{courseBenefits[1].title}</h3>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">{courseBenefits[1].description}</p>
              </div>
            </motion.div>

            {/* 3. Bedah Teks Arab Live — tall (col-span-2, row-span-2) */}
            <motion.div
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#EBF8F6] to-white border border-[#C8EDE9] rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#049788]/50 hover:shadow-md transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1 flex items-center justify-center py-6">
                <BentoTarkibAnim />
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">{courseBenefits[2].title}</h3>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">{courseBenefits[2].description}</p>
              </div>
            </motion.div>

            {/* 4. Evaluasi Kemampuan Terukur — standard (col-span-2) */}
            <motion.div
              className="md:col-span-2 bg-[#FBFBFC] border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#049788]/40 hover:shadow-md transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 0.98 }}
            >
              <div className="flex-1 flex items-center">
                <BentoNahwuTrendAnim />
              </div>
              <div className="mt-3">
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">{courseBenefits[3].title}</h3>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">{courseBenefits[3].description}</p>
              </div>
            </motion.div>

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
              Ustadz dan ustadzah berkompeten dan bersanad resmi yang siap mendampingi sesi kursus Nahwu & Shorof Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {nahwuTeachers.map((teacher, index) => (
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

      {/* ================= 8. TESTIMONIAL ================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pengalaman Belajar Mereka
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Cerita nyata para santri yang telah merasakan kemajuan membaca teks Arab di NgajiQ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {nahwuTestimonials.map((t, idx) => (
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
                    {`"${t.quote}"`}
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

      {/* ================= 9. FAQ ================= */}
      <section className="py-20 md:py-28 bg-[#FBFBFC] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pertanyaan Seputar Kursus Nahwu & Shorof
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Jawaban lengkap atas pertanyaan yang sering diajukan calon santri kami.
            </p>
          </div>

          <div className="space-y-3">
            {nahwuFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`nahwu-faq-answer-${idx}`}
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
                      id={`nahwu-faq-answer-${idx}`}
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

      {/* ================= 10. FINAL CTA ================= */}
      <section className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#049788]/15 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Buka Pintu Memahami <br className="hidden sm:inline" />
            <span className="text-[#049788]">Bahasa Arab & Kitab Kuning</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Pelajari kaidah tata bahasa Arab secara terstruktur bersama ustadz berpengalaman. Mulai langkah belajarmu hari ini.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onOpenModal && onOpenModal("Final CTA Kursus Nahwu Shorof")}
              className="w-full sm:w-auto px-9 py-4 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] font-bold rounded-xl text-sm sm:text-base text-white flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#049788]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
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
