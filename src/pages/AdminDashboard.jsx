import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutDashboard,
  BookMarked,
  BookOpen,
  Calendar,
  UserCheck,
  FileCheck,
  TrendingUp,
  CreditCard,
  Users,
  Video,
  Download,
  LogOut,
  Menu,
  X,
  Sparkles,
  Send,
  Play,
  ShieldCheck,
  Phone,
  Search,
  Bell,
  ShoppingCart,
  Gamepad2,
  Users2,
  CheckCircle2,
  Plus,
  RefreshCw,
  ArrowUpRight,
  MessageSquare,
  Award,
  ArrowLeft,
} from "lucide-react";
import { siteConfig } from "@/data/content";

// ─── INITIAL MOCK DATA ────────────────────────────────────────────────────────

const initialAdminStats = {
  activeStudents: 1248,
  activeStudentsGrowth: "+12.4%",
  trialLeadsToday: 42,
  trialLeadsGrowth: "+18.2%",
  sessionsToday: 86,
  sessionsLive: 14,
  monthlyRevenue: 78450000,
  revenueGrowth: "+15.8%",
  tutorsOnDuty: 32,
  conversionRate: "68.5%",
  avgRating: 4.96,
  certificatesIssued: 428,
};

const initialLeads = [
  {
    id: "LD-8901",
    name: "Ahmad Rizwan (Anak - 9 th)",
    parent: "Ibu Rahmawati",
    phone: "081234567890",
    program: "Al-Qur'an (Iqro Dasar)",
    slot: "Sore (16.00 WIB)",
    status: "baru",
    date: "Hari Ini, 08.15",
    tutorPref: "Ustadzah",
    notes: "Belum kenal huruf hijaiyah sama sekali.",
  },
  {
    id: "LD-8902",
    name: "Budi Prasetyo (Dewasa - 34 th)",
    parent: "Mandiri",
    phone: "082198765432",
    program: "Tahsin & Tajwid Dewasa",
    slot: "Malam (19.30 WIB)",
    status: "dihubungi",
    date: "Hari Ini, 07.40",
    tutorPref: "Ustadz",
    notes: "Sudah bisa baca, tapi makhraj dan panjang-pendek sering keliru.",
  },
  {
    id: "LD-8903",
    name: "Fatimah Humaira (Remaja - 14 th)",
    parent: "Bpk. Hendra",
    phone: "085712349876",
    program: "Nahwu & Shorof Dasar",
    slot: "Weekend (10.00 WIB)",
    status: "terjadwal",
    date: "Kemarin",
    tutorPref: "Ustadzah",
    trialSchedule: "Sabtu, 10.00 WIB",
    assignedTutor: "Ustazah Syaimaa', S.Pd.I",
    notes: "Persiapan masuk pesantren tahun depan.",
  },
  {
    id: "LD-8904",
    name: "dr. Irfan Hakim (Dewasa)",
    parent: "Mandiri",
    phone: "081345678901",
    program: "Fiqih Muamalah Bisnis",
    slot: "Malam (20.30 WIB)",
    status: "selesai_trial",
    date: "2 Sep 2026",
    tutorPref: "Ustadz",
    assignedTutor: "Ustadz H. Abdul Malik, Lc.",
    notes: "Trial lancar, tertarik ambil Paket Intensif 3 Bulan.",
  },
  {
    id: "LD-8905",
    name: "Zahra & Zaky (Kakak Beradik)",
    parent: "Ibu Dian",
    phone: "087812345678",
    program: "Tahfidz Juz 30 Anak",
    slot: "Sore (15.30 WIB)",
    status: "konversi",
    date: "1 Sep 2026",
    tutorPref: "Ustadzah",
    assignedTutor: "Ustazah Fatimah Azzahra",
    notes: "Sudah bayar Paket Keluarga 3 Bulan.",
  },
];

const initialStudents = [
  {
    id: "ST-1042",
    name: "Ahmad Fauzi",
    program: "Al-Qur'an (Tahsin & Tajwid)",
    level: "Menengah (Level 4)",
    package: "Paket Reguler (2x/mgg)",
    tutor: "Ustadz H. Abdul Malik, Lc.",
    completedSessions: 6,
    totalSessions: 16,
    attendance: "100%",
    status: "Aktif",
    joinDate: "15 Agu 2026",
    phone: "081288991122",
    xp: 1850,
    score: 88,
  },
  {
    id: "ST-1043",
    name: "Alya Putri",
    program: "Tahsin Dewasa Pranikah",
    level: "Lanjutan (Level 5)",
    package: "Paket Intensif (3x/mgg)",
    tutor: "Ustazah Syaimaa', S.Pd.I",
    completedSessions: 12,
    totalSessions: 16,
    attendance: "95%",
    status: "Aktif",
    joinDate: "28 Jul 2026",
    phone: "082155667788",
    xp: 2420,
    score: 94,
  },
  {
    id: "ST-1044",
    name: "Rizky Maulana",
    program: "Al-Qur'an Pemula (Iqro)",
    level: "Dasar (Level 2)",
    package: "Paket Reguler (2x/mgg)",
    tutor: "Ustadz Ahmad Fauzi",
    completedSessions: 4,
    totalSessions: 16,
    attendance: "100%",
    status: "Aktif",
    joinDate: "20 Agu 2026",
    phone: "081399887766",
    xp: 1200,
    score: 82,
  },
  {
    id: "ST-1045",
    name: "Nabila Azzahra",
    program: "Fiqih Ibadah Harian",
    level: "Menengah (Level 4)",
    package: "Paket VIP Eksklusif",
    tutor: "Ustazah Fatimah Azzahra",
    completedSessions: 15,
    totalSessions: 16,
    attendance: "100%",
    status: "Hampir Selesai",
    joinDate: "10 Jul 2026",
    phone: "085611223344",
    xp: 3100,
    score: 96,
  },
  {
    id: "ST-1046",
    name: "Muhammad Rayhan (10 th)",
    program: "Al-Qur'an & Doa Anak",
    level: "Dasar (Level 1)",
    package: "Paket Reguler (2x/mgg)",
    tutor: "Ustadz Rahmat Hidayat",
    completedSessions: 2,
    totalSessions: 16,
    attendance: "100%",
    status: "Baru Mulai",
    joinDate: "30 Agu 2026",
    phone: "087722334455",
    xp: 650,
    score: 85,
  },
  {
    id: "ST-1047",
    name: "Hj. Siti Rahmawati",
    program: "Tahsin Lansia Ramah",
    level: "Menengah (Level 3)",
    package: "Paket Fleksibel",
    tutor: "Ustazah Hanifah, S.Hum.",
    completedSessions: 16,
    totalSessions: 16,
    attendance: "100%",
    status: "Lulus",
    joinDate: "1 Jun 2026",
    phone: "081199882233",
    xp: 3600,
    score: 92,
  },
];

