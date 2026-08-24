import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollytellerCanvas } from './components/ScrollytellerCanvas';
import { IngredientExplorer } from './components/IngredientExplorer';
import { DosageCalculator } from './components/DosageCalculator';
import { QualityBenchmark } from './components/QualityBenchmark';
import { RecipeCollection } from './components/RecipeCollection';
import { ProductSelectorSection, ProductModal } from './components/ProductSelector';
import { Footer } from './components/Footer';
import { culinaryAudio } from './utils/AudioAmbiance';

export function App() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleToggleAudio = () => {
    const newState = culinaryAudio.toggle();
    setIsAudioPlaying(newState);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* Fixed Apple-style Top Glassmorphism Navigation */}
      <Navbar
        onOpenProductModal={() => setIsProductModalOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Hero Scrollytelling HTML5 Canvas Section (450vh container) */}
      <main>
        <ScrollytellerCanvas onOpenProductModal={() => setIsProductModalOpen(true)} />

        {/* Interactive 3D Ingredient Breakdown */}
        <IngredientExplorer />

        {/* Culinary Dosage & Temper Calculator */}
        <DosageCalculator />

        {/* Quality & Purity Benchmark Standard */}
        <QualityBenchmark />

        {/* Recipe Collection & Hing Tempering Masterclass */}
        <RecipeCollection />

        {/* Product Selector Portfolio */}
        <ProductSelectorSection onOpenModal={() => setIsProductModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Order & Store Locator Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </div>
  );
}

export default App;
