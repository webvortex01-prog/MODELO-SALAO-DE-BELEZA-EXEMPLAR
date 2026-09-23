import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext';
import { Sparkles, Calendar, LayoutDashboard, HelpCircle } from 'lucide-react';

export const TopBarNavigation: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    setIsBookingOpen, 
    setIsDemoGuideOpen 
  } = useSalon();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5' 
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text wordmark in display face */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setCurrentView('client');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-white hover:text-[#D4AF37] transition-colors"
            >
              AURUM <span className="font-light text-stone-400 text-sm hidden sm:inline tracking-normal font-sans">| Maison de Beauté</span>
            </a>
          </div>

          {/* Zone 2: 4-6 Clean Navigation Links (Client Mode) or Breadcrumb (Admin Mode) */}
          {currentView === 'client' ? (
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
              <a href="#servicos" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Serviços</a>
              <a href="#especialistas" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Especialistas</a>
              <a href="#galeria" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Galeria & Antes/Depois</a>
              <a href="#experiencia" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap">A Maison</a>
              <a href="#club-privilege" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap flex items-center gap-1.5 text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Club Privilège</span>
              </a>
              <a href="#avaliacoes" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Avaliações</a>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Painel Administrativo da Diretoria</span>
            </div>
          )}

          {/* Zone 3: View Toggle, Demo Guide Trigger & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Demo Guide Info Modal Trigger */}
            <button
              onClick={() => setIsDemoGuideOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              title="Ver guia e recursos deste modelo de demonstração"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Guia da Demo</span>
            </button>

            {/* View Switcher: Visão Cliente vs Painel Admin */}
            <div className="flex items-center bg-[#16161A] p-1 rounded-xl border border-white/10 shadow-inner">
              <button
                onClick={() => setCurrentView('client')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  currentView === 'client'
                    ? 'bg-gold-gradient text-[#0D0D10] font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Site Cliente</span>
                <span className="sm:hidden">Site</span>
              </button>

              <button
                onClick={() => setCurrentView('admin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  currentView === 'admin'
                    ? 'bg-[#D4AF37] text-[#0D0D10] font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <LayoutDashboard className="w-3 h-3" />
                <span className="hidden sm:inline">Painel da Dona</span>
                <span className="sm:hidden">Admin</span>
              </button>
            </div>

            {/* Primary Action Button */}
            {currentView === 'client' ? (
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 shadow-md shadow-[#D4AF37]/20 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Online</span>
              </button>
            ) : null}

          </div>

        </div>
      </div>
    </header>
  );
};
