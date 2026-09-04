import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Users,
  Scale,
  Calendar,
  Check,
  Phone,
  User,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/data/content";

const PROGRAMS = [
  {
    id: "alquran",
    name: "Kursus Al-Qur'an",
    tagline: "Tahsin, Tajwid, & Tahfidz Privat",
    desc: "Bimbingan membaca Al-Qur'an tartil dari nol hingga mahir bersanad.",
    icon: BookOpen,
    badge: "Paling Populer",
  },
  {
    id: "fiqih",
    name: "Kursus Fiqih",
    tagline: "Ibadah, Muamalah, & Kontemporer",
    desc: "Kuasai hukum shalat, bersuci, puasa, zakat, hingga etika muamalah.",
    icon: Scale,
    badge: "Komprehensif",
  },
  {
    id: "nahwu-shorof",
    name: "Kursus Nahwu & Shorof",
    tagline: "Kaidah Bahasa Arab & Kitab Gundul",
    desc: "Buka kemampuan membaca teks Arab klasik dan kitab para ulama.",
    icon: Award,
    badge: "Mendalam",
  },
  {
    id: "anak-remaja",
    name: "Program Anak & Remaja",
    tagline: "Iqro & Karakter Islami Menyenangkan",
    desc: "Pendekatan ramah anak dengan metode talaqqi interaktif dan sabar.",
    icon: Users,
    badge: "Ramah Anak",
  },
];

const LEVELS = [
  {
    id: "pemula",
    title: "Pemula (Dari Nol)",
    desc: "Belum lancar mengenal huruf hijaiyah atau belum pernah belajar kaidah sebelumnya.",
  },
  {
    id: "menengah",
    title: "Menengah (Lancar Terbata)",
    desc: "Sudah bisa membaca, ingin memperbaiki makhraj huruf, tajwid, atau pemahaman hukum.",
  },
  {
    id: "lanjutan",
    title: "Lanjutan / Mahir",
    desc: "Fokus pada hafalan mutqin, sanad bacaan, atau praktik membaca kitab kuning mandiri.",
  },
];

const TEACHER_OPTIONS = [
  { id: "akhwat", label: "Ustadzah (Perempuan)", desc: "Khusus santri putri / anak-anak" },
  { id: "ikhwan", label: "Ustadz (Laki-laki)", desc: "Santri putra / ikhwan" },
  { id: "fleksibel", label: "Fleksibel (Rekomendasi)", desc: "Guru terbaik sesuai jadwal yang dipilih" },
];

const TIME_SLOTS = [
  { id: "pagi", label: "Pagi Hari", time: "06.00 – 11.00 WIB" },
  { id: "siang", label: "Siang / Sore", time: "13.00 – 17.00 WIB" },
  { id: "malam", label: "Malam Hari", time: "18.30 – 21.30 WIB" },
  { id: "weekend", label: "Akhir Pekan", time: "Sabtu & Minggu Bebas" },
];

const FREQUENCIES = [
  { id: "2x", label: "2x Seminggu", note: "Paling Efektif & Populer (8 Sesi/Bulan)" },
  { id: "3x", label: "3x Seminggu", note: "Program Akselerasi Cepat (12 Sesi/Bulan)" },
  { id: "1x", label: "1x Seminggu", note: "Sesi Santai & Evaluasi (4 Sesi/Bulan)" },
];

const REGISTRATION_FAQS = [
  {
    q: "Bagaimana alur setelah saya mengisi formulir ini?",
    a: "Setelah menekan tombol daftar, data pilihan belajar Anda akan otomatis terformat rapi dan diteruskan ke WhatsApp Admin NgajiQ. Admin akan segera memverifikasi ketersediaan guru dan mengonfirmasi jadwal trial class perdana Anda.",
  },
  {
    q: "Apakah ada biaya pendaftaran awal?",
    a: "Tidak ada biaya pendaftaran (Gratis 100%). Anda hanya membayar paket belajar setelah sesi bimbingan pertama Anda terkonfirmasi cocok dan disepakati.",
  },
  {
    q: "Bagaimana jika di sesi pertama saya merasa kurang cocok dengan gurunya?",
    a: "NgajiQ memberikan Garansi Bebas Ganti Guru. Jika metode pengajar kurang sesuai dengan ritme belajar Anda, kami akan mencocokkan dengan ustadz/ustadzah lain tanpa biaya tambahan.",
  },
  {
    q: "Apakah jadwal belajar bisa diatur ulang (reschedule)?",
    a: "Tentu bisa. Anda dapat meminta penyesuaian jadwal jika berhalangan dengan mengabari guru atau admin minimal 2 jam sebelum sesi belajar dimulai.",
  },
];

