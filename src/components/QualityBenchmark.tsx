import React from 'react';
import { ShieldCheck, Award, Lock, Sparkles, Check, X, Leaf } from 'lucide-react';

export const QualityBenchmark: React.FC = () => {
  const comparisonItems = [
    {
      feature: 'Active Essential Volatile Oils',
      nationalFoods: '4.8% High Concentration',
      ordinaryBrand: '1.2% Low (Diluted)',
      isSuperior: true,
    },
    {
      feature: 'Wheat / Starch Filler Additive',
      nationalFoods: '0.00% (100% Zero Fillers)',
      ordinaryBrand: 'Up to 60% Maida Filler',
      isSuperior: true,
    },
    {
      feature: 'Grinding Technology',
      nationalFoods: 'Sub-Zero Cryogenic Milling',
      ordinaryBrand: 'High-Heat Rotary Blade Grinding',
      isSuperior: true,
    },
    {
      feature: 'Aroma Blooming Speed',
      nationalFoods: 'Instant (< 3 Seconds)',
      ordinaryBrand: 'Slow / Requires Heavy Oil',
      isSuperior: true,
    },
    {
      feature: 'Packaging Protection',
      nationalFoods: 'UV-Filter Amber Glass Jar',
      ordinaryBrand: 'Standard Plastic Pouch',
      isSuperior: true,
    },
  ];

  return (
    <section id="quality" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Purity & Excellence Benchmark
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The National Foods <span className="text-gradient-gold">Purity Standard</span>
          </h2>

          <p className="text-base text-white/60">
            Most commercial Hing brands dilute raw asafoetida resin with up to 60% starch or wheat flour. National Foods Hing offers uncompromising purity and potent aroma density.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Leaf,
              title: '100% Pure Origin',
              desc: 'Harvested directly from wild high-altitude Ferula taproots with zero synthetic additives.',
            },
            {
              icon: Award,
              title: 'Cryogenic Milled',
              desc: 'Sub-zero milling technology locks in delicate sulfurous aroma volatiles that high-heat grinders destroy.',
            },
            {
              icon: Lock,
              title: 'Aroma Lock Sealed',
              desc: 'Triple-sealed amber glass jar preserves potency and protects against moisture and oxidation for 24+ months.',
            },
            {
              icon: Sparkles,
              title: 'Master-Chef Choice',
              desc: 'Trusted by Michelin-starred culinary artists for intense umami depth and consistent flavor batch after batch.',
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-amber-500/20 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Direct Benchmark Comparison</h3>
            <p className="text-xs font-mono-code text-amber-400/80 uppercase">
              National Foods Hing vs Standard Market Brands
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-mono-code text-white/50 uppercase">
                  <th className="py-4 px-4">Quality Criterion</th>
                  <th className="py-4 px-4 text-amber-400">National Foods Hing</th>
                  <th className="py-4 px-4 text-white/40">Ordinary Market Hing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {comparisonItems.map((item) => (
                  <tr key={item.feature} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white/90">{item.feature}</td>
                    <td className="py-4 px-4 font-bold text-amber-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      {item.nationalFoods}
                    </td>
                    <td className="py-4 px-4 text-white/50 flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500/60 flex-shrink-0" />
                      {item.ordinaryBrand}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
