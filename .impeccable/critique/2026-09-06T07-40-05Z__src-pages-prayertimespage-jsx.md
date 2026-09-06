---
target: ui halaman waktu sholat
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:/Users/mac/Documents/ngajiku/src/pages/PrayerTimesPage.jsx"
target_fingerprint: "sha256:ea064bb2bdf17d1a31ae2fe9edbbadb2fd76990e85d46b6125f3586e0eaaa5df"
target_path: /Users/mac/Documents/ngajiku/src/pages/PrayerTimesPage.jsx
timestamp: 2026-09-06T07-40-05Z
slug: src-pages-prayertimespage-jsx
closed: true
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 3/4 | Clock dan hitung mundur aktif real-time, namun status kalibrasi sensor kompas belum transparan |
| 2 | Match System / Real World | 3/4 | Terminologi waktu sholat Kemenag akurat, namun penggunaan raw emoji 🕋 dan sudut derajat terasa kaku |
| 3 | User Control and Freedom | 3/4 | Deteksi GPS dan pemilihan kota fleksibel, namun belum ada tombol 1-klik untuk reset ke GPS otomatis |
| 4 | Consistency and Standards | 2/4 | Melanggar DESIGN.md: eyebrow pill tag di atas h1, raw emoji pada kompas, dan animasi bounce arcade |
| 5 | Error Prevention | 2/4 | Pemilihan kota di zona waktu berbeda (WITA/WIT) menyebabkan desinkronisasi jam perangkat vs waktu sholat |
| 6 | Recognition Rather Than Recall | 3/4 | Penanda "Berikutnya" dan highlight waktu aktif jelas tanpa perlu kalkulasi manual |
| 7 | Flexibility and Efficiency | 2/4 | Belum ada fitur 1-klik salin/share jadwal ke WhatsApp atau ekspor kalender |
| 8 | Aesthetic and Minimalist Design | 2/4 | Tampilan terlalu padat (8 kartu waktu sholat bersaing setara, slider manual terekspos di mobile) |
| 9 | Error Recovery | 3/4 | Pesan kegagalan GPS informatif dan langsung menyarankan pemilihan kota manual |
| 10 | Help and Documentation | 3/4 | Doa setelah adzan lengkap (Arab, Latin, Terjemahan) dan tips interferensi logam sangat membantu |
| **Total** | | **26/40** | **Acceptable (C+)** |

#### Design Specificity Verdict

