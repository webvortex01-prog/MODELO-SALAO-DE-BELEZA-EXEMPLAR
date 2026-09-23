import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Sparkles, Star, Calendar, Award } from 'lucide-react';

export const SpecialistsSection: React.FC = () => {
  const { specialists, setIsBookingOpen } = useSalon();

  return (
    <section id="especialistas" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D10] relative">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Equipe de Mestres & Visagistas</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Artistas Dedicados à <span className="text-gold-gradient">Sua Assinatura Única</span>
          </h2>
          
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Profissionais com formação internacional nas principais capitais da moda, combinando técnica cirúrgica, estética refinada e atendimento caloroso.
          </p>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {specialists.map((spec) => (
            <div
              key={spec.id}
              className="group rounded-2xl bg-[#141418] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
            >
              <div className="space-y-4">
                {/* Photo with Overlay */}
                <div className="relative aspect-4/4 overflow-hidden bg-stone-900">
                  <img
                    src={spec.avatar}
                    alt={spec.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent opacity-80" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 luxury-glass px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 text-xs text-white">
                    <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="font-bold tabular-nums">{spec.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-stone-400">({spec.reviewCount})</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="px-5 pb-2 space-y-2.5">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#F3E7D3] transition-colors">
                      {spec.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#D4AF37]">{spec.role}</p>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                    {spec.bio}
                  </p>

                  {/* Specialties tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {spec.specialties.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-stone-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-3 border-t border-white/5">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-2 px-3 text-xs font-semibold text-stone-200 bg-white/5 hover:bg-[#D4AF37] hover:text-[#0D0D10] border border-white/10 hover:border-[#D4AF37] rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reservar com {spec.name.split(' ')[0]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
