import React from "react";
import { BookOpen } from "lucide-react";
import { siteConfig } from "../data/content";

export default function Footer({ onNavigate }) {
  const handleNav = (e, path) => {
    e.preventDefault();
    if (path.startsWith("/#")) {
      const targetId = path.replace("/", "");
      if (window.location.pathname !== "/") {
        if (onNavigate) {
          onNavigate("/");
        } else {
          window.location.href = path;
        }
        setTimeout(() => {
          const el = document.querySelector(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (path.startsWith("/")) {
      if (onNavigate) {
        onNavigate(path);
      } else {
        window.location.pathname = path;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Description */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#049788] flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">NgajiQ</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs sm:text-sm">
              Platform belajar Al-Qur'an online yang menghubungkan santri dengan ustadz & ustadzah bersanad secara privat 1-on-1.
            </p>
            <p className="text-xs text-slate-500">
              Bimbingan fleksibel, sabar dari nol, dan bergaransi untuk santri di seluruh Indonesia & mancanegara.
            </p>
          </div>

          {/* Navigasi */}
          <div className="space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="/" onClick={(e) => handleNav(e, "/")} className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="/#kenapa" onClick={(e) => handleNav(e, "/#kenapa")} className="hover:text-white transition-colors">Tentang</a></li>
              <li><a href="/guru-pengajar" onClick={(e) => handleNav(e, "/guru-pengajar")} className="hover:text-white transition-colors">Tenaga Pengajar</a></li>
              <li><a href="/kursus/alquran" onClick={(e) => handleNav(e, "/kursus/alquran")} className="hover:text-white transition-colors">Kursus Al-Qur'an</a></li>
              <li><a href="/#program" onClick={(e) => handleNav(e, "/#program")} className="hover:text-white transition-colors">Program & Kelas</a></li>
              <li><a href="/#cara-kerja" onClick={(e) => handleNav(e, "/#cara-kerja")} className="hover:text-white transition-colors">Lokasi & Cara Kerja</a></li>
              <li><a href="/#testimoni" onClick={(e) => handleNav(e, "/#testimoni")} className="hover:text-white transition-colors">Testimoni</a></li>
              <li><a href="/#artikel" onClick={(e) => handleNav(e, "/#artikel")} className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/#faq" onClick={(e) => handleNav(e, "/#faq")} className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Bantuan */}
          <div className="space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bantuan</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Halo Admin NgajiQ, saya butuh bantuan informasi kelas.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Hubungi Kami
                </a>
              </li>
              <li><a href="/#faq" onClick={(e) => handleNav(e, "/#faq")} className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Media Sosial */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ikuti Kami</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>Instagram</span>
                  <span className="text-slate-500 font-mono">@ngajiq</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>TikTok</span>
                  <span className="text-slate-500 font-mono">@ngajiq</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>YouTube</span>
                  <span className="text-slate-500 font-mono">@ngajiq</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NgajiQ. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Privasi</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">Syarat Ketentuan</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
