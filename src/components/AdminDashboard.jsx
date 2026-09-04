import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  Award,
  Search,
  Plus,
  Video,
  MessageSquare,
  ChevronRight,
  Download,
  ShieldCheck,
  Star,
  LogOut,
  Menu,
  X,
  Sparkles,
  RefreshCw,
} from "lucide-react";

// ─── INITIAL MOCK DATA ────────────────────────────────────────────────────────

const initialStats = {
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
    assignedTutor: "Ustazah Syaimaa'",
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
    assignedTutor: "Ustazah Fatimah, S.Pd.",
    notes: "Sudah bayar Paket Keluarga 3 Bulan.",
  },
];

const initialStudents = [
  {
    id: "ST-1042",
    name: "Ahmad Fauzi",
    program: "Al-Qur'an (Tahsin & Tajwid)",
    level: "Menengah",
    package: "Paket Reguler (2x/mgg)",
    tutor: "Ustadz H. Abdul Malik, Lc.",
    completedSessions: 6,
    totalSessions: 16,
    attendance: "100%",
    status: "Aktif",
    joinDate: "15 Agu 2026",
    phone: "081288991122",
  },
  {
    id: "ST-1043",
    name: "Alya Putri",
    program: "Tahsin Dewasa Pranikah",
    level: "Lanjutan",
    package: "Paket Intensif (3x/mgg)",
    tutor: "Ustazah Syaimaa'",
    completedSessions: 12,
    totalSessions: 16,
    attendance: "95%",
    status: "Aktif",
    joinDate: "28 Jul 2026",
    phone: "082155667788",
  },
  {
    id: "ST-1044",
    name: "Rizky Maulana",
    program: "Al-Qur'an Pemula (Iqro)",
    level: "Pemula",
    package: "Paket Reguler (2x/mgg)",
    tutor: "Ustadz Ahmad Fauzi",
    completedSessions: 4,
    totalSessions: 16,
    attendance: "100%",
    status: "Aktif",
    joinDate: "20 Agu 2026",
    phone: "081399887766",
  },
  {
    id: "ST-1045",
    name: "Nabila Azzahra",
    program: "Fiqih Ibadah Harian",
    level: "Menengah",
    package: "Paket VIP Eksklusif",
    tutor: "Ustazah Fatimah, S.Pd.",
    completedSessions: 15,
    totalSessions: 16,
    attendance: "100%",
    status: "Hampir Selesai",
    joinDate: "10 Jul 2026",
    phone: "085611223344",
  },
  {
    id: "ST-1046",
    name: "Muhammad Rayhan (10 th)",
    program: "Al-Qur'an & Doa Anak",
    level: "Pemula",
    package: "Paket Reguler (2x/mgg)",
    tutor: "Ustadz Rahmat Hidayat",
    completedSessions: 2,
    totalSessions: 16,
    attendance: "100%",
    status: "Baru Mulai",
    joinDate: "30 Agu 2026",
    phone: "087722334455",
  },
  {
    id: "ST-1047",
    name: "Hj. Siti Rahmawati",
    program: "Tahsin Lansia Ramah",
    level: "Menengah",
    package: "Paket Fleksibel",
    tutor: "Ustazah Hanifah, S.Hum.",
    completedSessions: 16,
    totalSessions: 16,
    attendance: "100%",
    status: "Lulus",
    joinDate: "1 Jun 2026",
    phone: "081199882233",
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
    tutor: "Ustazah Syaimaa'",
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
    amount: "Rp 1.450.000",
    method: "BCA Virtual Account",
    status: "Lunas",
  },
  {
    id: "INV-2026-0892",
    date: "04 Sep 2026, 08:30",
    student: "dr. Irfan Hakim",
    package: "Paket VIP Eksklusif (1 Bulan)",
    amount: "Rp 649.000",
    method: "QRIS All Payment",
    status: "Menunggu Verifikasi",
  },
  {
    id: "INV-2026-0893",
    date: "03 Sep 2026, 21:15",
    student: "Ahmad Fauzi",
    package: "Perpanjangan Reguler (1 Bulan)",
    amount: "Rp 449.000",
    method: "Bank Syariah Indonesia (BSI)",
    status: "Lunas",
  },
  {
    id: "INV-2026-0894",
    date: "03 Sep 2026, 17:40",
    student: "Budi Prasetyo",
    package: "Paket Santri Baru (Diskon 25%)",
    amount: "Rp 336.750",
    method: "Mandiri Livin",
    status: "Lunas",
  },
];

