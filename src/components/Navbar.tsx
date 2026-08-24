import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Volume2, VolumeX, ChevronRight, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenProductModal: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProductModal,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Origin', href: '#origin' },
    { name: 'The Process', href: '#process' },
    { name: 'The Craft', href: '#craft' },
    { name: 'The Taste', href: '#taste' },
    { name: 'Quality', href: '#quality' },
    { name: 'Explore', href: '#explore' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
              National Foods
            </span>
            <span className="text-sm font-semibold tracking-wider text-white flex items-center gap-1">
              HING <span className="text-[10px] font-normal text-white/50">(Asafoetida)</span>
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium tracking-widest text-white/70 hover:text-white uppercase transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions (Audio + CTA) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Mute Culinary Ambiance' : 'Play Culinary Ambiance'}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-amber-400 transition-all"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onOpenProductModal}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-700 rounded-full transition-all group-hover:opacity-100 opacity-70 blur-[2px]" />
            <span className="relative px-5 py-2 rounded-full bg-[#050505] flex items-center gap-2 text-xs font-semibold tracking-wider text-white uppercase transition-all duration-300 group-hover:bg-amber-500/10">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              Discover Hing
              <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onToggleAudio}
            className="p-2 rounded-full border border-white/10 bg-white/5 text-white/70"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-white/10 text-white/80"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 space-y-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium tracking-wider text-white/80 hover:text-amber-400 py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProductModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              Discover National Foods Hing
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
