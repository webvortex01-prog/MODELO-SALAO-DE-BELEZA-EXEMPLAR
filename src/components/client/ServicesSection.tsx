import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory } from '../../types/salon';
import { Sparkles, Clock, Calendar, ChevronRight } from 'lucide-react';

const CATEGORIES: { id: ServiceCategory | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Menu Completo' },
  { id: 'mechas', label: 'Mechas & Balayage' },
  { id: 'cabelos', label: 'Alta Coiffure & Corte' },
  { id: 'tratamentos', label: 'Rituais & Terapias' },
  { id: 'estetica', label: 'Estética & Facial Glow' },
  { id: 'nails', label: 'Nails Couture' },
  { id: 'noivas', label: 'Noivas & Ocasiões' },
];

export const ServicesSection: React.FC = () => {
  const { services, setIsBookingOpen, setPreselectedServiceId } = useSalon();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'todos'>('todos');

  const filteredServices = activeCategory === 'todos' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const handleBookService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <section id="servicos" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0C] relative">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Menu de Serviços Exclusivos</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Protocolos Personalizados para a Sua <span className="text-gold-gradient">Melhor Versão</span>
          </h2>
          
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Cada atendimento inicia com uma consultoria visagista sob medida, utilizando produtos importados das maiores maisons mundiais.
          </p>
        </div>

        {/* Category Filter Tabs (Functional segmented buttons) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-gold-gradient text-[#0D0D10] font-semibold shadow-md shadow-[#D4AF37]/20 scale-105' 
                    : 'text-stone-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl bg-[#121216] border border-white/10 hover:border-[#D4AF37]/45 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-black/50"
            >
              <div className="p-6 sm:p-7 space-y-4">
                
                {/* Header info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block">
                      {service.category === 'mechas' ? 'Coloração & Luzes' : 
                       service.category === 'cabelos' ? 'Haute Coiffure' :
                       service.category === 'tratamentos' ? 'Ritual Capilar' :
                       service.category === 'estetica' ? 'Estética Facial' :
                       service.category === 'nails' ? 'Manicure de Luxo' : 'Noivas & Festas'}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#F3E7D3] transition-colors mt-1">
                      {service.name}
                    </h3>
                  </div>

                  {service.popular && (
                    <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full uppercase shrink-0">
                      Destaque
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Metadata: Duration & Consultation */}
                <div className="flex items-center gap-4 text-xs text-stone-400 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>{service.durationMinutes} min de sessão</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-500">Diagnóstico incluso</span>
                </div>

              </div>

              {/* Card Footer: Price & Book Button */}
              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Investimento</span>
                  <span className="text-lg font-serif font-bold text-white tabular-nums">
                    R$ {service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={() => handleBookService(service.id)}
                  className="px-4 py-2 text-xs font-semibold text-[#0D0D10] bg-[#D4AF37] hover:bg-[#F3E7D3] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm group-hover:shadow-[#D4AF37]/25"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