const initialTutors = [
  {
    id: "TR-001",
    name: "Ustadz H. Abdul Malik, Lc.",
    gender: "Ikhwan",
    sanad: "Sanad Qira'at Hafsh 'an 'Ashim (Mesir)",
    specialty: "Tahsin, Fiqih, & Ushul Fiqih",
    activeStudents: 14,
    hoursThisMonth: "56 Jam",
    rating: 4.95,
    status: "Sedang Mengajar",
    phone: "081233445566",
    avatar: "/teachers-banner.jpg",
  },
  {
    id: "TR-002",
    name: "Ustazah Syaimaa', S.Pd.I",
    gender: "Akhwat",
    sanad: "Sanad Jazariyyah & Tuhfatul Athfal",
    specialty: "Tahsin Akhwat & Anak-Anak",
    activeStudents: 16,
    hoursThisMonth: "64 Jam",
    rating: 4.98,
    status: "Online (Siaga)",
    phone: "082166778899",
    avatar: "/persona-bride.jpg",
  },
  {
    id: "TR-003",
    name: "Ustadz Ahmad Fauzi, M.Ag.",
    gender: "Ikhwan",
    sanad: "Sanad Kitab Matan Al-Jurumiyyah",
    specialty: "Nahwu, Shorof, & Bahasa Arab",
    activeStudents: 12,
    hoursThisMonth: "48 Jam",
    rating: 4.92,
    status: "Online (Siaga)",
    phone: "085799001122",
    avatar: "/hero-tutor.jpg",
  },
  {
    id: "TR-004",
    name: "Ustazah Fatimah Azzahra",
    gender: "Akhwat",
    sanad: "Hafidzah 30 Juz Bersanad",
    specialty: "Tahfidz & Muraja'ah Intensif",
    activeStudents: 15,
    hoursThisMonth: "60 Jam",
    rating: 4.96,
    status: "Sedang Mengajar",
    phone: "081322114455",
    avatar: "/persona-office.jpg",
  },
];

const initialSchedule = [
  {
    id: "SCH-301",
    time: "16.00 – 17.00 WIB",
    student: "Muhammad Rayhan (10 th)",
    tutor: "Ustadz Rahmat Hidayat",
    program: "Iqro & Huruf Hijaiyah Anak",
    status: "Live Sekarang",
    roomLink: "https://meet.google.com/abc-defg-hij",
    platform: "Google Meet",
  },
  {
    id: "SCH-302",
    time: "16.30 – 17.30 WIB",
    student: "Alya Putri",
    tutor: "Ustazah Syaimaa', S.Pd.I",
    program: "Tahsin Tartil Surah Al-Mulk",
    status: "Live Sekarang",
    roomLink: "https://meet.google.com/klm-nopq-rst",
    platform: "Google Meet",
  },
  {
    id: "SCH-303",
    time: "19.30 – 20.30 WIB",
    student: "Ahmad Fauzi",
    tutor: "Ustadz H. Abdul Malik, Lc.",
    program: "Hukum Nun Sukun & Tanwin (Sesi 7)",
    status: "Mendatang",
    roomLink: "https://meet.google.com/uvw-xyz-123",
    platform: "Google Meet",
  },
  {
    id: "SCH-304",
    time: "20.00 – 21.00 WIB",
    student: "Rizky Maulana",
    tutor: "Ustadz Ahmad Fauzi",
    program: "Latihan Makhraj Huruf Halq",
    status: "Mendatang",
    roomLink: "https://meet.google.com/qwe-rty-uio",
    platform: "Zoom",
  },
];

const initialTransactions = [
  {
    id: "INV-2026-0891",
    date: "04 Sep 2026, 09:12",
    student: "Zahra & Zaky (Ibu Dian)",
    package: "Paket Belajar Keluarga (3 Bulan)",
    amount: 1450000,
    method: "BCA Virtual Account",
    status: "Lunas",
  },
  {
    id: "INV-2026-0892",
    date: "04 Sep 2026, 08:30",
    student: "dr. Irfan Hakim",
    package: "Paket VIP Eksklusif (1 Bulan)",
    amount: 649000,
    method: "QRIS All Payment",
    status: "Menunggu Verifikasi",
  },
  {
    id: "INV-2026-0893",
    date: "03 Sep 2026, 21:15",
    student: "Ahmad Fauzi",
    package: "Perpanjangan Reguler (1 Bulan)",
    amount: 449000,
    method: "Bank Syariah Indonesia (BSI)",
    status: "Lunas",
  },
  {
    id: "INV-2026-0894",
    date: "03 Sep 2026, 17:40",
    student: "Budi Prasetyo",
    package: "Paket Santri Baru (Diskon 25%)",
    amount: 336750,
    method: "Mandiri Livin",
    status: "Lunas",
  },
];

