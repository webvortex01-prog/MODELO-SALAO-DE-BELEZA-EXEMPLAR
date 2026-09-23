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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Hero Image with measured luxury gradient scrims */}
      <div className="absolute inset-0 z-0">
        <img
          src={SALON_INFO.heroImage}
          alt="Interior Salão de Beleza AURUM Maison de Beauté"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/75 to-[#0A0A0C]/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0A0A0C]/40 to-[#0A0A0C]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Subtle Luxury Pre-Header */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full luxury-glass border-gold-subtle text-stone-200 text-xs sm:text-sm tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Haute Coiffure & Experiência Sob Medida</span>
          <span className="text-stone-500">·</span>
          <span className="text-[#D4AF37]">Itaim Bibi, SP</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto text-balance">
          A arte da beleza elevada ao padrão <span className="text-gold-gradient italic font-normal">mais sublime</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
          Especialistas renomados em mechas personalizadas, alta visagismo, tratamentos capilares com caviar e estética facial avançada em um ambiente privativo de alto luxo.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 shadow-[0_0_30px_rgba(212,175,55,0.3)] rounded-xl transition-all flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-5 h-5 text-[#0D0D10]" />
            <span>Agendar Experiência Online</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto px-7 py-4 text-base font-medium text-stone-200 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md rounded-xl transition-all flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Falar com Concierge VIP</span>
          </button>
        </div>

        {/* Trust Proof Metrics Strip */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-[#D4AF37]">
              <Star className="w-4 h-4 fill-[#D4AF37]" />
              <span className="text-lg font-bold font-serif text-white tabular-nums">4.9 / 5.0</span>
            </div>
            <p className="text-xs text-stone-400">+500 Avaliações 5 Estrelas</p>
          </div>

          <div className="space-y-1">
            <span className="text-lg font-bold font-serif text-white tabular-nums">+4.200</span>
            <p className="text-xs text-stone-400">Transformações Realizadas</p>
          </div>

          <div className="space-y-1">
            <span className="text-lg font-bold font-serif text-white">100% Autênticos</span>
            <p className="text-xs text-stone-400">Kérastase & Olaplex</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-semibold text-white">Privacidade VIP</span>
            </div>
            <p className="text-xs text-stone-400">Suítes & Valet Cortesia</p>
          </div>
        </div>

      </div>

    </section>
  );
};
