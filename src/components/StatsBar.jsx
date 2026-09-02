import React from "react";
import { Users, Award, BookOpen } from "lucide-react";
import { stats } from "../data/content";

export default function StatsBar() {
  const getIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Users className="w-5 h-5 text-[#049788]" />;
      case 1:
        return <Award className="w-5 h-5 text-emerald-600" />;
      case 2:
        return <BookOpen className="w-5 h-5 text-amber-500" />;
      default:
        return <Users className="w-5 h-5 text-[#049788]" />;
    }
  };

  // Only take first 3 stats as specified by user: 3,000+ Pelajar Aktif, 300+ Guru, 800+ Kelas
  const mainStats = stats.slice(0, 3);

  return (
    <section className="bg-slate-50 border-b border-slate-200/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {mainStats.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 ${
                idx > 0 ? "pt-4 md:pt-0 md:pl-8" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                {getIcon(idx)}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {item.label}
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
