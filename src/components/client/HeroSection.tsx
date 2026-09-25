import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { SALON_INFO } from '../../data/initialData';
import { Sparkles, Calendar, MessageCircle, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setIsBookingOpen } = useSalon();

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de informações sobre horários e serviços na AURUM Maison de Beauté.");
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Hero Image with measured luxury gradient scrims */}
      <div className="absolute inset-0 z-0">
        <img
          src={SALON_INFO.heroImage}
          alt="Interior Salão de Beleza AURUM Maison de Beauté"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-[#0A0A0C]/45" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0A0A0C]/40 to-[#0A0A0C]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Subtle Luxury Pre-Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full luxury-glass border-gold-subtle text-stone-200 text-[11px] sm:text-xs tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Haute Coiffure & Visagismo Sob Medida</span>
          <span className="text-stone-500 hidden sm:inline">·</span>
          <span className="text-[#D4AF37] hidden sm:inline">Itaim Bibi, SP</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto text-balance">
          A arte da beleza elevada ao padrão <span className="text-gold-gradient italic font-normal">mais sublime</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
          Especialistas em mechas personalizadas, alta visagismo, tratamentos capilares com caviar e estética avançada em um ambiente privativo de alto luxo.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 shadow-[0_0_30px_rgba(212,175,55,0.3)] rounded-xl transition-all flex items-center justify-center gap-2.5 group active:scale-98"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D0D10]" />
            <span>Agendar Experiência Online</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto px-6 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-stone-200 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md rounded-xl transition-all flex items-center justify-center gap-2.5 active:scale-98"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span>Falar com Concierge VIP</span>
          </button>
        </div>

        {/* Trust Proof Metrics Strip */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto text-center">
          <div className="space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-center gap-1 text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span className="text-base sm:text-lg font-bold font-serif text-white tabular-nums">4.9 / 5.0</span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-400">+500 Avaliações 5★</p>
          </div>

          <div className="space-y-0.5 sm:space-y-1">
            <span className="text-base sm:text-lg font-bold font-serif text-white tabular-nums">+4.200</span>
            <p className="text-[11px] sm:text-xs text-stone-400">Transformações</p>
          </div>

          <div className="space-y-0.5 sm:space-y-1">
            <span className="text-base sm:text-lg font-bold font-serif text-white">100% Autênticos</span>
            <p className="text-[11px] sm:text-xs text-stone-400">Kérastase & Olaplex</p>
          </div>

          <div className="space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm font-semibold text-white">Privacidade VIP</span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-400">Suítes & Valet Cortesia</p>
          </div>
        </div>

      </div>

    </section>
  );
};
