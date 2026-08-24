import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Check, ShieldCheck, MapPin, Truck, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductSelectorSection: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [selectedSku, setSelectedSku] = useState<number>(0);

  const skus = [
    {
      name: '50g Signature Amber Jar',
      sub: 'Ideal for Gourmet Home Kitchens',
      price: '$9.99',
      weight: '50g Net',
      shelfLife: '24 Months',
      tag: 'Best Seller',
      desc: 'Housed in a light-blocking dark amber glass container with a precision silicone aroma seal.',
      frame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-240.jpg',
    },
    {
      name: '100g Pantry Refill Pouch',
      sub: 'Eco-Friendly Aroma Lock Foil',
      price: '$16.49',
      weight: '100g Net',
      shelfLife: '24 Months',
      tag: 'Value Pack',
      desc: 'Triple-layer aluminum barrier pouch with zip-lock seal designed to refill your signature glass jar.',
      frame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-160.jpg',
    },
    {
      name: '250g Culinary Master Tin',
      sub: 'For Executive Chefs & Catering',
      price: '$34.99',
      weight: '250g Net',
      shelfLife: '36 Months',
      tag: 'Chef Edition',
      desc: 'Heavy-duty stainless steel culinary canister engineered for high-volume commercial kitchens.',
      frame: '/ezgif-7e695cedf5b1ec5e-jpg/ezgif-frame-080.jpg',
    },
  ];

  const currentSku = skus[selectedSku];

  return (
    <section id="explore" className="py-24 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-mono-code uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5" />
            Product Portfolio & Range
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Bring Home <span className="text-gradient-gold">National Foods Hing</span>
          </h2>

          <p className="text-base text-white/60">
            Available in three distinct culinary formats designed to protect volatile essential oils and maintain peak aroma freshness.
          </p>
        </div>

        {/* 3 SKU Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {skus.map((sku, idx) => (
            <div
              key={sku.name}
              onClick={() => setSelectedSku(idx)}
              className={`glass-card p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                selectedSku === idx
                  ? 'border-amber-500 bg-amber-500/10 shadow-2xl shadow-amber-500/20 scale-[1.02]'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {sku.tag && (
                <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                  {sku.tag}
                </span>
              )}

              <div>
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 bg-[#0A0A0C] border border-white/10 flex items-center justify-center">
                  <img
                    src={sku.frame}
                    alt={sku.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="text-xs text-amber-400 font-mono-code mb-1">{sku.weight}</div>
                <h3 className="text-xl font-bold text-white mb-2">{sku.name}</h3>
                <p className="text-xs text-white/60 mb-4 leading-relaxed">{sku.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white">{sku.price}</div>
                  <div className="text-[10px] text-white/40 font-mono-code">Incl. All Taxes</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSku(idx);
                    onOpenModal();
                  }}
                  className="px-5 py-2.5 rounded-full bg-amber-500 text-[#050505] font-extrabold text-xs tracking-wider uppercase hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Acquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProductModal: React.FC<ProductSelectorProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'select' | 'success'>('select');
  const [zipcode, setZipcode] = useState('');
  const [selectedPack, setSelectedPack] = useState('50g Amber Glass Jar ($9.99)');

  if (!isOpen) return null;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#D97706', '#FEF08A'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fadeIn">
      <div className="bg-[#0A0A0C] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white text-xs font-mono-code"
        >
          [ESC / CLOSE]
        </button>

        {step === 'select' ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono-code uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Culinary Order & Retail Locator
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2">
              Discover National Foods Hing
            </h3>

            <p className="text-xs text-white/60 mb-6 leading-relaxed">
              Order direct express sample shipping or locate an authorized luxury gourmet retailer in your area.
            </p>

            <form onSubmit={handleOrder} className="space-y-4">
              <div>
                <label className="text-xs font-mono-code text-amber-400 uppercase block mb-1">
                  Select Packaging Edition:
                </label>
                <select
                  value={selectedPack}
                  onChange={(e) => setSelectedPack(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                >
                  <option value="50g Amber Glass Jar ($9.99)">50g Signature Amber Glass Jar — $9.99</option>
                  <option value="100g Pantry Refill Pouch ($16.49)">100g Pantry Refill Pouch — $16.49</option>
                  <option value="250g Culinary Master Tin ($34.99)">250g Executive Culinary Master Tin — $34.99</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono-code text-amber-400 uppercase block mb-1">
                  Enter Postal / Zip Code for Express Delivery:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10001 or 90210"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="w-full p-3 pl-10 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                  <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" /> Express 2-Day Shipping
                </span>
                <span className="font-bold text-amber-400">FREE</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-[#050505] font-extrabold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/20"
              >
                Confirm Order & Locate Retailer
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center mx-auto text-amber-400">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-white">Sample Order Reserved!</h3>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm mx-auto">
              Your reservation for <strong className="text-amber-300">{selectedPack}</strong> has been logged for zipcode <span className="font-mono-code text-white">{zipcode}</span>.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-300 font-mono-code">
              Tracking Ref: #NF-HING-{Math.floor(100000 + Math.random() * 900000)}
            </div>

            <button
              onClick={() => {
                setStep('select');
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              Return to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
