import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Menu, X, ArrowUpRight, MessageSquare, ChevronDown, Clock, MapPin, User } from "lucide-react";
import { siteConfig } from "../data/content";

export default function Navbar({ _onOpenModal, currentPath = "/", onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [kelasDropdownOpen, setKelasDropdownOpen] = useState(false);
  const [waktuSolatModalOpen, setWaktuSolatModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setKelasDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Tentang", href: "/#kenapa" },
    { label: "Tenaga Pengajar", href: "/guru-pengajar" },
    {
      label: "Kursus",
      hasDropdown: true,
      children: [
        { label: "Kursus Al-Qur'an", href: "/kursus/alquran", desc: "Tahsin, Tajwid, & Tahfidz Privat" },
        { label: "Kursus Fiqih", href: "/kursus/fiqih", desc: "Ibadah, Muamalah, & Fiqih Kontemporer" },
        { label: "Kursus Nahwu & Shorof", href: "/kursus/nahwu-shorof", desc: "Kaidah Bahasa Arab & Baca Kitab" },
        { label: "Program Pembelajaran", href: "/#program", desc: "Jenjang SD, SMP, SMA, & Dewasa" },
        { label: "Paket & Biaya Kelas", href: "/#kelas", desc: "Pilihan paket privat 1-on-1" },
        { label: "Promo Spesial", href: "/#promo", desc: "Voucher & diskon pendaftaran" },
      ],
    },
    { label: "Hubungi", href: `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Halo Admin NgajiQ, saya ingin tanya informasi kelas.")}`, isExternal: true },
    { label: "Lokasi", href: "/#cara-kerja" },
    { label: "Waktu Solat", action: "waktu-solat" },
    { label: "Testimoni", href: "/#testimoni" },
    { label: "Blog", href: "/blog" },
  ];

  const handleLinkClick = (e, item) => {
    if (item.action === "waktu-solat") {
      e.preventDefault();
      setWaktuSolatModalOpen(true);
      setMobileMenuOpen(false);
      return;
    }

    if (item.isExternal) {
      setMobileMenuOpen(false);
      return;
    }

    const href = item.href;

    if (
      href === "/kursus/alquran" ||
      href === "/kursus/fiqih" ||
      href === "/kursus/nahwu-shorof" ||
      href === "/guru-pengajar" ||
      href === "/blog" ||
      href === "/artikel" ||
      href === "/daftar-kelas" ||
      href === "/daftar" ||
      href === "/dashboard" ||
      href === "/santri" ||
      href === "/admin" ||
      href === "/admin-dashboard"
    ) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(href);
      } else {
        window.location.pathname = href;
      }
      setMobileMenuOpen(false);
      setKelasDropdownOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href === "/") {
      if (currentPath !== "/") {
        e.preventDefault();
        if (onNavigate) {
          onNavigate("/");
        } else {
          window.location.pathname = "/";
        }
      }
      setMobileMenuOpen(false);
      setKelasDropdownOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("/#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      setKelasDropdownOpen(false);
      const targetId = href.replace("/", "");
      if (currentPath !== "/") {
        if (onNavigate) {
          onNavigate("/");
        } else {
          window.location.href = href;
        }
        setTimeout(() => {
          const el = document.querySelector(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const prayerTimes = [
    { name: "Imsak", time: "04:32 WIB" },
    { name: "Subuh", time: "04:42 WIB" },
    { name: "Terbit", time: "05:54 WIB" },
    { name: "Dzuhur", time: "12:02 WIB" },
    { name: "Ashar", time: "15:18 WIB" },
    { name: "Maghrib", time: "18:05 WIB" },
    { name: "Isya", time: "19:14 WIB" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "top-3 sm:top-4 px-3 sm:px-6"
            : "top-0 px-4 sm:px-8 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 sm:py-4 shadow-2xs"
        }`}
      >
        <div
          className={`transition-all duration-300 ease-out ${
            isScrolled
              ? "max-w-5xl lg:max-w-6xl mx-auto rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.10)] py-2 sm:py-2.5 px-4 sm:px-6"
              : "max-w-7xl mx-auto"
          }`}
        >
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, { href: "/" })}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className={`rounded-xl bg-[#049788] text-white flex items-center justify-center shadow-md shadow-[#049788]/20 group-hover:scale-105 transition-all duration-300 ${
                isScrolled ? "w-8 h-8 rounded-full" : "w-9 h-9 sm:w-10 sm:h-10 rounded-xl"
              }`}>
                <BookOpen className={isScrolled ? "w-4 h-4" : "w-4.5 h-4.5 sm:w-5 sm:h-5"} />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-950 flex items-center gap-1 leading-tight">
                  NgajiQ
                  <span className="w-1.5 h-1.5 rounded-full bg-[#049788]"></span>
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Belajar Al-Qur'an
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links matching exact items: Tentang | Tenaga Pengajar | Kursus ⌄ | Hubungi | Lokasi | Waktu Solat | Testimoni | Blog */}
            <nav className={`hidden lg:flex items-center transition-all duration-300 ${
              isScrolled
                ? "gap-0.5 bg-slate-100/70 p-1 rounded-full border border-slate-200/60"
                : "gap-4 xl:gap-6"
            }`}>
              {navItems.map((item) => {
                const isTeacherActive = item.href === "/guru-pengajar" && currentPath === "/guru-pengajar";
                const isBlogActive =
                  (item.href === "/blog" || item.href === "/artikel") &&
                  (currentPath === "/blog" || currentPath === "/artikel");
                const isKursusActive =
                  item.hasDropdown &&
                  (currentPath === "/kursus/alquran" ||
                    currentPath === "/kursus/fiqih" ||
                    currentPath === "/kursus/nahwu-shorof");

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.label}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setKelasDropdownOpen(true)}
                      onMouseLeave={() => setKelasDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setKelasDropdownOpen((prev) => !prev)}
                        className={`inline-flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                          isKursusActive
                            ? "text-[#049788] bg-[#EBF8F6] px-3 py-1.5 rounded-full text-xs font-bold"
                            : isScrolled
                            ? "px-3 py-1.5 rounded-full text-xs text-slate-700 hover:text-[#049788] hover:bg-white shadow-2xs"
                            : "text-xs sm:text-sm text-slate-700 hover:text-[#049788]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${kelasDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {kelasDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200/90 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              onClick={(e) => handleLinkClick(e, child)}
                              className="block p-3 rounded-xl hover:bg-[#EBF8F6] text-left transition-colors group"
                            >
                              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#049788]">
                                {child.label}
                              </div>
                              <div className="text-xs text-slate-500">
                                {child.desc}
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.isExternal) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-semibold transition-all ${
                        isScrolled
                          ? "px-3 py-1.5 rounded-full text-xs text-slate-700 hover:text-[#049788] hover:bg-white shadow-2xs"
                          : "text-xs sm:text-sm text-slate-700 hover:text-[#049788]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                }

                if (item.action === "waktu-solat") {
                  return (
                    <button
                      key={item.label}
                      onClick={() => setWaktuSolatModalOpen(true)}
                      className={`font-semibold transition-all cursor-pointer ${
                        isScrolled
                          ? "px-3 py-1.5 rounded-full text-xs text-slate-700 hover:text-[#049788] hover:bg-white shadow-2xs"
                          : "text-xs sm:text-sm text-slate-700 hover:text-[#049788]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`font-semibold transition-all ${
                      isTeacherActive || isBlogActive
                        ? "text-[#049788] bg-[#EBF8F6] px-3 py-1.5 rounded-full text-xs font-bold"
                        : isScrolled
                        ? "px-3 py-1.5 rounded-full text-xs text-slate-700 hover:text-[#049788] hover:bg-white shadow-2xs"
                        : "text-xs sm:text-sm text-slate-700 hover:text-[#049788]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Action Button (Right) */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="/dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate("/dashboard");
                  else window.location.pathname = "/dashboard";
                }}
                className={`inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#049788] bg-slate-100 hover:bg-[#EBF8F6] active:scale-95 rounded-full transition-all border border-slate-200/80 cursor-pointer ${
                  isScrolled ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-xs"
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#049788]" />
                <span>Area Santri</span>
              </a>

              <a
                href="/daftar-kelas"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate("/daftar-kelas");
                  else window.location.pathname = "/daftar-kelas";
                }}
                className={`inline-flex items-center gap-1.5 font-bold text-white bg-[#049788] hover:bg-[#038073] active:scale-95 rounded-full transition-all shadow-sm shadow-[#049788]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] cursor-pointer ${
                  isScrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2.5 text-xs sm:text-sm"
                }`}
              >
                <span>Daftar Kelas</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="/daftar-kelas"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate("/daftar-kelas");
                  else window.location.pathname = "/daftar-kelas";
                }}
                className="sm:hidden px-3.5 py-1.5 text-xs font-bold text-white bg-[#049788] rounded-full active:scale-95 shadow-xs cursor-pointer"
              >
                Daftar
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-slate-950 rounded-full border border-slate-200 bg-white shadow-2xs active:scale-95"
                aria-label="Buka menu navigasi"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Floating Card */}
        {mobileMenuOpen && (
          <div className={`lg:hidden mt-2.5 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 space-y-3 ${
            isScrolled ? "max-w-5xl lg:max-w-6xl mx-auto" : "max-w-7xl mx-auto"
          }`}>
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <React.Fragment key={item.label}>
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={(e) => handleLinkClick(e, child)}
                          className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#049788] hover:bg-[#EBF8F6] rounded-xl transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </React.Fragment>
                  );
                }

                if (item.action === "waktu-solat") {
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setWaktuSolatModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#049788] hover:bg-[#EBF8F6] rounded-xl transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#049788] hover:bg-[#EBF8F6] rounded-xl transition-colors"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Konsultasi WhatsApp</span>
              </a>

              <a
                href="/dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate("/dashboard");
                  else window.location.pathname = "/dashboard";
                }}
                className="w-full py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-[#EBF8F6] rounded-full flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#049788]" />
                <span>Masuk Area Santri (Dashboard)</span>
              </a>

              <a
                href="/daftar-kelas"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate("/daftar-kelas");
                  else window.location.pathname = "/daftar-kelas";
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#049788] hover:bg-[#038073] rounded-full shadow-md shadow-[#049788]/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Daftar Kelas Percobaan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Waktu Solat Popup Modal */}
      {waktuSolatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-[#049788] to-[#038073] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    Jadwal Waktu Solat
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-teal-100 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>WIB · Jakarta & Sekitarnya</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setWaktuSolatModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                aria-label="Tutup jadwal solat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prayer Times List */}
            <div className="p-5 space-y-2">
              {prayerTimes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-[#EBF8F6] transition-colors border border-slate-100"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    {item.name}
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-[#049788]">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button
                onClick={() => setWaktuSolatModalOpen(false)}
                className="w-full py-2.5 bg-[#049788] hover:bg-[#038073] text-white text-xs font-bold rounded-xl transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