**LLM Assessment:**
Halaman ini berhasil dari sisi ketepatan kalkulasi astronomis, namun visualnya saat ini lebih menyerupai **instrumen penerbangan / dashboard teknis** daripada **"The Modern Sanctuary"** khas NgajiQ. Nuansa ketenangan spiritual (*khusyu'*) terganggu oleh pembagian bobot visual yang terfragmentasi, kartu countdown gelap yang terlalu dominan di tengah kanvas terang, dan animasi `animate-bounce` bergaya game arcade saat kiblat terkunci.

**Deterministic Scan (detect.mjs):**
Pemindaian deterministik menemukan **10 antipattern**:
- 1 temuan `bounce-easing` (Line 508): `animate-bounce` pada badge arah kiblat yang menimbulkan ketidakstabilan visual dan gangguan vestibular bagi pengguna yang memegang HP.
- 9 temuan `design-system-font-size` (Lines 364, 437, 493, 501, 561, 638, 701, 707, 788): Penggunaan ukuran font sub-skala arbitrary (`text-[9px]`, `text-[10px]`, `text-[11px]`) yang melanggar skala tipografi `DESIGN.md` dan menurunkan keterbacaan di bawah terik matahari.
- Pelanggaran `DESIGN.md`: Eyebrow pill tag di atas `h1` (Line 339), raw emoji `🕋` pada piringan kompas (Line 562), dan icon `Sparkles` (Line 718).

#### Overall Impression
Pondasi matematis dan kemampuan kompas bekerja sangat solid, tetapi penyajian visualnya perlu ditransformasikan dari instrumen perkakas yang kaku menjadi tempat ibadah digital yang hening, ramah sentuhan satu tangan, dan sepenuhnya aksesibel.

#### What's Working
1. **Engine Astronomis Presisi Tinggi Tanpa Latensi:** Formula astronomis solar ephemeris dan trigonometri bola (*Great Circle*) Kemenag RI (+2 menit ihtiyat) berjalan 100% lokal dan instan.
2. **Koleksi Kota Indonesia Komprehensif:** Mendukung lebih dari 30 kota besar dengan zona waktu (WIB, WITA, WIT) yang tepat.
3. **Penyajian Doa yang Khusyuk:** Menampilkan doa setelah adzan dengan tipografi Arab yang anggun, transliterasi Latin, dan terjemahan resmi HR. Bukhari.

#### Priority Issues

- **[P0] Arcade-Style Gamification & Brand Violations**
  - *Why it matters:* Animasi `animate-bounce` yang melompat-lompat, raw emoji `🕋`, dan eyebrow pill tag merusak atmosfer ketenangan (*tuma'ninah*) dan melanggar aturan mutlak `DESIGN.md`.
  - *Fix:* Ganti `animate-bounce` dengan pancaran lembut (*ambient emerald glow* `ring-4 ring-emerald-500/20 bg-emerald-50`). Ganti emoji `🕋` dengan vektor SVG Ka'bah minimalis. Hapus eyebrow pill tag di atas `h1`.
  - *Suggested command:* `$impeccable distill`

- **[P1] Desinkronisasi Jam pada Multi-Zona Waktu**
  - *Why it matters:* Jika pengguna di Jakarta (WIB) memilih Jayapura (WIT, selisih 2 jam), hitung mundur dan penanda sholat aktif masih mengacu pada jam lokal HP, sehingga jadwal menjadi tidak sinkron.
  - *Fix:* Normalisasikan `currentTime` ke zona waktu target (`activeTz`) sebelum dievaluasi ke dalam `getPrayerTimeline`.
  - *Suggested command:* `$impeccable harden`

- **[P1] Aksesibilitas Kompas dan Kontras Warna (WCAG AA)**
  - *Why it matters:* Kompas adalah black box bagi pengguna tunanetra karena jarum SVG dan derajat tidak mengumumkan perubahan ke screen reader. Teks `text-slate-400` pada putih memiliki kontras 2.54:1 (gagal standar 4.5:1).
  - *Fix:* Tambahkan container `aria-live="polite"` untuk membacakan panduan sudut kiblat, naikkan kontras teks ke `text-slate-600`, dan tambahkan `aria-label` pada slider dan tombol.
  - *Suggested command:* `$impeccable audit`

- **[P2] Reduksi Beban Kognitif: Hirarki 5 Waktu Sholat Utama vs Sholat Sunnah**
  - *Why it matters:* Menampilkan 8 kartu dengan ukuran yang sama persis (`Imsak` s.d. `Isya`) membingungkan pengguna yang ingin cepat melihat waktu sholat wajib berikutnya.
  - *Fix:* Utamakan 5 waktu sholat fardhu dalam kartu primer, dan posisikan waktu Imsak, Terbit, dan Dhuha sebagai chip/pill horizontal sekunder. Sembunyikan slider manual pada perangkat mobile dengan sensor aktif.
  - *Suggested command:* `$impeccable layout`

- **[P2] Disparitas Ukuran Area Sentuh (Touch Targets < 44px)**
  - *Why it matters:* Tombol Deteksi GPS, Pilih Kota, dan Putar Nada hanya berukuran 28px–36px, menyulitkan pengguna yang mengoperasikan ponsel dengan satu tangan saat berjalan.
  - *Fix:* Perbesar padding atau gunakan `min-h-[44px]` pada seluruh elemen interaktif mobile.
  - *Suggested command:* `$impeccable adapt`

#### Persona Red Flags

**Jordan (First-Timer, mencari kiblat di kamar hotel)**:
Pada iPhone, Jordan harus menyetujui izin sensor gerak. Jika terlewat, Jordan melihat slider manual dan mengira harus menebak arah utara sendiri. Saat kompas pas, layar melompat-lompat (*bounce*), menyulitkan Jordan membaca derajat saat meletakkan HP di atas meja.

**Sam (Accessibility-Dependent, pengguna Screen Reader)**:
Saat VoiceOver aktif, Sam hanya mendengar *"Kompas Arah Kiblat, image"*. Piringan yang berputar tidak memberikan umpan balik suara sama sekali. Dropdown pemilihan kota tidak memiliki role `listbox` sehingga Sam tidak tahu kota mana yang sedang disorot.

**Casey (Distracted Mobile User, buru-buru memeriksa waktu sholat)**:
Casey memegang HP dengan satu tangan menjelang waktu sholat. Tombol aksi di bagian atas berada di luar *thumb zone*. Teks indikator detik dan menit pada kartu gelap terlalu redup untuk dibaca di bawah sinar matahari luar ruangan.

#### Minor Observations
1. Nada pengingat menggunakan 4 osilator gelombang sinus sintetis yang terdengar seperti bel lift; sampel audio bedug halus atau petikan lembut akan jauh lebih menyentuh.
2. Tidak adanya tombol 1-klik "Salin Jadwal Hari Ini" ke WhatsApp, padahal ini fitur yang sangat sering dibagikan santri ke keluarga.
3. Transisi kartu countdown dari mode gelap ke kartu putih di sekitarnya terasa terlalu kontras dan tajam.

#### Questions to Consider
- Dapatkah momen penguncian arah kiblat diubah dari sekadar angka teknis menjadi ritual mindful bernilai ibadah (misalnya menampilkan niat sholat atau doa wudhu)?
- Apakah sholat fardhu 5 waktu sebaiknya dipisahkan dari waktu terbit dan imsak agar santri langsung menangkap waktu sholat yang wajib?
- Bagaimana jika ditambahkan tombol cepat 1-klik untuk membagikan jadwal sholat hari ini langsung ke grup WhatsApp keluarga?