const initialModules = [
  {
    id: "MOD-01",
    title: "Modul 1: Makharijul Huruf & Sifatul Huruf",
    category: "Al-Qur'an",
    totalPages: 48,
    downloads: 840,
    lastUpdated: "15 Agu 2026",
    fileSize: "4.2 MB PDF",
  },
  {
    id: "MOD-02",
    title: "Modul 2: Kaidah Hukum Nun Sukun & Mim Sukun",
    category: "Al-Qur'an",
    totalPages: 56,
    downloads: 720,
    lastUpdated: "20 Agu 2026",
    fileSize: "5.1 MB PDF",
  },
  {
    id: "MOD-03",
    title: "Modul 3: Ringkasan Fiqih Safinatun Najah",
    category: "Fiqih",
    totalPages: 64,
    downloads: 510,
    lastUpdated: "28 Agu 2026",
    fileSize: "6.8 MB PDF",
  },
  {
    id: "MOD-04",
    title: "Modul 4: Kaidah Matan Al-Jurumiyyah Bergambar",
    category: "Bahasa Arab",
    totalPages: 72,
    downloads: 430,
    lastUpdated: "01 Sep 2026",
    fileSize: "7.4 MB PDF",
  },
];

const initialAssignments = [
  {
    id: "TSK-101",
    student: "Ahmad Fauzi",
    program: "Tahsin & Tajwid",
    title: "Setoran Rekaman Audio: Praktik Surah Al-Fatihah",
    submittedAt: "Hari Ini, 10.30",
    status: "Menunggu Penilaian",
    score: null,
    audioDuration: "02:14",
    tutor: "Ustadz H. Abdul Malik, Lc.",
  },
  {
    id: "TSK-102",
    student: "Alya Putri",
    program: "Tahsin Pranikah",
    title: "Kuis Tajwid: Hukum Mad Jaiz vs Mad Wajib",
    submittedAt: "Kemarin, 20.15",
    status: "Dinilai",
    score: 95,
    audioDuration: "-",
    tutor: "Ustazah Syaimaa', S.Pd.I",
  },
  {
    id: "TSK-103",
    student: "Rizky Maulana",
    program: "Iqro Pemula",
    title: "Setoran Huruf Hijaiyah Bersambung Hal 15-18",
    submittedAt: "Kemarin, 16.00",
    status: "Dinilai",
    score: 84,
    audioDuration: "03:40",
    tutor: "Ustadz Ahmad Fauzi",
  },
];

const initialProducts = [
  {
    id: "PRD-01",
    name: "Mushaf Al-Qur'an Tajwid Warna Standar Kemenag",
    category: "Buku & Mushaf",
    price: 125000,
    stock: 45,
    sold: 128,
  },
  {
    id: "PRD-02",
    name: "Buku Panduan Praktis Makharijul Huruf Bergambar",
    category: "Modul Cetak",
    price: 65000,
    stock: 60,
    sold: 215,
  },
  {
    id: "PRD-03",
    name: "Flashcard Hijaiyah Anak Interaktif (Art Carton)",
    category: "Media Belajar",
    price: 49000,
    stock: 32,
    sold: 94,
  },
  {
    id: "PRD-04",
    name: "Kitab Matan Taqrib & Terjemahan Fiqih Ibadah",
    category: "Kitab Fiqih",
    price: 85000,
    stock: 28,
    sold: 76,
  },
];

const initialNotifications = [
  {
    id: 1,
    title: "Pendaftar Trial Baru",
    time: "5 menit lalu",
    desc: "Ahmad Rizwan (Anak - 9 th) mendaftar kelas Iqro Dasar.",
    unread: true,
  },
  {
    id: 2,
    title: "Pembayaran Masuk",
    time: "45 menit lalu",
    desc: "Invoice INV-2026-0891 senilai Rp 1.450.000 lunas otomatis.",
    unread: true,
  },
  {
    id: 3,
    title: "Setoran Tugas Santri",
    time: "2 jam lalu",
    desc: "Ahmad Fauzi mengirim rekaman audio Surah Al-Fatihah.",
    unread: false,
  },
];

