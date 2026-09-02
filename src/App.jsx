import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import WhyNgajikuSection from "./components/WhyNgajikuSection";
import BentoLearningSection from "./components/BentoLearningSection";
import TeachersSection from "./components/TeachersSection";
import TeachersPage from "./components/TeachersPage";
import QuranCoursePage from "./components/QuranCoursePage";
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
    } else if (currentPath === "/guru-pengajar") {
      document.title = "Tenaga Pengajar & Guru Bersanad | NgajiQ";
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

  const handleOpenModal = (packageName = "") => {
    setSelectedPackageForModal(packageName);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const isTeachersPage = currentPath === "/guru-pengajar";
  const isQuranCoursePage = currentPath === "/kursus/alquran";

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-slate-900 flex flex-col font-sans selection:bg-[#049788] selection:text-white">

      {/* 1. Navbar */}
      <Navbar
        onOpenModal={handleOpenModal}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      <main className="flex-grow pt-20">
        {isQuranCoursePage ? (
          /* Dedicated Quran Course Page */
          <QuranCoursePage onOpenModal={handleOpenModal} />
        ) : isTeachersPage ? (
          /* Dedicated Teachers Page */
          <TeachersPage onOpenModal={handleOpenModal} />
        ) : (
          /* Full Landing Page Flow */
          <>
            {/* 2. Hero — Apa itu NgajiQ? Untuk siapa? CTA utama. */}
            <Hero onOpenModal={handleOpenModal} />

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
            <ArticlesSection />

            {/* 12. FAQ — Pertanyaan seputar bimbingan mengaji */}
            <FaqSection />

            {/* 13. CTA — Mulai belajar mengaji */}
            <CtaSection onOpenModal={handleOpenModal} />
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
    </div>
  );
}
