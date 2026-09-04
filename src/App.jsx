import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import WhyNgajikuSection from "./components/WhyNgajikuSection";
import BentoLearningSection from "./components/BentoLearningSection";
import TeachersSection from "./components/TeachersSection";
import TeachersPage from "./components/TeachersPage";
import QuranCoursePage from "./components/QuranCoursePage";
import FiqihCoursePage from "./components/FiqihCoursePage";
import NahwuShorofCoursePage from "./components/NahwuShorofCoursePage";
import RegisterPage from "./components/RegisterPage";
import BlogPage from "./components/BlogPage";
import HowItWorksSection from "./components/HowItWorksSection";
import GallerySection from "./components/GallerySection";
import PromoSection from "./components/PromoSection";
import PricingSection from "./components/PricingSection";
import TestimonialSection from "./components/TestimonialSection";
import ArticlesSection from "./components/ArticlesSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import RegisterModal from "./components/RegisterModal";
import TrialPromoModal from "./components/TrialPromoModal";
import ClientDashboard from "./components/ClientDashboard";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState("");
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update SEO Document Title & Description dynamically per route
  useEffect(() => {
    if (currentPath === "/kursus/alquran") {
      document.title = "Kursus Al-Qur'an Online | NgajiQ";
    } else if (currentPath === "/kursus/fiqih") {
      document.title = "Kursus Fiqih Online | NgajiQ";
    } else if (currentPath === "/kursus/nahwu-shorof") {
      document.title = "Kursus Nahwu & Shorof Online | NgajiQ";
    } else if (currentPath === "/daftar" || currentPath === "/daftar-kelas") {
      document.title = "Pendaftaran Kelas Bimbingan Privat 1-on-1 | NgajiQ";
    } else if (currentPath === "/dashboard" || currentPath === "/santri" || currentPath === "/client-dashboard") {
      document.title = "Area Santri | Dashboard Pembelajaran NgajiQ";
    } else if (currentPath === "/admin" || currentPath === "/admin-dashboard") {
      document.title = "Panel Operasional & Manajemen Admin | NgajiQ";
    } else if (currentPath === "/guru-pengajar") {
      document.title = "Tenaga Pengajar & Guru Bersanad | NgajiQ";
    } else if (currentPath === "/blog" || currentPath === "/artikel") {
      document.title = "Blog & Panduan Belajar Mengaji | NgajiQ";
    } else {
      document.title = "NgajiQ — Bimbingan Mengaji Privat 1-on-1 untuk Dewasa & Anak";
    }
  }, [currentPath]);

  const handleNavigate = (path) => {
    if (path !== currentPath) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [promoModalOpen, setPromoModalOpen] = useState(false);

  useEffect(() => {
    // Auto trigger promo modal after 8 seconds if not dismissed in this session
    const isDismissed = sessionStorage.getItem("ngajiku_promo_dismissed");
    let timer;
    if (!isDismissed) {
      timer = setTimeout(() => {
        setPromoModalOpen(true);
      }, 8000);
    }

    const handleOpenPromoEvent = () => setPromoModalOpen(true);
    window.addEventListener("open-trial-promo", handleOpenPromoEvent);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-trial-promo", handleOpenPromoEvent);
    };
  }, []);

  const handleClosePromoModal = () => {
    setPromoModalOpen(false);
    sessionStorage.setItem("ngajiku_promo_dismissed", "true");
  };

  const handleOpenModal = (packageName = "") => {
    setSelectedPackageForModal(packageName);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (modalOpen) handleCloseModal();
        if (promoModalOpen) handleClosePromoModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, promoModalOpen]);

  const isTeachersPage = currentPath === "/guru-pengajar";
  const isBlogPage = currentPath === "/blog" || currentPath === "/artikel";
  const isQuranCoursePage = currentPath === "/kursus/alquran";
  const isFiqihCoursePage = currentPath === "/kursus/fiqih";
  const isNahwuShorofCoursePage = currentPath === "/kursus/nahwu-shorof";
  const isRegisterPage = currentPath === "/daftar" || currentPath === "/daftar-kelas";
  const isDashboardPage =
    currentPath === "/dashboard" ||
    currentPath === "/santri" ||
    currentPath === "/client-dashboard";
  const isAdminPage =
    currentPath === "/admin" ||
    currentPath === "/admin-dashboard";

  if (isDashboardPage) {
    return <ClientDashboard onNavigate={handleNavigate} />;
  }

  if (isAdminPage) {
    return <AdminDashboard onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-slate-900 flex flex-col font-sans selection:bg-[#049788] selection:text-white">

      {/* 1. Navbar */}
      <Navbar
        onOpenModal={handleOpenModal}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      <main className="flex-grow pt-20">
        {isRegisterPage ? (
          /* Dedicated Registration Page */
          <RegisterPage />
        ) : isBlogPage ? (
          /* Dedicated Blog Page */
          <BlogPage onOpenModal={handleOpenModal} onNavigate={handleNavigate} />
        ) : isQuranCoursePage ? (
          /* Dedicated Quran Course Page */
          <QuranCoursePage onOpenModal={handleOpenModal} onNavigate={handleNavigate} />
        ) : isFiqihCoursePage ? (
          /* Dedicated Fiqih Course Page */
          <FiqihCoursePage onOpenModal={handleOpenModal} onNavigate={handleNavigate} />
        ) : isNahwuShorofCoursePage ? (
          /* Dedicated Nahwu & Shorof Course Page */
          <NahwuShorofCoursePage onOpenModal={handleOpenModal} onNavigate={handleNavigate} />
        ) : isTeachersPage ? (
          /* Dedicated Teachers Page */
          <TeachersPage onOpenModal={handleOpenModal} />
        ) : (
          /* Full Landing Page Flow */
          <>
            {/* 2. Hero — Apa itu NgajiQ? Untuk siapa? CTA utama. */}
            <Hero onOpenModal={handleOpenModal} onNavigate={handleNavigate} />

            {/* 3. Statistik — Social proof awal: jumlah santri, guru, rating */}
            <StatsBar />

            {/* 4. Kelebihan NgajiQ — Kenapa pilih NgajiQ? Diferensiasi nyata. */}
            <WhyNgajikuSection />

            {/* 5. Program Pembelajaran NgajiQ (Bento Grid SD, SMP, SMA) */}
            <BentoLearningSection onOpenModal={handleOpenModal} />

            {/* 6. Tim Pengajar — Carousel Preview */}
            <TeachersSection onOpenModal={handleOpenModal} />
            <HowItWorksSection onOpenModal={handleOpenModal} />

            {/* 7. Galeri Kegiatan — Momen pembelajaran visual komunitas */}
            <GallerySection />

            {/* 8. Promo & Penawaran Spesial */}
            <PromoSection onOpenModal={handleOpenModal} />

            {/* 9. Paket Pembelajaran — Berapa biayanya? Apa perbedaan paket? */}
            <PricingSection onOpenModal={handleOpenModal} />

            {/* 10. Testimoni — Terbukti berhasil? Siapa yang sudah berhasil? */}
            <TestimonialSection onOpenModal={handleOpenModal} />

            {/* 11. Artikel & Panduan Mengaji */}
            <ArticlesSection onNavigate={handleNavigate} />

            {/* 12. FAQ — Pertanyaan seputar bimbingan mengaji */}
            <FaqSection />

            {/* 13. CTA — Mulai belajar mengaji */}
            <CtaSection onOpenModal={handleOpenModal} onNavigate={handleNavigate} />
          </>
        )}
      </main>

      {/* 14. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Registration Modal */}
      <RegisterModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        defaultPackage={selectedPackageForModal}
      />

      {/* Trial Promo Modal */}
      <TrialPromoModal
        isOpen={promoModalOpen}
        onClose={handleClosePromoModal}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
