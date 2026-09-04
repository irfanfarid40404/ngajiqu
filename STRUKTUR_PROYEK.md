# 📖 Panduan Struktur Folder & Arsitektur Proyek NgajiQ

Dokumen ini dibuat untuk memudahkan Anda memahami susunan file dan folder di dalam proyek **NgajiQ**, sehingga proses pengembangan, perbaikan, atau penambahan fitur baru dapat dilakukan dengan cepat dan rapi.

---

## 📁 Peta Struktur Direktori (`src/`)

```
ngajiku/
├── public/                     # Gambar statis, favicon, logo, dan foto tutor
├── src/
│   ├── assets/                 # Aset grafik lokal tambahan
│   │
│   ├── components/             # Komponen UI modular (Reusable Components)
│   │   ├── layout/             # Komponen tata letak global (Header, Footer, Floating CTA)
│   │   │   ├── Navbar.jsx          # Navigasi atas + jadwal sholat + menu dropdown
│   │   │   ├── Footer.jsx          # Kaki halaman + tautan navigasi + info legal
│   │   │   └── FloatingWhatsApp.jsx # Tombol mengambang chat WhatsApp admin
│   │   │
│   │   ├── modals/             # Jendela popup / dialog interaktif
│   │   │   ├── RegisterModal.jsx   # Modal pendaftaran cepat paket belajar
│   │   │   └── TrialPromoModal.jsx # Modal promo trial / kupon diskon
│   │   │
│   │   ├── sections/           # Potongan section yang membentuk Halaman Beranda (Home)
│   │   │   ├── Hero.jsx            # Bagian utama atas (Banner Hero + headline tartil)
│   │   │   ├── StatsBar.jsx        # Baris statistik santri, ustadz, dan kepuasan
│   │   │   ├── WhyNgajikuSection.jsx # 3D Card keunggulan & diferensiasi belajar
│   │   │   ├── BentoLearningSection.jsx # Bento grid jenjang usia (Anak, Remaja, Dewasa)
│   │   │   ├── TeachersSection.jsx # Carousel cuplikan profil asatidz bersanad
│   │   │   ├── HowItWorksSection.jsx # 4 langkah mudah alur belajar mengaji
│   │   │   ├── GallerySection.jsx  # Galeri foto kegiatan interaktif
│   │   │   ├── PromoSection.jsx    # Promo flash sale & garansi belajar
│   │   │   ├── PricingSection.jsx  # Tabel pilihan paket harga & durasi
│   │   │   ├── TestimonialSection.jsx # Ulasan & testimoni santri/wali
│   │   │   ├── ArticlesSection.jsx # Cuplikan artikel & panduan mengaji
│   │   │   ├── FaqSection.jsx      # Tanya jawab seputar bimbingan (FAQ)
│   │   │   └── CtaSection.jsx      # Banner ajakan penutup sebelum footer
│   │   │
│   │   └── ui/                 # Komponen atomik / desain sistem (Shadcn & Tailwind UI)
│   │       ├── blog-post-card.jsx
│   │       ├── button.jsx
│   │       ├── card-3d.jsx
│   │       ├── feature-steps.jsx
│   │       ├── gradient-card.jsx
│   │       ├── interactive-bento-gallery.jsx
│   │       └── services-card.jsx
│   │
│   ├── data/                   # Sumber data statis & konfigurasi terpusat
│   │   └── content.js          # Pengaturan nomor WA, paket harga, FAQ, asatidz, dll.
│   │
│   ├── lib/                    # Fungsi bantuan (utility functions)
│   │   └── utils.js            # Helper class merge (`cn()` untuk Tailwind)
│   │
│   ├── pages/                  # Halaman mandiri penuh (Full-Page Views)
│   │   ├── AdminDashboard.jsx  # Dashboard Operasional Admin & Manajemen Sistem
│   │   ├── ClientDashboard.jsx # Dashboard Belajar Santri (Area LMS Santri)
│   │   ├── QuranCoursePage.jsx # Halaman Detail Kursus Al-Qur'an (Tahsin & Tajwid)
│   │   ├── FiqihCoursePage.jsx # Halaman Detail Kursus Fiqih Ibadah & Muamalah
│   │   ├── NahwuShorofCoursePage.jsx # Halaman Detail Kursus Bahasa Arab & Kaidah
│   │   ├── BlogPage.jsx        # Halaman Pusat Artikel, Berita & Panduan Agama
│   │   ├── RegisterPage.jsx    # Halaman Formulir Pendaftaran Kelas Lengkap
│   │   └── TeachersPage.jsx    # Halaman Direktori Profil Pengajar & Sanad Keilmuan
│   │
│   ├── App.jsx                 # Router utama & pengatur alur halaman
│   ├── index.css               # Definisi styling global Tailwind CSS v4
│   └── main.jsx                # Titik masuk utama aplikasi React (Root Entry)
│
├── package.json                # Daftar pustaka & dependensi proyek
└── vite.config.js              # Konfigurasi bundler Vite (alias '@' -> '/src')
```

---

## 🗺️ Panduan Rute & Navigasi (URL Mapping)

| URL Halaman | File yang Ditampilkan | Deskripsi |
| :--- | :--- | :--- |
| `/` | `App.jsx` + `src/components/sections/*` | Landing page utama bimbingan mengaji |
| `/admin` atau `/admin-dashboard` | `src/pages/AdminDashboard.jsx` | Panel manajemen operasional super admin |
| `/dashboard` atau `/santri` | `src/pages/ClientDashboard.jsx` | Portal LMS santri & orang tua |
| `/kursus/alquran` | `src/pages/QuranCoursePage.jsx` | Halaman paket kursus Al-Qur'an |
| `/kursus/fiqih` | `src/pages/FiqihCoursePage.jsx` | Halaman paket kursus Fiqih |
| `/kursus/nahwu-shorof` | `src/pages/NahwuShorofCoursePage.jsx` | Halaman paket kursus Nahwu & Shorof |
| `/guru-pengajar` | `src/pages/TeachersPage.jsx` | Profil asatidz dan sanad keilmuan |
| `/blog` atau `/artikel` | `src/pages/BlogPage.jsx` | Halaman blog dan edukasi mengaji |
| `/daftar` atau `/daftar-kelas` | `src/pages/RegisterPage.jsx` | Formulir pendaftaran calon santri |

---

## 💡 Petunjuk Cepat Jika Ingin Melakukan Perubahan

1. **Mengubah Nomor WhatsApp atau Data Umum**:
   - Buka file `src/data/content.js`. Semua nomor admin, teks pesan WhatsApp standar, daftar paket harga, dan FAQ tersimpan rapi di file ini.
2. **Mengubah Tampilan Halaman Tertentu**:
   - Cari file halaman terkait di dalam folder `src/pages/`.
3. **Mengubah Komponen Bagian Beranda**:
   - Cari section terkait di dalam folder `src/components/sections/` (misalnya hero di `Hero.jsx`, harga di `PricingSection.jsx`, dll.).
4. **Mengubah Header Atas atau Footer**:
   - Buka file di folder `src/components/layout/Navbar.jsx` atau `Footer.jsx`.

