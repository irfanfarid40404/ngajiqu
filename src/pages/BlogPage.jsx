import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Sparkles,
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/data/content";

const allBlogArticles = [
  {
    id: 1,
    tag: "Panduan Pemula",
    date: "28 Februari 2026",
    readTime: "4 Menit Baca",
    author: "Ustadz H. Ahmad Fauzi, Lc.",
    authorRole: "Pengajar Tahsin & Sanad Qiraat",
    title: "5 Cara Mengatasi Rasa Canggung & Malu Belajar Mengaji di Usia Dewasa",
    description:
      "Banyak santri dewasa merasa terlambat untuk memulai dari Iqro. Temukan tips psikologis dan keistimewaan metode privat 1-on-1 yang ramah dan suportif.",
    imageUrl: "/teachers-banner.jpg",
    featured: true,
    takeaways: [
      "Menuntut ilmu Al-Qur'an tidak pernah mengenal batasan usia.",
      "Kelas privat 1-on-1 menjamin privasi penuh tanpa rasa malu dinilai orang lain.",
      "Kunci konsistensi adalah memulai dari 15 menit per hari.",
    ],
    content: [
      {
        heading: "1. Mengubah Pola Pikir: Belajar Al-Qur'an Adalah Kemuliaan, Bukan Aib",
        text: "Banyak orang dewasa yang berniat memperbaiki bacaan Al-Qur'an namun terhenti karena rasa malu atau sungkan ketika harus memulai dari jilid awal Iqro. Padahal dalam hadits riwayat Bukhari dan Muslim, Rasulullah SAW menegaskan bahwa orang yang terbata-bata membaca Al-Qur'an dan merasa kesulitan akan mendapatkan dua pahala: pahala membacanya dan pahala atas kesungguhannya.",
      },
      {
        heading: "2. Memilih Ruang Belajar Privat 1-on-1 Tanpa Tekanan",
        text: "Belajar di kelas umum sering kali membuat santri dewasa merasa tidak percaya diri saat salah melafalkan makhraj huruf. Dengan bimbingan privat 1-on-1, interaksi hanya terjadi antara santri dan ustadz. Guru dapat menyesuaikan tempo pembelajaran secara sabar sesuai ritme masing-masing santri.",
      },
      {
        heading: "3. Tentukan Target Ringkas namun Konsisten Harian",
        text: "Alih-alih langsung menargetkan membaca satu juz per hari, mulailah dengan komitmen 15 menit setiap ba'da Maghrib atau sebelum Subuh. Keberkahan Al-Qur'an lahir dari keistiqamahan mengulang huruf demi huruf.",
      },
      {
        heading: "4. Fokus pada Proses Perbaikan, Bukan Kesempurnaan Instan",
        text: "Koreksi makhraj lidah dan tenggorokan membutuhkan waktu adaptasi otot artikulasi (lisan). Terimalah setiap koreksi dari guru sebagai hadiah yang menyempurnakan ibadah shalat kita setiap hari.",
      },
      {
        heading: "5. Manfaatkan Rekaman Pembelajaran untuk Evaluasi Mandiri",
        text: "Di NgajiQ, setiap sesi kelas privat dilengkapi rekaman audio dan evaluasi harian. Dengarkan kembali bacaan Anda di waktu luang untuk mempercepat kelancaran artikulasi.",
      },
    ],
  },
  {
    id: 2,
    tag: "Ilmu Tajwid",
    date: "24 Februari 2026",
    readTime: "6 Menit Baca",
    author: "Ustadzah Fatimah Azzahra, M.Ag.",
    authorRole: "Pakar Tajwid & Qari'ah Nasional",
    title: "Mengenal 5 Tempat Keluarnya Huruf (Makharijul Huruf) yang Wajib Diketahui",
    description:
      "Panduan ringkas memahami rongga mulut, tenggorokan, lidah, dua bibir, dan hidung agar bacaan Al-Qur'an sesuai kaidah tartil.",
    imageUrl: "/persona-office.jpg",
    featured: false,
    takeaways: [
      "Makharijul huruf terbagi menjadi 5 kategori utama dengan 17 titik spesifik.",
      "Kesalahan makraj dapat mengubah arti kata dalam ayat Al-Qur'an.",
      "Metode talaqqi tatap muka live adalah cara paling presisi membenahi makhraj.",
    ],
    content: [
      {
        heading: "Mengapa Makharijul Huruf Sangat Krusial?",
        text: "Makharijul huruf adalah fondasi paling awal dalam ilmu tajwid. Tanpa ketepatan makraj, huruf-huruf yang mirip seperti 'Ain (ع) dan Hamzah (ء), atau Ha (ح) dan Kha (خ) dapat tertukar dan mengubah arti firman Allah secara fatal.",
      },
      {
        heading: "Lima Tempat Keluarnya Huruf:",
        text: "1. Al-Jauf (Rongga Mulut & Tenggorokan): Tempat keluarnya huruf-huruf Mad (Alif, Wawu, Ya).\n2. Al-Halq (Tenggorokan): Terbagi menjadi pangkal, tengah, dan ujung tenggorokan (Hamzah, Ha', 'Ain, Ha, Ghoin, Kho).\n3. Al-Lisan (Lidah): Area paling luas yang mencakup 10 makraj untuk 18 huruf.\n4. Asy-Syafatain (Kedua Bibir): Tempat keluarnya huruf Fa, Wawu, Ba, dan Mim.\n5. Al-Khaisyum (Pangkal Hidung): Tempat keluarnya suara dengung (ghunnah).",
      },
      {
        heading: "Tips Melatih Otot Makhraj di Rumah",
        text: "Ucapkan huruf dalam keadaan sukun didahului hamzah berharakat fathah (misal: أَحْ, أَعْ, أَشْ) dan rasakan titik sentuh lidah atau gesekan udara pada tenggorokan Anda.",
      },
    ],
  },
  {
    id: 3,
    tag: "Tahfidz & Adab",
    date: "18 Februari 2026",
    readTime: "5 Menit Baca",
    author: "Ustadz Dr. Muhammad Zaki, M.Pd.I",
    authorRole: "Direktur Akademik & Pembina Tahfidz",
    title: "Panduan Waktu Terbaik untuk Muraja'ah dan Menghafal Al-Qur'an di Rumah",
    description:
      "Mengapa waktu setelah Subuh dan sebelum tidur sangat efektif untuk menguatkan ingatan hafalan ayat Al-Qur'an bagi anak maupun orang dewasa.",
    imageUrl: "/persona-family.jpg",
    featured: false,
    takeaways: [
      "Kondisi otak paling prima untuk hafalan baru adalah 60 menit pasca shalat Subuh.",
      "Muraja'ah sebelum tidur memindahkan memori jangka pendek menjadi memori permanen.",
      "Gunakan satu jenis mushaf fisik/digital yang konsisten agar letak baris terekam di ingatan visual.",
    ],
    content: [
      {
        heading: "1. Mengoptimalkan Gelombang Otak di Waktu Fajar",
        text: "Setelah istirahat malam dan shalat Subuh, gelombang otak berada pada frekuensi Alpha yang sangat reseptif terhadap informasi baru. Menghafal 3 hingga 5 baris ayat baru di waktu ini memiliki tingkat retensi 3x lipat dibanding waktu siang.",
      },
      {
        heading: "2. Hukum Konsistensi Mushaf (Visual Memory)",
        text: "Otak manusia merekam letak ayat di pojok atas, tengah, atau bawah halaman mushaf. Jangan sering berganti jenis mushaf dengan tata letak berbeda agar memori visual hafalan tidak terdistorsi.",
      },
      {
        heading: "3. Praktik Muraja'ah dalam Shalat Sunnah",
        text: "Ujilah hafalan yang baru Anda setorkan kepada guru dengan membacanya saat shalat sunnah Rawatib atau shalat Tahajjud di malam hari.",
      },
    ],
  },
  {
    id: 4,
    tag: "Keluarga & Anak",
    date: "12 Februari 2026",
    readTime: "4 Menit Baca",
    author: "Ustadzah Hanifah, S.Hum.",
    authorRole: "Pendidik Anak Usia Dini Qur'ani",
    title: "Menumbuhkan Cinta Al-Qur'an pada Anak Sejak Usia Dini Tanpa Paksaan",
    description:
      "Strategi praktis bagi orang tua dalam membangun kebiasaan mengaji harian yang menyenangkan dan penuh kehangatan bersama ananda.",
    imageUrl: "/persona-bride.jpg",
    featured: false,
    takeaways: [
      "Teladan orang tua jauh lebih berpengaruh daripada sekadar perintah verbal.",
      "Gunakan pendekatan gamifikasi dan apresiasi atas setiap huruf yang dipelajari.",
      "Pastikan durasi belajar anak tidak melebihi rentang fokus usianya (15–25 menit).",
    ],
    content: [
      {
        heading: "Menciptakan Lingkungan Rumah yang Penuh Lantunan Qur'an",
        text: "Anak-anak adalah peniru ulung. Saat anak melihat orang tuanya rutin membuka mushaf ba'da Maghrib, rasa ingin tahu dan ketertarikan mereka akan tumbuh secara alami tanpa perlu dipaksa dengan nada tinggi.",
      },
      {
        heading: "Metode Belajar Sambil Bermain",
        text: "Gunakan kartu flashcard hijaiyah warna-warni, kuis tebak suara huruf, atau mini-game interaktif. Berikan pujian hangat saat anak berhasil menyelesaikan satu baris bacaan dengan benar.",
      },
      {
        heading: "Pentingnya Guru Mengaji yang Ramah dan Komunikatif",
        text: "Kesan pertama anak terhadap guru mengaji sangat menentukan kecintaan mereka pada Al-Qur'an. Guru yang sabar, ceria, dan penuh senyum akan membuat anak selalu menantikan jam belajarnya.",
      },
    ],
  },
  {
    id: 5,
    tag: "Ilmu Tajwid",
    date: "5 Februari 2026",
    readTime: "5 Menit Baca",
    author: "Ustadz H. Abdul Malik, Lc.",
    authorRole: "Tutor Senior Al-Qur'an & Sanad Jazariyah",
    title: "Memahami 4 Hukum Nun Sukun & Tanwin dengan Contoh Ayat Praktis",
    description:
      "Penjelasan komprehensif Idzhar, Idgham, Iqlab, dan Ikhfa' lengkap dengan cara pelafalan yang benar dan kesalahan umum yang sering terjadi.",
    imageUrl: "/hero-tutor.jpg",
    featured: false,
    takeaways: [
      "Idzhar dibaca jelas tanpa dengung pada 6 huruf tenggorokan.",
      "Idgham terbagi dua: Bighunnah (dengan dengung) dan Bilaghunnah (tanpa dengung).",
      "Iqlab mengubah suara nun menjadi mim sukun dengan dengung 2 harakat.",
    ],
    content: [
      {
        heading: "1. Idzhar Halqi (Jelas & Terang)",
        text: "Terjadi ketika Nun Sukun atau Tanwin bertemu salah satu huruf tenggorokan: ء, هـ, ع, ح, غ, خ. Cara membacanya harus tegas tanpa menahan suara dengung.",
      },
      {
        heading: "2. Idgham (Meleburkan Bacaan)",
        text: "Idgham Bighunnah meleburkan huruf nun ke dalam huruf ي, ن, م, و disertai dengung 2 harakat. Sedangkan Idgham Bilaghunnah melebur ke huruf ل dan ر tanpa dengung sama sekali.",
      },
      {
        heading: "3. Iqlab (Menukar Bunyi)",
        text: "Ketika bertemu huruf Ba (ب), bunyi nun sukun ditukar menjadi bunyi mim sukun yang disamarkan dengan dengung.",
      },
      {
        heading: "4. Ikhfa' Haqiqi (Menyamarkan)",
        text: "Bertemu 15 huruf hijaiyah lainnya, suara nun disamarkan mendekati makhraj huruf berikutnya dengan dengung yang proporsional.",
      },
    ],
  },
  {
    id: 6,
    tag: "Fiqih Ibadah",
    date: "28 Januari 2026",
    readTime: "6 Menit Baca",
    author: "Ustadz Rahmat Hidayat, Lc., M.H.",
    authorRole: "Pakar Fiqih Ibadah & Muamalah",
    title: "Koreksi Rukun Shalat: Panduan Thaharah & Gerakan Shalat yang Sah Sesuai Sunnah",
    description:
      "Tinjauan fiqih praktis mengenai syarat sah wudhu, tayamum, thaharah, hingga kesalahan gerakan shalat yang sering tidak disadari.",
    imageUrl: "/persona-engineer.jpg",
    featured: false,
    takeaways: [
      "Wudhu yang sempurna adalah kunci diterimanya ibadah shalat wajib.",
      "Rukun fi'li (gerakan) dan rukun qauli (bacaan) harus terpenuhi secara thuma'ninah.",
      "Pelajari fiqih ibadah secara sistematis untuk ketenangan batin dalam shalat.",
    ],
    content: [
      {
        heading: "Pentingnya Thuma'ninah dalam Setiap Gerakan",
        text: "Thuma'ninah (diam sejenak seukuran membaca tasbih) adalah rukun shalat yang paling sering terlewat karena terburu-buru. Tanpa thuma'ninah pada ruku', i'tidal, sujud, dan duduk di antara dua sujud, shalat menjadi tidak sah.",
      },
      {
        heading: "Membasuh Anggota Wudhu dengan Sempurna",
        text: "Pastikan air wudhu mengenai seluruh batas wajah dari tempat tumbuhnya rambut kepala hingga dagu, serta siku dan kedua mata kaki tanpa terhalang zat kedap air.",
      },
      {
        heading: "Keutamaan Belajar Fiqih Bersama Guru Ahli",
        text: "Memahami dalil dan rukun shalat membuat ibadah kita bukan sekadar rutinitas gerakan, melainkan dialog khusyuk dengan Allah Subhanahu wa Ta'ala.",
      },
    ],
  },
  {
    id: 7,
    tag: "Bahasa Arab",
    date: "20 Januari 2026",
    readTime: "5 Menit Baca",
    author: "Ustadz Ahmad Fauzi, S.Pd.I",
    authorRole: "Pengajar Nahwu-Shorof & Kaidah Lughah",
    title: "Mengapa Belajar Nahwu & Shorof Membantu Memahami Makna Al-Qur'an Lebih Dalam?",
    description:
      "Menyingkap keindahan bahasa Arab dan bagaimana perubahan harakat akhir kalimat (I'rab) mempengaruhi makna firman Allah.",
    imageUrl: "/teachers-banner.jpg",
    featured: false,
    takeaways: [
      "Bahasa Arab adalah kunci utama memahami mukjizat sastra Al-Qur'an.",
      "Shorof membentuk asal-usul kata, sedangkan Nahwu menentukan kedudukan kalimat.",
      "Metode aplikatif memudahkan santri pemula memahami kaidah bahasa tanpa rumus rumit.",
    ],
    content: [
      {
        heading: "Keajaiban I'rab dalam Bahasa Al-Qur'an",
        text: "Dalam bahasa Arab, perbedaan harakat dhommah, fathah, atau kasrah pada akhir kata menentukan siapa subjek (fa'il) dan siapa objek (maf'ul). Memahami dasar Nahwu membuat saat tilawah terasa jauh lebih bergetar di hati karena santri paham apa yang sedang dibaca.",
      },
      {
        heading: "Belajar Nahwu-Shorof secara Modern & Terarah",
        text: "Banyak orang mengira Nahwu-Shorof itu sulit karena metode pengajaran klasik yang penuh hafalan. Di NgajiQ, pendekatan langsung diarahkan ke contoh-contoh praktis ayat-ayat surat pendek yang sering kita baca dalam shalat.",
      },
    ],
  },
  {
    id: 8,
    tag: "Panduan Pemula",
    date: "10 Januari 2026",
    readTime: "4 Menit Baca",
    author: "Ustadzah Fatimah Azzahra, M.Ag.",
    authorRole: "Pakar Tajwid & Qari'ah Nasional",
    title: "Cara Efektif Belajar Huruf Hijaiyah Bersambung untuk Pemula",
    description:
      "Langkah mudah mengenali perubahan bentuk huruf hijaiyah di awal, tengah, dan akhir kalimat tanpa merasa bingung.",
    imageUrl: "/persona-office.jpg",
    featured: false,
    takeaways: [
      "Fokus pada jumlah dan letak titik pada badan huruf.",
      "Kenali 6 huruf hijaiyah yang tidak bisa disambung dengan huruf setelahnya.",
      "Praktikkan latihan menyambung kata sederhana 10 menit setiap hari.",
    ],
    content: [
      {
        heading: "Mengenali Karakteristik Kepala dan Titik Huruf",
        text: "Saat disambung, sebagian besar huruf hijaiyah hanya mempertahankan bagian 'kepala' atau badan intinya. Kunci pembedanya terletak pada jumlah dan posisi titik (atas, bawah, atau tengah).",
      },
      {
        heading: "Enam Huruf Istimewa yang Tidak Menyambung ke Kiri",
        text: "Huruf Alif (ا), Dal (د), Dzal (ذ), Ra (ر), Zai (ز), dan Wawu (و) hanya bisa disambung dari huruf sebelumnya, tetapi tidak dapat menyambung ke huruf setelahnya.",
      },
      {
        heading: "Bimbingan Bertahap Bersama Guru Privat",
        text: "Dengan pendampingan guru yang telaten, fase transisi dari huruf tunggal ke kalimat bersambung dapat dikuasai santri hanya dalam 4–6 sesi pertemuan.",
      },
    ],
  },
  {
    id: 9,
    tag: "Ilmu Tajwid",
    date: "5 Januari 2026",
    readTime: "5 Menit Baca",
    author: "Ustadz H. Ahmad Fauzi, Lc.",
    authorRole: "Pengajar Tahsin & Sanad Qiraat",
    title: "Panduan Memahami Tanda Waqaf dalam Mushaf Al-Qur'an Standar Indonesia",
    description:
      "Mengenal tanda waqaf lazim (م), jaiz (ج), mamnu' (لا), saktah (ساكته), dan cara berhenti tanpa merusak makna ayat.",
    imageUrl: "/hero-tutor.jpg",
    featured: false,
    takeaways: [
      "Waqaf lazim mewajibkan berhenti untuk menjaga kemurnian arti ayat.",
      "Tanda mamnu' (لا) melarang berhenti jika masih terikat makna ayat selanjutnya.",
      "Latihan nafas diafragma membantu menjaga kestabilan saat membaca ayat panjang.",
    ],
    content: [
      {
        heading: "Urgensi Memahami Tanda Berhenti dalam Tilawah",
        text: "Berhenti pada posisi yang keliru dapat membalikkan makna firman Allah secara mendasar. Mengenal tanda waqaf adalah syarat mutlak bagi santri yang ingin membaca Al-Qur'an secara tartil.",
      },
      {
        heading: "Ragam Tanda Waqaf Populer",
        text: "Tanda 'Mim' (مـ) menandakan waqaf lazim (harus berhenti). Tanda 'Jim' (ج) membolehkan berhenti atau lanjut. Tanda 'La' (لا) menandakan tidak boleh berhenti kecuali di ujung ayat.",
      },
    ],
  },
  {
    id: 10,
    tag: "Fiqih Ibadah",
    date: "28 Desember 2025",
    readTime: "6 Menit Baca",
    author: "Ustadz Dr. Muhammad Zaki, M.Pd.I",
    authorRole: "Direktur Akademik & Pembina Tahfidz",
    title: "Fiqih Shalat Berjamaah: Syarat Menjadi Makmum dan Tata Cara Masbuq yang Sah",
    description:
      "Panduan praktis meluruskan shaf, membaca Al-Fatihah di belakang imam, dan langkah menyempurnakan rakaat yang tertinggal.",
    imageUrl: "/persona-family.jpg",
    featured: false,
    takeaways: [
      "Makmum masbuq mendapati rakaat jika sempat ruku' thuma'ninah bersama imam.",
      "Gerakan takbiratul ihram wajib dilakukan dalam keadaan berdiri tegak.",
      "Menyempurnakan sisa rakaat dilakukan setelah imam mengucapkan salam kedua.",
    ],
    content: [
      {
        heading: "Kriteria Mendapatkan Rakaat Bersama Imam",
        text: "Santri dianggap mendapatkan satu rakaat penuh jika berhasil menyusul ruku' imam dengan thuma'ninah sebelum imam bangkit untuk i'tidal.",
      },
      {
        heading: "Etika Masuk Masjid Saat Shalat Berlangsung",
        text: "Datanglah dengan tenang dan tidak terburu-buru berlari, sebagaimana sabda Rasulullah SAW dalam riwayat Bukhari.",
      },
    ],
  },
  {
    id: 11,
    tag: "Bahasa Arab",
    date: "20 Desember 2025",
    readTime: "5 Menit Baca",
    author: "Ustadzah Fatimah Azzahra, M.Ag.",
    authorRole: "Pakar Tajwid & Qari'ah Nasional",
    title: "Mengapa Belajar Nahwu dan Shorof Membuka Pemahaman Al-Qur'an Lebih Dalam?",
    description:
      "Peran gramatika bahasa Arab dalam merasakan keindahan sastra Al-Qur'an dan memahami struktur ayat hukum secara mandiri.",
    imageUrl: "/teachers-banner.jpg",
    featured: false,
    takeaways: [
      "Ilmu Nahwu mempelajari harakat akhir kata dan fungsi sintaksisnya dalam kalimat.",
      "Ilmu Shorof membedah perubahan bentuk kata (tashrif) dari akar katanya.",
      "Pemahaman gramatika menghadirkan kekhusyukan berlipat saat membaca tilawah.",
    ],
    content: [
      {
        heading: "Nahwu Sebagai Penjaga Harakat dan Makna",
        text: "Perubahan harakat dari dhommah ke fathah dapat mengubah status subjek menjadi objek. Di sinilah letak pentingnya memahami kaidah i'rab.",
      },
      {
        heading: "Shorof Sebagai Pabrik Kosakata",
        text: "Dari satu akar kata tiga huruf (fa'ala), ilmu shorof dapat melahirkan puluhan turunan makna yang kaya dan mendalam.",
      },
    ],
  },
  {
    id: 12,
    tag: "Keluarga & Anak",
    date: "14 Desember 2025",
    readTime: "4 Menit Baca",
    author: "Ustadzah Rina Maryana, S.Pd.I",
    authorRole: "Koordinator Bimbingan Anak & Balita",
    title: "Metode Menumbuhkan Kecintaan Al-Qur'an pada Anak Tanpa Paksaan",
    description:
      "Pendekatan bercerita kisah teladan nabawi dan gamifikasi mengaji yang efektif membuat anak antusias menyimak setiap hari.",
    imageUrl: "/persona-engineer.jpg",
    featured: false,
    takeaways: [
      "Jadikan tilawah sebagai rutinitas menyenangkan di rumah, bukan hukuman.",
      "Beri apresiasi atas usaha anak melafalkan huruf, bukan hanya hasil hafalan.",
      "Pilih guru privat yang sabar dan memahami psikologi perkembangan anak.",
    ],
    content: [
      {
        heading: "Menciptakan Sudut Mengaji yang Nyaman di Rumah",
        text: "Sediakan pojok baca Al-Qur'an yang terang, rapi, dan harum agar anak merasa senang menghabiskan waktu di tempat tersebut.",
      },
      {
        heading: "Keteladanan Orang Tua Adalah Kurikulum Terbaik",
        text: "Anak meniru apa yang mereka lihat. Ketika orang tua rutin membaca Al-Qur'an setiap hari, anak secara alami tergerak untuk mengikuti.",
      },
    ],
  },
];

