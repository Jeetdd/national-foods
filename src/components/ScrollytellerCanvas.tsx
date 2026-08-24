import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Flame, Compass, Award, ArrowRight, RefreshCw } from 'lucide-react';

interface ScrollytellerCanvasProps {
  onOpenProductModal: () => void;
}

const TOTAL_FRAMES = 240;
const FRAME_PATH_PREFIX = '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-';

export const ScrollytellerCanvas: React.FC<ScrollytellerCanvasProps> = ({ onOpenProductModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Target and interpolated frame indices for 60fps lerp smoothing
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // 1. Preload all 240 frames
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const checkAllLoaded = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      if (isMounted) setLoadingProgress(progress);

      if (loadedCount === TOTAL_FRAMES) {
        imagesRef.current = images;
        if (isMounted) setIsLoaded(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(3, '0');
      img.src = `${FRAME_PATH_PREFIX}${frameStr}.jpg`;

      img.onload = () => {
        images[i - 1] = img;
        checkAllLoaded();
      };
      img.onerror = () => {
        // Fallback placeholder if frame fails
        images[i - 1] = img;
        checkAllLoaded();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Scroll listener to calculate scroll progress (0.0 to 1.0)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = containerRef.current.clientHeight - window.innerHeight;
      
      if (totalScrollableHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
      
      setScrollProgress(progress);
      targetFrameRef.current = Math.floor(progress * (TOTAL_FRAMES - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Smooth Canvas RAF render loop (Lerp interpolation)
  useEffect(() => {
    const renderFrame = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Lerp frame index for buttery smooth movement
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.15; // Smooth spring factor

      const roundedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));
      setCurrentFrameIndex(roundedFrame);

      // Canvas sizing (High DPI support)
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Fill background matching #050505 perfectly
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Draw current image frame
      const img = imagesRef.current[roundedFrame];
      if (img && img.complete && img.naturalWidth !== 0) {
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const screenAspect = displayWidth / displayHeight;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (screenAspect > imgAspect) {
          // Fit height
          drawH = displayHeight;
          drawW = displayHeight * imgAspect;
          drawX = (displayWidth - drawW) / 2;
          drawY = 0;
        } else {
          // Fit width
          drawW = displayWidth;
          drawH = displayWidth / imgAspect;
          drawX = 0;
          drawY = (displayHeight - drawH) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }

      ctx.restore();
      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    };

    if (isLoaded) {
      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    }

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isLoaded]);

  // Story Beat Scroll Navigator Helper
  const scrollToBeat = (targetPercentage: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.clientHeight - window.innerHeight;
    const targetScrollY = containerRef.current.offsetTop + totalScrollable * targetPercentage;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const storyBeats = [
    { label: 'Origin', progress: 0.05 },
    { label: 'Harvest', progress: 0.25 },
    { label: 'Craft', progress: 0.45 },
    { label: 'Grind', progress: 0.62 },
    { label: 'Cooking', progress: 0.80 },
    { label: 'Final Dish', progress: 0.95 },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[450vh] bg-[#050505]" id="origin">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Loading Screen Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center relative mb-6">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
              <div className="absolute inset-0 rounded-full border-2 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>

            <h3 className="text-xl font-bold tracking-widest text-white uppercase mb-2">
              National Foods <span className="text-amber-400">Hing</span>
            </h3>
            <p className="text-xs tracking-widest text-white/50 uppercase mb-6">
              Preparing Cinematic Experience... {loadingProgress}%
            </p>

            {/* Loading Bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* The Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain block bg-[#050505] transition-opacity duration-700"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Ambient Subtle Background Glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-amber-900/10 via-transparent to-transparent opacity-60" />

        {/* ------------------------------------------------------------- */}
        {/* SYNCHRONIZED STORYTELLING OVERLAYS (0.0 to 1.0)              */}
        {/* ------------------------------------------------------------- */}
        {isLoaded && (
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center px-4 sm:px-8 lg:px-16">
            
            {/* BEAT 1: HERO / ORIGIN (0.0 - 0.15) */}
            {scrollProgress >= 0.0 && scrollProgress < 0.16 && (
              <motion.div
                key="beat1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-center max-w-4xl mx-auto space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Natural Origin Asafoetida
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                  Hing, from nature <br />
                  <span className="text-gradient-gold font-editorial font-normal italic">to flavour.</span>
                </h1>

                <p className="text-lg sm:text-2xl text-amber-200/90 font-medium tracking-wide">
                  The essence of every great dish.
                </p>

                <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
                  A journey from natural raw resin to the unmistakable depth of flavour in your kitchen.
                </p>

                <div className="pt-8 flex flex-col items-center gap-3">
                  <span className="text-[11px] font-mono-code tracking-[0.2em] text-white/40 uppercase">
                    Scroll To Explore Sequence
                  </span>
                  <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                      className="w-1.5 h-2.5 bg-amber-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* BEAT 2: HARVESTING & ORIGIN (0.16 - 0.35) */}
            {scrollProgress >= 0.16 && scrollProgress < 0.35 && (
              <motion.div
                key="beat2"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-xl mr-auto space-y-5 glass-card p-8 rounded-3xl border border-amber-500/20 shadow-2xl"
              >
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Stage 01 — Botanical Origin
                </div>

                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  Born from <span className="text-gradient-amber">nature.</span>
                </h2>

                <p className="text-base text-white/80 leading-relaxed font-light">
                  Carefully sourced from the natural resin of the wild <span className="text-amber-300 font-semibold italic">Ferula asafoetida</span> plant.
                </p>

                <p className="text-sm text-white/60 leading-relaxed">
                  Every piece begins its journey close to the earth, collected by expert harvesters who honor centuries of spice tradition.
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs text-amber-200/70 border-t border-white/10">
                  <span>✦ 100% Earth Sourced</span>
                  <span>✦ Unrefined Resin Drops</span>
                </div>
              </motion.div>
            )}

            {/* BEAT 3: PROCESSING & CRAFT (0.35 - 0.55) */}
            {scrollProgress >= 0.35 && scrollProgress < 0.55 && (
              <motion.div
                key="beat3"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-xl ml-auto space-y-5 glass-card p-8 rounded-3xl border border-amber-500/20 shadow-2xl"
              >
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  Stage 02 — Controlled Purification
                </div>

                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  Crafted through <span className="text-gradient-gold">transformation.</span>
                </h2>

                <ul className="space-y-3 text-sm sm:text-base text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span>Raw resin tears are hand-sorted and subjected to low-temp purification.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span>Traditional artisanal craft meets controlled laboratory precision.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span>Every stage preserves the distinctive sulfurous essential oils & character.</span>
                  </li>
                </ul>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  "Purification retains 99.4% of volatile aromatic compounds."
                </div>
              </motion.div>
            )}

            {/* BEAT 4: GRINDING & FORMULATION (0.55 - 0.70) */}
            {scrollProgress >= 0.55 && scrollProgress < 0.70 && (
              <motion.div
                key="beat4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-xl mr-auto space-y-5 glass-card p-8 rounded-3xl border border-amber-500/20 shadow-2xl"
              >
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
                  <Award className="w-4 h-4 text-amber-400" />
                  Stage 03 — Cryogenic Grinding
                </div>

                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  Ground to unlock <span className="text-gradient-amber">its character.</span>
                </h2>

                <p className="text-base text-white/80 leading-relaxed">
                  The hardened amber tears are transformed into a silky, fine aromatic golden powder.
                </p>

                <p className="text-sm text-white/60 leading-relaxed">
                  Its pungent raw fragrance matures into a rich, roasted-garlic and onion-like complexity when unleashed into hot ghee or oil.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-lg font-bold text-amber-400">Micro-Mesh</div>
                    <div className="text-[10px] text-white/50 uppercase">Grind Precision</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-lg font-bold text-amber-400">100% Pure</div>
                    <div className="text-[10px] text-white/50 uppercase">Zero Starch Additive</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BEAT 5: QUALITY & COOKING (0.70 - 0.88) */}
            {scrollProgress >= 0.70 && scrollProgress < 0.88 && (
              <motion.div
                key="beat5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-xl ml-auto space-y-5 glass-card p-8 rounded-3xl border border-amber-500/20 shadow-2xl"
              >
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
                  <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                  Stage 04 — Culinary Blooming
                </div>

                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  A little. <span className="text-gradient-gold">A lot of flavour.</span>
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">1</span>
                    <span className="text-sm text-white/80">Measured with pinpoint precision — a single pinch suffices.</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">2</span>
                    <span className="text-sm text-white/80">Released into warm oil or sizzling ghee.</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">3</span>
                    <span className="text-sm text-white/80">An unmistakable, intoxicating aroma instantly blooms.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BEAT 6: FINAL DISH & REASSEMBLY (0.88 - 1.0) */}
            {scrollProgress >= 0.88 && (
              <motion.div
                key="beat6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-center max-w-3xl mx-auto space-y-6 glass-card p-10 rounded-3xl border border-amber-500/30 shadow-2xl gold-glow"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Culinary Perfection Reached
                </div>

                <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                  From nature. <br />
                  <span className="text-gradient-gold">Into every bite.</span>
                </h2>

                <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto">
                  National Foods Hing. Crafted to bring depth, aroma, and authentic character to your kitchen.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onOpenProductModal}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-[#050505] font-extrabold text-sm tracking-widest uppercase shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    Discover National Foods Hing
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#explore"
                    className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-widest uppercase transition-all"
                  >
                    Explore The Range
                  </a>
                </div>

                <div className="pt-2 text-xs font-mono-code text-amber-200/50">
                  ✦ From raw resin to the heart of your kitchen ✦
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Bottom Floating Story Beat Selector Bar */}
        {isLoaded && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 max-w-full overflow-x-auto">
            <span className="text-[10px] font-mono-code text-white/40 uppercase px-2 hidden sm:inline">
              Sequence Frame {currentFrameIndex + 1}/240
            </span>

            <div className="h-3 w-[1px] bg-white/10 hidden sm:block" />

            {storyBeats.map((beat, idx) => {
              const isActive =
                (idx === 0 && scrollProgress < 0.16) ||
                (idx === 1 && scrollProgress >= 0.16 && scrollProgress < 0.35) ||
                (idx === 2 && scrollProgress >= 0.35 && scrollProgress < 0.55) ||
                (idx === 3 && scrollProgress >= 0.55 && scrollProgress < 0.70) ||
                (idx === 4 && scrollProgress >= 0.70 && scrollProgress < 0.88) ||
                (idx === 5 && scrollProgress >= 0.88);

              return (
                <button
                  key={beat.label}
                  onClick={() => scrollToBeat(beat.progress)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-[#050505] font-bold shadow-md shadow-amber-500/30 scale-105'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {beat.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
