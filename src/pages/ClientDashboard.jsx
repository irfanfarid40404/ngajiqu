import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookMarked,
  BookOpen,
  Calendar,
  UserCheck,
  FileCheck,
  TrendingUp,
  Trophy,
  MessageSquare,
  Award,
  CreditCard,
  User,
  Video,
  Download,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Sparkles,
  Star,
  Flame,
  Send,
  Check,
  Play,
  Pause,
  Volume2,
  ShieldCheck,
  Phone,
  Search,
  Bell,
  ShoppingCart,
  Gamepad2,
  Users2,
  Layers,
  PenTool,
  HelpCircle,
  Maximize2,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/data/content";

// ─── MOCK DATA: STUDENT CORE ──────────────────────────────────────────────────
const initialStudentData = {
  name: "Ahmad Fauzi",
  role: "Santri Reguler",
  level: 4,
  levelTitle: "Santri Mutawassith (Tingkat Menengah)",
  xp: 1850,
  xpTarget: 2500,
  email: "ahmad.fauzi@example.com",
  phone: "0812-8899-1122",
  city: "Jakarta Selatan",
  timezone: "WIB (GMT+7)",
  preferredPlatform: "Google Meet",
  reminderWA: true,
  dailyTarget: "1 Juz / Hari",
  package: "Paket Reguler Privat (2x Seminggu)",
  program: "Kursus Al-Qur'an (Tahsin & Tajwid)",
  tutor: "Ustadz H. Abdul Malik, Lc.",
  tutorTitle: "Lulusan Al-Azhar Kairo, Bersanad Qira'at Hafsh",
  completedSessions: 6,
  totalSessions: 16,
  totalMinutesLearned: 360,
  attendanceRate: "100%",
  score: 88,
  streakDays: 14,
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
      "Alhamdulillah, pelafalan huruf 'Ain dan Dhad sudah jauh lebih fasih dan tepat pada makhrajnya. Di rumah mohon dilatih penahanan dengung (ghunnah) 2 harakat agar bacaan semakin tartil.",
  },
};

// ─── 1. KELAS SAYA ───
const myCourses = [
  {
    id: "crs-01",
    title: "Tahsin & Tajwid Al-Qur'an Intensif",
    category: "Al-Qur'an",
    status: "Sedang Berjalan",
    progress: 38,
    sessionsDone: 6,
    totalSessions: 16,
    tutor: "Ustadz H. Abdul Malik, Lc.",
    schedule: "Selasa & Kamis (19.30 WIB)",
    currentModule: "Modul 4: Kaidah Nun Sukun & Tanwin",
    badgeColor: "bg-[#049788]",
  },
  {
    id: "crs-02",
    title: "Fiqih Ibadah Praktis (Thaharah & Shalat)",
    category: "Fiqih",
    status: "Terdaftar (Mulai Pekan Depan)",
    progress: 0,
    sessionsDone: 0,
    totalSessions: 16,
    tutor: "Ustadz H. Abdul Malik, Lc.",
    schedule: "Sabtu (09.00 WIB)",
    currentModule: "Orientasi Kitab Safinatun Najah",
    badgeColor: "bg-emerald-600",
  },
  {
    id: "crs-03",
    title: "Iqro Cepat & Makharijul Huruf Dasar",
    category: "Dasar",
    status: "Lulus / Selesai",
    progress: 100,
    sessionsDone: 12,
    totalSessions: 12,
    tutor: "Ustadz Ahmad Fauzi",
    schedule: "Selesai pada 10 Juli 2026",
    currentModule: "Evaluasi Akhir Juz Amma",
    badgeColor: "bg-sky-600",
  },
];

// ─── 2. SILABUS JADWAL ───
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

// ─── 3. DIGITAL MATERIALS ───
const digitalMaterials = [
  { id: 1, title: "Buku Panduan Tajwid Aplikatif NgajiQ", category: "Modul PDF Resmi", size: "4.8 MB", badge: "Utama" },
  { id: 2, title: "Bagan Visual Tempat Keluarnya Huruf (Makharij)", category: "Infografis HD", size: "2.1 MB", badge: "Visual" },
  { id: 3, title: "Rangkuman Kaidah Hukum Nun & Mim Sukun", category: "Cheatsheet", size: "1.2 MB", badge: "Ringkas" },
  { id: 4, title: "Tabel Tanda Waqaf & Cara Berhenti yang Tepat", category: "Modul Praktik", size: "1.5 MB", badge: "Praktik" },
];

// ─── 4. AUDIO & MURATTAL ───
const audioPlaylists = [
  { id: 1, surah: "Surah Al-Fatihah (Ayat 1–7)", qari: "Syaikh Mahmud Khalil Al-Hushari", duration: "01:25", style: "Metode Tartil & Muallim", audioUrl: "#" },
  { id: 2, surah: "Surah Al-Mulk (Ayat 1–10)", qari: "Misyari Rasyid Al-Afasy", duration: "03:40", style: "Latihan Irama & Waqaf", audioUrl: "#" },
  { id: 3, surah: "Surah An-Naba' (Juz 30)", qari: "Syaikh Ali Jaber", duration: "05:15", style: "Simakan Tartil Juz Amma", audioUrl: "#" },
  { id: 4, surah: "Matan Al-Jazariyyah (Bab Makharij)", qari: "Ustadz H. Abdul Malik, Lc.", duration: "02:50", style: "Nadzam Tajwid Bersanad", audioUrl: "#" },
];

// ─── 5. BANK SOAL & TUGAS ───
const initialAssignments = [
  {
    id: "asg-01",
    title: "Setor Rekaman Audio Surah Al-Fatihah Ayat 1–7",
    deadline: "3 Sep 2026",
    status: "Dinilai",
    score: 92,
    tutorNote: "Makhraj huruf 'Ain dan Ha sudah sangat baik. Dengung mim sukun dijaga konsistensinya.",
  },
  {
    id: "asg-02",
    title: "Setor Bacaan Idzhar Halqi pada Surah Al-Ghasyiyah",
    deadline: "7 Sep 2026",
    status: "Menunggu Penilaian",
    score: null,
    tutorNote: "Audio telah diterima ustadz, sedang dalam proses review talaqqi.",
  },
  {
    id: "asg-03",
    title: "Latihan Soal Bank Tajwid: Kaidah Hukum Nun Sukun (Paket A)",
    deadline: "10 Sep 2026",
    status: "Belum Dikerjakan",
    score: null,
    tutorNote: "10 Soal pilihan ganda persiapan evaluasi tengah kurikulum.",
  },
];