const categoryTabs = [
  "Semua",
  "Panduan Pemula",
  "Ilmu Tajwid",
  "Tahfidz & Adab",
  "Keluarga & Anak",
  "Fiqih Ibadah",
  "Bahasa Arab",
];

const blogFaqs = [
  {
    q: "Apakah seluruh artikel di Blog NgajiQ ditulis oleh pengajar bersanad?",
    a: "Ya, seluruh artikel dan materi bimbingan di blog NgajiQ ditulis serta ditinjau langsung oleh dewan asatidz dan ustadzah NgajiQ yang berkompeten dan memiliki sanad keilmuan yang jelas.",
  },
  {
    q: "Bagaimana cara berkonsultasi lebih lanjut setelah membaca artikel tajwid?",
    a: "Anda dapat langsung mendaftar Sesi Trial Class 1-on-1 gratis atau menghubungi tim konsultasi kami melalui tombol WhatsApp untuk berdiskusi langsung dengan ustadz/ustadzah.",
  },
  {
    q: "Apakah materi di blog ini bisa diakses dan dipelajari secara gratis?",
    a: "Seluruh artikel edukasi, infografis, dan tips belajar di blog NgajiQ dapat diakses 100% gratis oleh santri dan masyarakat luas sebagai sarana dakwah dan edukasi Al-Qur'an.",
  },
  {
    q: "Apakah ada modul belajar PDF yang dapat diunduh santri?",
    a: "Ya, santri yang terdaftar di NgajiQ akan mendapatkan akses ke modul panduan tajwid digital, cheatsheet makharijul huruf, dan mushaf standar Kemenag di dashboard santri.",
  },
];

