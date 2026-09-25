import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext';
import { 
  Sparkles, 
  Calendar, 
  LayoutDashboard, 
  HelpCircle, 
  Menu, 
  X, 
  TrendingUp, 
  Package, 
  Crown, 
  Users, 
  MessageCircle, 
  Home,
  ChevronRight
} from 'lucide-react';
import { SALON_INFO } from '../data/initialData';

export const TopBarNavigation: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    adminTab,
    setAdminTab,
    setIsBookingOpen, 
    setIsDemoGuideOpen 
  } = useSalon();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de atendimento na AURUM Maison de Beauté.");
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleNavClick = (tab?: any) => {
    setMobileMenuOpen(false);
    if (tab) {
      setCurrentView('admin');
      setAdminTab(tab);
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0A0A0C]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-2.5 sm:py-3.5' 
            : 'bg-[#0A0A0C]/85 backdrop-blur-sm border-b border-white/5 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Brand Logo & View mode badge */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button 
                onClick={() => {
                  setCurrentView('client');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left group flex items-center gap-2"
              >
                <span className="text-lg sm:text-2xl font-serif font-bold tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
                  AURUM
                </span>
                <span className="hidden sm:inline-block text-stone-500 font-light text-xs">| Maison</span>
                {currentView === 'admin' && (
                  <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    CEO
                  </span>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links (Client Mode) */}
            {currentView === 'client' ? (
              <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-300">
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
              <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/25">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Gestão Executiva · Salão de Alto Padrão</span>
              </div>
            )}

            {/* Controls: Switcher, Demo Guide & Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              
              {/* View Switcher (Desktop & Mobile) */}
              <div className="flex items-center bg-[#16161A] p-0.5 sm:p-1 rounded-xl border border-white/10 shadow-inner">
                <button
                  onClick={() => setCurrentView('client')}
                  className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-lg transition-all flex items-center gap-1 whitespace-nowrap ${
                    currentView === 'client'
                      ? 'bg-gold-gradient text-[#0D0D10] font-bold shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Site</span>
                </button>

                <button
                  onClick={() => setCurrentView('admin')}
                  className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-lg transition-all flex items-center gap-1 whitespace-nowrap ${
                    currentView === 'admin'
                      ? 'bg-[#D4AF37] text-[#0D0D10] font-bold shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <LayoutDashboard className="w-3 h-3" />
                  <span>Admin</span>
                </button>
              </div>

              {/* Demo Guide Info Modal Trigger */}
              <button
                onClick={() => setIsDemoGuideOpen(true)}
                className="p-1.5 sm:px-3 sm:py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
                title="Guia da Demonstração"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden md:inline">Guia da Demo</span>
              </button>

              {/* Primary Action Button (Desktop) */}
              {currentView === 'client' ? (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="hidden sm:flex px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 shadow-md shadow-[#D4AF37]/20 rounded-xl transition-all items-center gap-1.5 whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar Online</span>
                </button>
              ) : null}

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-stone-300 hover:text-white bg-white/5 rounded-xl border border-white/10 focus:outline-none"
                aria-label="Abrir Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-black/95 backdrop-blur-xl animate-fadeIn">
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xl font-serif font-bold text-white tracking-wider">AURUM</span>
              <span className="text-xs text-[#D4AF37] block">Maison de Beauté & Gestão</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-stone-400 hover:text-white bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-6">
            
            {/* View Selection in Drawer */}
            <div className="p-3.5 rounded-2xl bg-[#141418] border border-white/10 space-y-3">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Alternar Modo de Visualização
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setCurrentView('client');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    currentView === 'client'
                      ? 'bg-gold-gradient text-black font-bold shadow-md'
                      : 'bg-white/5 text-stone-300 border border-white/10'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Site da Cliente</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    currentView === 'admin'
                      ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                      : 'bg-white/5 text-stone-300 border border-white/10'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Painel da Dona (CEO)</span>
                </button>
              </div>
            </div>

            {/* Quick Admin Modules for CEO */}
            {currentView === 'admin' ? (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block px-1">
                  Módulos de Gestão Executiva (CEO)
                </span>
                <div className="space-y-1.5">
                  {[
                    { id: 'overview', label: 'Visão Geral & Indicadores', icon: LayoutDashboard },
                    { id: 'calendar', label: 'Agenda & Horários', icon: Calendar },
                    { id: 'stock', label: 'Controle de Estoque & Insumos', icon: Package },
                    { id: 'financial', label: 'Relatórios Financeiros (DRE)', icon: TrendingUp },
                    { id: 'loyalty', label: 'Club Privilège (Fidelidade VIP)', icon: Crown },
                    { id: 'team', label: 'Equipe & Comissões', icon: Users },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = adminTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleNavClick(tab.id)}
                        className={`w-full p-3 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-bold'
                            : 'bg-white/[0.02] border border-white/5 text-stone-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#D4AF37]" />
                          <span>{tab.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-500" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block px-1">
                  Navegação no Salão
                </span>
                <div className="space-y-1 text-sm font-medium">
                  <a 
                    href="#servicos" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 text-stone-200 border border-white/5"
                  >
                    Menu de Serviços & Protocolos
                  </a>
                  <a 
                    href="#especialistas" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 text-stone-200 border border-white/5"
                  >
                    Equipe de Especialistas & Visagistas
                  </a>
                  <a 
                    href="#galeria" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 text-stone-200 border border-white/5"
                  >
                    Galeria de Trabalhos & Antes/Depois
                  </a>
                  <a 
                    href="#club-privilege" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                  >
                    Club Privilège (Programa VIP)
                  </a>
                  <a 
                    href="#experiencia" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 text-stone-200 border border-white/5"
                  >
                    A Maison & Estrutura
                  </a>
                </div>
              </div>
            )}

            {/* Quick Actions in Drawer */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gold-gradient text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Horário Online</span>
              </button>

              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Concierge Direct</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* NATIVE APP MOBILE BOTTOM NAVIGATION BAR FOR CEO & CLIENT */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0D0D10]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-2xl safe-area-bottom">
        {currentView === 'admin' ? (
          <div className="grid grid-cols-5 gap-1 text-center">
            <button
              onClick={() => setAdminTab('overview')}
              className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                adminTab === 'overview' ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-[10px] truncate max-w-full">Visão</span>
            </button>

            <button
              onClick={() => setAdminTab('calendar')}
              className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                adminTab === 'calendar' ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] truncate max-w-full">Agenda</span>
            </button>

            <button
              onClick={() => setAdminTab('stock')}
              className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                adminTab === 'stock' ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span className="text-[10px] truncate max-w-full">Estoque</span>
            </button>

            <button
              onClick={() => setAdminTab('financial')}
              className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                adminTab === 'financial' ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] truncate max-w-full">Finanças</span>
            </button>

            <button
              onClick={() => setAdminTab('loyalty')}
              className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                adminTab === 'loyalty' ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span className="text-[10px] truncate max-w-full">VIP</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 text-center">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-2 rounded-xl text-stone-300 hover:text-white bg-white/5 flex items-center justify-center gap-1.5 text-xs font-medium"
            >
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Início</span>
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="py-2 rounded-xl text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-1.5 text-xs font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="py-2 rounded-xl text-black bg-gold-gradient font-bold shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-1.5 text-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
