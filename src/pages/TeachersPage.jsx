import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Award,
  Calendar,
  UserCheck,
  HeartHandshake,
  Compass,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const teacherCategories = [
  {
    name: "Pengajar Tahsin & Tajwid Al-Qur'an",
    description: "Bimbingan makharijul huruf, sifat huruf, dan kaidah tajwid bersanad.",
    teachers: [
      {
        id: 1,
        number: "001",
        name: "Ustazah Syaimaa'",
        role: "Pengajar Tahsin & Tajwid",
        avatar: "/teachers/teacher-1.png",
        image: "/teachers/teacher-1.png",
        experience: "8+ Tahun Pengalaman",
        credential: "Sanad Matn Jazariyyah",
        bio: "Lulusan studi Islam dengan sanad tajwid Matn Al-Jazariyyah. Berpengalaman lebih dari 8 tahun mengajar talaqqi privat untuk santri dewasa dan muslimah dari berbagai latar belakang profesi.",
        rating: 5.0,
        reviews: 342,
        tag: "Tahsin Bersanad",
        programs: ["Kelas Tahsin Reguler", "Kelas Privat 1-on-1", "Bimbingan Tartil"],
        schedule: "Senin - Sabtu (Pagi & Malam)",
      },
      {
        id: 4,
        number: "004",
        name: "Ustadz Ahmad Fauzi",
        role: "Pengajar Tartil & Fashahah",
        avatar: "/teachers/teacher-4.png",
        image: "/teachers/teacher-4.png",
        experience: "7+ Tahun Pengalaman",
        credential: "Sanad Riwayat Hafsh 'an 'Ashim",
        bio: "Pemegang sanad qira'ah riwayat Hafsh 'an 'Ashim jalur Syathibiyyah. Telah mengajar ribuan jam sesi talaqqi untuk profesional, mahasiswa, dan orang tua.",
        rating: 5.0,
        reviews: 310,
        tag: "Tartil & Makhraj",
        programs: ["Kelas Intensif Privat", "Tahsin Lanjutan", "Persiapan Imam Shalat"],
        schedule: "Senin - Jumat (Subuh & Malam)",
      },
    ],
  },
  {
    name: "Pengajar Tilawah & Tahfidz Quran",
    description: "Pendampingan hafalan surat pilihan dan muraja'ah dengan target personal.",
    teachers: [
      {
        id: 2,
        number: "002",
        name: "Ustazah Hanifah",
        role: "Pengajar Tilawah & Tahfidz",
        avatar: "/teachers/teacher-2.png",
        image: "/teachers/teacher-2.png",
        experience: "10+ Tahun Pengalaman",
        credential: "Hafidzah 30 Juz Bersanad",
        bio: "Hafidzah 30 Juz bersanad muttashil. Telah meluluskan ratusan santri tahfidz anak, remaja, dan dewasa dengan metode setor hafalan yang ramah dan konsisten.",
        rating: 5.0,
        reviews: 487,
        tag: "Hafidzah 30 Juz",
        programs: ["Program Tahfidz Juz 30", "Tilawah Tartil", "Kelas Anak & Remaja"],
        schedule: "Selasa - Ahad (Sore & Malam)",
      },
    ],
  },
  {
    name: "Pengajar Iqro & Pemula Dewasa",
    description: "Pembelajaran mengaji ramah dari nol mutlak bagi santri tanpa rasa canggung.",
    teachers: [
      {
        id: 3,
        number: "003",
        name: "Ustazah Asyiqin",
        role: "Pengajar Iqro & Pemula",
        avatar: "/teachers/teacher-3.png",
        image: "/teachers/teacher-3.png",
        experience: "6+ Tahun Pengalaman",
        credential: "Spesialis Bimbingan Sabar Dari Nol",
        bio: "Berfokus mendampingi santri pemula yang baru mengenal huruf hijaiyah. Pendekatan pengajaran sangat sabar, ramah, dan bebas dari rasa malu.",
        rating: 4.9,
        reviews: 285,
        tag: "Khusus Pemula",
        programs: ["Paket Iqro Dasar", "Bimbingan Nol Mutlak", "Kelas Privat Santai"],
        schedule: "Setiap Hari (Fleksibel 24/7)",
      },
    ],
  },
];

