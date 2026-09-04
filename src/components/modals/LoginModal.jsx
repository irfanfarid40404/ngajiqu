import React, { useState } from "react";
import {
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { siteConfig } from "@/data/content";

export default function LoginModal({
  isOpen,
  onClose,
  onNavigate,
  onLoginSuccess,
  initialRole = "student",
}) {
  const [role, setRole] = useState(initialRole); // "student" | "admin"
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    setTimeout(() => {
      if (role === "admin") {
        // Admin credentials validation mock
        if (password.length < 4) {
          setErrorMessage("Password minimal 4 karakter.");
          setIsLoading(false);
          return;
        }

        const adminUser = {
          role: "admin",
          name: "Admin Pusat",
          email: identifier || "admin.pusat@ngajiqu.id",
          avatar: "AD",
        };

        if (rememberMe) {
          localStorage.setItem("ngajiq_user", JSON.stringify(adminUser));
        } else {
          sessionStorage.setItem("ngajiq_user", JSON.stringify(adminUser));
        }

        setSuccessMessage("Login Admin Berhasil! Mengalihkan ke panel operasional...");
        setIsLoading(false);

        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(adminUser);
          onClose();
          if (onNavigate) onNavigate("/admin");
          else window.location.pathname = "/admin";
        }, 600);
      } else {
        // Student credentials validation mock
        if (password.length < 4) {
          setErrorMessage("Password minimal 4 karakter.");
          setIsLoading(false);
          return;
        }

        const studentUser = {
          role: "student",
          name: identifier.includes("@") ? identifier.split("@")[0] : "Ahmad Fauzi",
          email: identifier || "ahmad.fauzi@example.com",
          program: "Tahsin & Tajwid Al-Qur'an",
          level: 4,
        };

        if (rememberMe) {
          localStorage.setItem("ngajiq_user", JSON.stringify(studentUser));
        } else {
          sessionStorage.setItem("ngajiq_user", JSON.stringify(studentUser));
        }

        setSuccessMessage("Alhamdulillah, Login Berhasil! Membuka Dashboard Santri...");
        setIsLoading(false);

        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(studentUser);
          onClose();
          if (onNavigate) onNavigate("/dashboard");
          else window.location.pathname = "/dashboard";
        }, 600);
      }
    }, 700);
  };

  // One-click quick login for demo
  const handleQuickLogin = (targetRole) => {
    setIsLoading(true);
    setRole(targetRole);
    setErrorMessage("");

    if (targetRole === "admin") {
      setIdentifier("admin.pusat@ngajiqu.id");
      setPassword("admin123");
    } else {
      setIdentifier("ahmad.fauzi@example.com");
      setPassword("santri123");
    }

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
              program: "Tahsin & Tajwid Al-Qur'an",
              level: 4,
            };

      localStorage.setItem("ngajiq_user", JSON.stringify(user));
      setSuccessMessage(`Login cepat sebagai ${user.name} berhasil!`);
      setIsLoading(false);

      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(user);
        onClose();
        const targetPath = targetRole === "admin" ? "/admin" : "/dashboard";
        if (onNavigate) onNavigate(targetPath);
        else window.location.pathname = targetPath;
      }, 500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Ambient Glow */}
        <div className="relative p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-[#049788]/90 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup popup login"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-teal-300" />
              <span>Portal Masuk NgajiQ</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">
              Selamat Datang Kembali
            </h2>
            <p className="text-xs text-slate-300">
              Masuk ke akun belajar santri atau panel operasional admin
            </p>
          </div>

          {/* Role Switcher Tab */}
          <div className="mt-4 grid grid-cols-2 p-1 bg-white/10 rounded-2xl backdrop-blur-xs text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setRole("student");
                setErrorMessage("");
              }}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === "student"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Santri & Wali</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setErrorMessage("");
              }}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === "admin"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staf & Admin</span>
            </button>
          </div>
        </div>

        {/* Body Content Form */}
        <div className="p-6 space-y-4">

          {/* Error / Success Alerts */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in duration-150 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Identifier input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                {role === "admin" ? "Email Admin" : "Email atau No. WhatsApp"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder={
                    role === "admin"
                      ? "admin.pusat@ngajiqu.id"
                      : "ahmad.fauzi@example.com / 081234..."
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">
                  Kata Sandi
                </label>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Halo Admin NgajiQ, saya lupa password akun ${
                      role === "admin" ? "Admin" : "Santri"
                    }. Mohon bantuan reset password.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#049788] hover:underline"
                >
                  Lupa Sandi?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Masukkan kata sandi..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#049788] focus:ring-2 focus:ring-[#049788]/20 bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#049788] rounded border-slate-300 focus:ring-[#049788]"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white font-bold text-xs shadow-md shadow-[#049788]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke {role === "admin" ? "Panel Admin" : "Dashboard Santri"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Akses Cepat (Demo)
            </span>
          </div>

          {/* Quick 1-Click Demo Logins */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("student")}
              disabled={isLoading}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-[#049788] hover:bg-[#EBF8F6]/60 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#049788]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Demo Santri</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Langsung ke Area Belajar</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              disabled={isLoading}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-[#049788] hover:bg-[#EBF8F6]/60 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#049788]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Demo Admin</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Langsung ke Central Ops</p>
            </button>
          </div>

          {/* Bottom Switch to Register */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            <span>Belum memiliki akun belajar? </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigate) onNavigate("/daftar-kelas");
                else window.location.pathname = "/daftar-kelas";
              }}
              className="font-bold text-[#049788] hover:underline cursor-pointer"
            >
              Daftar Kelas Sekarang
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

