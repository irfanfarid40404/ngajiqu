import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Video,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Sparkles,
  CreditCard,
  FileText,
  Play,
} from "lucide-react";
import { siteConfig } from "@/data/content";

// Mock student profile data
const studentData = {
  name: "Ahmad Fauzi",
  email: "ahmad.fauzi@example.com",
  package: "Paket Reguler Privat (2x Seminggu)",
  program: "Kursus Al-Qur'an (Tahsin & Tajwid)",
  tutor: "Ustadz H. Abdul Malik, Lc.",
  tutorTitle: "Al-Azhar Kairo, Bersanad Qira'at",
  completedSessions: 6,
  totalSessions: 16,
  attendanceRate: "100%",
  score: 88,
  nextSession: {
    number: 7,
    topic: "Hukum Nun Sukun & Tanwin (Idzhar & Idgham)",
    date: "Hari Ini, Kamis",
    time: "19.30 – 20.30 WIB",
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  lastFeedback: {
    session: 6,
    date: "Selasa, 1 Sept 2026",
    notes:
      "Alhamdulillah, pengucapan huruf 'Ain dan Dhad sudah jauh lebih fasih dan tepat pada makhrajnya. Di rumah mohon dilatih penahanan dengung (ghunnah) 2 harakat agar bacaan semakin tartil.",
  },
};

const syllabusSteps = [
  { step: 1, title: "Pengenalan Huruf & Makharijul Huruf Halq", status: "completed", date: "15 Agu 2026" },
  { step: 2, title: "Makharijul Huruf Lisan Bagian Pangkal & Tengah", status: "completed", date: "18 Agu 2026" },
  { step: 3, title: "Makharijul Huruf Lisan Bagian Ujung & Bibir", status: "completed", date: "22 Agu 2026" },
  { step: 4, title: "Sifatul Huruf Berpasangan (Hams vs Jahr)", status: "completed", date: "25 Agu 2026" },
  { step: 5, title: "Sifatul Huruf Tidak Berpasangan (Qalqalah, Shafir)", status: "completed", date: "29 Agu 2026" },
  { step: 6, title: "Evaluasi Makhraj & Sifat pada Surah Al-Fatihah", status: "completed", date: "1 Sep 2026" },
  { step: 7, title: "Hukum Nun Sukun & Tanwin (Idzhar & Idgham)", status: "upcoming", date: "Hari Ini" },
  { step: 8, title: "Hukum Iqlab & Ikhfa' Haqiqi", status: "locked", date: "8 Sep 2026" },
  { step: 9, title: "Latihan Penerapan Nun Sukun pada Juz 30", status: "locked", date: "11 Sep 2026" },
  { step: 10, title: "Hukum Mim Sukun (Idzhar Syafawi, Ikhfa' Syafawi)", status: "locked", date: "15 Sep 2026" },
  { step: 11, title: "Hukum Mad Ashli (Mad Thabi'i)", status: "locked", date: "18 Sep 2026" },
  { step: 12, title: "Hukum Mad Far'i karena Hamzah", status: "locked", date: "22 Sep 2026" },
];

const digitalMaterials = [
  {
    id: 1,
    title: "Buku Panduan Tajwid Aplikatif NgajiQ",
    category: "Modul PDF Resmi",
    size: "4.8 MB",
    downloads: "1.2k",
    badge: "Utama",
  },
  {
    id: 2,
    title: "Bagan Visual Tempat Keluarnya Huruf (Makharij)",
    category: "Infografis HD",
    size: "2.1 MB",
    downloads: "950+",
    badge: "Visual",
  },
  {
    id: 3,
    title: "Rangkuman Kaidah Hukum Nun & Mim Sukun",
    category: "Cheatsheet",
    size: "1.2 MB",
    downloads: "820+",
    badge: "Ringkas",
  },
  {
    id: 4,
    title: "Tabel Tanda Waqaf & Cara Berhenti yang Tepat",
    category: "Modul Praktik",
    size: "1.5 MB",
    downloads: "640+",
    badge: "Praktik",
  },
];

const recordedSessions = [
  {
    id: 6,
    title: "Rekaman Sesi 6: Evaluasi Makhraj Surah Al-Fatihah",
    date: "1 September 2026",
    duration: "58 Menit",
    tutor: "Ustadz H. Abdul Malik, Lc.",
  },
  {
    id: 5,
    title: "Rekaman Sesi 5: Praktik Sifat Qalqalah & Shafir",
    date: "29 Agustus 2026",
    duration: "61 Menit",
    tutor: "Ustadz H. Abdul Malik, Lc.",
  },
  {
    id: 4,
    title: "Rekaman Sesi 4: Sifatul Huruf Berpasangan",
    date: "25 Agustus 2026",
    duration: "55 Menit",
    tutor: "Ustadz H. Abdul Malik, Lc.",
  },
];

const reportMetrics = [
  { aspect: "Makharijul Huruf", score: 88, desc: "Kefasihan melafalkan huruf hijaiyah sesuai tempat keluarnya.", color: "text-[#049788]" },
  { aspect: "Shifatul Huruf", score: 84, desc: "Ketepatan desis (hams), getaran, dan sifat kuat lemahnya huruf.", color: "text-teal-600" },
  { aspect: "Ahkamul Huruf", score: 90, desc: "Pemahaman hukum nun sukun, mim sukun, dan tanwin.", color: "text-emerald-600" },
  { aspect: "Ahkamul Madd", score: 82, desc: "Konsistensi panjang 2, 4, hingga 6 harakat.", color: "text-indigo-600" },
  { aspect: "Kelancaran & Adab", score: 92, desc: "Kelancaran menyambung ayat dan adab tilawah Al-Qur'an.", color: "text-amber-600" },
];

export default function ClientDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSubmitted, setRescheduleSubmitted] = useState(false);

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    setRescheduleSubmitted(true);
    setTimeout(() => {
      const msg = `Halo Admin NgajiQ, saya santri ${studentData.name} ingin mengajukan reschedule Sesi ke-${studentData.nextSession.number}:
- Tanggal baru: ${rescheduleDate}
- Alasan: ${rescheduleReason}`;
      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
      setRescheduleSubmitted(false);
      setRescheduleModalOpen(false);
    }, 1000);
  };

  const navItems = [
    { id: "overview", label: "Ringkasan Belajar", icon: LayoutDashboard },
    { id: "schedule", label: "Jadwal & Sesi", icon: Calendar },
    { id: "materials", label: "Modul & Rekaman", icon: BookOpen },
    { id: "report", label: "Rapor & Evaluasi", icon: Award },
    { id: "billing", label: "Paket Belajar", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Reschedule Modal */}
      {rescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-950">
                  Ajukan Reschedule Jadwal
                </h3>
                <p className="text-xs text-slate-500">Sesi {studentData.nextSession.number}: {studentData.nextSession.topic}</p>
              </div>
              <button
                onClick={() => setRescheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div className="p-3 bg-[#EBF8F6] text-[#02665C] rounded-xl text-xs flex items-start gap-2">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Reschedule bebas biaya maksimal dikabarkan <strong>2 jam</strong> sebelum sesi dimulai.
                </span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Pilihan Hari & Jam Pengganti</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sabtu, 10.00 WIB atau Minggu Malam"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Alasan Penyesuaian</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Lembur pekerjaan / Ada agenda keluarga mendadak"
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788] resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModalOpen(false)}
                  className="flex-1 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={rescheduleSubmitted}
                  className="flex-1 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {rescheduleSubmitted ? "Meneruskan..." : "Kirim Permintaan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="flex-grow flex">

        {/* ─── DESKTOP SIDEBAR ─── */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/90 p-5 space-y-6 shrink-0 justify-between">
          <div className="space-y-6">
            {/* Logo Brand */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-xl bg-[#049788] text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-slate-950 tracking-tight">NgajiQ</span>
                <span className="text-[10px] font-bold text-[#049788] block tracking-wide uppercase">
                  Area Santri
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer text-left ${
                      isActive
                        ? "bg-[#EBF8F6] text-[#049788] font-bold shadow-2xs border border-[#C8EDE9]"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#049788]" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Student Profile Widget & Return */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
              <div className="w-9 h-9 rounded-full bg-[#049788]/20 text-[#049788] flex items-center justify-center font-bold text-xs">
                AF
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-950 truncate">{studentData.name}</h4>
                <p className="text-[10px] text-slate-500 truncate">{studentData.program}</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (onNavigate) onNavigate("/");
                else window.location.pathname = "/";
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 rotate-180" />
              <span>Kembali ke Website</span>
            </button>
          </div>
        </aside>

        {/* ─── MOBILE DRAWER SIDEBAR ─── */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 max-w-[80vw] bg-white p-5 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#049788] text-white flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-base font-black text-slate-950">Portal Santri</span>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-slate-500 hover:text-slate-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#EBF8F6] text-[#049788] font-bold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate("/");
                    else window.location.pathname = "/";
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  <LogOut className="w-3.5 h-3.5 rotate-180" />
                  <span>Kembali ke Website</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── MAIN CONTENT AREA ─── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Top Bar */}
          <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
                aria-label="Buka menu dashboard"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-950 leading-tight">
                  {navItems.find((n) => n.id === activeTab)?.label}
                </h1>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Selamat datang kembali di sistem bimbingan online NgajiQ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Halo Admin NgajiQ, saya santri butuh bantuan konsultasi kelas."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#049788]" />
                <span>Bantuan Admin</span>
              </a>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-[#049788] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  AF
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-xs font-bold text-slate-950 block leading-tight">Ahmad Fauzi</span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Santri Aktif
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Body Content Container */}
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Greeting Banner */}
                <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#024E46] via-[#038073] to-[#049788] text-white overflow-hidden shadow-lg shadow-[#049788]/15">
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L38 15 L53 8 L45 23 L60 30 L45 37 L53 52 L38 45 L30 60 L22 45 L7 52 L15 37 L0 30 L15 23 L7 8 L22 15 Z' fill='none' stroke='white' stroke-width='0.75'/%3E%3C/svg%3E")`,
                      backgroundSize: "60px 60px",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 max-w-2xl space-y-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md text-teal-100">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Hadits Hari Ini
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                      Assalamu'alaikum, {studentData.name}!
                    </h2>
                    <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed italic">
                      &ldquo;Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya.&rdquo; (HR. Bukhari)
                    </p>
                    <p className="text-xs sm:text-sm text-white/95 pt-1">
                      Sesi bimbingan ke-{studentData.nextSession.number} Anda dijadwalkan pada <strong className="underline decoration-amber-300 font-bold">{studentData.nextSession.date}, {studentData.nextSession.time}</strong>.
                    </p>
                  </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Progres Sesi</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-slate-950">{studentData.completedSessions}</span>
                      <span className="text-xs text-slate-500 font-medium">/ {studentData.totalSessions} Pertemuan</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-[#049788] h-full rounded-full"
                        style={{ width: `${(studentData.completedSessions / studentData.totalSessions) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Kehadiran</span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                      {studentData.attendanceRate}
                    </div>
                    <p className="text-[11px] text-slate-500">6 dari 6 sesi dihadiri tepat waktu</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Skor Makhraj</span>
                    <div className="text-2xl sm:text-3xl font-black text-[#049788]">
                      {studentData.score} <span className="text-xs font-normal text-slate-500">/ 100</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold">Tingkat: Sangat Baik</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Sisa Sesi Aktif</span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-950">
                      {studentData.totalSessions - studentData.completedSessions}
                    </div>
                    <p className="text-[11px] text-slate-500">Berlaku s/d 30 Sept 2026</p>
                  </div>
                </div>

                {/* Next Class Hero Card & Last Feedback Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                  {/* Next Session Live Card (Left 7 cols) */}
                  <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-[#049788] uppercase tracking-wider block">
                          Sesi Mendatang Terdekat
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-950">
                          Sesi ke-{studentData.nextSession.number}: {studentData.nextSession.topic}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Siap Masuk
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="text-slate-500 block">Jadwal & Waktu:</span>
                        <span className="font-bold text-slate-900 block">{studentData.nextSession.date}</span>
                        <span className="text-[#049788] font-semibold block">{studentData.nextSession.time}</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="text-slate-500 block">Guru Pengajar:</span>
                        <span className="font-bold text-slate-900 block">{studentData.tutor}</span>
                        <span className="text-slate-500 text-[11px] block">{studentData.tutorTitle}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href={studentData.nextSession.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-5 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#049788]/25"
                      >
                        <Video className="w-4 h-4" />
                        <span>Masuk Ruang Kelas Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setRescheduleModalOpen(true)}
                        className="py-3 px-5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm border border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span>Reschedule Sesi</span>
                      </button>
                    </div>
                  </div>

                  {/* Teacher Feedback Card (Right 5 cols) */}
                  <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                        <div className="w-8 h-8 rounded-xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-950">Catatan dari Ustadz</h4>
                          <span className="text-[11px] text-slate-500">{studentData.lastFeedback.date} (Sesi {studentData.lastFeedback.session})</span>
                        </div>
                      </div>

                      <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                        &ldquo;{studentData.lastFeedback.notes}&rdquo;
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{studentData.tutor}</span>
                      <a
                        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                          `Halo ${studentData.tutor}, saya ingin tanya terkait latihan makhraj kemarin.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#049788] hover:underline font-bold flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Diskusi WA
                      </a>
                    </div>
                  </div>

                </div>

                {/* Syllabus Roadmap Preview */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 tracking-tight">Rencana Pembelajaran</h3>
                      <p className="text-xs text-slate-500">Target kurikulum terstruktur hingga lulus paket 16 sesi</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("schedule")}
                      className="text-xs font-bold text-[#049788] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Semua Sesi</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {syllabusSteps.slice(0, 6).map((step) => (
                      <div
                        key={step.step}
                        className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] text-slate-500 font-semibold block">Sesi {step.step} · {step.date}</span>
                          <p className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">
                            {step.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SCHEDULE */}
            {activeTab === "schedule" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-950">Jadwal Seluruh Pertemuan</h2>
                      <p className="text-xs text-slate-500">Daftar 16 sesi privat bersama {studentData.tutor}</p>
                    </div>
                    <button
                      onClick={() => setRescheduleModalOpen(true)}
                      className="px-4 py-2 bg-[#EBF8F6] text-[#049788] hover:bg-[#d5f3ee] font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Ajukan Reschedule</span>
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {syllabusSteps.map((step) => {
                      const isCompleted = step.status === "completed";
                      const isUpcoming = step.status === "upcoming";
                      return (
                        <div
                          key={step.step}
                          className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3.5">
                            <span
                              className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                isCompleted
                                  ? "bg-emerald-100 text-emerald-700"
                                  : isUpcoming
                                  ? "bg-[#049788] text-white animate-pulse"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {step.step}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                                {step.title}
                              </h4>
                              <span className="text-xs text-slate-500 block mt-0.5">
                                Perkiraan Tanggal: {step.date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 sm:self-center pl-10 sm:pl-0">
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Selesai
                              </span>
                            ) : isUpcoming ? (
                              <a
                                href={studentData.nextSession.meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#049788] hover:bg-[#038073] px-3.5 py-1.5 rounded-xl shadow-xs"
                              >
                                <Video className="w-3.5 h-3.5" />
                                Masuk Live
                              </a>
                            ) : (
                              <span className="text-xs text-slate-400 font-medium">Terkunci</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MATERIALS & RECORDINGS */}
            {activeTab === "materials" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* PDF Modules Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">Modul & Buku Digital</h2>
                    <p className="text-xs text-slate-500">Materi pembelajaran resmi yang dapat Anda unduh dan pelajari kapan saja</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {digitalMaterials.map((mat) => (
                      <div
                        key={mat.id}
                        className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all shadow-2xs flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788]">
                              {mat.badge}
                            </span>
                            <span className="text-xs text-slate-400">{mat.size}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-950 leading-snug">{mat.title}</h4>
                          <p className="text-xs text-slate-500">{mat.category}</p>
                        </div>

                        <button
                          onClick={() => alert(`Mengunduh file: ${mat.title}`)}
                          className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-xl text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#049788]" />
                          <span>Unduh Modul (PDF)</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Recordings */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">Arsip Rekaman Sesi Pembelajaran</h2>
                    <p className="text-xs text-slate-500">Tonton kembali penjelasan ustadz dari sesi-sesi sebelumnya</p>
                  </div>

                  <div className="space-y-3">
                    {recordedSessions.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-4 rounded-2xl border border-slate-200/80 bg-[#FBFBFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <Play className="w-5 h-5 fill-amber-700 ml-0.5" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-950 leading-snug">{rec.title}</h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span>{rec.date}</span>
                              <span>•</span>
                              <span>{rec.duration}</span>
                              <span>•</span>
                              <span>{rec.tutor}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => alert(`Membuka video rekaman: ${rec.title}`)}
                          className="px-4 py-2 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Tonton Rekaman</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: REPORT & EVALUATION */}
            {activeTab === "report" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-950">Rapor Evaluasi Kemajuan Santri</h2>
                      <p className="text-xs text-slate-500">Penilaian berkala berdasarkan 5 pilar kefasihan membaca Al-Qur'an</p>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#EBF8F6] text-[#02665C] font-bold text-xs flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#049788]" />
                      <span>Rata-Rata: 88.4 / 100 (Mutasyarrif)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reportMetrics.map((met, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{met.aspect}</span>
                          <span className={`font-black ${met.color}`}>{met.score} / 100</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#049788] h-full rounded-full transition-all duration-500"
                            style={{ width: `${met.score}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">{met.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                      Kesimpulan Ustadz Pembimbing
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Santri <strong>{studentData.name}</strong> menunjukkan kedisiplinan dan daya tangkap yang sangat baik. Kemampuan membedakan huruf tebal (isti'la) dan tipis (istifal) mengalami kenaikan pesat. Direkomendasikan melanjutkan ke materi Iqlab dan Ikhfa'.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: BILLING & PACKAGE */}
            {activeTab === "billing" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">Informasi Paket Belajar</h2>
                    <p className="text-xs text-slate-500">Status langganan dan rincian kelas privat aktif Anda</p>
                  </div>

                  <div className="p-6 rounded-3xl bg-gradient-to-br from-[#EBF8F6] to-white border border-[#C8EDE9] space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#049788] text-white uppercase tracking-wider">
                          Paket Aktif
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-950 mt-2">
                          {studentData.package}
                        </h3>
                        <p className="text-xs text-[#049788] font-semibold">{studentData.program}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500">Sisa Sesi</span>
                        <div className="text-2xl font-black text-[#049788]">
                          {studentData.totalSessions - studentData.completedSessions} Sesi
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-3 border-t border-[#C8EDE9]/60">
                      <div>
                        <span className="text-slate-500 block">Guru Pembimbing:</span>
                        <span className="font-bold text-slate-900">{studentData.tutor}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Masa Berlaku:</span>
                        <span className="font-bold text-slate-900">Hingga 30 September 2026</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Status Pembayaran:</span>
                        <span className="font-bold text-emerald-600">Lunas (Terverifikasi)</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                        `Halo Admin NgajiQ, saya santri ${studentData.name} ingin perpanjang paket belajar privat.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm text-center shadow-md shadow-[#049788]/20 transition-all"
                    >
                      Perpanjang Sesi Kelas
                    </a>

                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                        `Halo Admin NgajiQ, saya santri ${studentData.name} ingin upgrade ke paket intensif 3x seminggu.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm border border-slate-300 text-center transition-colors"
                    >
                      Upgrade ke Paket Intensif
                    </a>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