const teacherAdvantages = [
  {
    icon: UserCheck,
    title: "Guru Berpengalaman",
    description:
      "Didampingi pengajar dan ustadz/ustadzah tersertifikasi yang memahami kebutuhan belajar Al-Qur'an santri.",
    theme: "bg-[#EBF8F6] text-[#049788] border-[#C8EDE9]",
  },
  {
    icon: HeartHandshake,
    title: "Pendekatan Personal",
    description:
      "Pembelajaran 1-on-1 disesuaikan dengan ritme kemampuan, kenyamanan, dan perkembangan setiap santri.",
    theme: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    icon: Compass,
    title: "Metode Terarah",
    description:
      "Materi disusun bertahap dari pengenalan makhraj hingga tartil agar proses belajar mudah dipahami.",
    theme: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    icon: TrendingUp,
    title: "Pendampingan Berkelanjutan",
    description:
      "Guru membantu memantau perkembangan belajar secara konsisten melalui catatan evaluasi di setiap sesi.",
    theme: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export default function TeachersPage({ onOpenModal }) {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToDaftar = () => {
    const el = document.getElementById("daftar-guru");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#FBFBFC]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#E8F7F5] via-[#F3FAF8] to-[#FBFBFC] border-b border-slate-200/80 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#049788]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#049788]">
              GURU PENGAJAR NGAJIQ
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
              Belajar Bersama Guru <br className="hidden sm:inline" />
              yang <span className="text-[#049788]">Berpengalaman</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Kenali ustadz dan ustadzah NgajiQ yang siap mendampingi perjalanan belajar Al-Qur'an dengan metode yang nyaman, terarah, dan sesuai kebutuhanmu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={scrollToDaftar}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-[#049788] hover:bg-[#038073] active:scale-[0.99] rounded-xl shadow-lg shadow-[#049788]/25 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#049788]"
              >
                <span>Lihat Guru</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenModal && onOpenModal("Hero Guru Pengajar")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 bg-white/90 hover:bg-white border border-slate-200/90 rounded-xl transition-all shadow-2xs"
              >
                <span>Mulai Belajar</span>
              </button>
            </div>

            {/* Social proof bullet */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span>
                <strong>100% Guru Tersertifikasi</strong> & Bersanad Riwayat Hafsh 'an 'Ashim
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION DAFTAR GURU (TEAM SECTION PATTERN) */}
      <section id="daftar-guru" className="py-12 md:py-24 border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          
          <div className="mb-10 sm:mb-14">
            <h2 className="mb-3 text-3xl sm:text-4xl font-black text-slate-950 tracking-tight lg:text-5xl">
              Guru Pengajar Kami
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Guru berpengalaman yang siap mendampingi proses belajar mengaji secara bertahap.
            </p>
          </div>

          {/* Categorized Teacher Rows */}
          <div className="space-y-12 sm:space-y-14">
            {teacherCategories.map((group, groupIndex) => (
              <motion.div
                key={group.name}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: groupIndex * 0.08 }}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950">
                      {group.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-2 gap-6 sm:gap-8 border-t border-slate-200 py-6 sm:py-8 md:grid-cols-4">
                  {group.teachers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => setSelectedTeacher(member)}
                      className="group cursor-pointer text-left focus:outline-hidden"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedTeacher(member);
                        }
                      }}
                    >
                      {/* Avatar Circle */}
                      <div className="bg-white size-20 sm:size-24 rounded-full border border-slate-200 p-0.5 shadow-sm shadow-zinc-950/5 group-hover:border-[#049788] group-hover:shadow-md transition-all duration-300">
                        <img
                          className="aspect-square rounded-full object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 bg-slate-100"
                          src={member.avatar}
                          alt={member.name}
                          height="460"
                          width="460"
                          loading="lazy"
                        />
                      </div>

                      {/* Name & Role */}
                      <span className="mt-3 block text-sm sm:text-base font-bold text-slate-950 group-hover:text-[#049788] transition-colors leading-snug">
                        {member.name}
                      </span>
                      <span className="text-slate-500 block text-xs font-medium mt-0.5">
                        {member.role}
                      </span>
                      
                      {/* Experience & Action Hint */}
                      <span className="text-[#049788] block text-xs font-semibold mt-1 flex items-center gap-1">
                        <span>{member.experience}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. SECTION KEUNGGULAN GURU */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Kenapa Belajar Bersama Guru NgajiQ?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Standar kompetensi tinggi dan komitmen pendampingan bimbingan yang tulus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {teacherAdvantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200/90 bg-[#FBFBFC] hover:bg-white shadow-2xs hover:shadow-md transition-all duration-300"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 border", adv.theme)}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-950 mb-1.5">
                    {adv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            Siap Mulai Belajar Bersama <br className="hidden sm:inline" />
            <span className="text-[#3FB3A6]">Guru NgajiQ?</span>
          </h2>

          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Pilih program yang sesuai dan mulai perjalanan belajar Al-Qur'an bersama guru pilihanmu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onOpenModal && onOpenModal("CTA Guru Pengajar")}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] font-bold rounded-xl text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#049788]/30"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenModal && onOpenModal("Trial Class Guru")}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 font-semibold rounded-xl text-sm text-slate-200 transition-colors"
            >
              <span>Coba Kelas Percobaan</span>
            </button>
          </div>
        </div>
      </section>

      {/* TEACHER DETAIL MODAL */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 my-8 space-y-5"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup profil"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Profile Summary */}
            <div className="flex items-center gap-4">
              <div className="size-20 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shrink-0 p-0.5">
                <img
                  src={selectedTeacher.avatar || selectedTeacher.image}
                  alt={selectedTeacher.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="space-y-0.5 min-w-0">
                <span className="text-xs font-bold text-[#049788] uppercase tracking-wider block">
                  {selectedTeacher.tag}
                </span>
                <h3 className="text-xl font-black text-slate-950 truncate">
                  {selectedTeacher.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium truncate">
                  {selectedTeacher.role}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                  <span className="text-[#049788] font-semibold">{selectedTeacher.experience}</span>
                  <span>•</span>
                  <span className="text-amber-600 font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500" />
                    {selectedTeacher.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
              <div>
                <h4 className="font-bold text-slate-950 mb-1">Profil Pengajar:</h4>
                <p className="text-slate-600">{selectedTeacher.bio || selectedTeacher.description}</p>
              </div>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#049788] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Sertifikasi & Sanad:</span>
                    <span className="text-slate-600 text-xs">{selectedTeacher.credential}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#049788] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Jadwal Belajar:</span>
                    <span className="text-slate-600 text-xs">{selectedTeacher.schedule || "Fleksibel 24/7"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-950 mb-1.5">Program yang Diajarkan:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTeacher.programs?.map((prog, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#EBF8F6] text-[#049788] border border-[#C8EDE9] rounded-lg text-xs font-semibold"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Garansi 100% kecocokan bimbingan guru.
              </span>
              <button
                onClick={() => {
                  setSelectedTeacher(null);
                  if (onOpenModal) onOpenModal(`Pilih Guru: ${selectedTeacher.name}`);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#049788]/25"
              >
                <span>Pilih Guru Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