const questionBankCategories = [
  { id: "qb-1", title: "Bank Soal Makharijul Huruf", count: "30 Soal", difficulty: "Dasar", completed: 25 },
  { id: "qb-2", title: "Bank Soal Sifatul Huruf & Qalqalah", count: "25 Soal", difficulty: "Menengah", completed: 18 },
  { id: "qb-3", title: "Bank Soal Ahkamul Madd & Qashr", count: "40 Soal", difficulty: "Menengah", completed: 0 },
  { id: "qb-4", title: "Bank Soal Waqaf & Ibtida'", count: "20 Soal", difficulty: "Lanjutan", completed: 0 },
];

// ─── 6. GAME EDUKASI (TEBAK HURUF & LEADERBOARD) ───
const gameQuestions = [
  {
    id: 1,
    letter: "ض",
    prompt: "Huruf di atas adalah ... dan keluar dari makhraj mana?",
    options: [
      { text: "Dhad (ض) — Salah satu sisi lidah bertemu gigi geraham atas", correct: true },
      { text: "Shaad (ص) — Ujung lidah di belakang gigi seri bawah", correct: false },
      { text: "Thaa (ط) — Ujung lidah bertemu pangkal gigi seri atas", correct: false },
      { text: "Zha (ظ) — Ujung lidah menyentuh ujung gigi seri atas", correct: false },
    ],
  },
  {
    id: 2,
    letter: "ع",
    prompt: "Huruf 'Ain (ع) termasuk dalam makhraj ...?",
    options: [
      { text: "Aqshal Halq (Pangkal Tenggorokan)", correct: false },
      { text: "Wasthul Halq (Tengah Tenggorokan)", correct: true },
      { text: "Adnal Halq (Ujung Tenggorokan)", correct: false },
      { text: "Asy-Syafatain (Dua Bibir)", correct: false },
    ],
  },
];

const leaderboardData = [
  { rank: 1, name: "Sarah Azzahra", xp: 2450, badge: "Juara 1", streak: "28 Hari" },
  { rank: 2, name: "Rizky Maulana", xp: 2120, badge: "Juara 2", streak: "21 Hari" },
  { rank: 3, name: "Ahmad Fauzi (Anda)", xp: 1850, badge: "Juara 3", streak: "14 Hari" },
  { rank: 4, name: "Fathimah Nabila", xp: 1690, badge: "Top 5", streak: "12 Hari" },
  { rank: 5, name: "dr. Irfan Hakim", xp: 1540, badge: "Top 5", streak: "10 Hari" },
];

// ─── 7. ACHIEVEMENTS & BADGES ───
const achievementsList = [
  { id: "ach-1", icon: Flame, title: "Santri Istiqamah (14 Hari)", desc: "Membaca Al-Qur'an dan mengulang materi 14 hari berturut-turut tanpa jeda.", unlocked: true, badgeColor: "bg-amber-500" },
  { id: "ach-2", icon: ShieldCheck, title: "Lulus Makharijul Huruf", desc: "Menguasai 5 tempat keluarnya huruf hijaiyah dengan akurasi penilaian >85.", unlocked: true, badgeColor: "bg-[#049788]" },
  { id: "ach-3", icon: Star, title: "Presensi Sempurna 100%", desc: "Menghadiri 6 sesi privat awal tanpa keterlambatan dan tanpa izin absen.", unlocked: true, badgeColor: "bg-emerald-500" },
  { id: "ach-4", icon: BookMarked, title: "Khatam Juz 30 Tartil", desc: "Menyelesaikan simakan tilawah juz 30 ayat demi ayat bersama ustadz bersanad.", unlocked: false, progress: "75%", badgeColor: "bg-slate-400" },
  { id: "ach-5", icon: Trophy, title: "Wisudawan Tahsin Utama", desc: "Menuntaskan 16 sesi penuh program Tahsin dengan nilai rata-rata di atas 90.", unlocked: false, progress: "38%", badgeColor: "bg-slate-400" },
];

// ─── 8. TOKO SANTRI PRODUK ───
const storeProducts = [
  {
    id: "prod-01",
    name: "Mushaf Al-Qur'an Tajwid Warna Standard Kemenag",
    price: 125000,
    category: "Mushaf",
    icon: BookOpen,
    iconColor: "text-emerald-700 bg-emerald-50 border border-emerald-100",
    badge: "Best Seller",
  },
  {
    id: "prod-02",
    name: "Buku Cetak Eksklusif: Tajwid Aplikatif & Sifat Huruf",
    price: 65000,
    category: "Buku",
    icon: BookMarked,
    iconColor: "text-[#049788] bg-[#EBF8F6] border border-[#049788]/20",
    badge: "Wajib Santri",
  },
  {
    id: "prod-03",
    name: "Flashcard Edukasi Hijaiyah & Kaidah Tajwid",
    price: 45000,
    category: "Alat Belajar",
    icon: Layers,
    iconColor: "text-amber-700 bg-amber-50 border border-amber-100",
    badge: "Anak & Pemula",
  },
  {
    id: "prod-04",
    name: "Pen Digital Pembaca Al-Qur'an (E-Reader)",
    price: 385000,
    category: "Perangkat",
    icon: PenTool,
    iconColor: "text-indigo-700 bg-indigo-50 border border-indigo-100",
    badge: "Garansi 1 Th",
  },
];

// ─── 9. CHAT MESSAGES ───
const initialChatMessages = [
  { id: 1, sender: "tutor", name: "Ustadz H. Abdul Malik, Lc.", time: "08.30 WIB", text: "Assalamu'alaikum Mas Ahmad, jangan lupa untuk sesi nanti malam jam 19.30 WIB kita akan membahas Idzhar & Idgham ya. Silakan disiapkan mushafnya." },
  { id: 2, sender: "student", name: "Ahmad Fauzi", time: "09.15 WIB", text: "Wa'alaikumsalam Ustadz. Baik ustadz, insyaAllah mushaf dan modul rangkumannya sudah saya siapkan. Nanti malam saya standby tepat waktu." },
  { id: 3, sender: "tutor", name: "Ustadz H. Abdul Malik, Lc.", time: "09.20 WIB", text: "Barakallahu fiik. Rekaman tugas Al-Fatihah Mas Ahmad kemarin juga sudah saya dengarkan kembali, makhraj huruf Halq sudah sangat bersih." },
];