export default function RegisterPage({ defaultProgram = "alquran" }) {
  const [selectedProgram, setSelectedProgram] = useState(defaultProgram);
  const [selectedLevel, setSelectedLevel] = useState("pemula");
  const [teacherGender, setTeacherGender] = useState("fleksibel");
  const [preferredTime, setPreferredTime] = useState("malam");
  const [frequency, setFrequency] = useState("2x");

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    city: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const activeProgramObj =
    PROGRAMS.find((p) => p.id === selectedProgram) || PROGRAMS[0];
  const activeLevelObj =
    LEVELS.find((l) => l.id === selectedLevel) || LEVELS[0];
  const activeTeacherObj =
    TEACHER_OPTIONS.find((t) => t.id === teacherGender) || TEACHER_OPTIONS[2];
  const activeTimeObj =
    TIME_SLOTS.find((ts) => ts.id === preferredTime) || TIME_SLOTS[2];
  const activeFreqObj =
    FREQUENCIES.find((f) => f.id === frequency) || FREQUENCIES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const whatsappMessage = `*PENDAFTARAN KELAS PRIVAT NGAJIQ*
===========================
*Nama Lengkap:* ${formData.name || "-"}
*WhatsApp:* ${formData.whatsapp || "-"}
*Domisili/Kota:* ${formData.city || "-"}

*PILIHAN BELAJAR:*
- Program: ${activeProgramObj.name}
- Level: ${activeLevelObj.title}
- Preferensi Guru: ${activeTeacherObj.label}
- Waktu Favorit: ${activeTimeObj.label} (${activeTimeObj.time})
- Frekuensi: ${activeFreqObj.label}

*Catatan Tambahan:*
${formData.notes ? formData.notes : "Tidak ada catatan"}
===========================
Mohon info ketersediaan jadwal dan ustadz/ustadzah. Terima kasih!`;

    setTimeout(() => {
      window.open(
        `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank"
      );
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="bg-[#FBFBFC] text-slate-900 flex flex-col font-sans">

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-[#E8F7F5] via-[#F3FAF8] to-white border-b border-slate-200/80 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div
          className="absolute -top-20 left-1/4 w-[480px] h-[480px] bg-[#049788]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/4 right-0 w-[520px] h-[520px] bg-[#2DD4BF]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Islamic Arabesque Star Motif */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.45] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23049788' stroke-width='1' stroke-opacity='0.25'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%23049788' stroke-width='0.75' stroke-opacity='0.2'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%23049788' fill-opacity='0.08' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Mulai Belajar Mengaji Privat <br className="hidden sm:inline" />
            <span className="text-[#049788]">1-on-1 Bersama NgajiQ</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Sesuaikan program belajar, tentukan jadwal terbaik Anda, dan dapatkan pendampingan guru bersanad yang sabar membimbing dari dasar.
          </p>

          {/* Trust points */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#049788]" />
              Gratis Konsultasi Jadwal
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#049788]" />
              Garansi Bebas Ganti Guru
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
              <Clock className="w-4 h-4 text-[#049788]" />
              Waktu Belajar Fleksibel 24/7
            </span>
          </div>
        </div>
      </section>

      {/* ================= 2. MAIN ENROLLMENT FORM & SUMMARY ================= */}
      <section className="py-16 md:py-24 bg-[#FBFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT COLUMN: Interactive Options & Information */}
              <div className="lg:col-span-8 space-y-8">

                {/* Step 1: Program Selection */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#049788] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      1
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-950 tracking-tight">
                        Pilih Program Belajar
                      </h2>
                      <p className="text-xs text-slate-500">
                        Pilih fokus keilmuan yang ingin Anda pelajari
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {PROGRAMS.map((prog) => {
                      const Icon = prog.icon;
                      const isSelected = selectedProgram === prog.id;
                      return (
                        <div
                          key={prog.id}
                          onClick={() => setSelectedProgram(prog.id)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                            isSelected
                              ? "bg-[#EBF8F6] border-[#049788] ring-2 ring-[#049788]/20 shadow-sm"
                              : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "bg-[#049788] text-white shadow-xs"
                                  : "bg-[#EBF8F6] text-[#049788]"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? "bg-white text-[#049788] border border-[#C8EDE9]"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {prog.badge}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-950">
                              {prog.name}
                            </h3>
                            <p className="text-xs font-semibold text-[#049788] mt-0.5">
                              {prog.tagline}
                            </p>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {prog.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Level Selection */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#049788] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      2
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-950 tracking-tight">
                        Tingkat Kemampuan Saat Ini
                      </h2>
                      <p className="text-xs text-slate-500">
                        Membantu guru menyesuaikan metode dari sesi pertama
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {LEVELS.map((lvl) => {
                      const isSelected = selectedLevel === lvl.id;
                      return (
                        <div
                          key={lvl.id}
                          onClick={() => setSelectedLevel(lvl.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "bg-[#EBF8F6] border-[#049788] ring-2 ring-[#049788]/20 shadow-sm"
                              : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold text-slate-950">
                                {lvl.title}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? "border-[#049788] bg-[#049788]"
                                    : "border-slate-300"
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {lvl.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Learning Preferences */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#049788] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      3
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-950 tracking-tight">
                        Preferensi Guru & Jadwal Belajar
                      </h2>
                      <p className="text-xs text-slate-500">
                        Tentukan kenyamanan bimbingan privat Anda
                      </p>
                    </div>
                  </div>

                  {/* Kriteria Guru */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Preferensi Tenaga Pengajar
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {TEACHER_OPTIONS.map((teacher) => {
                        const isSelected = teacherGender === teacher.id;
                        return (
                          <div
                            key={teacher.id}
                            onClick={() => setTeacherGender(teacher.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#EBF8F6] border-[#049788] ring-2 ring-[#049788]/20"
                                : "bg-white border-slate-200/80 hover:border-slate-300"
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-bold text-slate-950 block">
                              {teacher.label}
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                              {teacher.desc}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Waktu Favorit */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Waktu Belajar Paling Nyaman
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TIME_SLOTS.map((ts) => {
                        const isSelected = preferredTime === ts.id;
                        return (
                          <div
                            key={ts.id}
                            onClick={() => setPreferredTime(ts.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer text-center ${
                              isSelected
                                ? "bg-[#EBF8F6] border-[#049788] ring-2 ring-[#049788]/20"
                                : "bg-white border-slate-200/80 hover:border-slate-300"
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-bold text-slate-950 block">
                              {ts.label}
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              {ts.time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Frekuensi Pertemuan */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Frekuensi Pertemuan Mingguan
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {FREQUENCIES.map((freq) => {
                        const isSelected = frequency === freq.id;
                        return (
                          <div
                            key={freq.id}
                            onClick={() => setFrequency(freq.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#EBF8F6] border-[#049788] ring-2 ring-[#049788]/20"
                                : "bg-white border-slate-200/80 hover:border-slate-300"
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-bold text-slate-950 block">
                              {freq.label}
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                              {freq.note}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 4: Contact Information */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#049788] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      4
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-950 tracking-tight">
                        Informasi Kontak Calon Santri
                      </h2>
                      <p className="text-xs text-slate-500">
                        Admin kami akan menghubungi via WhatsApp untuk konfirmasi jadwal
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#049788]" />
                        Nama Lengkap Calon Santri
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Pratama"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#049788]" />
                        Nomor WhatsApp Aktif
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#049788]" />
                        Kota / Domisili Tinggal
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Jakarta Selatan / Surabaya"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#049788]" />
                        Catatan Khusus / Target Belajar (Opsional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Contoh: Ingin fokus memperbaiki panjang pendek makhraj, atau kelas untuk anak umur 8 tahun."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 transition-all placeholder:text-slate-400 resize-none"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Sticky Summary Card */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg shadow-slate-200/50 space-y-6">
                  
                  {/* Summary Header */}
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold text-[#049788] uppercase tracking-wider block">
                      Ringkasan Pendaftaran
                    </span>
                    <h3 className="text-xl font-black text-slate-950 tracking-tight mt-0.5">
                      Bimbingan Kelas Privat
                    </h3>
                  </div>

                  {/* Summary Items */}
                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Program:</span>
                      <span className="font-bold text-slate-900 text-right">
                        {activeProgramObj.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Level Awal:</span>
                      <span className="font-semibold text-slate-900 text-right">
                        {activeLevelObj.title}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Guru:</span>
                      <span className="font-semibold text-slate-900 text-right">
                        {activeTeacherObj.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Waktu Favorit:</span>
                      <span className="font-semibold text-slate-900 text-right">
                        {activeTimeObj.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Frekuensi:</span>
                      <span className="font-semibold text-slate-900 text-right">
                        {activeFreqObj.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 bg-[#EBF8F6] px-3 rounded-xl text-[#02665C] font-bold">
                      <span>Biaya Pendaftaran:</span>
                      <span>GRATIS</span>
                    </div>
                  </div>

                  {/* Benefits Included */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-900">
                      Fasilitas Termasuk:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#049788] shrink-0" />
                        <span>Sesi privat 1-on-1 interaktif live</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#049788] shrink-0" />
                        <span>Bebas ganti guru jika merasa tidak cocok</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#049788] shrink-0" />
                        <span>Modul panduan & rangkuman materi digital</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#049788] shrink-0" />
                        <span>Fleksibilitas jadwal reschedule bebas</span>
                      </li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitted}
                      className="w-full py-4 px-6 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#049788]/25 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer"
                    >
                      {submitted ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Meneruskan ke WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <span>Kirim Pendaftaran ke Admin</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-500 text-center mt-2.5">
                      Data Anda aman & langsung terhubung dengan Admin resmi NgajiQ.
                    </p>
                  </div>

                </div>

                {/* WhatsApp Quick Help Pill */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 text-center space-y-1">
                  <p className="text-xs text-slate-600">
                    Ingin tanya jawab langsung tanpa isi formulir?
                  </p>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      "Halo Admin NgajiQ, saya ingin tanya info paket dan jadwal kelas mengaji."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#049788] hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat Langsung via WhatsApp Admin
                  </a>
                </div>

              </div>

            </div>
          </form>
        </div>
      </section>

      {/* ================= 3. TRUST & GUARANTEE STRIP ================= */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-[#FBFBFC] border border-slate-200/90 space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center border border-[#C8EDE9]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 tracking-tight">
                Garansi Bebas Ganti Guru
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kenyamanan santri adalah prioritas utama. Jika merasa kurang cocok dengan metode pengajar di sesi pertama, kami siap mencocokkan guru pengganti tanpa biaya.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#FBFBFC] border border-slate-200/90 space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center border border-[#C8EDE9]">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 tracking-tight">
                Reschedule Mudah & Fleksibel
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ada lembur mendadak atau keperluan keluarga? Cukup beritahu guru minimal 2 jam sebelum sesi belajar untuk mengatur ulang waktu tanpa sesi hangus.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#FBFBFC] border border-slate-200/90 space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center border border-[#C8EDE9]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 tracking-tight">
                Guru Bersanad & Terverifikasi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Seluruh ustadz dan ustadzah di NgajiQ telah melalui seleksi ketat, berakhlak mulia, mengantongi sanad resmi, serta sabar membimbing santri dari nol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. REGISTRATION FAQ ACCORDION ================= */}
      <section className="py-20 md:py-24 bg-[#FBFBFC] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Pertanyaan Seputar Pendaftaran
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Hal-hal yang sering ditanyakan calon santri seputar alur registrasi dan kelas di NgajiQ.
            </p>
          </div>

          <div className="space-y-3">
            {REGISTRATION_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`reg-faq-${idx}`}
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
                      id={`reg-faq-${idx}`}
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

      {/* ================= 5. FINAL CTA BANNER ================= */}
      <section className="py-20 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#049788]/15 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Wujudkan Bacaan Al-Qur'an & Pemahaman Agama <br className="hidden sm:inline" />
            <span className="text-[#049788]">yang Lebih Baik Mulai Hari Ini</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Tidak ada kata terlambat untuk belajar. Ribuan santri dari anak-anak hingga usia 60+ tahun telah merasakan kemudahan belajar bersama NgajiQ.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                "Halo Admin NgajiQ, saya siap mendaftar kelas mengaji privat."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] font-bold rounded-xl text-sm text-white flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#049788]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
            >
              <span>Konsultasi Cepat via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