export default function AdminDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  // States
  const [leads, setLeads] = useState(initialLeads);
  const [students] = useState(initialStudents);
  const [tutors] = useState(initialTutors);
  const [schedules] = useState(initialSchedule);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [modules] = useState(initialModules);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [products] = useState(initialProducts);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Filter states
  const [leadStatusFilter, setLeadStatusFilter] = useState("Semua");
  const [notifOpen, setNotifOpen] = useState(false);

  // Modals
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);
  const [gradeModalOpen, setGradeModalOpen] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [gradeFeedback, setGradeFeedback] = useState("");
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState("");

  // Toast Helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Lead status updater
  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    showToast(`Status pendaftar berhasil diubah menjadi "${newStatus}".`, "success");
  };

  // Transaction verification
  const handleVerifyTransaction = (txId) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: "Lunas" } : t))
    );
    showToast(`Transaksi ${txId} berhasil diverifikasi Lunas!`, "success");
  };

  // Submit Grade
  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (!gradeModalOpen) return;
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === gradeModalOpen.id
          ? {
              ...a,
              status: "Dinilai",
              score: parseInt(gradeInput, 10) || 90,
            }
          : a
      )
    );
    showToast(`Nilai & evaluasi tugas ${gradeModalOpen.student} berhasil disimpan!`, "success");
    setGradeModalOpen(null);
    setGradeInput("");
    setGradeFeedback("");
  };

  // Broadcast
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    showToast(`Pesan broadcast berhasil dikirim ke seluruh santri aktif!`, "success");
    setBroadcastModalOpen(false);
    setBroadcastText("");
  };

  // Grouped Navigation Definition
  const navigationGroups = [
    {
      group: "PEMBELAJARAN",
      items: [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "courses", label: "Kelas & Sesi", icon: BookMarked, badge: "16 Kelas" },
        { id: "materials", label: "Materi & Modul", icon: BookOpen, badge: "Digital" },
        { id: "schedule", label: "Jadwal Kelas", icon: Calendar, badge: "Live" },
        { id: "assignments", label: "Tugas & Bank Soal", icon: FileCheck, badge: "1 Baru" },
      ],
    },
    {
      group: "EVALUASI & PROGRES",
      items: [
        { id: "progress", label: "Progress Belajar", icon: TrendingUp },
        { id: "leads", label: "Pendaftar & Trial", icon: Sparkles, badge: `${leads.filter(l => l.status === "baru").length} Baru` },
        { id: "students", label: "Database Santri", icon: Users, badge: `${students.length}` },
        { id: "tutors", label: "Ustadz & Sanad", icon: UserCheck, badge: `${tutors.length} Guru` },
        { id: "parents", label: "Portal Orang Tua", icon: Users2, badge: "Wali" },
      ],
    },
    {
      group: "GAME & PRESTASI",
      items: [
        { id: "gamification", label: "Game Edukasi", icon: Gamepad2, badge: "XP" },
        { id: "certificates", label: "Sertifikat", icon: Award, badge: "Verifikasi" },
      ],
    },
    {
      group: "TOKO & AKUN",
      items: [
        { id: "store", label: "Toko Buku & Produk", icon: ShoppingCart },
        { id: "finance", label: "Pembayaran & Mutasi", icon: CreditCard, badge: "Mutasi" },
        { id: "chat", label: "Chat Ustadz", icon: MessageSquare, badge: "Chat" },
        { id: "settings", label: "Profil & Keamanan", icon: ShieldCheck },
      ],
    },
  ];

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = leadStatusFilter === "Semua" || item.status === leadStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [leads, searchQuery, leadStatusFilter]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tutor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.program.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [students, searchQuery]);

  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      
      {/* ─── TOAST NOTIFICATION ─── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {toast.type === "success" && (
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
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

      {/* ─── MODAL: BROADCAST WHATSAPP ─── */}
      {broadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-[#049788]" />
                <h3 className="text-base sm:text-lg font-black text-slate-950">Broadcast Pengumuman Santri</h3>
              </div>
              <button
                onClick={() => setBroadcastModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Target Penerima</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white">
                  <option>Seluruh Santri Aktif (1.248 Santri)</option>
                  <option>Santri Kelas Al-Qur'an (820 Santri)</option>
                  <option>Santri Kelas Fiqih (280 Santri)</option>
                  <option>Santri Kelas Nahwu &amp; Shorof (148 Santri)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Isi Pesan Pengumuman</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pesan pengumuman atau jadwal libur nasional..."
                  value={broadcastText}
                  onChange={(e) => setBroadcastText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Broadcast Sekarang</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: INPUT PENDAFTAR TRIAL BARU ─── */}
      {newLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-950">Input Pendaftar Trial Baru</h3>
                <p className="text-xs text-slate-500">Formulir pendaftaran manual via telepon / walk-in</p>
              </div>
              <button
                onClick={() => setNewLeadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const newL = {
                  id: `LD-${Math.floor(8900 + Math.random() * 100)}`,
                  name: fd.get("name"),
                  parent: fd.get("parent") || "Mandiri",
                  phone: fd.get("phone"),
                  program: fd.get("program"),
                  slot: fd.get("slot"),
                  status: "baru",
                  date: "Baru saja",
                  tutorPref: fd.get("tutorPref"),
                  notes: fd.get("notes") || "-",
                };
                setLeads([newL, ...leads]);
                setNewLeadModalOpen(false);
                showToast("Pendaftar trial baru berhasil ditambahkan!", "success");
              }}
              className="space-y-3.5 text-xs sm:text-sm"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Calon Santri</label>
                <input
                  name="name"
                  required
                  placeholder="Contoh: Muhammad Farhan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nomor WhatsApp</label>
                  <input
                    name="phone"
                    required
                    placeholder="0812xxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Wali (Jika Anak)</label>
                  <input
                    name="parent"
                    placeholder="Mandiri / Nama Orang Tua"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Pilihan Program</label>
                  <select
                    name="program"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option>Al-Qur'an (Tahsin &amp; Tajwid)</option>
                    <option>Iqro Cepat Pemula</option>
                    <option>Tahfidz Juz 30</option>
                    <option>Fiqih Ibadah Harian</option>
                    <option>Nahwu &amp; Shorof Dasar</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Preferensi Pengajar</label>
                  <select
                    name="tutorPref"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option>Ustadz (Ikhwan)</option>
                    <option>Ustadzah (Akhwat)</option>
                    <option>Bebas / Siapa Saja</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Pilihan Waktu Belajar</label>
                <input
                  name="slot"
                  placeholder="Contoh: Malam (19.30 WIB) atau Sore (16.00 WIB)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Catatan Khusus Kemampuan</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Contoh: Sudah lancar Iqro 3, butuh perbaikan makhraj..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewLeadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#049788] hover:bg-[#038073] text-white font-bold shadow-md cursor-pointer"
                >
                  Simpan Pendaftar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: NILAI & EVALUASI TUGAS ─── */}
      {gradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-950">Penilaian Tugas &amp; Setoran</h3>
                <p className="text-xs text-slate-500">{gradeModalOpen.student} · {gradeModalOpen.program}</p>
              </div>
              <button
                onClick={() => setGradeModalOpen(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveGrade} className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                <span className="font-bold text-slate-900 block">{gradeModalOpen.title}</span>
                <span className="text-xs text-slate-500">Diserahkan: {gradeModalOpen.submittedAt}</span>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Skor / Nilai (0 - 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  placeholder="Contoh: 92"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Catatan Feedback untuk Santri</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan catatan perbaikan makhraj, tajwid, atau pujian kemajuan..."
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl shadow-md cursor-pointer"
              >
                Simpan Nilai &amp; Berikan Feedback
              </button>
            </form>
          </div>
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
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black text-slate-950 tracking-tight">NgajiQ</span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788]">
                    LMS PRO
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 block">
                  Portal Manajemen Operasional
                </span>
              </div>
            </div>

            {/* System Status Mini Widget */}
            <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sistem Live 24/7</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{initialAdminStats.sessionsLive} Sesi Aktif</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-300">
                  <span>Santri: {initialAdminStats.activeStudents}</span>
                  <span>{initialAdminStats.tutorsOnDuty} Guru Siaga</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#049788] h-full rounded-full"
                    style={{ width: "85%" }}
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
                              item.badge.includes("XP") || item.badge.includes("Baru")
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
                    <ShieldCheck className="w-5 h-5 text-[#049788]" />
                    <span className="text-base font-black text-slate-950">NgajiQ Admin</span>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-slate-500 cursor-pointer">
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

              <div className="space-y-1 border-t border-slate-100 pt-2">
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate("/");
                    else window.location.pathname = "/";
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
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
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
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
                  placeholder="Cari santri, nomor WA, ustadz, atau invoice..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-[#049788] bg-slate-50/50"
                />
              </div>
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center gap-2.5">
              
              {/* Broadcast WA Button */}
              <button
                onClick={() => setBroadcastModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EBF8F6] text-[#049788] hover:bg-[#DCF3F0] font-bold text-xs rounded-xl border border-[#C8EDE9] cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast WA</span>
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
                      <h4 className="text-xs font-bold text-slate-950">Pemberitahuan Operasional</h4>
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

              {/* Admin Profile Pill */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-[#049788] text-white flex items-center justify-center font-black text-xs">
                  AD
                </div>
                <div className="hidden xl:block text-left">
                  <h4 className="text-xs font-bold text-slate-950 leading-tight">Admin Pusat</h4>
                  <span className="text-[10px] text-emerald-600 font-semibold block">Super Administrator</span>
                </div>
              </div>
            </div>
          </header>

          {/* ─── BODY TABS ─── */}
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">

          {/* ================= 1. TAB: OVERVIEW / RINGKASAN EKSEKUTIF ================= */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Ringkasan Operasional &amp; Metrik Utama
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Pantauan live pendaftar trial, santri aktif, jadwal sesi mengajar, dan arus pendapatan.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setNewLeadModalOpen(true)}
                    className="px-4 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Input Pendaftar</span>
                  </button>
                  <button
                    onClick={() => showToast("Data laporan berhasil diexport ke CSV!", "info")}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                    title="Export Laporan"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 Main KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                
                {/* 1. Santri Aktif */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center border border-[#C8EDE9]">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {initialAdminStats.activeStudentsGrowth}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                      {initialAdminStats.activeStudents.toLocaleString("id-ID")}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Santri Aktif Terdaftar</p>
                  </div>
                </div>

                {/* 2. Pendaftar Trial Hari Ini */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {initialAdminStats.trialLeadsGrowth}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                      {initialAdminStats.trialLeadsToday}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Pendaftar Trial Hari Ini</p>
                  </div>
                </div>

                {/* 3. Sesi Mengajar Hari Ini */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200">
                      <Video className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {initialAdminStats.sessionsLive} Live Sekarang
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                      {initialAdminStats.sessionsToday}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Total Sesi Kelas Hari Ini</p>
                  </div>
                </div>

                {/* 4. Arus Pendapatan Bulan Ini */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {initialAdminStats.revenueGrowth}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 truncate">
                      Rp {(initialAdminStats.monthlyRevenue / 1000000).toFixed(1)} Jt
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Pendapatan Bersih Bulan Ini</p>
                  </div>
                </div>

              </div>

              {/* Grid 2 Column: Live Sessions & Recent Leads */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left (7 Cols): Sesi Mengajar Live & Mendatang */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 space-y-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-950">Jadwal Sesi Kelas Hari Ini</h3>
                      <p className="text-xs text-slate-500">Monitoring link Google Meet / Zoom santri &amp; ustadz</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("schedule")}
                      className="text-xs font-bold text-[#049788] hover:underline cursor-pointer"
                    >
                      Lihat Semua Jadwal
                    </button>
                  </div>

                  <div className="space-y-3">
                    {schedules.map((sch) => (
                      <div
                        key={sch.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white hover:border-[#049788]/30 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                sch.status.includes("Live")
                                  ? "bg-emerald-100 text-emerald-800 animate-pulse"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {sch.status}
                            </span>
                            <span className="text-xs font-mono font-semibold text-slate-500">{sch.time}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-950">{sch.student}</h4>
                          <p className="text-xs text-slate-600">
                            Guru: <span className="font-semibold text-slate-900">{sch.tutor}</span> · {sch.program}
                          </p>
                        </div>
                        <a
                          href={sch.roomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Masuk Ruang Kelas</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right (5 Cols): Leads / Pendaftar Terbaru */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 space-y-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-950">Pendaftar Trial Terbaru</h3>
                      <p className="text-xs text-slate-500">Calon santri yang perlu segera di-follow up</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-xs font-bold text-[#049788] hover:underline cursor-pointer"
                    >
                      Kelola Leads
                    </button>
                  </div>

                  <div className="space-y-3">
                    {leads.slice(0, 4).map((ld) => (
                      <div
                        key={ld.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <h4 className="font-bold text-slate-950 truncate">{ld.name}</h4>
                          <p className="text-[11px] text-slate-500 truncate">{ld.program}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{ld.date}</span>
                        </div>
                        <a
                          href={`https://wa.me/62${ld.phone.replace(/^0/, "")}?text=${encodeURIComponent(
                            `Halo ${ld.name}, kami dari Tim Akademik NgajiQ ingin mengonfirmasi jadwal sesi trial class membaca Al-Qur'an.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shrink-0"
                          title="Hubungi via WhatsApp"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= 2. TAB: MANAJEMEN KELAS ================= */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Manajemen Kelas &amp; Kurikulum
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Daftar seluruh batch dan sesi privat yang sedang aktif berjalan bersama para asatidz.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Fitur Buat Kelas Baru siap dibuka!", "info")}
                  className="px-4 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Kelas Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {students.map((st) => (
                  <div
                    key={st.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#EBF8F6] text-[#049788] font-bold">
                          {st.id}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                          {st.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-950">{st.name}</h3>
                      <p className="text-xs text-slate-600">
                        Program: <span className="font-semibold text-slate-900">{st.program}</span>
                      </p>
                      <p className="text-xs text-slate-600">
                        Guru Pengajar: <span className="font-semibold text-slate-900">{st.tutor}</span>
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-xs text-slate-600 font-semibold">
                          <span>Progres Pertemuan</span>
                          <span>{st.completedSessions} / {st.totalSessions} Sesi</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#049788] h-full rounded-full"
                            style={{ width: `${(st.completedSessions / st.totalSessions) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Kehadiran: {st.attendance}</span>
                      <button
                        onClick={() => showToast(`Membuka berkas kelas santri ${st.name}...`, "info")}
                        className="px-3.5 py-1.5 bg-slate-50 hover:bg-[#EBF8F6] hover:text-[#049788] font-bold text-slate-700 rounded-xl cursor-pointer transition-colors"
                      >
                        Detail Kelas
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 3. TAB: MODUL & KURIKULUM ================= */}
          {activeTab === "materials" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Modul Digital &amp; Audio Pembelajaran
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Kelola arsip materi tajwid, buku panduan digital, dan rekaman audio murattal santri.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Pilih file PDF modul digital untuk diunggah...", "info")}
                  className="px-4 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Modul PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {modules.map((mod) => (
                  <div
                    key={mod.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788]">
                          {mod.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{mod.fileSize}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-950 leading-snug">{mod.title}</h3>
                      <p className="text-xs text-slate-500">
                        {mod.totalPages} Halaman · {mod.downloads} Kali Diunduh Santri
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">Update: {mod.lastUpdated}</span>
                      <button
                        onClick={() => showToast(`Mengunduh file ${mod.title}...`, "success")}
                        className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#049788]" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 4. TAB: JADWAL & RUANG LIVE ================= */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Jadwal &amp; Ruang Kelas Virtual
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Daftar seluruh sesi kelas live dan jadwal terjadwal hari ini.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Sinkronisasi jadwal Google Meet otomatis aktif!", "success")}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#049788]" />
                  <span>Sinkronisasi Jadwal</span>
                </button>
              </div>

              <div className="space-y-3">
                {schedules.map((sch) => (
                  <div
                    key={sch.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {sch.time}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                            sch.status.includes("Live")
                              ? "bg-emerald-100 text-emerald-800 animate-pulse"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {sch.status}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-slate-950">{sch.student}</h3>
                      <p className="text-xs text-slate-600">
                        Ustadz: <span className="font-bold text-slate-900">{sch.tutor}</span> · Topik: {sch.program}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <a
                        href={sch.roomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs"
                      >
                        <Video className="w-4 h-4" />
                        <span>Buka Google Meet</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 5. TAB: TUGAS & EVALUASI ================= */}
          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Tugas &amp; Evaluasi Santri
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Periksa setoran audio hafalan dan hasil kuis tajwid harian santri.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {assignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {asg.id}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            asg.status === "Dinilai"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {asg.status}
                        </span>
                        {asg.score && (
                          <span className="text-xs font-black text-[#049788] bg-[#EBF8F6] px-2 py-0.5 rounded-md">
                            Skor: {asg.score}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-950">{asg.title}</h3>
                      <p className="text-xs text-slate-600">
                        Santri: <span className="font-bold text-slate-900">{asg.student}</span> · Guru: {asg.tutor}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {asg.audioDuration !== "-" && (
                        <button
                          onClick={() => showToast(`Memutar rekaman setoran ${asg.student} (${asg.audioDuration})...`, "info")}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-700" />
                          <span>Dengar ({asg.audioDuration})</span>
                        </button>
                      )}
                      <button
                        onClick={() => setGradeModalOpen(asg)}
                        className="px-4 py-2 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        {asg.status === "Dinilai" ? "Edit Nilai" : "Beri Nilai"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 6. TAB: PENDAFTAR & TRIAL (LEADS) ================= */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Pipeline Pendaftar Trial (Leads)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Kelola alur konversi calon santri dari pendaftaran baru hingga sesi trial dan pembayaran.
                  </p>
                </div>
                <button
                  onClick={() => setNewLeadModalOpen(true)}
                  className="px-4 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Input Pendaftar</span>
                </button>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {["Semua", "baru", "dihubungi", "terjadwal", "selesai_trial", "konversi"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap cursor-pointer transition-colors ${
                      leadStatusFilter === st
                        ? "bg-[#049788] text-white shadow-xs"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {st === "baru" ? "Baru Masuk" : st === "terjadwal" ? "Terjadwal Trial" : st === "selesai_trial" ? "Selesai Trial" : st}
                  </button>
                ))}
              </div>

              {/* Leads Table Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-4">Calon Santri</th>
                        <th className="p-4">Program &amp; Slot</th>
                        <th className="p-4">Wali / Kontak</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredLeads.map((ld) => (
                        <tr key={ld.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-slate-950 block">{ld.name}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{ld.id} · {ld.date}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-900 block">{ld.program}</span>
                            <span className="text-[11px] text-slate-500">{ld.slot}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-medium text-slate-800 block">{ld.parent}</span>
                            <span className="text-[11px] text-slate-500">{ld.phone}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
                                ld.status === "baru"
                                  ? "bg-amber-100 text-amber-800"
                                  : ld.status === "konversi"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-teal-100 text-teal-800"
                              }`}
                            >
                              {ld.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`https://wa.me/62${ld.phone.replace(/^0/, "")}?text=${encodeURIComponent(
                                  `Halo ${ld.name}, kami dari Tim Akademik NgajiQ ingin mengonfirmasi sesi trial class.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                title="Chat WhatsApp"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleUpdateLeadStatus(ld.id, "konversi")}
                                className="px-3 py-1.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl cursor-pointer"
                              >
                                Set Konversi
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= 7. TAB: DATABASE SANTRI ================= */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Database Seluruh Santri ({students.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Data profil, paket langganan, guru pengajar, dan tingkat kemajuan belajar santri.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Export seluruh data santri ke format Excel/CSV selesai.", "success")}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#049788]" />
                  <span>Export Data Santri</span>
                </button>
              </div>

              {/* Students Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredStudents.map((st) => (
                  <div
                    key={st.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {st.id}
                        </span>
                        <span className="text-xs font-bold text-[#049788] bg-[#EBF8F6] px-2.5 py-0.5 rounded-full">
                          {st.level}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-950">{st.name}</h3>
                      <div className="space-y-1 text-xs text-slate-600">
                        <p>Program: <span className="font-semibold text-slate-900">{st.program}</span></p>
                        <p>Paket: <span className="font-semibold text-slate-900">{st.package}</span></p>
                        <p>Ustadz: <span className="font-semibold text-slate-900">{st.tutor}</span></p>
                        <p>WhatsApp: <span className="font-mono text-slate-900">{st.phone}</span></p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">XP: {st.xp}</span>
                      <a
                        href={`https://wa.me/62${st.phone.replace(/^0/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-[#EBF8F6] text-[#049788] hover:bg-[#DCF3F0] font-bold rounded-xl flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Chat Santri</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 8. TAB: PROGRESS & RAPOR ================= */}
          {activeTab === "progress" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Progress Belajar &amp; Rapor Akademik
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pantau rata-rata capaian hafalan, evaluasi tajwid, dan catatan perkembangan dari para asatidz.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {students.map((st) => (
                  <div key={st.id} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-950">{st.name}</h3>
                        <p className="text-xs text-slate-500">{st.program} · {st.tutor}</p>
                      </div>
                      <span className="text-sm font-black text-[#049788] bg-[#EBF8F6] px-3 py-1 rounded-xl">
                        Nilai: {st.score}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-600 font-semibold">
                        <span>Kelancaran Materi</span>
                        <span>{Math.round((st.completedSessions / st.totalSessions) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#049788] h-full rounded-full"
                          style={{ width: `${(st.completedSessions / st.totalSessions) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-600 space-y-1">
                      <span className="font-bold text-slate-900 block">Evaluasi Terakhir Ustadz:</span>
                      <p className="italic">
                        "Alhamdulillah bacaan semakin lancar dan makhraj huruf semakin tepat pada tempatnya."
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 9. TAB: PORTAL WALI SANTRI ================= */}
          {activeTab === "parents" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Portal Komunikasi Wali &amp; Orang Tua
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Kirim laporan capaian berkala, catatan ustadz, dan notifikasi kehadiran anak kepada orang tua.
                </p>
              </div>

              <div className="space-y-4">
                {students.map((st) => (
                  <div
                    key={st.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{st.name}</span>
                        <span className="text-xs font-mono text-slate-400">({st.phone})</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Kehadiran: <strong className="text-emerald-700">{st.attendance}</strong> · Total Jam: {st.completedSessions * 60} Menit
                      </p>
                    </div>

                    <button
                      onClick={() => showToast(`Laporan capaian belajar ${st.name} berhasil dikirim ke orang tua!`, "success")}
                      className="px-4 py-2 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Laporan WA ke Wali</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 10. TAB: DATA ASATIDZ & SANAD ================= */}
          {activeTab === "tutors" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Data Asatidz &amp; Sanad Keilmuan
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Profil tenaga pengajar tersertifikasi, sanad qiraat, dan rekap jam mengajar bulan ini.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Formulir pendaftaran guru baru dibuka.", "info")}
                  className="px-4 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Asatidz</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {tutors.map((tr) => (
                  <div
                    key={tr.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                          {tr.id}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          {tr.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-950">{tr.name}</h3>
                      <div className="p-3 bg-[#EBF8F6]/60 rounded-2xl border border-[#049788]/20 space-y-1">
                        <span className="text-[11px] font-bold text-[#049788] block">Sanad Keilmuan:</span>
                        <p className="text-xs text-slate-800 font-medium">{tr.sanad}</p>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <p>Spesialisasi: <span className="font-semibold text-slate-900">{tr.specialty}</span></p>
                        <p>Santri Aktif: <span className="font-bold text-slate-900">{tr.activeStudents} Santri</span></p>
                        <p>Jam Mengajar Bulan Ini: <span className="font-bold text-slate-900">{tr.hoursThisMonth}</span></p>
                        <p>Rating Santri: <span className="font-black text-amber-500">⭐ {tr.rating} / 5.0</span></p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-mono">{tr.phone}</span>
                      <a
                        href={`https://wa.me/62${tr.phone.replace(/^0/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Hubungi Ustadz</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 11. TAB: GAME & LEADERBOARD ================= */}
          {activeTab === "gamification" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Gamifikasi &amp; Leaderboard Santri
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pantau santri dengan perolehan XP tertinggi, konsistensi streak harian, dan kuis tajwid.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {students.slice(0, 3).map((st, rank) => (
                  <div
                    key={st.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-3 relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 font-black text-lg mx-auto flex items-center justify-center border border-amber-300 shadow-xs">
                      #{rank + 1}
                    </div>
                    <h3 className="text-base font-black text-slate-950">{st.name}</h3>
                    <p className="text-xs text-[#049788] font-bold">{st.program}</p>
                    <div className="p-3 bg-slate-50 rounded-2xl flex justify-around text-xs font-bold">
                      <div>
                        <span className="text-slate-400 block text-[10px]">TOTAL XP</span>
                        <span className="text-slate-900">{st.xp} XP</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">RATA-RATA NILAI</span>
                        <span className="text-emerald-600">{st.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 12. TAB: SERTIFIKAT SANTRI ================= */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Penerbitan &amp; Verifikasi Sertifikat
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Kelola sertifikat kelulusan tahsin, tajwid, dan hafalan surat santri yang telah tuntas 16 sesi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {students.filter(s => s.status === "Lulus" || s.completedSessions >= 12).map((st) => (
                  <div key={st.id} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                        Siap Terbit
                      </span>
                      <span className="text-xs font-mono text-slate-400">ID: CERT-2026-{st.id}</span>
                    </div>
                    <h3 className="text-base font-black text-slate-950">{st.name}</h3>
                    <p className="text-xs text-slate-600">Program: {st.program}</p>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => showToast(`Menerbitkan e-Sertifikat resmi untuk ${st.name}...`, "success")}
                        className="w-full py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Generate &amp; Kirim Sertifikat PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 13. TAB: TOKO BUKU & PRODUK ================= */}
          {activeTab === "store" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Katalog Produk &amp; Toko Edukasi
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Kelola stok buku Iqro, Mushaf Al-Qur'an tajwid warna, dan kartu flashcard santri.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Formulir tambah produk baru siap.", "info")}
                  className="px-4 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Produk</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {products.map((prd) => (
                  <div
                    key={prd.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788]">
                        {prd.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-950">{prd.name}</h3>
                      <p className="text-lg font-black text-slate-950">
                        Rp {prd.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Sisa Stok: <strong className="text-slate-900">{prd.stock} Pcs</strong></span>
                      <span>Terjual: <strong className="text-emerald-600">{prd.sold} Pcs</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 14. TAB: TRANSAKSI & KEUANGAN ================= */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Transaksi &amp; Pembayaran Santri
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Mutasi pembayaran paket belajar, perpanjangan kelas, dan verifikasi bukti transfer.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Export mutasi keuangan bulan September berhasil.", "success")}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#049788]" />
                  <span>Download Rekap Keuangan</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-4">No. Invoice &amp; Tanggal</th>
                        <th className="p-4">Nama Santri</th>
                        <th className="p-4">Paket Pembelajaran</th>
                        <th className="p-4">Nominal</th>
                        <th className="p-4">Metode Bayar</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-mono">
                            <span className="font-bold text-slate-950 block">{tx.id}</span>
                            <span className="text-[11px] text-slate-400">{tx.date}</span>
                          </td>
                          <td className="p-4 font-bold text-slate-900">{tx.student}</td>
                          <td className="p-4 text-slate-600">{tx.package}</td>
                          <td className="p-4 font-black text-slate-950">
                            Rp {tx.amount.toLocaleString("id-ID")}
                          </td>
                          <td className="p-4 text-slate-500 font-medium">{tx.method}</td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                tx.status === "Lunas"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {tx.status !== "Lunas" && (
                              <button
                                onClick={() => handleVerifyTransaction(tx.id)}
                                className="px-3 py-1.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl cursor-pointer text-xs"
                              >
                                Verifikasi
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= 15. TAB: MONITORING PESAN ================= */}
          {activeTab === "chat" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Pusat Pesan &amp; Konsultasi Santri
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pantau percakapan tanya jawab fiqih, tajwid, dan keluhan layanan dari santri maupun ustadz.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {students.slice(0, 4).map((st) => (
                  <div key={st.id} className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-950">{st.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">10 menit lalu</span>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">
                      "Assalamu'alaikum ustadz, untuk pertemuan besok apakah bisa diundur 15 menit?"
                    </p>
                    <a
                      href={`https://wa.me/62${st.phone.replace(/^0/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-[#EBF8F6] text-[#049788] hover:bg-[#DCF3F0] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Balas via WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 16. TAB: PENGATURAN & AKUN ================= */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Pengaturan Sistem &amp; Keamanan
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Konfigurasi integrasi WhatsApp Gateway, Payment Gateway, dan hak akses staf akademik.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#049788]" />
                    <span>WhatsApp Gateway Official</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <label className="font-bold text-slate-700">Nomor Admin Terhubung</label>
                    <input
                      disabled
                      value={siteConfig.whatsappNumber}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    />
                    <span className="text-[11px] text-emerald-600 font-bold block">● Status Gateway: Terhubung Aktif</span>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#049788]" />
                    <span>Keamanan &amp; Akses Super Admin</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <label className="font-bold text-slate-700">Email Akun Admin</label>
                    <input
                      disabled
                      value="admin.pusat@ngajiqu.id"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    />
                    <button
                      onClick={() => showToast("Verifikasi 2FA via WhatsApp aktif.", "success")}
                      className="px-4 py-2 bg-[#049788] text-white font-bold rounded-xl cursor-pointer"
                    >
                      Aktifkan 2FA
                    </button>
                  </div>
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
