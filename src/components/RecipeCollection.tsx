import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Clock, Flame, Sparkles, ChevronRight, X, Heart } from 'lucide-react';

export const RecipeCollection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<Record<string, boolean>>({});

  const recipes = [
    {
      id: 'tadka-dal',
      title: 'Grand Royal Yellow Tadka Dal',
      category: 'lentils',
      time: '25 Mins',
      difficulty: 'Easy',
      aromaRating: '5/5 Stars',
      hingStep: 'Sizzle 1/8 tsp Hing in 2 tbsp piping hot Desi Ghee along with cracked cumin & Kashmiri chili right before pouring over cooked Arhar Dal.',
      ingredients: [
        '1 Cup Toor/Arhar Dal (Split Yellow Pigeons Pea)',
        '2 tbsp Pure Desi Ghee',
        '1/8 tsp National Foods Hing (Asafoetida)',
        '1 tsp Cumin Seeds',
        '2 Whole Dry Kashmiri Red Chilis',
        '1 tsp Fresh Ginger-Garlic Paste',
        'Fresh Cilantro for garnish',
      ],
      description: 'The definitive Indian comfort dish. National Foods Hing infuses the ghee with a rich, roasted-garlic aroma that cuts through lentil starchiness.',
      imageFrame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-200.jpg',
    },
    {
      id: 'hing-jeera-aloo',
      title: 'Crispy Hing & Jeera Baby Potatoes',
      category: 'snacks',
      time: '20 Mins',
      difficulty: 'Easy',
      aromaRating: '5/5 Stars',
      hingStep: 'Heat mustard oil until smoking, drop 1/6 tsp Hing & roasted cumin seeds, toss boiled baby potatoes until golden & crispy.',
      ingredients: [
        '500g Boiled Baby Potatoes (Pricked)',
        '2.5 tbsp Cold-Pressed Mustard Oil',
        '1/6 tsp National Foods Hing',
        '1.5 tbsp Cumin Seeds (Jeera)',
        '1 tsp Amchur (Dry Mango Powder)',
        '1/2 tsp Turmeric & Red Chili Powder',
      ],
      description: 'Golden baby potatoes enveloped in a savory, aromatic glaze powered by pure National Foods Hing resin.',
      imageFrame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-140.jpg',
    },
    {
      id: 'shahi-paneer',
      title: 'Shahi Paneer Gravy in Aromatic Temper',
      category: 'curries',
      time: '35 Mins',
      difficulty: 'Medium',
      aromaRating: '5/5 Stars',
      hingStep: 'Bloom 1/8 tsp Hing in cashew gravy butter base to unlock sweet-garlicky umami without heavy raw onion overpowering the paneer.',
      ingredients: [
        '300g Cottage Cheese (Paneer) Cubes',
        '1/8 tsp National Foods Hing',
        '1 Cup Creamy Cashew-Tomato Puree',
        '2 tbsp Butter + 1 tbsp Oil',
        '1 tsp Garam Masala & Kasuri Methi',
      ],
      description: 'Royal velvety paneer curry where Hing serves as the secret aromatic backbone substituting heavy garlic.',
      imageFrame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-220.jpg',
    },
    {
      id: 'sambar-special',
      title: 'Traditional Udupi Style Sambar',
      category: 'curries',
      time: '40 Mins',
      difficulty: 'Medium',
      aromaRating: '5/5 Stars',
      hingStep: 'Temper mustard seeds, curry leaves, and 1/4 tsp Hing in coconut oil at the absolute end of cooking.',
      ingredients: [
        '1 Cup Cooked Toor Dal & Drumsticks',
        '2 tbsp Tamarind Concentrate',
        '2 tbsp House Sambar Powder',
        '1/4 tsp National Foods Hing',
        '1 tbsp Coconut Oil',
      ],
      description: 'Authentic South Indian Sambar with a double aroma hit of National Foods Hing tempered in warm coconut oil.',
      imageFrame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-180.jpg',
    },
  ];

  const filtered = filter === 'all' ? recipes : recipes.filter((r) => r.category === filter);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedRecipes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="taste" className="py-24 bg-[#0A0A0C] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
            <Utensils className="w-3.5 h-3.5" />
            Culinary Recipe Collection
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Elevate Every Dish with <span className="text-gradient-gold">Hing Tempering</span>
          </h2>

          <p className="text-base text-white/60">
            Discover iconic recipes masterfully transformed by National Foods Hing’s aroma blooming power.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Recipes' },
              { id: 'lentils', label: 'Lentils & Dal' },
              { id: 'curries', label: 'Gravies & Curries' },
              { id: 'snacks', label: 'Dry Vegetables' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  filter === tab.id
                    ? 'bg-amber-500 text-[#050505] shadow-lg shadow-amber-500/20 font-bold'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 glass-card-hover cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden bg-[#050505]">
                <img
                  src={recipe.imageFrame}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/80 backdrop-blur-md text-[#050505] text-[10px] font-extrabold uppercase tracking-widest">
                    {recipe.time} • {recipe.difficulty}
                  </span>

                  <button
                    onClick={(e) => toggleLike(recipe.id, e)}
                    className="p-2 rounded-full glass-panel text-white/80 hover:text-amber-400 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedRecipes[recipe.id] ? 'text-amber-400 fill-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {recipe.title}
                </h3>

                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>

                {/* Hing Blooming Highlight Box */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                  <div className="text-[10px] font-mono-code text-amber-400 uppercase font-bold mb-1 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" /> Hing Blooming Technique:
                  </div>
                  {recipe.hingStep}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Full Culinary Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0A0A0C] border border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono-code uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                National Foods Masterclass Recipe
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {selectedRecipe.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-white/50 mb-6 font-mono-code">
                <span>⏱ Prep & Cook: {selectedRecipe.time}</span>
                <span>•</span>
                <span>Level: {selectedRecipe.difficulty}</span>
                <span>•</span>
                <span>Aroma: {selectedRecipe.aromaRating}</span>
              </div>

              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                {selectedRecipe.description}
              </p>

              {/* Hing Temper Step */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-amber-900/30 border border-amber-500/40 text-xs text-amber-200 mb-6 leading-relaxed">
                <strong className="text-amber-400 block text-sm mb-1">
                  🔥 The Hing Tempering Secret:
                </strong>
                {selectedRecipe.hingStep}
              </div>

              {/* Ingredients List */}
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono-code">
                  Ingredients Checklist:
                </h4>
                <ul className="space-y-2 text-xs text-white/80">
                  {selectedRecipe.ingredients.map((ing: string) => (
                    <li key={ing} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedRecipe(null)}
                className="w-full py-3 rounded-xl bg-amber-500 text-[#050505] font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors"
              >
                Close Culinary Guide
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
