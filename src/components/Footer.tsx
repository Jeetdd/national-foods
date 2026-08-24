import React from 'react';
import { Sparkles, ArrowUp, ShieldCheck, Heart, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white/50 py-16 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-[1px]">
                <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
              <span className="text-sm font-extrabold tracking-widest text-white uppercase">
                National Foods <span className="text-amber-400">Hing</span>
              </span>
            </div>

            <p className="text-xs text-white/50 max-w-sm leading-relaxed">
              Crafted to bring depth, aroma, and authentic character to kitchens worldwide. 100% natural Asafoetida resin sourced from high-altitude Ferula taproots.
            </p>

            <div className="flex items-center gap-3 text-[11px] font-mono-code text-amber-300/80">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-amber-400" /> Sustainable Harvest
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> ISO Certified
              </span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono-code text-white uppercase tracking-widest mb-3">
              The Journey
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#origin" className="hover:text-amber-400 transition-colors">Botanical Origin</a></li>
              <li><a href="#process" className="hover:text-amber-400 transition-colors">Resin Purification</a></li>
              <li><a href="#craft" className="hover:text-amber-400 transition-colors">Dosage Calculator</a></li>
              <li><a href="#quality" className="hover:text-amber-400 transition-colors">Purity Guarantee</a></li>
              <li><a href="#taste" className="hover:text-amber-400 transition-colors">Masterclass Recipes</a></li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono-code text-white uppercase tracking-widest mb-3">
              Corporate & Quality
            </h4>
            <p className="text-xs leading-relaxed">
              National Foods Luxury Spice Division. All rights reserved © 2026. Asafoetida is a registered spice trademark of National Foods Limited.
            </p>
            <div className="flex items-center gap-4 text-xs pt-2">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Quality Certification</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            Crafted for <strong className="text-white">National Foods Hing</strong> — Ultra-Premium Scrollytelling Landing Experience.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 transition-all font-mono-code text-[11px]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
