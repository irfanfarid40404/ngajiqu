import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Compass,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  Navigation,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Search,
  BookOpen,
  Calendar,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Share2,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
  Info,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import {
  calculateQibla,
  calculatePrayerTimes,
  getHijriDate,
  getPrayerTimeline,
  INDONESIAN_CITIES,
} from "@/lib/prayerCalculation";
import {
  DOA_DZIKIR_CATEGORIES,
  DOA_DZIKIR_LIST,
  ISLAMIC_EVENTS_LIST,
} from "@/data/islamicContent";

// Authentic Crafted SVG Kaaba Vector
function KaabaIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 7L12 3L20 7V17L12 21L4 17V7Z"
        fill="#0F172A"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 7L12 11L20 7L12 3L4 7Z"
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M4 10L12 14L20 10"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="13.5"
        y="12"
        width="3"
        height="5"
        rx="0.5"
        fill="#D97706"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export default function PrayerTimesPage({ currentPath = "/waktu-sholat", onNavigate }) {
  // ─── TAB NAVIGATION STATE ───
  const getTabFromPath = (path) => {
    if (path === "/doa-dzikir") return "doa-dzikir";
    if (path === "/arah-kiblat" || path === "/kompas-kiblat") return "arah-kiblat";
    if (path === "/kalender-islam") return "kalender-islam";
    return "waktu-sholat";
  };

  const [userSelectedTab, setUserSelectedTab] = useState(null);
  const activeTab = userSelectedTab || getTabFromPath(currentPath);
  const [isIbadahMenuOpen, setIsIbadahMenuOpen] = useState(false);
  const ibadahMenuRef = useRef(null);

  const handleTabChange = (tabId) => {
    setUserSelectedTab(tabId);
    setIsIbadahMenuOpen(false);
    const targetPath = `/${tabId}`;
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.history.pushState({}, "", targetPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const IBADAH_TABS = [
    {
      id: "waktu-sholat",
      label: "Waktu Sholat",
      desc: "Jadwal 5 waktu fardhu & hitung mundur",
      icon: Clock,
    },
    {
      id: "doa-dzikir",
      label: "Doa & Dzikir",
      desc: "Kumpulan doa harian & dzikir bersanad",
      icon: BookOpen,
    },
    {
      id: "arah-kiblat",
      label: "Arah Kiblat",
      desc: "Kompas digital presisi Ka'bah Makkah",
      icon: Compass,
    },
    {
      id: "kalender-islam",
      label: "Kalender Islam",
      desc: "Kalender Hijriyah & jadwal puasa sunnah",
      icon: Calendar,
    },
  ];

  const currentTabMeta = IBADAH_TABS.find((t) => t.id === activeTab) || IBADAH_TABS[0];
  const CurrentActiveTabIcon = currentTabMeta.icon;

  // ─── LOCATION & CITY STATE ───
  const [selectedCity, setSelectedCity] = useState(INDONESIAN_CITIES[0]); // default Jakarta
  const [customCoords, setCustomCoords] = useState(null);
  const [locationName, setLocationName] = useState("DKI Jakarta");
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState("");

  // ─── TIME STATE ───
  const [currentTime, setCurrentTime] = useState(new Date());

  // ─── COMPASS & SENSOR STATE ───
  const [deviceHeading, setDeviceHeading] = useState(0); // degrees (0 = North)
  const [manualHeading, setManualHeading] = useState(0);
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [sensorPermissionNeeded, setSensorPermissionNeeded] = useState(false);
  const [showManualSlider, setShowManualSlider] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // ─── MONTHLY PRAYER MODAL STATE ───
  const [showMonthlyModal, setShowMonthlyModal] = useState(false);

  // ─── DOA & DZIKIR STATE ───
  const [selectedDoaCategory, setSelectedDoaCategory] = useState("semua");
  const [doaSearchQuery, setDoaSearchQuery] = useState("");
  const [doaPage, setDoaPage] = useState(1);
  const DOA_PER_PAGE = 4;
  const doaSectionRef = useRef(null);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihTarget, setTasbihTarget] = useState(33);
  const [activeDzikirTitle, setActiveDzikirTitle] = useState("Subhanallah");
  const [activeDzikirArabic, setActiveDzikirArabic] = useState("سُبْحَانَ اللَّهِ");
  const [tasbihFinished, setTasbihFinished] = useState(false);

  // ─── KALENDER ISLAM STATE ───
  const [eventCategoryFilter, setEventCategoryFilter] = useState("Semua");
  const [converterDate, setConverterDate] = useState(() => new Date().toISOString().split("T")[0]);

  const cityDropdownRef = useRef(null);
  const audioContextRef = useRef(null);

  // Active coordinates & timezone offset
  const activeLat = customCoords ? customCoords.lat : selectedCity.lat;
  const activeLng = customCoords ? customCoords.lng : selectedCity.lng;
  const activeTz = customCoords ? customCoords.tz : selectedCity.tz;

  // Qibla Info (Derived via Great Circle)
  const qiblaInfo = useMemo(() => calculateQibla(activeLat, activeLng), [activeLat, activeLng]);

  // Wall-clock time synchronized with target city's timezone offset
  const targetCityTime = useMemo(() => {
    const utcMs = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    return new Date(utcMs + activeTz * 3600000);
  }, [currentTime, activeTz]);

  // Derived Prayer Schedule & Timeline
  const prayerSchedule = useMemo(
    () => calculatePrayerTimes(targetCityTime, activeLat, activeLng, activeTz),
    [targetCityTime, activeLat, activeLng, activeTz]
  );

  const prayerTimeline = useMemo(
    () => getPrayerTimeline(prayerSchedule, targetCityTime),
    [prayerSchedule, targetCityTime]
  );

  const hijriDate = useMemo(() => getHijriDate(targetCityTime), [targetCityTime]);

  // ─── 1. REAL-TIME CLOCK TICKER ───
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target)) {
        setIsCityDropdownOpen(false);
      }
      if (ibadahMenuRef.current && !ibadahMenuRef.current.contains(e.target)) {
        setIsIbadahMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsCityDropdownOpen(false);
        setIsIbadahMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ─── 2. DEVICE COMPASS ORIENTATION SENSOR ───
  const handleOrientation = useCallback((e) => {
    let heading = 0;
    if (e.webkitCompassHeading !== undefined) {
      heading = e.webkitCompassHeading;
      setIsSensorActive(true);
    } else if (e.alpha !== null) {
      heading = e.absolute ? (360 - e.alpha) % 360 : (360 - e.alpha) % 360;
      setIsSensorActive(true);
    }

    setDeviceHeading(Math.round(heading));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.DeviceOrientationEvent) return;

    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      setTimeout(() => setSensorPermissionNeeded(true), 0);
    } else {
      window.addEventListener("deviceorientationabsolute", handleOrientation, true);
      window.addEventListener("deviceorientation", handleOrientation, true);
      setTimeout(() => setIsSensorActive(true), 0);
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation, true);
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [handleOrientation]);

  const requestIosSensorPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setSensorPermissionNeeded(false);
          window.addEventListener("deviceorientationabsolute", handleOrientation, true);
          window.addEventListener("deviceorientation", handleOrientation, true);
          setIsSensorActive(true);
        } else {
          setGpsError("Izin sensor kompas ditolak oleh browser.");
        }
      } catch (err) {
        console.error("Error requesting compass permission:", err);
      }
    }
  };

  // ─── 3. GPS GEOLOCATION DETECTION ───
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsError("Browser Anda tidak mendukung deteksi lokasi otomatis.");
      return;
    }

    setIsGpsLoading(true);
    setGpsError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        let tz = 7;
        if (lng >= 115 && lng < 125) tz = 8;
        else if (lng >= 125) tz = 9;

        setCustomCoords({ lat, lng, tz });
        setIsGpsLoading(false);

        let closestCity = INDONESIAN_CITIES[0];
        let minDistance = 999999;
        INDONESIAN_CITIES.forEach((c) => {
          const dist = Math.hypot(c.lat - lat, c.lng - lng);
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = c;
          }
        });

        if (minDistance < 0.45) {
          setLocationName(`${closestCity.name} (GPS)`);
        } else {
          setLocationName(`GPS (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`);
        }
      },
      (error) => {
        setIsGpsLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsError("Izin akses lokasi ditolak. Silakan pilih kota manual.");
        } else {
          setGpsError("Gagal mendeteksi lokasi. Coba pilih kota manual.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setCustomCoords(null);
    setLocationName(city.name);
    setIsCityDropdownOpen(false);
    setCitySearchQuery("");
  };

  // ─── 4. COMPASS ALIGNMENT LOGIC ───
  const activeHeading = isSensorActive ? deviceHeading : manualHeading;
  const rawDiff = Math.abs((activeHeading - qiblaInfo.azimuth + 360) % 360);
  const qiblaDiff = rawDiff > 180 ? 360 - rawDiff : rawDiff;
  const isAlignedWithQibla = qiblaDiff <= 3;

  // ─── 5. HARMONIC CHIME AUDIO ───
  const playPeacefulChime = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") ctx.resume();

      setAudioPlaying(true);
      const frequencies = [528, 660, 792];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.35);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.35);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.35 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.35 + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.35);
        osc.stop(ctx.currentTime + idx * 0.35 + 1.5);
      });

      setTimeout(() => {
        setAudioPlaying(false);
      }, 2400);
    } catch {
      setAudioPlaying(false);
    }
  };

  // ─── 6. SHARE TO WHATSAPP ───
  const handleShareSchedule = () => {
    const tzLabel = activeTz === 7 ? "WIB" : activeTz === 8 ? "WITA" : "WIT";
    const text = `*Jadwal Sholat ${locationName} Hari Ini*\n${currentTime.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })} (${hijriDate})\n\n• Subuh: ${prayerSchedule.subuh} ${tzLabel}\n• Dzuhur: ${prayerSchedule.dzuhur} ${tzLabel}\n• Ashar: ${prayerSchedule.ashar} ${tzLabel}\n• Maghrib: ${prayerSchedule.maghrib} ${tzLabel}\n• Isya: ${prayerSchedule.isya} ${tzLabel}\n\n• Imsak: ${prayerSchedule.imsak} | Terbit: ${prayerSchedule.terbit} | Dhuha: ${prayerSchedule.dhuha}\n_Arah Kiblat: ${qiblaInfo.azimuth}° ${qiblaInfo.directionText}_\n\nBimbingan Mengaji Privat: https://ngajiq.id`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedToast("Jadwal sholat berhasil disalin!");
      setTimeout(() => setCopiedToast(""), 2500);
    }
  };

  // ─── 7. TASBIH COUNTER LOGIC ───
  const handleTasbihTap = () => {
    if (navigator.vibrate) {
      navigator.vibrate(25);
    }
    const newCount = tasbihCount + 1;
    setTasbihCount(newCount);

    if (tasbihTarget > 0 && newCount >= tasbihTarget) {
      setTasbihFinished(true);
      playPeacefulChime();
    }
  };

  const handleResetTasbih = () => {
    setTasbihCount(0);
    setTasbihFinished(false);
  };

  const handleCopyDoa = (doa) => {
    const text = `*${doa.title}*\n${doa.arabic}\n\n_${doa.latin}_\n\nArtinya: "${doa.translation}"\n\nSumber: ${doa.source}\nDibagikan via NgajiQ (https://ngajiq.id)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedToast(`Doa "${doa.title}" berhasil disalin!`);
      setTimeout(() => setCopiedToast(""), 2500);
    }
  };

  // Filter cities for search
  const filteredCities = INDONESIAN_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
      c.province.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  // Filter Doa list
  const filteredDoaList = useMemo(() => {
    return DOA_DZIKIR_LIST.filter((d) => {
      const matchCat = selectedDoaCategory === "semua" || d.category === selectedDoaCategory;
      const matchQuery =
        !doaSearchQuery ||
        d.title.toLowerCase().includes(doaSearchQuery.toLowerCase()) ||
        d.latin.toLowerCase().includes(doaSearchQuery.toLowerCase()) ||
        d.translation.toLowerCase().includes(doaSearchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedDoaCategory, doaSearchQuery]);

  // Paginated Doa list
  const totalDoaPages = Math.max(1, Math.ceil(filteredDoaList.length / DOA_PER_PAGE));
  const paginatedDoaList = useMemo(() => {
    const start = (doaPage - 1) * DOA_PER_PAGE;
    return filteredDoaList.slice(start, start + DOA_PER_PAGE);
  }, [filteredDoaList, doaPage]);

  // 5 Main Fardhu Prayers with authentic Arabic name and time characteristics
  const fardhuPrayers = [
    {
      id: "subuh",
      name: "Subuh",
      arabic: "الفَجْر",
      time: prayerSchedule.subuh,
      rakaat: "2 Rakaat",
      icon: Sunrise,
      desc: "Sholat fajar penjemput keberkahan pagi",
    },
    {
      id: "dzuhur",
      name: "Dzuhur",
      arabic: "الظُّهْر",
      time: prayerSchedule.dzuhur,
      rakaat: "4 Rakaat",
      icon: Sun,
      desc: "Saat matahari tergelincir dari tengah langit",
    },
    {
      id: "ashar",
      name: "Ashar",
      arabic: "العَصْر",
      time: prayerSchedule.ashar,
      rakaat: "4 Rakaat",
      icon: Sun,
      desc: "Sholat wustha penjaga waktu sore",
    },
    {
      id: "maghrib",
      name: "Maghrib",
      arabic: "المَغْرِب",
      time: prayerSchedule.maghrib,
      rakaat: "3 Rakaat",
      icon: Sunset,
      desc: "Saat matahari terbenam sempurna di ufuk",
    },
    {
      id: "isya",
      name: "Isya",
      arabic: "العِشَاء",
      time: prayerSchedule.isya,
      rakaat: "4 Rakaat",
      icon: Moon,
      desc: "Menutup aktivitas malam dalam ridha Ilahi",
    },
  ];

  // Secondary Astronomical / Nawafil Times
  const supportingTimes = [
    { label: "Imsak", time: prayerSchedule.imsak, note: "Peringatan Waktu Sahur", icon: Clock },
    { label: "Terbit (Syuruq)", time: prayerSchedule.terbit, note: "Berakhirnya Waktu Subuh", icon: Sunrise },
    { label: "Dhuha", time: prayerSchedule.dhuha, note: "Awal Waktu Sholat Dhuha", icon: Sun },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-slate-900 selection:bg-[#049788] selection:text-white pb-24 font-sans antialiased">
      
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Screen Reader Live Guidance */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeTab === "arah-kiblat" &&
          (isAlignedWithQibla
            ? `Alhamdulillah, perangkat Anda tepat menghadap arah kiblat pada ${qiblaInfo.azimuth} derajat.`
            : `Arah kiblat berada di ${qiblaInfo.azimuth} derajat ${qiblaInfo.directionText}. Putar perangkat secara perlahan.`)}
      </div>

      {/* ─── 0. MASTER HEADER & ELEVATED IBADAH HUB NAVIGATION (Identical background & Islamic geometric pattern to Home Hero) ─── */}
      <header className="relative pt-14 pb-10 md:pt-20 md:pb-14 bg-gradient-to-b from-[#E8F7F5] via-[#F3FAF8] to-white border-b border-slate-200/80 overflow-hidden text-center">
        {/* Ambient Islamic Glow Orbs */}
        <div
          className="absolute -top-20 left-1/4 w-[480px] h-[480px] bg-[#049788]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/4 right-0 w-[520px] h-[520px] bg-[#2DD4BF]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Islamic Geometric Star Pattern (Khatam / 8-Point Star Arabesque Motif Icon Background) */}
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Main Title (No Eyebrow Tag per DESIGN.md and craft-floor.md) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Waktu Sholat & <span className="text-[#049788]">Panduan Ibadah</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Perhitungan presisi astronomis Kemenag RI, kumpulan doa dan dzikir shahih bersanad, kompas kiblat Ka'bah, serta kalender Islam Hijriyah.
          </p>

          {/* Clean, Tactile Navigation Switcher */}
          <div className="mt-8 flex flex-col items-center gap-4">
            
            {/* Desktop Horizontal Segmented Control */}
            <nav
              aria-label="Pilihan Fitur Ibadah"
              className="hidden sm:inline-flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-2xs"
            >
              {IBADAH_TABS.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={`min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-[#049788] shadow-xs"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#049788]" : "text-slate-500"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Dropdown Menu ("Ibadah ▾") */}
            <div className="sm:hidden relative w-full max-w-xs" ref={ibadahMenuRef}>
              <button
                type="button"
                onClick={() => setIsIbadahMenuOpen(!isIbadahMenuOpen)}
                aria-expanded={isIbadahMenuOpen}
                aria-label="Pilih menu navigasi ibadah"
                className="w-full min-h-[48px] flex items-center justify-between px-4 py-3 rounded-2xl bg-white border-2 border-[#049788] text-slate-900 font-black text-xs shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#EBF8F6] text-[#049788] flex items-center justify-center">
                    <CurrentActiveTabIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-500 font-semibold">Ibadah ▾</span>
                  <span className="text-[#049788] font-bold">{currentTabMeta.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#049788] transition-transform ${isIbadahMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isIbadahMenuOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  {IBADAH_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.id)}
                        className={`w-full min-h-[44px] flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                          isSelected ? "bg-[#EBF8F6] text-[#049788] font-bold" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold">{tab.label}</div>
                          <div className="text-xs text-slate-500 truncate">{tab.desc}</div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#049788]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* ─── SHARED LOCATION & TIME BAR (WAKTU SHOLAT & ARAH KIBLAT) ─── */}
      {(activeTab === "waktu-sholat" || activeTab === "arah-kiblat") && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Active Location Display */}
            <div className="flex items-center gap-3 px-2 flex-1 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Lokasi Aktif
                </span>
                <span className="text-sm font-black text-slate-900 truncate block">
                  {locationName}
                </span>
              </div>
            </div>

            {/* GPS & City Selector Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isGpsLoading}
                aria-label="Deteksi lokasi terkini via GPS"
                className="flex-1 sm:flex-initial min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#EBF8F6] hover:bg-[#DCF3F0] text-[#049788] font-bold text-xs transition-colors cursor-pointer disabled:opacity-50 active:scale-95"
              >
                {isGpsLoading ? (
                  <span className="w-4 h-4 border-2 border-[#049788] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
                <span>Deteksi GPS</span>
              </button>

              <div className="relative flex-1 sm:flex-initial" ref={cityDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isCityDropdownOpen}
                  aria-label="Pilih kota di Indonesia"
                  className="w-full min-h-[44px] inline-flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer active:scale-95"
                >
                  <span>Pilih Kota</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-600 transition-transform ${
                      isCityDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCityDropdownOpen && (
                  <div
                    role="listbox"
                    aria-label="Daftar kota Indonesia"
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-left animate-in fade-in zoom-in-95"
                  >
                    <div className="p-2 border-b border-slate-100">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Cari kota atau provinsi..."
                          value={citySearchQuery}
                          onChange={(e) => setCitySearchQuery(e.target.value)}
                          aria-label="Cari nama kota atau provinsi"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#049788]"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-1 space-y-0.5">
                      {filteredCities.map((city) => (
                        <button
                          key={city.id}
                          type="button"
                          role="option"
                          aria-selected={selectedCity.id === city.id}
                          onClick={() => handleSelectCity(city)}
                          className={`w-full min-h-[40px] text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            selectedCity.id === city.id
                              ? "bg-[#EBF8F6] text-[#049788] font-bold"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <div>
                            <div className="font-bold text-slate-900">{city.name}</div>
                            <div className="text-xs text-slate-500">{city.province}</div>
                          </div>
                          {selectedCity.id === city.id && (
                            <Check className="w-4 h-4 text-[#049788]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {gpsError && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg mt-2 text-center font-medium">
              {gpsError}
            </p>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 1: WAKTU SHOLAT
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "waktu-sholat" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 animate-in fade-in duration-200">
          
          {/* Authentic Spiritual Sanctuary Hero Card (Sakina Design) */}
          <div className="relative rounded-3xl bg-[#064E43] text-white p-7 sm:p-10 shadow-xl overflow-hidden">
            {/* Subtle Islamic Geometric Star Pattern Icon Motif on Sanctuary Card */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.14]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='1' stroke-opacity='0.4'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='white' stroke-width='0.75' stroke-opacity='0.3'/%3E%3Ccircle cx='40' cy='40' r='6' fill='white' fill-opacity='0.12' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
              aria-hidden="true"
            />

            {/* Subtle Islamic Geometric Arch Vector Silhouette */}
            <div
              className="absolute -right-12 -bottom-12 w-72 h-72 rounded-full border border-white/10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute right-6 -top-12 w-48 h-48 rounded-full border border-white/5 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-teal-200 tracking-wider uppercase">
                  Waktu Sholat Berikutnya
                </span>
                
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white capitalize">
                    {prayerTimeline.nextPrayer.name}
                  </h2>
                  <span className="text-xl sm:text-2xl font-serif text-teal-200/90 font-bold" dir="rtl">
                    {fardhuPrayers.find((p) => p.id === prayerTimeline.nextPrayer.name.toLowerCase())?.arabic || ""}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                  Adzan berkumandang pukul{" "}
                  <span className="text-white font-extrabold text-base">
                    {prayerTimeline.nextPrayer.time}
                  </span>{" "}
                  ({activeTz === 7 ? "WIB" : activeTz === 8 ? "WITA" : "WIT"}) untuk wilayah {locationName}
                </p>
              </div>

              {/* Countdown Ticker Box */}
              <div className="bg-black/20 backdrop-blur-md border border-white/15 p-6 rounded-2xl text-center min-w-[240px]">
                <span className="text-xs font-semibold text-teal-200 uppercase tracking-wider block">
                  Hitung Mundur Adzan
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-wider mt-1 block">
                  {prayerTimeline.countdownFormatted}
                </span>
                <div className="mt-2 pt-2 border-t border-white/10 text-xs text-teal-100 font-medium">
                  {hijriDate}
                </div>
              </div>

            </div>
          </div>

          {/* 5 Fardhu Prayer Cards Grid */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-slate-950">Jadwal 5 Sholat Fardhu Hari Ini</h2>
                <p className="text-xs text-slate-500">Standar perhitungan Kemenag RI (+2 menit ihtiyat pengaman)</p>
              </div>
              <button
                type="button"
                onClick={handleShareSchedule}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Share2 className="w-3.5 h-3.5 text-[#049788]" />
                <span>Bagikan Jadwal Hari Ini</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {fardhuPrayers.map((prayer) => {
                const Icon = prayer.icon;
                const isCurrent = prayerTimeline.currentPrayer.name.toLowerCase() === prayer.id;
                const isNext = prayerTimeline.nextPrayer.name.toLowerCase() === prayer.id;

                return (
                  <div
                    key={prayer.id}
                    className={`relative p-5 rounded-2xl transition-all border ${
                      isCurrent
                        ? "bg-gradient-to-b from-[#F4FBF9] to-white border-[#049788] shadow-md ring-2 ring-[#049788]/20"
                        : isNext
                        ? "bg-white border-teal-300 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#EBF8F6] text-[#049788] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-serif font-bold text-slate-400 text-sm" dir="rtl">
                        {prayer.arabic}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">{prayer.name}</h3>
                      {isCurrent && (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Aktif
                        </span>
                      )}
                      {isNext && !isCurrent && (
                        <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                          Berikutnya
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">{prayer.rakaat}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                      <span className="text-2xl font-black text-slate-950 font-mono tracking-tight">
                        {prayer.time}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">
                        {activeTz === 7 ? "WIB" : activeTz === 8 ? "WITA" : "WIT"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Secondary Astronomical Strip (Imsak, Terbit, Dhuha) */}
          <section className="bg-slate-100/80 p-4 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-around gap-4">
            {supportingTimes.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 w-full sm:w-auto justify-center">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-[#049788]">
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.note}</div>
                  </div>
                  <span className="font-mono font-black text-slate-950 text-sm ml-2">
                    {item.time}
                  </span>
                </div>
              );
            })}
          </section>

          {/* Practical Links & Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900">Perlu Penunjuk Arah Kiblat?</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kompas kiblat interaktif ke Ka'bah di Makkah ({qiblaInfo.azimuth}° {qiblaInfo.directionText})
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange("arah-kiblat")}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
              >
                <span>Buka Kompas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900">Jadwal Sholat 1 Bulan Penuh</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tabel lengkap 30 hari waktu imsakiyah dan sholat untuk {locationName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMonthlyModal(true)}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors shrink-0 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Lihat Tabel</span>
              </button>
            </div>
          </div>

          {/* Contextual CTA: Belajar Fiqih Sholat */}
          <section className="rounded-3xl bg-gradient-to-br from-[#EBF8F6] via-white to-[#EBF8F6] p-7 sm:p-9 border border-[#049788]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left max-w-xl">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Sempurnakan Bacaan Al-Fatihah & Tata Cara Sholat
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bimbingan privat 1-on-1 belajar tajwid, tartil sholat, dan fiqih ibadah bersama ustadz/ustadzah bersanad di NgajiQ. Dibimbing dengan sabar dari nol hingga fasih.
              </p>
            </div>
            <a
              href="/daftar-kelas"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("/daftar-kelas");
                else window.location.pathname = "/daftar-kelas";
              }}
              className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#049788] hover:bg-[#038073] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#049788]/20 shrink-0 cursor-pointer active:scale-95"
            >
              <span>Konsultasi Kelas Privat</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </section>

        </main>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 2: DOA & DZIKIR
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "doa-dzikir" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 animate-in fade-in duration-200">
          
          {/* Tactile Misbaha / Digital Tasbih Counter Sanctuary */}
          <section className="relative rounded-3xl bg-[#064E43] text-white p-7 sm:p-10 shadow-xl border border-emerald-950/40 overflow-hidden">
            {/* Subtle Islamic Geometric Star Pattern Icon Silhouette */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.14]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='1' stroke-opacity='0.4'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='white' stroke-width='0.75' stroke-opacity='0.3'/%3E%3Ccircle cx='40' cy='40' r='6' fill='white' fill-opacity='0.12' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
              aria-hidden="true"
            />
            {/* Subtle Arch Curve Vector */}
            <div
              className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              
              <div className="text-center md:text-left space-y-3 flex-1">
                <span className="text-xs font-bold text-teal-200 uppercase tracking-wider block">
                  Tasbih Digital Santri
                </span>
                
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {activeDzikirTitle}
                  </h2>
                  <p className="text-xl sm:text-2xl font-serif text-teal-200 mt-1 font-bold" dir="rtl">
                    {activeDzikirArabic}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-teal-100/90 max-w-md leading-relaxed">
                  Ketuk lingkaran tasbih untuk menghitung dzikir. Dilengkapi getaran halus dan penanda saat target tercapai.
                </p>

                {/* Target Selector */}
                <div className="pt-2 flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs text-teal-200 font-semibold">Target:</span>
                  {[33, 100, 0].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTasbihTarget(t);
                        setTasbihFinished(false);
                      }}
                      className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        tasbihTarget === t
                          ? "bg-white text-[#049788]"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {t === 0 ? "Bebas" : `${t}x`}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleResetTasbih}
                    aria-label="Reset hitungan tasbih"
                    className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ml-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Tap Target Dial */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleTasbihTap}
                  aria-label="Tekan untuk menambah hitungan tasbih"
                  className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 flex flex-col items-center justify-center transition-all cursor-pointer select-none active:scale-95 shadow-xl ${
                    tasbihFinished
                      ? "border-emerald-300 bg-emerald-700/60 shadow-emerald-500/30"
                      : "border-teal-300/60 bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                    {tasbihCount}
                  </span>
                  <span className="text-xs font-bold text-teal-200 mt-1">
                    {tasbihTarget > 0 ? `${tasbihCount}/${tasbihTarget}` : "Ketuk Disini"}
                  </span>
                </button>
                {tasbihTarget > 0 && (
                  <div className="w-36 sm:w-44 mt-3 bg-black/25 rounded-full h-1.5 overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-200"
                      style={{ width: `${Math.min(100, Math.round((tasbihCount / tasbihTarget) * 100))}%` }}
                    />
                  </div>
                )}
                {tasbihFinished && (
                  <span className="text-xs font-bold text-emerald-200 mt-2 animate-in fade-in">
                    Alhamdulillah, Target Dzikir Tercapai
                  </span>
                )}
              </div>

            </div>
          </section>

          {/* Filter & Search Bar */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-950">Kumpulan Doa & Dzikir Shahih</h2>
                <p className="text-xs text-slate-500">Berdasarkan dalil Al-Qur'an dan riwayat hadits terpercaya</p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari doa, lafadz, atau arti..."
                  value={doaSearchQuery}
                  onChange={(e) => {
                    setDoaSearchQuery(e.target.value);
                    setDoaPage(1);
                  }}
                  aria-label="Cari doa dan dzikir"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#049788] shadow-2xs"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {DOA_DZIKIR_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedDoaCategory(cat.id);
                    setDoaPage(1);
                  }}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedDoaCategory === cat.id
                      ? "bg-[#049788] text-white shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Doa Editorial Presentation */}
          <section ref={doaSectionRef} className="space-y-5">
            {filteredDoaList.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
                <Info className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Doa tidak ditemukan</h3>
                <p className="text-xs text-slate-500">Coba gunakan kata kunci pencarian yang lain.</p>
              </div>
            ) : (
              paginatedDoaList.map((doa) => (
                <article
                  key={doa.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#049788] bg-[#EBF8F6] px-2.5 py-0.5 rounded-full">
                          {doa.time}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {doa.source}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-950 mt-1.5">
                        {doa.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveDzikirTitle(doa.title);
                          setActiveDzikirArabic(doa.arabic.split("\n")[0]);
                          setTasbihTarget(doa.targetCount);
                          setTasbihCount(0);
                          setTasbihFinished(false);
                          window.scrollTo({ top: 120, behavior: "smooth" });
                        }}
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EBF8F6] hover:bg-[#DCF3F0] text-[#049788] font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Buka di Tasbih</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyDoa(doa)}
                        aria-label={`Salin doa ${doa.title}`}
                        className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Teks</span>
                      </button>
                    </div>
                  </div>

                  {/* Arabic Typography */}
                  <div className="py-3 text-right">
                    <p
                      className="text-xl sm:text-2xl font-serif text-slate-950 leading-[2.2] tracking-wide dir-rtl select-all"
                      dir="rtl"
                    >
                      {doa.arabic}
                    </p>
                  </div>

                  {/* Latin Transliteration */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs sm:text-sm text-teal-950 font-medium italic leading-relaxed">
                      "{doa.latin}"
                    </p>
                  </div>

                  {/* Indonesian Translation */}
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Arti Terjemahan:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {doa.translation}
                    </p>
                  </div>

                  {/* Benefit / Faedah */}
                  {doa.benefit && (
                    <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200/80 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                        <span className="font-bold">Keutamaan:</span> {doa.benefit}
                      </p>
                    </div>
                  )}
                </article>
              ))
            )}

            {/* Pagination Controls */}
            {totalDoaPages > 1 && (
              <nav
                aria-label="Paginasi Kumpulan Doa"
                className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200"
              >
                <p className="text-xs text-slate-500 font-medium">
                  Menampilkan{" "}
                  <span className="font-bold text-slate-800">
                    {(doaPage - 1) * DOA_PER_PAGE + 1}–{Math.min(doaPage * DOA_PER_PAGE, filteredDoaList.length)}
                  </span>{" "}
                  dari <span className="font-bold text-slate-800">{filteredDoaList.length}</span> doa
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const prev = Math.max(1, doaPage - 1);
                      setDoaPage(prev);
                      doaSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={doaPage === 1}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-bold gap-1 px-3.5 cursor-pointer"
                    aria-label="Halaman doa sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalDoaPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => {
                          setDoaPage(pageNum);
                          doaSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                        }}
                        aria-current={doaPage === pageNum ? "page" : undefined}
                        aria-label={`Halaman ${pageNum}`}
                        className={`min-h-[44px] min-w-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          doaPage === pageNum
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
                      const next = Math.min(totalDoaPages, doaPage + 1);
                      setDoaPage(next);
                      doaSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={doaPage === totalDoaPages}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-bold gap-1 px-3.5 cursor-pointer"
                    aria-label="Halaman doa selanjutnya"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            )}
          </section>

        </main>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 3: ARAH KIBLAT
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "arah-kiblat" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 animate-in fade-in duration-200">
          
          {/* Focused Precision Astrolabe Compass View */}
          <section
            role="region"
            aria-label="Kompas Digital Arah Kiblat"
            className={`relative rounded-3xl p-7 sm:p-12 text-center transition-all duration-300 border overflow-hidden ${
              isAlignedWithQibla
                ? "bg-[#F0FAF7] border-emerald-400 shadow-xl ring-4 ring-emerald-500/20"
                : "bg-white border-slate-200 shadow-md"
            }`}
          >
            {/* Islamic geometric icon motif overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23049788' stroke-width='1' stroke-opacity='0.25'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%23049788' stroke-width='0.75' stroke-opacity='0.2'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%23049788' fill-opacity='0.08' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '48px 48px',
              }}
              aria-hidden="true"
            />

            {/* Status Announcement Banner */}
            <div className="max-w-md mx-auto mb-6">
              {isAlignedWithQibla ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-black border border-emerald-300 animate-in zoom-in-95">
                  <KaabaIcon className="w-4 h-4 text-emerald-800" />
                  <span>Alhamdulillah, Tepat Menghadap Kiblat!</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold border border-slate-200">
                  <Compass className="w-4 h-4 text-[#049788]" />
                  <span>
                    Arahkan perangkat ke {qiblaInfo.azimuth}° ({qiblaInfo.directionText})
                  </span>
                </div>
              )}
            </div>

            {/* Precision 360-Degree Dial */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto my-6 flex items-center justify-center">
              
              {/* Bezel Ring */}
              <div
                className={`absolute inset-0 rounded-full border-4 transition-colors duration-300 ${
                  isAlignedWithQibla
                    ? "border-emerald-500 bg-emerald-50/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    : "border-slate-200 bg-slate-50/40"
                }`}
              />

              {/* Cardinal Labels */}
              <span className="absolute top-2.5 font-black text-rose-600 text-xs font-mono select-none">
                U (N)
              </span>
              <span className="absolute bottom-2.5 font-black text-slate-500 text-xs font-mono select-none">
                S
              </span>
              <span className="absolute right-2.5 font-black text-slate-500 text-xs font-mono select-none">
                T (E)
              </span>
              <span className="absolute left-2.5 font-black text-slate-500 text-xs font-mono select-none">
                B (W)
              </span>

              {/* Rotating Compass Needle */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out pointer-events-none"
                style={{ transform: `rotate(${activeHeading}deg)` }}
                aria-hidden="true"
              >
                <div className="absolute top-6 w-3 h-24 sm:h-28 bg-gradient-to-t from-slate-400 to-rose-600 rounded-t-full shadow-md" />
                <div className="absolute bottom-6 w-3 h-24 sm:h-28 bg-gradient-to-b from-slate-400 to-slate-700 rounded-b-full shadow-md" />
                <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-white shadow-md z-20" />
              </div>

              {/* Kaaba Target Marker */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ transform: `rotate(${qiblaInfo.azimuth}deg)` }}
                aria-hidden="true"
              >
                <div className="absolute top-1 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white text-white flex items-center justify-center shadow-lg -translate-y-2">
                    <KaabaIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-amber-800 bg-white/95 px-1.5 py-0.5 rounded shadow-2xs font-mono">
                    Ka'bah
                  </span>
                </div>
              </div>

              {/* Center Digital Degrees */}
              <div className="relative z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block leading-tight">
                  {activeHeading}°
                </span>
                <span className="text-xs text-slate-500 font-semibold block">
                  {isSensorActive ? "Sensor Aktif" : "Rotasi Manual"}
                </span>
              </div>
            </div>

            {/* Azimuth & Distance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mt-6">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold block">Azimuth Ka'bah</span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {qiblaInfo.azimuth}°
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold block">Arah Mata Angin</span>
                <span className="text-lg font-black text-slate-900">
                  {qiblaInfo.directionText}
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold block">Jarak ke Makkah</span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {qiblaInfo.distanceKm.toLocaleString("id-ID")} km
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-7 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
              {sensorPermissionNeeded && (
                <button
                  type="button"
                  onClick={requestIosSensorPermission}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#049788] text-white font-bold text-xs shadow-xs hover:bg-[#038073] cursor-pointer"
                >
                  Aktifkan Sensor Kompas (iOS)
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowManualSlider(!showManualSlider)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showManualSlider ? "Tutup Slider Manual" : "Putar Manual (Laptop/PC)"}</span>
              </button>

              <button
                type="button"
                onClick={playPeacefulChime}
                disabled={audioPlaying}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#EBF8F6] hover:bg-[#DCF3F0] text-[#049788] font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                {audioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>Uji Suara Kiblat</span>
              </button>
            </div>

            {/* Slider */}
            {showManualSlider && (
              <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto space-y-3 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Rotasi Derajat Perangkat:</span>
                  <span className="font-mono text-[#049788] bg-[#EBF8F6] px-2.5 py-0.5 rounded-lg font-black">
                    {manualHeading}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={manualHeading}
                  onChange={(e) => {
                    setIsSensorActive(false);
                    setManualHeading(Number(e.target.value));
                  }}
                  className="w-full accent-[#049788] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />

                {/* Preset Angle Pills */}
                <div className="flex items-center justify-between gap-1 pt-1 flex-wrap">
                  <span className="text-xs text-slate-400 font-medium">Pintas:</span>
                  {[
                    { label: "0° (U)", val: 0 },
                    { label: `${qiblaInfo.azimuth}° (Kiblat)`, val: qiblaInfo.azimuth, highlight: true },
                    { label: "90° (T)", val: 90 },
                    { label: "180° (S)", val: 180 },
                    { label: "270° (B)", val: 270 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setIsSensorActive(false);
                        setManualHeading(preset.val);
                      }}
                      className={`min-h-[36px] px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        manualHeading === preset.val
                          ? "bg-[#049788] text-white shadow-2xs"
                          : preset.highlight
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-slate-500">
                  Geser slider atau pilih pintas sudut <span className="font-bold text-[#049788]">{qiblaInfo.azimuth}°</span> untuk menyelaraskan kompas sholat.
                </p>
              </div>
            )}
          </section>

          {/* Compass Calibration Guide */}
          <section className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#049788]" />
              <span>Panduan Akurasi Kompas Smartphone</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-900 block mb-1">1. Gerakan Angka 8</span>
                Gerakkan smartphone Anda membentuk pola angka delapan di udara selama beberapa detik agar sensor magnetometer terkalibrasi.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-900 block mb-1">2. Jauhkan dari Magnet</span>
                Lepas casing HP yang memiliki plat magnet holder, dan jauhkan dari perangkat speaker atau laptop yang memancarkan medan elektromagnetik.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-900 block mb-1">3. Posisi Datar</span>
                Pegang smartphone sejajar dengan lantai atau letakkan di atas sajadah yang rata agar jarum kompas berputar bebas.
              </div>
            </div>
          </section>

        </main>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 4: KALENDER ISLAM
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "kalender-islam" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 animate-in fade-in duration-200">
          
          {/* Header Banner: Today's Date */}
          <section className="relative rounded-3xl bg-[#064E43] text-white p-7 sm:p-10 shadow-xl overflow-hidden">
            {/* Subtle Islamic Geometric Star Pattern Icon Silhouette */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.14]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='1' stroke-opacity='0.4'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='white' stroke-width='0.75' stroke-opacity='0.3'/%3E%3Ccircle cx='40' cy='40' r='6' fill='white' fill-opacity='0.12' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
              aria-hidden="true"
            />
            {/* Subtle Arch Curve Vector */}
            <div
              className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-teal-200 uppercase tracking-wider block">
                  Kalender Islam Hijriyah
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white">
                  {hijriDate}
                </h2>
                <p className="text-xs sm:text-sm text-teal-100/90">
                  {currentTime.toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Sunnah Fasting Reminder */}
              <div className="bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center min-w-[240px]">
                <span className="text-xs text-teal-200 font-bold uppercase tracking-wider block">
                  Puasa Sunnah Rutin
                </span>
                <span className="text-sm font-extrabold text-white mt-1 block">
                  Senin - Kamis & Ayyamul Bidh
                </span>
                <span className="text-xs text-teal-100/80 mt-1 block">
                  Tanggal 13, 14, 15 tiap bulan Hijriyah
                </span>
              </div>
            </div>
          </section>

          {/* Agenda Hari-Hari Besar Islam */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-slate-950">Agenda Hari Besar & Puasa Sunnah</h2>
                <p className="text-xs text-slate-500">Momen penting dan tanggal ibadah utama dalam kalender Islam</p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {["Semua", "Hari Besar", "Puasa Sunnah", "Hari Raya"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setEventCategoryFilter(cat)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      eventCategoryFilter === cat
                        ? "bg-[#049788] text-white shadow-xs"
                        : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {ISLAMIC_EVENTS_LIST.filter(
                (ev) => eventCategoryFilter === "Semua" || ev.category.includes(eventCategoryFilter)
              ).map((event) => (
                <div
                  key={event.name}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-slate-900 text-sm">
                      {event.dateHijri}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${event.badgeColor}`}
                    >
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-950">{event.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Date Converter Widget */}
          <section className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-950">Konverter Tanggal Masehi ke Hijriyah</h3>
              <p className="text-xs text-slate-500">Pilih tanggal kalender Masehi untuk mengetahui tanggal Hijriyahnya secara akurat.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="date"
                  value={converterDate}
                  onChange={(e) => setConverterDate(e.target.value)}
                  aria-label="Pilih tanggal masehi"
                  className="w-full sm:w-60 min-h-[44px] px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-[#049788]"
                />
                <button
                  type="button"
                  onClick={() => setConverterDate(new Date().toISOString().split("T")[0])}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs whitespace-nowrap transition-colors cursor-pointer"
                >
                  Hari Ini
                </button>
              </div>

              <div className="p-3 bg-[#EBF8F6] text-[#049788] rounded-xl border border-[#049788]/20 text-xs font-bold flex-1 w-full text-center sm:text-left flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#049788] shrink-0" />
                <div>
                  <span className="text-slate-600 font-normal">Hasil Konversi Hijriyah: </span>
                  <span className="text-slate-950 font-extrabold ml-1">
                    {getHijriDate(new Date(converterDate))}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Virtues of Fasting Card */}
          <section className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 space-y-2">
            <h3 className="text-sm font-black text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Keutamaan Puasa Sunnah Ayyamul Bidh</span>
            </h3>
            <p className="text-xs text-emerald-950 leading-relaxed">
              Dari Abu Dzar r.a., Rasulullah ﷺ bersabda:{" "}
              <span className="italic font-medium">
                "Jika engkau ingin berpuasa tiga hari setiap bulannya, maka berpuasalah pada tanggal 13, 14, dan 15 (dari bulan Hijriyah)."
              </span>{" "}
              (HR. Tirmidzi no. 761 & An-Nasa'i). Puasa tiga hari di setiap pertengahan bulan Hijriyah bernilai pahala puasa sepanjang tahun karena setiap amal kebaikan dilipatgandakan sepuluh kali.
            </p>
          </section>

        </main>
      )}

      {/* ─── MONTHLY PRAYER SCHEDULE TIMETABLE MODAL ─── */}
      {showMonthlyModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Jadwal Sholat Bulanan Lengkap"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Jadwal Sholat 30 Hari — {locationName}
                </h3>
                <p className="text-xs text-slate-500">
                  Bulan {currentTime.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMonthlyModal(false)}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold">
                    <th className="p-2.5">Tanggal</th>
                    <th className="p-2.5">Imsak</th>
                    <th className="p-2.5">Subuh</th>
                    <th className="p-2.5">Terbit</th>
                    <th className="p-2.5">Dzuhur</th>
                    <th className="p-2.5">Ashar</th>
                    <th className="p-2.5">Maghrib</th>
                    <th className="p-2.5">Isya</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {Array.from({ length: 30 }).map((_, idx) => {
                    const rowDate = new Date();
                    rowDate.setDate(idx + 1);
                    const sched = calculatePrayerTimes(rowDate, activeLat, activeLng, activeTz);
                    const isToday = rowDate.getDate() === currentTime.getDate();

                    return (
                      <tr
                        key={idx}
                        className={isToday ? "bg-[#EBF8F6] text-[#049788] font-bold" : "hover:bg-slate-50 text-slate-700"}
                      >
                        <td className="p-2.5 font-sans font-semibold">
                          {idx + 1} {rowDate.toLocaleDateString("id-ID", { month: "short" })}
                        </td>
                        <td className="p-2.5">{sched.imsak}</td>
                        <td className="p-2.5">{sched.subuh}</td>
                        <td className="p-2.5">{sched.terbit}</td>
                        <td className="p-2.5">{sched.dzuhur}</td>
                        <td className="p-2.5">{sched.ashar}</td>
                        <td className="p-2.5">{sched.maghrib}</td>
                        <td className="p-2.5">{sched.isya}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Waktu sudah termasuk ihtiyat (+2 menit) standar Kemenag RI.</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="font-bold text-[#049788] hover:underline cursor-pointer"
              >
                Cetak Jadwal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
