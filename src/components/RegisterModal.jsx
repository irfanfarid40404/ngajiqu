import React, { useState } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { siteConfig } from "../data/content";

export default function RegisterModal({ isOpen, onClose, defaultPackage }) {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    gender: "akhwat",
    experience: "nol",
    preferredTime: "malam",
    packageName: defaultPackage || "Paket Reguler (2x Seminggu)",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    setTimeout(() => {
      const message = `Halo Admin NgajiQ, saya ingin mendaftar kelas mengaji privat:
- Nama: ${formData.name}
- Tutor: ${formData.gender === "akhwat" ? "Perempuan (Ustadzah)" : "Laki-laki (Ustadz)"}
- Level: ${formData.experience}
- Jadwal: ${formData.preferredTime}
- Program: ${formData.packageName}`;
      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
      onClose();
      setSubmitted(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Pendaftaran Kelas Privat
            </h3>
            <p className="text-xs text-slate-400">Konsultasi & Penentuan Jadwal</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Tutup Dialog Pendaftaran"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-slate-950">Meneruskan ke WhatsApp Admin...</h4>
            <p className="text-xs text-slate-500">
              Admin akan segera memverifikasi ketersediaan jadwal bimbingan Anda.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            
            {defaultPackage && (
              <div className="p-3 bg-[#EBF8F6] text-[#02665C] text-xs font-semibold rounded-lg">
                Pilihan Program: <strong>{defaultPackage}</strong>
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                placeholder="Nama Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#049788]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Nomor WhatsApp Aktif
              </label>
              <input
                type="tel"
                required
                placeholder="08xxxxxxxxxx"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#049788]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Preferensi Guru
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#049788] text-xs"
                >
                  <option value="akhwat">Ustadzah (Perempuan)</option>
                  <option value="ikhwan">Ustadz (Laki-laki)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Kemampuan Awal
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#049788] text-xs"
                >
                  <option value="nol">Dari Nol</option>
                  <option value="terbata">Masih Terbata-bata</option>
                  <option value="lancar_rapikan">Rapikan Tajwid</option>
                  <option value="hafalan">Hafalan / Murajaah</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Waktu Luang yang Diinginkan
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#049788] text-xs"
              >
                <option value="malam">Malam (19.00 - 22.00 WIB)</option>
                <option value="pagi">Pagi Hari (06.00 - 10.00 WIB)</option>
                <option value="siang">Siang / Sore (13.00 - 17.00 WIB)</option>
                <option value="weekend">Akhir Pekan (Sabtu/Ahad)</option>
                <option value="fleksibel">Fleksibel</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#049788]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788]"
              >
                <span>Lanjutkan ke WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
