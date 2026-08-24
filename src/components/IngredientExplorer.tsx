import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Layers, ShieldCheck, Zap, Info } from 'lucide-react';

export const IngredientExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const ingredientStages = [
    {
      id: 'stem',
      title: 'Botanical Ferula Stem',
      subtitle: 'Wild High-Altitude Plant Source',
      tag: 'Raw Origin',
      color: 'from-emerald-500 to-amber-700',
      description:
        'Harvested exclusively from wild Ferula asafoetida perennial herbs thriving in dry, high-altitude mountain soils. The thick taproot stores rich oleo-gum-resin generated through months of intense sun exposure.',
      stats: [
        { label: 'Altitude', value: '2,200m+' },
        { label: 'Origin', value: 'High Plateaus' },
        { label: 'Harvest Cycle', value: '4-5 Years' },
      ],
      compounds: ['Ferulic Acid', 'Umbelliferone', 'Polysaccharides'],
      aromaNotes: 'Earthy, piney, intensely raw botanical top notes.',
      sampleFrame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-001.jpg',
    },
    {
      id: 'tear',
      title: 'Fresh Milky Resin Tear',
      subtitle: 'Pure Taproot Exudate',
      tag: 'Raw Sap',
      color: 'from-amber-200 to-amber-600',
      description:
        'Careful incisions made into the living taproot yield a thick, milky white sap that coagulates rapidly in open mountain air. This unrefined exudate contains nature’s highest density of sulfurous volatiles.',
      stats: [
        { label: 'Resin Purity', value: '98.5%' },
        { label: 'Solids', value: '40-64%' },
        { label: 'Color State', value: 'Milky White' },
      ],
      compounds: ['Asaresinotannol', 'Butyl Propenyl Disulfide', 'Free Ferulic Acid'],
      aromaNotes: 'Pungent, pungent-sulfurous, sharp, concentrated onion-garlic core.',
      sampleFrame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-080.jpg',
    },
    {
      id: 'crystal',
      title: 'Hardened Amber Crystal',
      subtitle: 'Sun-Cured Gum Mass',
      tag: 'Purified Crystal',
      color: 'from-amber-500 to-amber-900',
      description:
        'Slow-cured under controlled shade, the milky tears harden into translucent, reddish-amber crystalline tears. This natural curing locks in volatile essential oils while reducing moisture content to under 3%.',
      stats: [
        { label: 'Essential Oil', value: '4.8% Vol.' },
        { label: 'Moisture', value: '< 2.8%' },
        { label: 'Hardness', value: 'Glassy Fracture' },
      ],
      compounds: ['Sec-butyl disulfide', 'Di-sec-butyl trisulfide', 'Foetidin'],
      aromaNotes: 'Deep, savory, complex toasted garlic, warm balsamic background.',
      sampleFrame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-160.jpg',
    },
    {
      id: 'powder',
      title: 'Micro-Ground Golden Powder',
      subtitle: 'National Foods Finished Spice',
      tag: 'Culinary Masterpiece',
      color: 'from-amber-400 to-yellow-600',
      description:
        'State-of-the-art cryogenic low-temperature milling transforms cured amber tears into a silky, free-flowing golden powder. Zero wheat or starch filler diluents used—delivering pure culinary potency.',
      stats: [
        { label: 'Mesh Fine', value: '120 Mesh' },
        { label: 'Bloom Speed', value: '< 3 Secs' },
        { label: 'Filler %', value: '0.00% Zero' },
      ],
      compounds: ['Purified Volatile Essential Oils', 'Guaranteed Uniform Potency'],
      aromaNotes: 'Rich Umami blooming burst when sizzling in warm fat or ghee.',
      sampleFrame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-240.jpg',
    },
  ];

  const activeData = ingredientStages[activeTab];

  return (
    <section id="process" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            Interactive Ingredient Inspector
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Deconstruct The <span className="text-gradient-gold">Hing Transformation</span>
          </h2>

          <p className="text-base text-white/60">
            Explore the four distinct physical and chemical states of National Foods Asafoetida as it evolves from wild mountain exudate into culinary perfection.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {ingredientStages.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                activeTab === idx
                  ? 'bg-gradient-to-b from-amber-500/20 to-amber-950/40 border-amber-500/50 shadow-xl shadow-amber-500/10 scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-code tracking-widest text-amber-400/80 uppercase">
                  0{idx + 1} — {stage.tag}
                </span>
                {activeTab === idx && <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />}
              </div>
              <div className="text-sm font-bold text-white tracking-wide">{stage.title}</div>
            </button>
          ))}
        </div>

        {/* Tab Content Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-card p-6 sm:p-10 rounded-3xl border border-amber-500/20 shadow-2xl"
          >
            {/* Left Visual Frame Preview */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0C] flex items-center justify-center group min-h-[300px]">
              <img
                src={activeData.sampleFrame}
                alt={activeData.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/70 glass-panel px-4 py-2 rounded-xl border border-white/10">
                <span className="font-mono-code text-amber-400">STATE #{activeTab + 1} VISUAL</span>
                <span className="text-white/50">{activeData.subtitle}</span>
              </div>
            </div>

            {/* Right Detailed Stats & Copy */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono-code text-[11px] font-semibold uppercase">
                    {activeData.tag}
                  </span>
                  <span className="text-xs text-white/50">{activeData.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
                  {activeData.title}
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {activeData.description}
                </p>
              </div>

              {/* Key Stats Bar */}
              <div className="grid grid-cols-3 gap-3">
                {activeData.stats.map((st) => (
                  <div key={st.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50 mb-1 font-mono-code">{st.label}</div>
                    <div className="text-base font-bold text-amber-400">{st.value}</div>
                  </div>
                ))}
              </div>

              {/* Chemical & Aroma Breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                  <Activity className="w-4 h-4 text-amber-400" />
                  Key Bioactive Compounds:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeData.compounds.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="flex items-start gap-2 pt-2 text-xs text-white/60">
                  <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300">Aroma & Flavor Profile: </strong>
                    {activeData.aromaNotes}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