// ─── 10. NOTIFICATIONS ───
const initialNotifications = [
  { id: 1, title: "Nilai Tugas Baru Telah Masuk", desc: "Tugas Rekaman Al-Fatihah dinilai 92/100 oleh Ustadz Abdul Malik.", time: "10 menit lalu", unread: true },
  { id: 2, title: "Sesi Live Nanti Malam (19.30 WIB)", desc: "Sesi ke-7: Kaidah Nun Sukun & Tanwin via Google Meet.", time: "2 jam lalu", unread: true },
  { id: 3, title: "Streak 14 Hari Tercapai!", desc: "Selamat, Anda mendapatkan bonus +100 XP atas keistiqamahan Anda.", time: "Kemarin", unread: false },
];

export default function ClientDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [studentData, setStudentData] = useState(initialStudentData);

  // In-app Toast Notification state (replaces raw alerts)
  const [toast, setToast] = useState(null); // { message: string, type: "success" | "info" }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Video recording player modal
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Bank Soal interactive practice test modal
  const [activePracticeModal, setActivePracticeModal] = useState(null);
  const [practiceAnswer, setPracticeAnswer] = useState(null);
  const [practiceFeedback, setPracticeFeedback] = useState(null);

  // Modals & Popovers
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSubmitted, setRescheduleSubmitted] = useState(false);

  // Notification panel
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Cart state
  const [cart, setCart] = useState([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  // Game state
  const [currentGameIdx, setCurrentGameIdx] = useState(0);
  const [selectedGameAnswer, setSelectedGameAnswer] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  // Audio player state
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [inputMessage, setInputMessage] = useState("");

  // Search query
  const [searchQuery, setSearchQuery] = useState("");

  // Grouped Navigation Definition
  const navigationGroups = [
    {
      group: "PEMBELAJARAN",
      items: [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "my_courses", label: "Kelas Saya", icon: BookMarked },
        { id: "materials", label: "Materi & Modul", icon: BookOpen },
        { id: "audio", label: "Audio & Murattal", icon: Volume2, badge: "Audio" },
        { id: "schedule", label: "Jadwal Kelas", icon: Calendar },
        { id: "assignments", label: "Tugas & Bank Soal", icon: FileCheck, badge: "1 Baru" },
      ],
    },
    {
      group: "EVALUASI & PROGRES",
      items: [
        { id: "progress", label: "Progress Belajar", icon: TrendingUp },
        { id: "tutor", label: "Ustadz Saya", icon: UserCheck },
        { id: "parents", label: "Portal Orang Tua", icon: Users2, badge: "Wali" },
      ],
    },
    {
      group: "GAME & PRESTASI",
      items: [
        { id: "game", label: "Game Edukasi", icon: Gamepad2, badge: "XP +50" },
        { id: "achievements", label: "Pencapaian & Streak", icon: Trophy, badge: "14 Hari" },
        { id: "certificate", label: "Sertifikat", icon: Award },
      ],
    },
    {
      group: "TOKO & AKUN",
      items: [
        { id: "store", label: "Toko Buku & Produk", icon: ShoppingCart },
        { id: "billing", label: "Pembayaran & Paket", icon: CreditCard },
        { id: "chat", label: "Chat Ustadz", icon: MessageSquare },
        { id: "profile", label: "Profil & Keamanan", icon: User },
      ],
    },
  ];

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    showToast(`"${product.name}" berhasil ditambahkan ke keranjang belanja!`, "success");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "student",
      name: studentData.name,
      time: "Baru saja",
      text: inputMessage,
    };
    setChatMessages([...chatMessages, newMsg]);
    setInputMessage("");
  };

  const handleGameAnswer = (opt) => {
    setSelectedGameAnswer(opt);
    if (opt.correct) {
      setGameResult("correct");
      setStudentData((prev) => ({ ...prev, xp: prev.xp + 50 }));
    } else {
      setGameResult("wrong");
    }
  };

  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">

      {/* ─── MODAL: RESCHEDULE JADWAL ─── */}
      {rescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-950">Ajukan Reschedule Jadwal</h3>
                <p className="text-xs text-slate-500">Sesi {studentData.nextSession.number}: {studentData.nextSession.topic}</p>
              </div>
              <button
                onClick={() => setRescheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRescheduleSubmitted(true);
                setTimeout(() => {
                  const msg = `Halo Admin NgajiQ, saya santri ${studentData.name} ingin mengajukan reschedule Sesi ke-${studentData.nextSession.number}:
- Tanggal baru: ${rescheduleDate}
- Alasan: ${rescheduleReason}`;
                  window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
                  setRescheduleSubmitted(false);
                  setRescheduleModalOpen(false);
                }, 800);
              }}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Pilihan Hari & Jam Pengganti</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sabtu, 6 Sept 2026 (Pagi 09.00 WIB)"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Alasan Perubahan Jadwal</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Contoh: Ada lembur kerja mendadak di kantor..."
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788] resize-none"
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
                  className="flex-1 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  {rescheduleSubmitted ? "Mengarahkan ke WA..." : "Kirim Pengajuan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: KERANJANG BELANJA ─── */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#049788]" />
                <h3 className="text-base font-bold text-slate-950">Keranjang Belanja Santri ({cart.length})</h3>
              </div>
              <button
                onClick={() => setCartModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center space-y-2 text-slate-500">
                <ShoppingCart className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-xs">Keranjang belanja Anda masih kosong.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-950">{item.name}</h4>
                      <span className="text-slate-500">{item.category}</span>
                    </div>
                    <span className="font-black text-slate-900">Rp {item.price.toLocaleString("id-ID")}</span>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-sm font-black">
                  <span>Total Tagihan:</span>
                  <span className="text-[#049788]">
                    Rp {cart.reduce((acc, curr) => acc + curr.price, 0).toLocaleString("id-ID")}
                  </span>
                </div>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Halo Admin NgajiQ, saya santri ${studentData.name} ingin memesan produk:\n` +
                      cart.map((c) => `- ${c.name} (Rp ${c.price.toLocaleString("id-ID")})`).join("\n") +
                      `\nTotal: Rp ${cart.reduce((acc, curr) => acc + curr.price, 0).toLocaleString("id-ID")}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Checkout Sekarang via WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MODAL: PEMUTAR REKAMAN KELAS ─── */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788] text-[11px] font-bold">
                  <Video className="w-3 h-3" />
                  <span>Rekaman Kelas Sesi {activeVideoModal.step}</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  {activeVideoModal.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeVideoModal.tutor} · Durasi {activeVideoModal.duration} · {activeVideoModal.date}
                </p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Tutup pemutar video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Mock Viewport */}
            <div className="relative aspect-video bg-slate-950 flex flex-col justify-between p-4 text-white group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono bg-slate-900/80 px-2.5 py-1 rounded-md text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Rekaman Arsip Resmi HD
                </span>
                <span className="text-xs font-mono text-slate-400">1080p · 60fps</span>
              </div>

              {/* Center Play Graphic */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#049788] text-white flex items-center justify-center shadow-lg shadow-[#049788]/30 transition-transform active:scale-95 cursor-pointer">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <span className="text-xs text-slate-300 font-medium">Klik untuk memutar rekaman</span>
              </div>

              {/* Timeline & Controls Bar */}
              <div className="space-y-2 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-xl">
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#2DD4BF] h-full w-2/5 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">22:15 / 56:00</span>
                    <span className="text-[11px] text-slate-400">Bab: Makharijul Huruf Halq</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-slate-300" />
                    <Maximize2 className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Notes & Takeaways */}
            <div className="p-4 sm:p-5 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[#049788]" />
                  <span>Ringkasan Poin Pembelajaran Ustadz</span>
                </h4>
                <button
                  onClick={() => showToast("Mengunduh Rangkuman Sesi PDF...", "info")}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#049788]" />
                  <span>Download Rangkuman PDF</span>
                </button>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Penjelasan 3 titik artikulasi tenggorokan: Adnal Halq (Ghoin, Kho), Wasathul Halq ('Ain, Ha), Aqshal Halq (Hamzah, Ha').</li>
                <li>Latihan talaqqi membaca basmalah dan istiadzah dengan ketepatan makhraj tenggorokan.</li>
                <li>Catatan koreksi santri: Hindari menebalkan suara pada huruf Hamzah.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: LATIHAN BANK SOAL INTERAKTIF ─── */}
      {activePracticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF8F6] text-[#049788] mb-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Bank Soal: {activePracticeModal.difficulty}</span>
                </div>
                <h3 className="text-base font-bold text-slate-950">
                  {activePracticeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePracticeModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Tutup bank soal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-500">Soal Latihan Interaktif (1 dari 5)</span>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                Hukum bacaan apakah yang terjadi apabila terdapat huruf Nun Sukun (نْ) bertemu langsung dengan huruf Ba (ب)?
              </p>

              <div className="space-y-2 pt-1 text-xs sm:text-sm">
                {[
                  { id: "A", text: "Idzhar Halqi — Membaca huruf nun dengan jelas tanpa dengung", correct: false },
                  { id: "B", text: "Iqlab — Mengganti suara nun menjadi mim disertai ghunnah (dengung)", correct: true },
                  { id: "C", text: "Idgham Bighunnah — Memasukkan bunyi nun dengan dengung", correct: false },
                  { id: "D", text: "Ikhfa' Syafawi — Menyamarkan bunyi mim pada bibir", correct: false },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setPracticeAnswer(opt);
                      setPracticeFeedback(opt.correct ? "correct" : "incorrect");
                      if (opt.correct) {
                        setStudentData((prev) => ({ ...prev, xp: prev.xp + 50 }));
                        showToast("Jawaban Benar! +50 XP berhasil ditambahkan ke profil Anda.", "success");
                      }
                    }}
                    className={`w-full p-3.5 text-left rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      practiceAnswer?.id === opt.id
                        ? opt.correct
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-400"
                          : "bg-red-50 border-red-500 text-red-950 ring-1 ring-red-400"
                        : "bg-slate-50/70 border-slate-200 hover:bg-white text-slate-800"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {opt.id}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {practiceFeedback && (
              <div
                className={`p-3.5 rounded-2xl text-xs space-y-1 animate-in fade-in duration-200 ${
                  practiceFeedback === "correct"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                    : "bg-amber-50 border border-amber-200 text-amber-900"
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {practiceFeedback === "correct" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>MasyaAllah, Tepat Sekali! (+50 XP)</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span>Belum Tepat, Mari Pelajari Penjelasannya</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">
                  Iqlab secara bahasa berarti membalik/menukar. Secara istilah tajwid, Iqlab adalah menukar bunyi nun sukun atau tanwin menjadi mim sukun yang disamarkan dengan dengung 2 harakat ketika bertemu huruf Ba (ب).
                </p>
              </div>
            )}

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setActivePracticeModal(null)}
                className="flex-1 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl text-xs cursor-pointer transition-colors"
              >
                Tutup Latihan
              </button>
              <button
                type="button"
                onClick={() => {
                  setPracticeAnswer(null);
                  setPracticeFeedback(null);
                  showToast("Memuat soal latihan berikutnya...", "info");
                }}
                className="flex-1 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-xs"
              >
                Soal Berikutnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TOAST NOTIFICATION BANNER ─── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {toast.type === "success" && (
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
          )}
          {toast.type === "info" && (
            <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          )}
          <span className="font-medium pr-1">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-auto text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ─── MAIN APP SHELL ─── */}
      <div className="flex-grow flex">

        {/* ─── SIDEBAR DESKTOP (GROUPED ACCORDION / LIST) ─── */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200/90 p-5 space-y-5 shrink-0 justify-between">
          <div className="space-y-5">
            
            {/* Header Brand */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-2xl bg-[#049788] text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black text-slate-950 tracking-tight">NgajiQ</span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788]">
                    LMS PRO
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 block">
                  Portal Santri & Orang Tua
                </span>
              </div>
            </div>

            {/* Level & XP Mini Widget */}
            <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 font-bold text-teal-300">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Level {studentData.level}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-black">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{studentData.streakDays} Hari</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-300">
                  <span>{studentData.xp} XP</span>
                  <span>Target: {studentData.xpTarget} XP</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#049788] h-full rounded-full"
                    style={{ width: `${(studentData.xp / studentData.xpTarget) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Grouped Navigation Links */}
            <nav className="space-y-4 max-h-[calc(100vh-270px)] overflow-y-auto pr-1">
              {navigationGroups.map((grp, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase px-3 block">
                    {grp.group}
                  </span>
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer text-left ${
                          isActive
                            ? "bg-[#EBF8F6] text-[#049788] font-bold shadow-2xs border border-[#C8EDE9]"
                            : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#049788]" : "text-slate-400"}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                              item.badge.includes("XP") || item.badge.includes("Hari")
                                ? "bg-amber-100 text-amber-800"
                                : "bg-teal-100 text-teal-800"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Footer User Pill */}
          <div className="space-y-1.5 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                if (onNavigate) onNavigate("/");
                else window.location.pathname = "/";
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("ngajiq_user");
                sessionStorage.removeItem("ngajiq_user");
                if (onNavigate) onNavigate("/login");
                else window.location.pathname = "/login";
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar (Logout)</span>
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
            <div className="relative w-72 max-w-[85vw] bg-white p-5 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#049788]" />
                    <span className="text-base font-black text-slate-950">NgajiQ Portal</span>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-slate-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                  {navigationGroups.map((grp, gIdx) => (
                    <div key={gIdx} className="space-y-1">
                      <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase px-2 block">
                        {grp.group}
                      </span>
                      {grp.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setMobileSidebarOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-xs ${
                              isActive ? "bg-[#EBF8F6] text-[#049788] font-bold" : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate("/");
                    else window.location.pathname = "/";
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("ngajiq_user");
                    sessionStorage.removeItem("ngajiq_user");
                    if (onNavigate) onNavigate("/login");
                    else window.location.pathname = "/login";
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar (Logout)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── MAIN CONTENT VIEWPORT ─── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Top Bar with Search & Notifications */}
          <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
                aria-label="Buka menu navigasi"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Global Search Bar */}
              <div className="relative hidden sm:block w-64 md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari materi, jadwal, audio, atau tugas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-[#049788] bg-slate-50/50"
                />
              </div>
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center gap-2.5">
              
              {/* Cart Button */}
              <button
                onClick={() => setCartModalOpen(true)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 relative cursor-pointer"
                title="Keranjang Belanja"
              >
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#049788] text-white text-[9px] font-bold flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Notification Center Popover Trigger */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 relative cursor-pointer"
                  title="Notifikasi"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                      {unreadNotifCount}
                    </span>
                  )}
                </button>

                {/* Notif Dropdown */}
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-3 z-50 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h4 className="text-xs font-bold text-slate-950">Pemberitahuan</h4>
                      <button
                        onClick={() =>
                          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
                        }
                        className="text-[10px] text-[#049788] font-bold hover:underline"
                      >
                        Tandai Semua Dibaca
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl text-xs space-y-1 ${
                            n.unread ? "bg-[#EBF8F6]/60 border border-[#C8EDE9]" : "bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span>{n.title}</span>
                            <span className="text-[9px] text-slate-400 font-normal">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Join Live Class Shortcut */}
              <a
                href={studentData.nextSession.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Masuk Kelas (19.30)</span>
                <span className="sm:hidden">Kelas</span>
              </a>
            </div>
          </header>

          {/* ─── BODY TABS ─── */}
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">

            {/* ================= 1. TAB: DASHBOARD (RINGKASAN) ================= */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Greeting Banner */}
                <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-slate-950 via-slate-900 to-[#049788]/90 text-white relative overflow-hidden shadow-xl">
                  <div className="relative z-10 max-w-2xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[11px] font-semibold text-teal-200">
                      <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                      <span>Level 4 · Santri Mutawassith</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      Ahlan wa Sahlan, <br className="hidden sm:inline" />
                      <span className="text-[#2DD4BF]">{studentData.name}!</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      "Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya." (HR. Bukhari). Sesi privat tatap muka berikutnya berlangsung hari ini pukul 19.30 WIB.
                    </p>
                  </div>
                </div>

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Progres Sesi</span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-950">
                      {studentData.completedSessions}/{studentData.totalSessions}
                    </div>
                    <span className="text-[11px] text-[#049788] font-bold">10 Sesi Tersisa</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Kehadiran</span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                      {studentData.attendanceRate}
                    </div>
                    <span className="text-[11px] text-slate-500">Disiplin & Tepat Waktu</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Skor Makhraj</span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-950">
                      {studentData.score}/100
                    </div>
                    <span className="text-[11px] text-[#049788] font-bold">Predikat: Jayyid Jiddan</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Tilawah Streak</span>
                    <div className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1">
                      <Flame className="w-6 h-6 fill-amber-400" />
                      <span>{studentData.streakDays} Hari</span>
                    </div>
                    <span className="text-[11px] text-amber-700 font-semibold">Aktif Istiqamah</span>
                  </div>
                </div>

                {/* Next Class Hero Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788] text-[11px] font-bold mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>Jadwal Belajar Mendatang</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-950 mt-1">
                        Sesi {studentData.nextSession.number}: {studentData.nextSession.topic}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {studentData.nextSession.date} · Pukul {studentData.nextSession.time}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setRescheduleModalOpen(true)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
                      >
                        Ajukan Reschedule
                      </button>
                      <a
                        href={studentData.nextSession.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Video className="w-4 h-4" />
                        <span>Buka Google Meet</span>
                      </a>
                    </div>
                  </div>

                  {/* Tutor Note */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>Catatan Evaluasi Guru ({studentData.lastFeedback.date}):</span>
                      <span className="text-[#049788]">{studentData.tutor}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed italic">
                      "{studentData.lastFeedback.notes}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 2. TAB: KELAS SAYA ================= */}
            {activeTab === "my_courses" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-950">Daftar Kursus & Kelas Aktif</h2>
                    <p className="text-xs text-slate-500">Program pembelajaran yang Anda ikuti di NgajiQ</p>
                  </div>
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate("/daftar-kelas");
                      else window.location.pathname = "/daftar-kelas";
                    }}
                    className="px-3.5 py-2 bg-[#049788] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>+ Ambil Kelas Baru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {myCourses.map((crs) => (
                    <div
                      key={crs.id}
                      className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {crs.category}
                          </span>
                          <span className="text-[10px] font-bold text-[#049788]">{crs.status}</span>
                        </div>

                        <h3 className="text-base font-black text-slate-950 leading-snug">{crs.title}</h3>

                        <div className="space-y-1 text-xs text-slate-600">
                          <div>Guru: <strong className="text-slate-900">{crs.tutor}</strong></div>
                          <div className="text-slate-500">{crs.schedule}</div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span>Progres Belajar</span>
                            <span>{crs.sessionsDone}/{crs.totalSessions} Sesi</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${crs.badgeColor}`}
                              style={{ width: `${crs.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab("schedule")}
                        className="w-full py-2.5 text-xs font-bold text-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                      >
                        Buka Ruang Belajar & Silabus
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= 3. TAB: MATERI & MODUL DIGITAL ================= */}
            {activeTab === "materials" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-black text-slate-950">E-Book & Modul Panduan Resmi</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {digitalMaterials.map((mat) => (
                      <div
                        key={mat.id}
                        className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788]">
                            {mat.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-950 leading-snug">{mat.title}</h4>
                          <span className="text-xs text-slate-400 block font-mono">{mat.size}</span>
                        </div>
                        <button
                          onClick={() => showToast(`Mengunduh berkas e-book "${mat.title}"...`, "info")}
                          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Unduh PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= 4. TAB: AUDIO & MURATTAL PLAYER ================= */}
            {activeTab === "audio" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-950">Audio Murattal & Latihan Talaqqi</h2>
                    <p className="text-xs text-slate-500">
                      Dengarkan bacaan tartil para qari terkemuka untuk mengasah ketepatan makhraj dan panjang mad di rumah.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {audioPlaylists.map((track) => {
                      const isPlaying = playingAudioId === track.id;
                      return (
                        <div
                          key={track.id}
                          className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                        >
                          <div className="flex items-center gap-3.5">
                            <button
                              onClick={() => setPlayingAudioId(isPlaying ? null : track.id)}
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs cursor-pointer active:scale-95 transition-all ${
                                isPlaying ? "bg-[#049788]" : "bg-slate-900 hover:bg-slate-800"
                              }`}
                            >
                              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                            </button>
                            <div className="space-y-0.5">
                              <h4 className="text-sm font-bold text-slate-950">{track.surah}</h4>
                              <p className="text-xs text-slate-500">
                                {track.qari} · <span className="text-[#049788] font-medium">{track.style}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-slate-400">{track.duration}</span>
                            <button
                              onClick={() => showToast(`Mengunduh audio tartil ${track.surah}...`, "info")}
                              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 border border-slate-200 cursor-pointer active:scale-95 transition-all"
                              title="Download Audio"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ================= 5. TAB: JADWAL KELAS ================= */}
            {activeTab === "schedule" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-slate-950">Timeline Silabus & Jadwal Pertemuan</h2>
                      <p className="text-xs text-slate-500">16 pertemuan terstruktur bersama Ustadz H. Abdul Malik, Lc.</p>
                    </div>
                    <button
                      onClick={() => setRescheduleModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer active:scale-[0.98] transition-all"
                    >
                      Ajukan Reschedule Sesi
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {syllabusSteps.map((s) => (
                      <div
                        key={s.step}
                        className={`p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                          s.status === "completed"
                            ? "bg-emerald-50/40 border-emerald-200/70"
                            : s.status === "upcoming"
                            ? "bg-[#EBF8F6] border-[#049788] ring-1 ring-[#049788]/20"
                            : "bg-slate-50/60 border-slate-100 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              s.status === "completed"
                                ? "bg-emerald-600 text-white"
                                : s.status === "upcoming"
                                ? "bg-[#049788] text-white"
                                : "bg-slate-200 text-slate-500"
                            }`}
                          >
                            {s.status === "completed" ? <Check className="w-3.5 h-3.5" /> : s.step}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-950">{s.title}</h4>
                            <span className="text-[11px] text-slate-500 font-mono">{s.date}</span>
                          </div>
                        </div>

                        {s.status === "completed" && (
                          <button
                            onClick={() =>
                              setActiveVideoModal({
                                step: s.step,
                                title: s.title,
                                date: s.date,
                                tutor: "Ustadz H. Abdul Malik, Lc.",
                                duration: "56 Menit",
                              })
                            }
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer active:scale-[0.98]"
                          >
                            <Play className="w-3 h-3 text-[#049788] fill-[#049788]" />
                            <span className="hidden sm:inline">Tonton Rekaman</span>
                            <span className="sm:hidden">Rekaman</span>
                          </button>
                        )}

                        {s.status === "upcoming" && (
                          <a
                            href={studentData.nextSession.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Buka Kelas</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= 6. TAB: TUGAS & BANK SOAL ================= */}
            {activeTab === "assignments" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-black text-slate-950">Setoran Rekaman Audio Santri</h2>
                  <div className="space-y-3">
                    {initialAssignments.map((asg) => (
                      <div
                        key={asg.id}
                        className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <h4 className="text-sm font-bold text-slate-950">{asg.title}</h4>
                            <span className="text-xs text-slate-400">Batas Waktu: {asg.deadline}</span>
                          </div>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                              asg.status === "Dinilai"
                                ? "bg-emerald-100 text-emerald-800"
                                : asg.status === "Menunggu Penilaian"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {asg.status} {asg.score ? `(${asg.score}/100)` : ""}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 italic">Catatan Ustadz: "{asg.tutorNote}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank Soal Mandiri */}
                <div className="space-y-4 pt-4 border-t border-slate-200/80">
                  <h2 className="text-lg sm:text-xl font-black text-slate-950">Bank Soal Latihan Mandiri</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {questionBankCategories.map((qb) => (
                      <div
                        key={qb.id}
                        className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            Tingkat: {qb.difficulty}
                          </span>
                          <h4 className="text-sm font-bold text-slate-950 mt-1">{qb.title}</h4>
                          <span className="text-xs text-slate-500">{qb.count}</span>
                        </div>
                        <button
                          onClick={() => {
                            setActivePracticeModal(qb);
                            setPracticeAnswer(null);
                            setPracticeFeedback(null);
                          }}
                          className="w-full py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl cursor-pointer active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Mulai Latihan Mandiri</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= 7. TAB: PROGRESS BELAJAR ================= */}
            {activeTab === "progress" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-slate-950">Akumulasi Progres & Waktu Belajar</h2>
                      <p className="text-xs text-slate-500">Statistik ketercapaian silabus Al-Qur'an dan Tajwid</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Total Jam Belajar Live</span>
                      <span className="text-2xl font-black text-[#049788]">{studentData.totalMinutesLearned} Menit (6 Jam)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-500 block">Makhraj Huruf</span>
                      <div className="text-xl font-black text-[#049788] mt-1">90 / 100</div>
                      <span className="text-[10px] text-emerald-600 font-semibold">Tercapai 90%</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-500 block">Sifatul Huruf</span>
                      <div className="text-xl font-black text-emerald-600 mt-1">86 / 100</div>
                      <span className="text-[10px] text-emerald-600 font-semibold">Tercapai 86%</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-500 block">Ahkamul Madd & Qashr</span>
                      <div className="text-xl font-black text-teal-600 mt-1">84 / 100</div>
                      <span className="text-[10px] text-teal-600 font-semibold">Tercapai 84%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 8. TAB: USTADZ / TUTOR ================= */}
            {activeTab === "tutor" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
                    <div className="w-20 h-20 rounded-3xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center font-black text-2xl shrink-0 shadow-xs border border-[#C8EDE9]">
                      AM
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Guru Pembimbing Utama
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>4.95 Rating Kepuasan</span>
                        </div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-950">{studentData.tutor}</h2>
                      <p className="text-xs sm:text-sm text-slate-600">{studentData.tutorTitle}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <span className="font-bold text-slate-900 block">Sanad Keilmuan:</span>
                      <p className="text-slate-600 leading-relaxed">
                        Memegang sanad muttashil bacaan Al-Qur'an riwayat Hafsh 'an 'Ashim jalur Thayyibatun Nasyr & Syathibiyyah dari Masyayikh Al-Azhar Kairo Mesir.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <span className="font-bold text-slate-900 block">Jadwal Sesi Bersama:</span>
                      <p className="text-slate-600 leading-relaxed">
                        Setiap Selasa & Kamis (19.30 – 20.30 WIB). Sesi live 1-on-1 talaqqi dan simakan privat ayat demi ayat via Google Meet.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab("chat")}
                      className="px-5 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirim Pesan ke Ustadz</span>
                    </button>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                        `Halo Ustadz Abdul Malik, saya santri ${studentData.name} ingin berkonsultasi materi tajwid.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Konsultasi WA</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 9. TAB: PORTAL ORANG TUA ================= */}
            {activeTab === "parents" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                        Portal Khusus Wali Santri
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-slate-950 mt-1">
                        Laporan Perkembangan & Kedisiplinan Ananda
                      </h2>
                      <p className="text-xs text-slate-500">Transparansi pembelajaran untuk orang tua santri</p>
                    </div>
                    <button
                      onClick={() => showToast("Mengunduh Rapor Ringkasan Pekanan Wali Santri (PDF)...", "info")}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Cetak Laporan Pekanan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-500 block">Tingkat Kehadiran Anak:</span>
                      <span className="text-lg font-black text-emerald-600 block">100% (6/6 Sesi)</span>
                      <span className="text-[10px] text-slate-400">Selalu hadir tepat waktu</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-500 block">Ketuntasan Tugas:</span>
                      <span className="text-lg font-black text-[#049788] block">100% Selesai</span>
                      <span className="text-[10px] text-slate-400">2 Audio Setoran dinilai</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-500 block">Perkembangan Akhlak & Adab:</span>
                      <span className="text-lg font-black text-amber-600 block">Sangat Baik (A)</span>
                      <span className="text-[10px] text-slate-400">Adab tilawah terjaga</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-1.5">
                    <span className="font-bold text-emerald-950 block">Pesan Ustadz kepada Orang Tua:</span>
                    <p className="text-slate-700 leading-relaxed italic">
                      "Alhamdulillah, Ananda Ahmad menunjukkan kesungguhan yang sangat tinggi dalam mempelajari makharijul huruf. Kami mengapresiasi dukungan Ayah & Bunda di rumah yang senantiasa mendampingi Ananda mengulang bacaan setiap ba'da Maghrib."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 10. TAB: GAME EDUKASI ================= */}
            {activeTab === "game" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Game Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788] text-[11px] font-bold mb-1">
                        <Gamepad2 className="w-3 h-3" />
                        <span>Mini-Game: Tebak Huruf & Makhraj Hijaiyah</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-950 mt-0.5">
                        Soal {currentGameIdx + 1} dari {gameQuestions.length} (+50 XP per jawaban benar)
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{studentData.xp} XP</span>
                    </div>
                  </div>

                  {/* Giant Arabic Letter Box */}
                  <div className="p-10 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 text-center space-y-2">
                    <div className="text-7xl font-bold font-serif text-slate-950">
                      {gameQuestions[currentGameIdx].letter}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      {gameQuestions[currentGameIdx].prompt}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {gameQuestions[currentGameIdx].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleGameAnswer(opt)}
                        className={`w-full p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                          selectedGameAnswer === opt
                            ? opt.correct
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold"
                              : "bg-red-50 border-red-300 text-red-900 font-bold"
                            : "border-slate-200 hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>

                  {gameResult && (
                    <div className="space-y-3">
                      <div
                        className={`p-3.5 rounded-xl text-xs font-semibold ${
                          gameResult === "correct"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {gameResult === "correct"
                          ? "Maa syaa Allah, Benar! Anda memperoleh +50 XP."
                          : "Jawaban kurang tepat. Coba perhatikan kembali sisi lidah dan gigi geraham."}
                      </div>

                      <button
                        onClick={() => {
                          setCurrentGameIdx((prev) => (prev + 1) % gameQuestions.length);
                          setSelectedGameAnswer(null);
                          setGameResult(null);
                        }}
                        className="px-4 py-2 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] text-white font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <span>Soal Selanjutnya</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Leaderboard Table */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-950">Papan Peringkat Santri Teraktif Pekan Ini</h3>
                    <span className="text-xs text-[#049788] font-bold">Top 5 Nasional</span>
                  </div>
                  <div className="space-y-2">
                    {leaderboardData.map((ld) => (
                      <div
                        key={ld.rank}
                        className={`p-3 rounded-xl flex items-center justify-between text-xs ${
                          ld.name.includes("Anda") ? "bg-[#EBF8F6] border border-[#C8EDE9] font-bold" : "bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 text-center font-black text-slate-700">#{ld.rank}</span>
                          <span className="text-slate-900">{ld.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 font-mono">{ld.streak}</span>
                          <span className="font-black text-[#049788]">{ld.xp} XP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= 11. TAB: PENCAPAIAN & STREAK ================= */}
            {activeTab === "achievements" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
                      <Flame className="w-4 h-4 fill-white" />
                      <span>Istiqamah Habit Tracker</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight">{studentData.streakDays} Hari Berturut-turut!</h2>
                    <p className="text-xs sm:text-sm text-amber-100 max-w-md">
                      Maa syaa Allah! Anda telah membaca Al-Qur'an dan mengulang materi secara istiqamah selama dua pekan tanpa jeda.
                    </p>
                  </div>
                  <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center border-4 border-white/30 shrink-0">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-950">Koleksi Lencana Pencapaian</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievementsList.map((ach) => {
                      const Icon = ach.icon;
                      return (
                        <div
                          key={ach.id}
                          className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
                            ach.unlocked
                              ? "bg-white border-slate-200/90 shadow-2xs"
                              : "bg-slate-50/70 border-slate-100 opacity-60"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs ${ach.badgeColor}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-950 truncate">{ach.title}</h4>
                              {ach.unlocked ? (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  Tercapai
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                                  {ach.progress}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{ach.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ================= 12. TAB: TOKO BUKU & PRODUK ================= */}
            {activeTab === "store" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-950">Toko Perlengkapan Belajar Santri</h2>
                    <p className="text-xs text-slate-500">Mushaf resmi, buku panduan cetak, dan alat bantu mengaji</p>
                  </div>
                  <button
                    onClick={() => setCartModalOpen(true)}
                    className="px-4 py-2 bg-[#049788] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Lihat Keranjang ({cart.length})</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {storeProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className={`h-28 rounded-2xl ${p.iconColor} flex flex-col items-center justify-center gap-1.5 transition-transform group-hover:scale-[1.02]`}>
                          <p.icon className="w-8 h-8" />
                          <span className="text-[11px] font-semibold opacity-80">{p.category}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          {p.badge}
                        </span>
                        <h4 className="text-sm font-bold text-slate-950 leading-snug">{p.name}</h4>
                        <div className="text-base font-black text-slate-900">
                          Rp {p.price.toLocaleString("id-ID")}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(p)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>+ Keranjang</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= 13. TAB: SERTIFIKAT ================= */}
            {activeTab === "certificate" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <h2 className="text-lg sm:text-xl font-black text-slate-950">E-Sertifikat Kelulusan Resmi</h2>
                  <p className="text-xs text-slate-500">Nomor Registrasi: CERT-NQ-2026-0891 · Terverifikasi Dewan Guru NgajiQ</p>
                  
                  <div className="p-6 rounded-2xl border-2 border-[#049788]/30 bg-slate-50/50 space-y-3">
                    <span className="text-xs font-bold text-[#049788]">Tingkat Dasar: Makharijul Huruf & Tajwid</span>
                    <h3 className="text-base font-black text-slate-950">{studentData.name}</h3>
                    <p className="text-xs text-slate-600">Predikat: Mumtaz (Istimewa - 94/100) · Diterbitkan 10 Juli 2026</p>
                    <button
                      onClick={() => showToast("Mengunduh file E-Sertifikat resmi (PDF)...", "info")}
                      className="px-4 py-2 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Sertifikat PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 14. TAB: PEMBAYARAN & PAKET ================= */}
            {activeTab === "billing" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Paket Aktif
                      </span>
                      <h2 className="text-xl font-black text-slate-950 mt-1">{studentData.package}</h2>
                      <p className="text-xs text-slate-500">Masa aktif hingga 20 Oktober 2026 · Sisa 10 Sesi</p>
                    </div>
                    <button
                      onClick={() => {
                        if (onNavigate) onNavigate("/daftar-kelas");
                        else window.location.pathname = "/daftar-kelas";
                      }}
                      className="px-5 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                    >
                      Perpanjang / Tambah Paket
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900">Riwayat Pembayaran</h3>
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-950">INV-2026-0893 (Paket Reguler 16 Sesi)</div>
                        <div className="text-[11px] text-slate-500">03 Agu 2026 · Transfer Bank BSI Syariah</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-slate-900">Rp 449.000</div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Lunas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 15. TAB: CHAT ================= */}
            {activeTab === "chat" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col h-[520px]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center font-bold text-sm">
                        AM
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-950">{studentData.tutor}</h3>
                        <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Online
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">Konsultasi Talaqqi</span>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === "student" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            msg.sender === "student"
                              ? "bg-[#049788] text-white rounded-tr-xs"
                              : "bg-slate-100 text-slate-800 rounded-tl-xs"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
                    <input
                      type="text"
                      placeholder="Tulis pertanyaan hukum tajwid ke ustadz..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#049788]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Kirim</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ================= 16. TAB: PROFIL & KEAMANAN ================= */}
            {activeTab === "profile" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-950">Profil Santri & Pengaturan Akun</h2>
                    <p className="text-xs text-slate-500">Kelola identitas akun, platform belajar, dan pengingat sesi</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      showToast("Pengaturan profil berhasil disimpan!", "success");
                    }}
                    className="space-y-4 text-xs sm:text-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Nama Lengkap</label>
                        <input
                          type="text"
                          value={studentData.name}
                          onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Alamat Email</label>
                        <input
                          type="email"
                          value={studentData.email}
                          onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Nomor WhatsApp</label>
                        <input
                          type="text"
                          value={studentData.phone}
                          onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Target Harian</label>
                        <select
                          value={studentData.dailyTarget}
                          onChange={(e) => setStudentData({ ...studentData, dailyTarget: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788] bg-white text-slate-800"
                        >
                          <option>1 Lembar / Hari</option>
                          <option>1 Ruku' / Hari</option>
                          <option>1/2 Juz / Hari</option>
                          <option>1 Juz / Hari</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                      >
                        Simpan Pengaturan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