export default function BlogPage({ onOpenModal, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesSectionRef = useRef(null);
  const ARTICLES_PER_PAGE = 6;

  // Filter logic
  const filteredArticles = useMemo(() => {
    return allBlogArticles.filter((art) => {
      const matchCategory =
        selectedCategory === "Semua" || art.tag.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        searchQuery.trim() === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = useMemo(() => {
    if (selectedCategory === "Semua" && searchQuery.trim() === "") {
      return allBlogArticles.find((a) => a.featured) || allBlogArticles[0];
    }
    return null;
  }, [selectedCategory, searchQuery]);

  const gridArticles = useMemo(() => {
    if (featuredArticle) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  const totalPages = Math.max(1, Math.ceil(gridArticles.length / ARTICLES_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
    setCurrentPage(1);
  };

  const paginatedArticles = useMemo(() => {
    const start = (safeCurrentPage - 1) * ARTICLES_PER_PAGE;
    return gridArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [gridArticles, safeCurrentPage]);

  const handleShareWhatsApp = (article) => {
    const url = window.location.href;
    const text = `*${article.title}*\n\n${article.description}\n\nBaca selengkapnya di NgajiQ: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#FBFBFC] text-slate-900 min-h-screen">
      
      {/* ================= 1. HERO SECTION & SEARCH ================= */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20 relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-[#FBFBFC]">
        {/* Background Ambient Glows */}
        <div 
          className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-[#049788]/10 rounded-full blur-3xl pointer-events-none" 
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <a 
              href="/" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("/");
                }
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Beranda
            </a>
            <span>/</span>
            <span className="text-[#049788]">Blog & Wawasan Mengaji</span>
          </nav>

          {/* Hero Titles */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
              Artikel, Wawasan & Panduan <br className="hidden sm:inline" />
              <span className="text-[#049788]">Belajar Mengaji Modern</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Kumpulan tulisan edukatif, tips tajwid aplikatif, metode tahfidz, dan panduan parenting Qur'ani dari para asatidz dan ustadzah bersanad NgajiQ.
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-lg shadow-slate-200/50 rounded-2xl bg-white border border-slate-200/90 p-1.5 transition-all focus-within:border-[#049788] focus-within:ring-2 focus-within:ring-[#049788]/20">
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Cari topik artikel, kaidah tajwid, ustadz, atau panduan..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab;
              const count =
                tab === "Semua"
                  ? allBlogArticles.length
                  : allBlogArticles.filter((a) => a.tag.toLowerCase() === tab.toLowerCase()).length;

              return (
                <button
                  key={tab}
                  onClick={() => handleCategoryChange(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#049788] text-white shadow-md shadow-[#049788]/25"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 2. MAIN BLOG CONTENT ================= */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        {/* Subtle Islamic Motif on Section 2 */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23049788' stroke-width='1' stroke-opacity='0.2'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%23049788' stroke-width='0.75' stroke-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 85%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Featured Article Hero Spotlight */}
          {featuredArticle && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#049788] bg-[#EBF8F6] px-2.5 py-1 rounded-md">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Artikel Pilihan Redaksi</span>
                </span>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-lg overflow-hidden group hover:border-[#049788]/40 transition-all duration-300 flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-1/2 aspect-[16/10] lg:aspect-auto min-h-[280px] lg:min-h-[380px] relative overflow-hidden bg-slate-100">
                  <img
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-[#049788] shadow-xs">
                      {featuredArticle.tag}
                    </span>
                  </div>
                </div>

                {/* Info & Content */}
                <div className="p-6 sm:p-8 lg:p-10 lg:w-1/2 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{featuredArticle.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{featuredArticle.readTime}</span>
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-[#049788] transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {featuredArticle.description}
                    </p>

                    {/* Author Pill */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-9 h-9 rounded-full bg-[#EBF8F6] text-[#049788] flex items-center justify-center font-bold text-xs shrink-0 border border-[#049788]/20">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{featuredArticle.author}</h4>
                        <span className="text-xs text-slate-500">{featuredArticle.authorRole}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveArticle(featuredArticle)}
                      className="px-5 py-2.5 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <span>Baca Artikel Lengkap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShareWhatsApp(featuredArticle)}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#049788] hover:bg-slate-50 transition-colors cursor-pointer"
                      title="Bagikan ke WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Articles Grid */}
          <div ref={articlesSectionRef} className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-950">
                {selectedCategory === "Semua" ? "Daftar Artikel Terbaru" : `Artikel Kategori: ${selectedCategory}`}
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                Menampilkan {gridArticles.length > 0 ? (safeCurrentPage - 1) * ARTICLES_PER_PAGE + 1 : 0}–{Math.min(safeCurrentPage * ARTICLES_PER_PAGE, gridArticles.length)} dari {gridArticles.length} artikel
              </span>
            </div>

            {gridArticles.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-white border border-slate-200 p-8 space-y-4 max-w-md mx-auto">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Tidak ada artikel yang cocok</h4>
                <p className="text-xs text-slate-500">
                  Coba gunakan kata kunci pencarian yang lain atau pilih kategori artikel yang berbeda.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#049788] text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {paginatedArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#049788]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="w-full aspect-[16/10] relative overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-[#049788] shadow-xs">
                          {article.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{article.date}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readTime}</span>
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-950 leading-snug tracking-tight group-hover:text-[#049788] transition-colors line-clamp-2">
                          {article.title}
                        </h4>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {article.description}
                        </p>
                      </div>

                      {/* Author & Read Button */}
                      <div className="pt-3 border-t border-slate-100 space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#EBF8F6] text-[#049788] flex items-center justify-center font-bold text-xs shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 truncate">{article.author}</span>
                        </div>

                        <button
                          onClick={() => setActiveArticle(article)}
                          className="w-full py-2.5 bg-slate-50 hover:bg-[#EBF8F6] hover:text-[#049788] text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-[0.98]"
                        >
                          <span>Baca Selengkapnya</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav
                aria-label="Paginasi Artikel Blog"
                className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200"
              >
                <p className="text-xs text-slate-500 font-medium">
                  Halaman <span className="font-bold text-slate-800">{safeCurrentPage}</span> dari{" "}
                  <span className="font-bold text-slate-800">{totalPages}</span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const prev = Math.max(1, safeCurrentPage - 1);
                      setCurrentPage(prev);
                      articlesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={safeCurrentPage === 1}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-bold gap-1 px-3.5 cursor-pointer"
                    aria-label="Halaman artikel sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => {
                          setCurrentPage(pageNum);
                          articlesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                        }}
                        aria-current={safeCurrentPage === pageNum ? "page" : undefined}
                        aria-label={`Halaman ${pageNum}`}
                        className={`min-h-[44px] min-w-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          safeCurrentPage === pageNum
                            ? "bg-[#049788] text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = Math.min(totalPages, safeCurrentPage + 1);
                      setCurrentPage(next);
                      articlesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={safeCurrentPage === totalPages}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-bold gap-1 px-3.5 cursor-pointer"
                    aria-label="Halaman artikel selanjutnya"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            )}
          </div>

        </div>
      </section>

      {/* ================= 3. CONSULTATION / NEWSLETTER PROMO BANNER ================= */}
      <section className="py-12 bg-white border-y border-slate-200/80 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#049788] to-[#037A6D] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* Islamic Motif inside Promo Banner */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.15]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
              aria-hidden="true"
            />

            <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Ingin Mengetahui Tingkat Kemampuan Mengaji Anda Saat Ini?
              </h3>
              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                Ikuti sesi evaluasi bacaan dan konsultasi langsung 1-on-1 bersama guru bersanad NgajiQ secara gratis tanpa dipungut biaya.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0 w-full md:w-auto">
              <button
                onClick={() => {
                  if (onOpenModal) {
                    onOpenModal("Konsultasi Bacaan Blog");
                  } else if (onNavigate) {
                    onNavigate("/daftar-kelas");
                  }
                }}
                className="px-6 py-3.5 bg-white hover:bg-teal-50 active:scale-[0.98] text-[#049788] font-black text-xs sm:text-sm rounded-xl transition-all shadow-md text-center cursor-pointer"
              >
                Daftar Trial Class Gratis
              </button>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Halo Admin NgajiQ, saya baru membaca artikel di blog dan ingin konsultasi bimbingan kelas."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-teal-900/40 hover:bg-teal-900/60 active:scale-[0.98] text-white border border-white/20 font-bold text-xs sm:text-sm rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tanya via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. FAQ SECTION ================= */}
      <section className="py-16 sm:py-24 bg-[#FBFBFC] relative overflow-hidden border-t border-slate-200/80">
        {/* Islamic Star Motif Background on FAQ */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23049788' stroke-width='1' stroke-opacity='0.2'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Pertanyaan Seputar Materi & Artikel
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Jawaban cepat seputar referensi keilmuan, bimbingan tajwid, dan pembelajaran di NgajiQ.
            </p>
          </div>

          <div className="space-y-3">
            {blogFaqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-950 text-xs sm:text-sm cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#049788]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 5. FINAL CTA SECTION ================= */}
      <section className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
        {/* Islamic Arabesque Star Motif on Dark Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232DD4BF' stroke-width='1'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%232DD4BF' stroke-width='0.75'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
          }}
          aria-hidden="true"
        />

        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#049788]/15 rounded-full blur-[120px] pointer-events-none" 
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Mulai Belajar Al-Qur'an <br className="hidden sm:inline" />
            <span className="text-[#049788]">Bersama NgajiQ</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Praktikkan langsung ilmu tajwid dan kaidah tilawah bersama guru bersanad yang sabar membimbing Anda dari nol.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="/daftar-kelas"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("/daftar-kelas");
                } else if (onOpenModal) {
                  e.preventDefault();
                  onOpenModal("Final CTA Blog");
                }
              }}
              className="w-full sm:w-auto px-9 py-4 bg-[#049788] hover:bg-[#038073] active:scale-[0.98] font-bold rounded-xl text-sm sm:text-base text-white flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#049788]/30 cursor-pointer"
            >
              <span>Daftar Kelas Mengaji Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= 6. ARTICLE READER MODAL ================= */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            
            {/* Modal Sticky Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#049788] shrink-0">
                  {activeArticle.tag}
                </span>
                <span className="text-xs text-slate-500 font-mono truncate">{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer shrink-0 transition-colors"
                aria-label="Tutup artikel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Cover Image */}
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Author Meta */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 leading-tight">
                  {activeArticle.title}
                </h2>

                <div className="flex items-center justify-between flex-wrap gap-3 py-3 border-y border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EBF8F6] text-[#049788] flex items-center justify-center font-bold text-xs shrink-0 border border-[#049788]/20">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{activeArticle.author}</h4>
                      <span className="text-slate-500 text-xs">{activeArticle.authorRole}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShareWhatsApp(activeArticle)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#049788]" /> : <Bookmark className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Takeaways Box */}
              {activeArticle.takeaways && (
                <div className="p-5 rounded-2xl bg-[#EBF8F6]/70 border border-[#049788]/20 space-y-2 text-xs sm:text-sm">
                  <span className="font-bold text-[#049788] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Poin Kunci Pembelajaran (Key Takeaways):</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                    {activeArticle.takeaways.map((point, pIdx) => (
                      <li key={pIdx} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Paragraphs */}
              <div className="space-y-5 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                {activeArticle.content.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-950">
                      {sec.heading}
                    </h3>
                    <p className="whitespace-pre-line text-slate-600">
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Consultation Promo inside Modal */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-center space-y-3 pt-6">
                <h4 className="text-sm sm:text-base font-bold text-slate-950">
                  Ingin Mempelajari Materi Ini Bersama Guru Privat?
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Daftarkan diri Anda untuk sesi bimbingan 1-on-1 interaktif bersama ustadz/ustadzah pilihan Anda.
                </p>
                <div className="flex justify-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      if (onNavigate) onNavigate("/daftar-kelas");
                      else if (onOpenModal) onOpenModal(`Artikel: ${activeArticle.title}`);
                    }}
                    className="px-6 py-2.5 bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                  >
                    Daftar Kelas Sekarang
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
