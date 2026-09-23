import React from 'react';
import { SALON_INFO } from '../../data/initialData';
import { Wine, Car, VolumeX, Sparkles, Coffee, ShieldCheck } from 'lucide-react';
import directorPortraitImg from '../../assets/images/salon_owner_portrait_1790183810490.jpg';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experiencia" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0C] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Split Grid: Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Essência da Maison</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Mais que um salão, um <span className="text-gold-gradient">Santuário de Transformação & Bem-Estar</span>.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Fundada sob a visão de unir a técnica refinada da alta-costura parisiense ao calor e exuberância da beleza brasileira, a <strong>AURUM Maison de Beauté</strong> foi projetada com arquitetura acústica, lavatórios com massagem em gravidade zero e atendimento exclusivamente com hora marcada.
            </p>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#141418] border border-white/5 flex items-start gap-3">
                <Wine className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Bar & Carta de Espumantes</h4>
                  <p className="text-xs text-stone-400">Champagne Veuve Clicquot e cafés especiais cortesia.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141418] border border-white/5 flex items-start gap-3">
                <Car className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Valet Parking com Manobrista</h4>
                  <p className="text-xs text-stone-400">Chegada segura e sem atrito na Faria Lima.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141418] border border-white/5 flex items-start gap-3">
                <VolumeX className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Ambiente com Conforto Acústico</h4>
                  <p className="text-xs text-stone-400">Tranquilidade para reuniões ou puro relaxamento.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141418] border border-white/5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Suítes Privativas para Noivas</h4>
                  <p className="text-xs text-stone-400">Privacidade absoluta para momentos inesquecíveis.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder & Director Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#141418] p-6 space-y-5 shadow-2xl">
              <div className="relative aspect-4/4 rounded-xl overflow-hidden bg-stone-900 border border-white/10">
                <img
                  src={directorPortraitImg}
                  alt="Helena Vianna - Diretora Criativa AURUM"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block">Diretora Criativa & Fundadora</span>
                  <h3 className="text-xl font-serif font-bold text-white">Helena Vianna</h3>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-stone-300 italic leading-relaxed border-l-2 border-[#D4AF37] pl-3.5">
                "Não criamos apenas cortes ou mechas; nós revelamos o brilho e a elegância inata de cada mulher com precisão cirúrgica e respeito à saúde capilar."
              </blockquote>

              <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-white/5">
                <span>Formação: Académie Alexandre Paris</span>
                <span className="text-[#D4AF37] font-semibold">14+ Anos de Excelência</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
