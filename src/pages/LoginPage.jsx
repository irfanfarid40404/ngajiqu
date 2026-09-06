import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  BookOpen,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Mail,
  Lock,
} from "lucide-react";
import { siteConfig } from "@/data/content";

export function LoginPage({ onNavigate, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const navigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const executeLogin = (user, redirectPath) => {
    if (formData.rememberMe) {
      localStorage.setItem("ngajiq_user", JSON.stringify(user));
    } else {
      sessionStorage.setItem("ngajiq_user", JSON.stringify(user));
    }
    if (onLoginSuccess) onLoginSuccess(user);
    navigate(redirectPath);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback("");

    setTimeout(() => {
      const emailLower = (formData.email || "").toLowerCase().trim();
      const isAdmin =
        emailLower.includes("admin") ||
        emailLower === "admin@ngajiqu.id" ||
        emailLower === "admin.pusat@ngajiqu.id";

      const userName = isAdmin
        ? "Admin Pusat"
        : emailLower.includes("@")
        ? emailLower.split("@")[0].charAt(0).toUpperCase() + emailLower.split("@")[0].slice(1)
        : "Ahmad Fauzi";

      const user = {
        role: isAdmin ? "admin" : "student",
        name: userName,
        email: formData.email || (isAdmin ? "admin@ngajiqu.id" : "ahmad.fauzi@example.com"),
        avatar: isAdmin ? "AD" : userName.charAt(0).toUpperCase(),
        program: "Tahsin & Tajwid Al-Qur'an",
        level: 4,
      };

      setFeedback(
        isAdmin
          ? "Login Admin berhasil! Membuka Portal Admin..."
          : "Alhamdulillah! Membuka Dashboard Santri..."
      );
      setIsLoading(false);

      setTimeout(() => {
        executeLogin(user, isAdmin ? "/admin" : "/dashboard");
      }, 500);
    }, 600);
  };

  const handleQuickLogin = (targetRole) => {
    setIsLoading(true);
    setFeedback("");
    setTimeout(() => {
      const user =
        targetRole === "admin"
          ? {
              role: "admin",
              name: "Admin Pusat",
              email: "admin.pusat@ngajiqu.id",
              avatar: "AD",
            }
          : {
              role: "student",
              name: "Ahmad Fauzi",
              email: "ahmad.fauzi@example.com",
              avatar: "A",
              program: "Tahsin & Tajwid Al-Qur'an",
              level: 4,
            };

      setFeedback(`Login cepat sebagai ${user.name}...`);
      setIsLoading(false);

      setTimeout(() => {
        executeLogin(user, targetRole === "admin" ? "/admin" : "/dashboard");
      }, 400);
    }, 400);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = {
        role: "student",
        name: provider === "Google" ? "Santri Google" : "Santri NgajiQ",
        email: "santri@gmail.com",
        avatar: "G",
        program: "Tahsin & Tajwid Al-Qur'an",
        level: 1,
      };
      setFeedback(`Terhubung via ${provider}...`);
      setIsLoading(false);
      setTimeout(() => {
        executeLogin(user, "/dashboard");
      }, 400);
    }, 400);
  };

  const handleForgotPassword = () => {
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber || "6281234567890"}?text=${encodeURIComponent(
        "Halo Admin NgajiQ, saya ingin meminta bantuan reset kata sandi akun bimbingan saya."
      )}`,
      "_blank"
    );
  };

  return (
    <div className="h-screen w-screen bg-slate-950 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden font-sans">
      
      {/* ─── LEFT PANEL: Visual Artwork & NgajiQ Brand Identity (Desktop Only) ─── */}
      <div className="hidden md:flex relative overflow-hidden md:h-full md:flex-1 shrink-0 bg-gradient-to-br from-slate-950 via-[#033B36] to-slate-900 flex-col justify-between p-6 sm:p-10">
        
        {/* Ambient Teal Glow Orbs */}
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#049788]/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true" 
        />
        <div 
          className="absolute bottom-10 right-0 w-96 h-96 bg-[#2DD4BF]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true" 
        />

        {/* Islamic Khatam Star Pattern Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232DD4BF' stroke-width='1' stroke-opacity='0.4'%3E%3Cpath d='M40 0 L50 20 L70 10 L60 30 L80 40 L60 50 L70 70 L50 60 L40 80 L30 60 L10 70 L20 50 L0 40 L20 30 L10 10 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='14' stroke='%232DD4BF' stroke-width='0.75' stroke-opacity='0.3'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%232DD4BF' fill-opacity='0.15' stroke='none'/%3E%3Cpath d='M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65' stroke-opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true" 
        />

        {/* Brand Asset Image (NgajiQ Authentic Tutor Photo) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-tutor.jpg"
            alt="Bimbingan Mengaji NgajiQ"
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/35" />
        </div>

        {/* Top Action: Floating Glassmorphic Back Button */}
        <div className="relative z-10 flex items-center justify-start">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold transition-all border border-white/15 cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>

        {/* Bottom Hero Highlight on Left Panel */}
        <div className="relative z-10 space-y-3 max-w-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#049788] text-white flex items-center justify-center shadow-lg shadow-[#049788]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block leading-none">
                NgajiQ
              </span>
              <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                Belajar Al-Qur'an & Fiqih
              </span>
            </div>
          </div>

          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
            Bimbingan Mengaji Privat <br />
            <span className="text-[#2DD4BF]">Bersama Guru Bersanad.</span>
          </h2>
          
          <p className="text-xs text-slate-300 leading-relaxed">
            Tingkatkan kualitas bacaan Al-Qur'an dan pemahaman ibadah Anda dengan kurikulum terstruktur, waktu fleksibel 24/7, dan bimbingan 1-on-1 intensif.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-teal-100/90 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>1.200+ Santri Aktif</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>Garansi Cocok Guru</span>
            </div>
          </div>
        </div>

      </div>

      {/* ─── RIGHT PANEL: Form Section (NgajiQ Colorway) ─── */}
      <div className="flex-1 min-h-screen md:min-h-0 flex items-center justify-center bg-white p-5 sm:p-8 md:p-12 lg:p-14 overflow-y-auto">
        <div className="w-full max-w-md py-4">
          
          {/* Header Mobile: Back Button & Brand */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#049788] text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span className="font-black text-slate-950 text-sm">NgajiQ</span>
            </div>
          </div>

          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
              Selamat Datang Kembali
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Belum memiliki akun santri?{" "}
              <button
                type="button"
                onClick={() => navigate("/daftar-kelas")}
                className="text-[#049788] hover:text-[#038073] font-bold underline-offset-2 hover:underline cursor-pointer"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>

          {/* Feedback Alert */}
          {feedback && (
            <div className="mb-5 p-3 rounded-xl bg-[#EBF8F6] border border-[#049788]/30 text-[#049788] text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#049788]" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email / WhatsApp */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                Alamat Email atau No. WhatsApp
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ahmad.fauzi@example.com / 081234..."
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#049788]/20 focus:border-[#049788] outline-none transition-all bg-slate-50/50 focus:bg-white text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-12 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#049788]/20 focus:border-[#049788] outline-none transition-all bg-slate-50/50 focus:bg-white text-slate-900 placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center space-x-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#049788] rounded border-slate-300 focus:ring-[#049788] accent-[#049788] cursor-pointer"
                />
                <span>Ingat saya</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs sm:text-sm text-[#049788] hover:text-[#038073] font-bold hover:underline cursor-pointer"
              >
                Lupa sandi?
              </button>
            </div>

            {/* Submit Button (Teal Signature) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white py-3 sm:py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-[#049788]/25 transition-all cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memproses Masuk...</span>
                </>
              ) : (
                <span>Masuk ke Akun</span>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-400 font-semibold uppercase tracking-wider">
                  atau masuk dengan
                </span>
              </div>
            </div>

            {/* Social Button (Google) */}
            <div>
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl hover:bg-[#EBF8F6]/50 hover:border-[#049788]/40 transition-all cursor-pointer disabled:opacity-50 group shadow-2xs"
              >
                {/* Google SVG */}
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                  Lanjutkan dengan Google
                </span>
              </button>
            </div>

            {/* Quick Demo Logins for Fast Review */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block text-center">
                Akses Uji Coba Cepat (Demo 1-Klik)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("student")}
                  disabled={isLoading}
                  className="px-3 py-2 rounded-xl bg-[#EBF8F6] hover:bg-[#DCF3F0] text-[#049788] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#049788]/20"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Demo Santri</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin")}
                  disabled={isLoading}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Demo Admin</span>
                </button>
              </div>
            </div>

          </form>

          {/* Footer Copyright */}
          <div className="mt-8 text-center text-xs text-slate-400">
            © 2026 NgajiQ. Seluruh Hak Cipta Dilindungi.
          </div>

        </div>
      </div>

    </div>
  );
}

export default LoginPage;
