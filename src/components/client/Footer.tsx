import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { SALON_INFO } from '../../data/initialData';
import { MapPin, Phone, Clock, Instagram, MessageCircle, Calendar, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsBookingOpen } = useSalon();

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de agendar um horário na AURUM Maison de Beauté.");
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#070709] border-t border-white/10 text-stone-400 text-sm">
      
      {/* Top Banner CTA */}
      <div className="border-b border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Pronta para viver uma experiência memorável?
            </h3>
            <p className="text-stone-400 text-sm">
              Garanta seu horário com nossos mestres visagistas pelo sistema online ou WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3 font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 shadow-md shadow-[#D4AF37]/20 rounded-xl transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Agora</span>
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="px-5 py-3 font-semibold text-stone-200 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp VIP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand */}
        <div className="space-y-4">
          <h4 className="text-2xl font-serif font-bold text-white tracking-wider">
            AURUM
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            {SALON_INFO.tagline}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={`https://instagram.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={handleOpenWhatsApp}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Navegação</h5>
          <ul className="space-y-2 text-xs">
            <li><a href="#servicos" className="hover:text-[#D4AF37] transition-colors">Serviços & Protocolos</a></li>
            <li><a href="#especialistas" className="hover:text-[#D4AF37] transition-colors">Equipe de Especialistas</a></li>
            <li><a href="#galeria" className="hover:text-[#D4AF37] transition-colors">Galeria & Antes/Depois</a></li>
            <li><a href="#club-privilege" className="hover:text-[#D4AF37] transition-colors text-[#D4AF37]">Club Privilège VIP</a></li>
            <li><a href="#avaliacoes" className="hover:text-[#D4AF37] transition-colors">Avaliações das Clientes</a></li>
          </ul>
        </div>

        {/* Col 3: Localização & Contato */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Localização & Contato</h5>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{SALON_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{SALON_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{SALON_INFO.hours}</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Parcerias & Produtos */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Produtos Oficiais</h5>
          <p className="text-xs text-stone-400 leading-relaxed">
            Utilizamos e revendemos exclusivamente produtos originais com selo de autenticidade:
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-stone-300">Kérastase Paris</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-stone-300">Olaplex Pro</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-stone-300">Wella Professionals</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-stone-300">Dior Le Vernis</span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/5 py-6 px-4 sm:px-6 text-center text-xs text-stone-500">
        <p>© 2026 AURUM Maison de Beauté. Todos os direitos reservados. Modelo demonstrativo de alta conversão para portfólio.</p>
      </div>

    </footer>
  );
};
