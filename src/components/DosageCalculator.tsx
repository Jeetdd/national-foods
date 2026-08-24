import React, { useState } from 'react';
import { ChefHat, Flame, Clock, Thermometer, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

export const DosageCalculator: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<number>(0);
  const [servings, setServings] = useState<number>(4);
  const [oilType, setOilType] = useState<string>('ghee');

  const dishes = [
    {
      name: 'Yellow Tadka Dal',
      category: 'Lentils & Soups',
      baseGramPerServing: 0.08, // grams per person
      temp: '170°C',
      sizzleTime: '10 sec',
      pairings: ['Cumin seeds', 'Dry red chili', 'Garlic paste'],
      chefTip: 'Add Hing right as cumin seeds begin to crackle in ghee. Never add to cold oil.',
    },
    {
      name: 'Royal Vegetable Biryani',
      category: 'Rice & Grains',
      baseGramPerServing: 0.06,
      temp: '165°C',
      sizzleTime: '8 sec',
      pairings: ['Cardamom', 'Cloves', 'Bay leaf', 'Desi Ghee'],
      chefTip: 'Infuse Hing into ghee before tossing with parboiled basmati rice for fragrant layering.',
    },
    {
      name: 'South Indian Sambar',
      category: 'Curries & Stews',
      baseGramPerServing: 0.1,
      temp: '175°C',
      sizzleTime: '12 sec',
      pairings: ['Mustard seeds', 'Curry leaves', 'Tamarind pulp'],
      chefTip: 'Add a second microscopic pinch into boiling tamarind broth for double-depth aroma.',
    },
    {
      name: 'Hing Jeera Aloo',
      category: 'Dry Vegetables',
      baseGramPerServing: 0.12,
      temp: '180°C',
      sizzleTime: '15 sec',
      pairings: ['Cumin seeds', 'Turmeric', 'Coriander powder'],
      chefTip: 'Coats boiled potato cubes directly in aromatic Hing oil for crispy golden crust.',
    },
  ];

  const currentDish = dishes[selectedDish];
  const totalWeightGrams = (currentDish.baseGramPerServing * servings).toFixed(2);

  const getPinchDescription = (grams: number) => {
    if (grams < 0.3) return '1 Generous Pinch (approx. 1/16 Tsp)';
    if (grams < 0.6) return '2 Fine Pinches (approx. 1/8 Tsp)';
    if (grams < 1.0) return '3 Full Pinches (approx. 1/4 Tsp)';
    return '1/2 Level Teaspoon';
  };

  return (
    <section id="craft" className="py-24 bg-[#0A0A0C] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
            <ChefHat className="w-3.5 h-3.5" />
            Culinary Masterclass Tool
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive Hing <span className="text-gradient-gold">Dosage & Blooming Calculator</span>
          </h2>

          <p className="text-base text-white/60">
            Precision is key. Because National Foods Hing is 100% concentrated pure Asafoetida, a small fraction of a gram creates immense umami flavor depth.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-card p-6 sm:p-10 rounded-3xl border border-amber-500/20 shadow-2xl">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* 1. Select Recipe */}
            <div className="space-y-3">
              <label className="text-xs font-mono-code text-amber-400 uppercase tracking-widest block">
                01. Select Culinary Dish:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {dishes.map((dish, idx) => (
                  <button
                    key={dish.name}
                    onClick={() => setSelectedDish(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all text-xs font-semibold ${
                      selectedDish === idx
                        ? 'bg-amber-500 text-[#050505] border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div className="truncate">{dish.name}</div>
                    <div className={`text-[10px] mt-0.5 ${selectedDish === idx ? 'text-[#050505]/70' : 'text-white/40'}`}>
                      {dish.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Servings Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label className="font-mono-code text-amber-400 uppercase tracking-widest">
                  02. Number of Servings:
                </label>
                <span className="font-bold text-white text-base">{servings} Persons</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono-code">
                <span>1 Person (Solo)</span>
                <span>8 Persons (Family)</span>
                <span>16 Persons (Feast)</span>
              </div>
            </div>

            {/* 3. Cooking Fat */}
            <div className="space-y-3">
              <label className="text-xs font-mono-code text-amber-400 uppercase tracking-widest block">
                03. Blooming Cooking Medium:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ghee', name: 'Desi Ghee (Best)' },
                  { id: 'mustard', name: 'Mustard Oil' },
                  { id: 'coconut', name: 'Coconut Oil' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setOilType(f.id)}
                    className={`py-2 px-3 rounded-lg border text-center text-xs transition-all ${
                      oilType === f.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 bg-[#050505] rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-mono-code text-white/50 uppercase">
                  CALCULATED DOSAGE SPECIFICATION
                </span>
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>

              {/* Dosage Big Display */}
              <div className="space-y-2 mb-6">
                <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Recommended National Foods Hing Quantity:
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {getPinchDescription(Number(totalWeightGrams))}
                </div>
                <div className="text-xs text-white/50 font-mono-code">
                  Exact Net Weight: <span className="text-amber-300 font-bold">{totalWeightGrams} grams</span>
                </div>
              </div>

              {/* Temperature & Sizzle Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Thermometer className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-white/50 uppercase font-mono-code">Oil Temp</div>
                    <div className="text-base font-bold text-white">{currentDish.temp}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-white/50 uppercase font-mono-code">Sizzle Time</div>
                    <div className="text-base font-bold text-white">{currentDish.sizzleTime}</div>
                  </div>
                </div>
              </div>

              {/* Spice Pairings */}
              <div className="space-y-2 mb-6">
                <span className="text-xs text-white/60 font-semibold block">Synergistic Spice Pairings:</span>
                <div className="flex flex-wrap gap-2">
                  {currentDish.pairings.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs"
                    >
                      + {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Chef Tip Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-amber-900/20 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
              <Flame className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5">Master Chef Secret:</strong>
                {currentDish.chefTip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