export default function AdminDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("Semua");
  const [leadStatusFilter, setLeadStatusFilter] = useState("Semua");

  // State data
  const [leads, setLeads] = useState(initialLeads);
  const [students] = useState(initialStudents);
  const [tutors] = useState(initialTutors);
  const [transactions, setTransactions] = useState(initialTransactions);

  // Modals
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Lead status updater
  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Transaction verification
  const handleVerifyTransaction = (txId) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: "Lunas" } : t))
    );
  };

  // Navigation menu items
  const menuItems = [
    { id: "overview", label: "Ringkasan Eksekutif", icon: LayoutDashboard, badge: null },
    { id: "leads", label: "Pendaftar & Trial (Leads)", icon: Sparkles, badge: leads.filter((l) => l.status === "baru").length },
    { id: "students", label: "Database Santri", icon: Users, badge: students.length },
    { id: "tutors", label: "Data Pengajar & Sanad", icon: UserCheck, badge: tutors.length },
    { id: "schedule", label: "Jadwal & Ruang Kelas", icon: Calendar, badge: "Live" },
    { id: "finance", label: "Keuangan & Transaksi", icon: CreditCard, badge: null },
    { id: "reports", label: "Rapor & Evaluasi", icon: Award, badge: null },
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
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tutor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchProgram =
        programFilter === "Semua" || item.program.toLowerCase().includes(programFilter.toLowerCase());
      return matchSearch && matchProgram;
    });
  }, [students, searchQuery, programFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">

      {/* ─── MODAL: TAMBAH PENDAFTAR TRIAL BARU ─── */}
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
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Wali / Kategori</label>
                  <input
                    name="parent"
                    placeholder="Mandiri / Orang Tua"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Peminatan Program</label>
                  <select
                    name="program"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788] bg-white text-slate-800"
                  >
                    <option>Al-Qur'an (Iqro Dasar)</option>
                    <option>Tahsin & Tajwid Dewasa</option>
                    <option>Tahfidz Juz 30</option>
                    <option>Fiqih Ibadah & Muamalah</option>
                    <option>Nahwu & Shorof</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Preferensi Pengajar</label>
                  <select
                    name="tutorPref"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788] bg-white text-slate-800"
                  >
                    <option value="Ustadz">Ustadz (Ikhwan)</option>
                    <option value="Ustadzah">Ustadzah (Akhwat)</option>
                    <option value="Bebas">Bebas / Sesuai Jadwal</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Slot Waktu Pilihan</label>
                <input
                  name="slot"
                  placeholder="Contoh: Malam (19.30 WIB) atau Weekend Pagi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Catatan Khusus</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Kemampuan awal, target, kendala waktu..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788] resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewLeadModalOpen(false)}
                  className="flex-1 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Simpan Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: DETAIL & AKSI LEAD TRIAL ─── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#049788] uppercase tracking-wider block">
                  {selectedLead.id}
                </span>
                <h3 className="text-lg font-black text-slate-950">{selectedLead.name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                <span className="text-slate-500 block">WhatsApp / Kontak:</span>
                <span className="font-bold text-slate-900 block">{selectedLead.phone}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                <span className="text-slate-500 block">Peminatan:</span>
                <span className="font-bold text-slate-900 block">{selectedLead.program}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                <span className="text-slate-500 block">Preferensi Guru:</span>
                <span className="font-bold text-slate-900 block">{selectedLead.tutorPref}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                <span className="text-slate-500 block">Slot Waktu:</span>
                <span className="font-bold text-slate-900 block">{selectedLead.slot}</span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-amber-900 block">Catatan Calon Santri:</span>
              <p className="text-slate-700 leading-relaxed italic">{selectedLead.notes}</p>
            </div>

            {/* Pipeline Stage Buttons (Kodland Style) */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">Ubah Status Pipeline:</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => handleUpdateLeadStatus(selectedLead.id, "dihubungi")}
                  className={`py-2 px-2.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                    selectedLead.status === "dihubungi"
                      ? "bg-sky-50 text-sky-700 border-sky-300 font-bold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Dihubungi
                </button>
                <button
                  onClick={() => handleUpdateLeadStatus(selectedLead.id, "terjadwal")}
                  className={`py-2 px-2.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                    selectedLead.status === "terjadwal"
                      ? "bg-amber-50 text-amber-700 border-amber-300 font-bold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Jadwal Trial
                </button>
                <button
                  onClick={() => handleUpdateLeadStatus(selectedLead.id, "konversi")}
                  className={`py-2 px-2.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                    selectedLead.status === "konversi"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Konversi Santri
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Contact Button */}
            <div className="pt-2 flex gap-2">
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/^0/, "62")}?text=${encodeURIComponent(
                  `Halo ${selectedLead.name}, salam dari Admin NgajiQ. Terkait permohonan kelas percobaan ${selectedLead.program}, apakah hari ini ada waktu luang untuk koordinasi jadwal trial?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Calon Santri (WhatsApp)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── MAIN DASHBOARD SHELL ─── */}
      <div className="flex-grow flex">

        {/* ─── DESKTOP SIDEBAR ─── */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/90 p-5 space-y-6 shrink-0 justify-between">
          <div className="space-y-6">
            {/* Logo Brand & Admin Badge */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#049788]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black text-slate-950 tracking-tight">NgajiQ</span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-slate-900 text-teal-300">
                    ADMIN
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 block">
                  Pusat Operasional
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer text-left ${
                      isActive
                        ? "bg-[#EBF8F6] text-[#049788] font-bold shadow-2xs border border-[#C8EDE9]"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#049788]" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          typeof item.badge === "number"
                            ? "bg-[#049788] text-white"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Return */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                OP
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-950 truncate">Admin Operasional</h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </p>
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
              <span>Kembali ke Website Utama</span>
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
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-slate-950">NgajiQ Admin</span>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-slate-500 hover:text-slate-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#EBF8F6] text-[#049788] font-bold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#049788] text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

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
        )}

        {/* ─── MAIN CONTENT AREA ─── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Top Bar */}
          <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
                aria-label="Buka menu navigasi"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-950 leading-tight">
                  {menuItems.find((m) => m.id === activeTab)?.label}
                </h1>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Sistem Manajemen Pembelajaran & Operasional Santri NgajiQ
                </p>
              </div>
            </div>

            {/* Quick Actions & Search */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setNewLeadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#049788] hover:bg-[#038073] active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Input Lead Trial</span>
                <span className="sm:hidden">Lead</span>
              </button>

              <button
                onClick={() => alert("Sinkronisasi data berhasil diperbarui!")}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* ─── TAB CONTENT ─── */}
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">

            {/* ================= TAB 1: OVERVIEW ================= */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* 4 Main KPI Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold">Santri Aktif</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {initialStats.activeStudentsGrowth}
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-950">
                      {initialStats.activeStudents}
                    </div>
                    <p className="text-[11px] text-slate-500">Terdaftar di 4 program kursus</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold">Pendaftar Trial Baru</span>
                      <span className="text-[10px] font-bold text-[#049788] bg-[#EBF8F6] px-2 py-0.5 rounded-full">
                        {initialStats.trialLeadsGrowth}
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#049788]">
                      {leads.length}
                    </div>
                    <p className="text-[11px] text-slate-500">Konversi rata-rata {initialStats.conversionRate}</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold">Sesi Hari Ini</span>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        14 Live
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-950">
                      {initialStats.sessionsToday}
                    </div>
                    <p className="text-[11px] text-slate-500">32 Pengajar siaga online</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold">Pendapatan (Bln Ini)</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {initialStats.revenueGrowth}
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-950 truncate">
                      Rp 78,4 Jt
                    </div>
                    <p className="text-[11px] text-slate-500">92% dari target bulan ini</p>
                  </div>
                </div>

                {/* Grid 2-Kolom: Live Sessions Now & Recent Trial Applications */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left: Sesi Belajar Berjalan Sekarang (7 cols) */}
                  <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-950">
                          Sesi Kelas Live & Mendatang Hari Ini
                        </h3>
                        <p className="text-xs text-slate-500">Monitoring ruang kelas video call Google Meet / Zoom</p>
                      </div>
                      <button
                        onClick={() => setActiveTab("schedule")}
                        className="text-xs font-bold text-[#049788] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Selengkapnya</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {initialSchedule.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  item.status === "Live Sekarang"
                                    ? "bg-emerald-100 text-emerald-700 animate-pulse"
                                    : "bg-slate-200 text-slate-700"
                                }`}
                              >
                                {item.status}
                              </span>
                              <span className="text-xs text-slate-500 font-mono">{item.time}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-950">{item.student}</h4>
                            <p className="text-xs text-slate-600">
                              Guru: <span className="font-semibold text-slate-800">{item.tutor}</span> • {item.program}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 sm:self-center">
                            <a
                              href={item.roomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Masuk Kelas</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Funnel Pendaftar Trial Terbaru (5 cols) */}
                  <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-black text-slate-950">Leads Trial Terbaru</h3>
                        <p className="text-xs text-slate-500">Pendaftar yang memerlukan tindak lanjut</p>
                      </div>
                      <span className="text-xs font-bold text-[#049788] bg-[#EBF8F6] px-2.5 py-1 rounded-full">
                        {leads.length} Permohonan
                      </span>
                    </div>

                    <div className="space-y-3">
                      {leads.slice(0, 4).map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-[#EBF8F6]/40 hover:border-[#049788]/30 transition-all cursor-pointer space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-950">{lead.name}</h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                                lead.status === "baru"
                                  ? "bg-red-50 text-red-600 border border-red-200"
                                  : lead.status === "dihubungi"
                                  ? "bg-sky-50 text-sky-700 border border-sky-200"
                                  : lead.status === "terjadwal"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              }`}
                            >
                              {lead.status.replace("_", " ")}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>{lead.program}</span>
                            <span>{lead.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTab("leads")}
                      className="w-full py-2.5 text-xs font-bold text-[#049788] bg-[#EBF8F6] hover:bg-[#d4f2ec] rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Buka Pipeline Trial Lengkap ({leads.length})
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* ================= TAB 2: TRIAL LEADS (KODLAND FUNNEL STYLE) ================= */}
            {activeTab === "leads" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Control bar */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-72">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Cari nama, WhatsApp, ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#049788]"
                      />
                    </div>

                    <select
                      value={leadStatusFilter}
                      onChange={(e) => setLeadStatusFilter(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:border-[#049788]"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="baru">Baru Masuk</option>
                      <option value="dihubungi">Sudah Dihubungi</option>
                      <option value="terjadwal">Trial Terjadwal</option>
                      <option value="selesai_trial">Selesai Trial</option>
                      <option value="konversi">Konversi Lunas</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setNewLeadModalOpen(true)}
                    className="w-full sm:w-auto px-4 py-2 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Lead Manual</span>
                  </button>
                </div>

                {/* Table Leads */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4">Calon Santri</th>
                          <th className="py-3.5 px-4">Program & Preferensi</th>
                          <th className="py-3.5 px-4">Slot Jadwal</th>
                          <th className="py-3.5 px-4">Status Pipeline</th>
                          <th className="py-3.5 px-4 text-right">Aksi Tindak Lanjut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-950">{item.name}</div>
                              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                                <span>{item.phone}</span>
                                <span>•</span>
                                <span>{item.id}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-800">{item.program}</div>
                              <div className="text-[11px] text-[#049788] font-medium">
                                Guru: {item.tutorPref}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-medium">
                              {item.slot}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
                                  item.status === "baru"
                                    ? "bg-red-50 text-red-600 border border-red-200"
                                    : item.status === "dihubungi"
                                    ? "bg-sky-50 text-sky-700 border border-sky-200"
                                    : item.status === "terjadwal"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                }`}
                              >
                                {item.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`https://wa.me/${item.phone.replace(/^0/, "62")}?text=${encodeURIComponent(
                                    `Halo ${item.name}, salam dari Admin NgajiQ terkait permohonan kelas percobaan.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                  title="Chat WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => setSelectedLead(item)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                                >
                                  Kelola
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

            {/* ================= TAB 3: DATABASE SANTRI ================= */}
            {activeTab === "students" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-72">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Cari santri, guru, ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#049788]"
                      />
                    </div>

                    <select
                      value={programFilter}
                      onChange={(e) => setProgramFilter(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:border-[#049788]"
                    >
                      <option value="Semua">Semua Program</option>
                      <option value="Al-Qur'an">Al-Qur'an</option>
                      <option value="Tahsin">Tahsin & Tajwid</option>
                      <option value="Fiqih">Fiqih</option>
                      <option value="Nahwu">Nahwu Shorof</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert("Mengekspor data santri ke format CSV...")}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4">Santri</th>
                          <th className="py-3.5 px-4">Program & Level</th>
                          <th className="py-3.5 px-4">Guru Pembimbing</th>
                          <th className="py-3.5 px-4">Progres Sesi</th>
                          <th className="py-3.5 px-4">Kehadiran</th>
                          <th className="py-3.5 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-950">{st.name}</div>
                              <div className="text-[11px] text-slate-500">{st.id} • {st.package}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-800">{st.program}</div>
                              <div className="text-[11px] text-[#049788] font-bold">{st.level}</div>
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-800">
                              {st.tutor}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{st.completedSessions}/{st.totalSessions}</span>
                                <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="bg-[#049788] h-full rounded-full"
                                    style={{ width: `${(st.completedSessions / st.totalSessions) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-emerald-600">
                              {st.attendance}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                  st.status === "Aktif"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : st.status === "Hampir Selesai"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {st.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 4: DATA GURU & SANAD ================= */}
            {activeTab === "tutors" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tutors.map((tr) => (
                    <div
                      key={tr.id}
                      className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              tr.status.includes("Live") || tr.status.includes("Mengajar")
                                ? "bg-emerald-100 text-emerald-700 animate-pulse"
                                : "bg-[#EBF8F6] text-[#049788]"
                            }`}
                          >
                            {tr.status}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{tr.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-base font-black text-slate-950">{tr.name}</h3>
                        <p className="text-xs text-[#049788] font-semibold">{tr.specialty}</p>

                        <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
                          <span className="text-slate-500 block text-[11px]">Sanad Keilmuan:</span>
                          <span className="font-bold text-slate-900 block">{tr.sanad}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[11px]">Santri Binaan:</span>
                          <span className="font-bold text-slate-900">{tr.activeStudents} Santri Aktif</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">Jam Bulan Ini:</span>
                          <span className="font-bold text-slate-900">{tr.hoursThisMonth}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 5: JADWAL & RUANG KELAS ================= */}
            {activeTab === "schedule" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-950">Jadwal Sesi Pembelajaran Real-Time</h2>
                      <p className="text-xs text-slate-500">Daftar kelas privat online hari ini di seluruh pengajar</p>
                    </div>
                    <button
                      onClick={() => alert("Membuka form penugasan jadwal baru...")}
                      className="px-4 py-2 bg-[#049788] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer w-fit"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Jadwalkan Sesi Baru</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {initialSchedule.map((s) => (
                      <div
                        key={s.id}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                                s.status === "Live Sekarang"
                                  ? "bg-emerald-100 text-emerald-800 animate-pulse font-bold"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {s.status}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#049788]">{s.time}</span>
                            <span className="text-xs text-slate-400">• {s.platform}</span>
                          </div>
                          <h4 className="text-sm sm:text-base font-black text-slate-950">{s.student}</h4>
                          <p className="text-xs text-slate-600">
                            Guru: <strong className="text-slate-900">{s.tutor}</strong> — {s.program}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={s.roomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Buka Room Kelas</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 6: KEUANGAN & TRANSAKSI ================= */}
            {activeTab === "finance" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Total Omset Bulan Ini</span>
                    <div className="text-2xl font-black text-slate-950">Rp 78.450.000</div>
                    <span className="text-xs text-emerald-600 font-bold">+15.8% dari bulan lalu</span>
                  </div>
                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Transaksi Berhasil</span>
                    <div className="text-2xl font-black text-emerald-600">184 Transaksi</div>
                    <span className="text-xs text-slate-500">Rata-rata tiket Rp 426.000</span>
                  </div>
                  <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Menunggu Konfirmasi</span>
                    <div className="text-2xl font-black text-amber-600">1 Menunggu</div>
                    <span className="text-xs text-slate-500">Butuh verifikasi manual</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-950">Riwayat Transaksi Langganan</h3>
                    <span className="text-xs text-slate-500">Diperbarui otomatis secara real-time</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4">Invoice / Santri</th>
                          <th className="py-3.5 px-4">Paket Langganan</th>
                          <th className="py-3.5 px-4">Metode Bayar</th>
                          <th className="py-3.5 px-4">Nominal</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-950">{tx.student}</div>
                              <div className="text-[11px] text-slate-500">{tx.id} • {tx.date}</div>
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-800">{tx.package}</td>
                            <td className="py-3.5 px-4 text-slate-600">{tx.method}</td>
                            <td className="py-3.5 px-4 font-black text-slate-950">{tx.amount}</td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                  tx.status === "Lunas"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                }`}
                              >
                                {tx.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              {tx.status === "Menunggu Verifikasi" ? (
                                <button
                                  onClick={() => handleVerifyTransaction(tx.id)}
                                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
                                >
                                  Verifikasi
                                </button>
                              ) : (
                                <span className="text-xs text-slate-400">Terverifikasi</span>
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

            {/* ================= TAB 7: RAPOR & EVALUASI SANTRI ================= */}
            {activeTab === "reports" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-950">Generator Rapor Akademik Santri</h2>
                      <p className="text-xs text-slate-500">Format standar evaluasi tajwid, fashahah, dan capaian hafalan</p>
                    </div>
                    <button
                      onClick={() => alert("Mengunduh template rapor resmi NgajiQ (PDF)...")}
                      className="px-4 py-2 bg-[#049788] hover:bg-[#038073] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Template Rapor</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-600 leading-relaxed">
                    Setiap santri berhak menerima Laporan Hasil Belajar (LHB) per 8 sesi yang mencakup penilaian Makharijul Huruf, Shifatul Huruf, Ahkamul Madd, dan adab tilawah.
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
