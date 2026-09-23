import React from 'react';
import { INITIAL_REVIEWS } from '../../data/initialData';
import { Star, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D10] relative">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Voz de Nossas Clientes VIP</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Experiências que Superam <span className="text-gold-gradient">Expectativas</span>
          </h2>
          
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Mais de 4.000 clientes satisfeitas e taxa de retenção superior a 94% no coração do Itaim Bibi.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#141418] border border-white/10 hover:border-[#D4AF37]/35 transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Atendimento Verificado
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Service Info */}
              <div className="pt-4 border-t border-white/5 space-y-1">
                <h4 className="text-sm font-serif font-bold text-white">{rev.author}</h4>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>{rev.role}</span>
                  <span className="text-[#D4AF37]">{rev.service}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
