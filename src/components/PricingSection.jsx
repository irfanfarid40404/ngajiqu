import React, { useState } from "react";
import { pricingPlans } from "../data/content";
import { Check, ArrowRight } from "lucide-react";

export default function PricingSection({ onOpenModal }) {
  const [cycle, setCycle] = useState("monthly");

  return (
    <section id="kelas" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Pilih Paket Kelas
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Temukan paket belajar yang sesuai dengan kebutuhan dan ritme belajarmu.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex bg-slate-100 p-1.5 rounded-xl mt-6 text-xs font-bold border border-slate-200">
            <button
              onClick={() => setCycle("monthly")}
              className={`px-4 py-2 rounded-lg transition-all text-xs font-bold ${
                cycle === "monthly"
                  ? "bg-[#049788] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Paket Bulanan
            </button>
            <button
              onClick={() => setCycle("quarterly")}
              className={`px-4 py-2 rounded-lg transition-all text-xs font-bold ${
                cycle === "quarterly"
                  ? "bg-[#049788] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Paket 3 Bulan (Hemat 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto items-stretch">
          {pricingPlans.map((plan) => {
            const price = cycle === "monthly" ? plan.priceMonthly : plan.priceQuarterly;
            const periodLabel = cycle === "monthly" ? "/bulan" : "/3 bulan";

            return (
              <div
                key={plan.id}
                className={`rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? "border-[#049788] ring-2 ring-[#049788]/20 bg-white shadow-xl md:-translate-y-2"
                    : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Popular Tag */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold px-3.5 py-1 bg-[#049788] text-white rounded-full shadow-sm">
                      {plan.badge || "Paling Populer"}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-slate-950">{plan.name}</h3>
                  </div>

                  <p className="text-xs text-slate-500 min-h-[36px] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="my-6 pt-4 border-t border-slate-200/60">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{periodLabel}</span>
                    </div>
                    <div className="text-xs text-[#049788] font-bold mt-1.5">
                      Bimbingan Terstruktur & Terarah
                    </div>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3 pb-8">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Fasilitas yang Didapat:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#049788] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onOpenModal(`${plan.name} (${cycle === "monthly" ? "Bulanan" : "3 Bulan"})`)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#049788] ${
                    plan.popular
                      ? "bg-[#049788] hover:bg-[#038073] active:scale-[0.99] text-white shadow-md shadow-[#049788]/20"
                      : "bg-slate-900 hover:bg-slate-800 text-white active:scale-[0.99]"
                  }`}
                >
                  <span>Pilih Paket</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500">
            Semua paket mencakup garansi ganti guru dan konsultasi gratis via WhatsApp jika membutuhkan penyesuaian jadwal khusus.
          </p>
        </div>

      </div>
    </section>
  );
}
