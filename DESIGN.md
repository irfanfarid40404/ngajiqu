---
name: Ngajiku
description: Platform Bimbingan Mengaji Privat 1-on-1 Online Fleksibel untuk Dewasa & Profesional
colors:
  primary: "#049788"
  primary-hover: "#038073"
  primary-light: "#EBF8F6"
  neutral-bg: "#FBFBFC"
  surface: "#FFFFFF"
  text-primary: "#0F172A"
  text-muted: "#64748B"
  border: "#E2E8F0"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: Ngajiku

## Overview

**Creative North Star: "The Modern Sanctuary"**

Sistem desain Ngajiku memadukan kehangatan spiritual bimbingan Al-Qur'an dengan presisi dan kesederhanaan antarmuka digital modern (21st.dev style). Desain dirancang agar santri dewasa merasa disambut dengan tenang, terbebas dari rasa canggung/minder, dan percaya diri untuk memulai kembali proses belajarnya.

**Key Characteristics:**
- **Anti-AI-Slop Standard:** Dilarang keras menggunakan pill label kilauan (Sparkles), emoji berlebih, gradasi pelangi, atau bayangan melayang (floating ghost card).
- **Tenang & Bersih:** Dominasi latar belakang terang (`#FBFBFC`) dengan aksen warna teal `#049788` yang menyejukkan.
- **Hierarki Tajam:** Tipografi tebal dan tegas berkontras tinggi dengan Plus Jakarta Sans.
- **Interaktif & Responsif:** Komponen interaktif (Makhraj simulator, quiz, filter paket) yang langsung merespons santri.

## Colors

Palet warna Ngajiku berakar pada nuansa hijau zamrud Islami kontemporer yang bersih dan berwibawa.

### Primary
- **Islamic Teal** (`#049788`): Warna identitas utama brand, digunakan pada tombol aksi utama, badge fokus, ikon terpilih, dan penekanan kata kunci.
- **Deep Teal** (`#038073`): Digunakan untuk interaksi hover tombol dan status aktif.
- **Soft Teal Tint** (`#EBF8F6`): Digunakan untuk latar belakang badge, kartu fasilitas, dan highlight teks halus.

### Neutral
- **Background Slate** (`#FBFBFC`): Latar kanvas utama yang nyaman di mata.
- **Deep Slate Text** (`#0F172A` / `#020617`): Warna tipografi utama untuk memastikan keterbacaan sempurna.
- **Muted Slate** (`#64748B`): Warna deskripsi dan teks pelengkap.
- **Crisp Border** (`#E2E8F0`): Garis pembatas kartu yang tegas dan halus.

### Named Rules
**The Calm Accent Rule.** Warna aksen teal `#049788` digunakan sebagai penuntun visual aksi utama (CTA), bukan untuk mewarnai seluruh background secara berlebihan.
**The No-Slop Color Rule.** Dilarang menggunakan gradient text (`bg-clip-text text-transparent`) atau warna pelangi acak. Semua teks harus solid dan berkontras tinggi.

## Typography

**Display Font:** Plus Jakarta Sans
**Body Font:** Plus Jakarta Sans

### Hierarchy
- **Display** (Bold 900, clamp 2.25rem–3.5rem): Judul hero dan pembuka section utama.
- **Headline** (Bold 800, 1.75rem–2.25rem): Judul bagian bento, kurikulum, dan paket.
- **Title** (Bold 700, 1.125rem–1.5rem): Judul kartu dan judul accordion.
- **Body** (Regular 400, 0.875rem–1rem, line-height 1.6): Deskripsi penjelasan dan teks testimoni.
- **Label** (Bold 700, 0.75rem, uppercase tracking-wider): Badge kategori dan penanda status.

### Named Rules
**The Heading Self-Weight Rule.** Judul `<h2>` harus berdiri sendiri tanpa kicker/eyebrow pill tag di atasnya. Jangan meletakkan badge kecil dengan ikon bintang di atas setiap judul.

## Layout

- Grid 12-kolom responsif dengan `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Section vertikal terpisah dengan padding proporsional (`py-20` hingga `py-24`) dan batas bawah border halus (`border-b border-slate-200/80`).
- Card layout asimetris (Bento Grid) untuk menampilkan fitur-fitur bimbingan.
- Seluruh container dan header wajib simetris di tengah (`mx-auto text-center`).

## Elevation & Depth

Ngajiku menerapkan prinsip **Single Crisp Boundary** (Flat-with-Tonal-Layering). Tidak menggunakan drop shadow buram tebal. Kedalaman ruang diciptakan melalui perpaduan border halus (`border-slate-200`) dan shadow mikro (`shadow-2xs` / `shadow-sm`).

## Shapes

- Radius kartu: `rounded-2xl` (16px) hingga `rounded-3xl` (24px) untuk menciptakan kesan bersahabat dan modern.
- Radius tombol & badge: `rounded-xl` (12px) dan `rounded-full` (pills).

## Components

### Buttons
- **Primary:** Background `#049788`, teks putih, font-bold, radius 12px, padding vertikal 14px horizontal 28px, shadow teal halus.
- **Secondary / WhatsApp:** Background putih, border `#E2E8F0`, teks `#334155`, ikon WhatsApp emerald.

### Cards
- **Bento & Feature Card:** Background putih atau gradient mesh tipis, border `#E2E8F0`, radius 24px, padding 28px–36px.
- **Package Card:** Border `#049788` untuk paket terpopuler dengan ring highlight tipis.

## Do's and Don'ts (Strict Anti-AI-Slop Guardrails)

### Do:
- **Do** gunakan foto riil beresolusi tinggi dengan karakter lokal Indonesia yang bersahaja.
- **Do** gunakan ikon vektor semantik Lucide yang terstandardisasi.
- **Do** jaga simetri layout dengan `mx-auto` dan perataan tengah pada header section.
- **Do** berikan micro-interaction yang halus (hover transisi 200ms, active scale 0.99).
- **Do** gunakan tone copy yang empatik, menenangkan, dan solutif bagi santri dewasa.

### Don't (ABSOLUTE BANS):
- **Don't** tambahkan kicker / eyebrow pill label (misal: `✨ Solusi Terbaik`, `🚀 Program No. 1`) di atas judul section.
- **Don't** gunakan emoji mentah dalam paragraf atau teks antarmuka (seperti 📍, 📖, ❌, ✅, 🚀, ✨).
- **Don't** gunakan gradient text (`bg-clip-text text-transparent`) atau warna pelangi berlebih.
- **Don't** gunakan floating ghost cards dengan drop-shadow blur tebal dan border ganda.
- **Don't** buat layout yang berat sebelah atau bergeser ke kanan tanpa `mx-auto`.
- **Don't** gunakan copy marketing generik bernada AI slop ("Revolutionize your spiritual journey", "Unlock next level Quran reading").
