import React from 'react';
import { useSalon } from '../context/SalonContext';
import { 
  Sparkles, 
  CalendarCheck, 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Crown, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  X,
  RotateCcw
} from 'lucide-react';

export const DemoWelcomeModal: React.FC = () => {
  const { 
    isDemoGuideOpen, 
    setIsDemoGuideOpen, 
    setCurrentView, 
    setAdminTab,
    setIsBookingOpen,
    resetDemoData 
  } = useSalon();

  if (!isDemoGuideOpen) return null;

  const handleStartClientView = () => {
    setIsDemoGuideOpen(false);
    setCurrentView('client');
  };

  const handleOpenAdminView = (tab?: 'overview' | 'calendar' | 'stock' | 'financial' | 'loyalty') => {
    setIsDemoGuideOpen(false);
    setCurrentView('admin');
    if (tab) setAdminTab(tab);
  };

  const handleStartBooking = () => {
    setIsDemoGuideOpen(false);
    setCurrentView('client');
    setIsBookingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#121216] border border-[#D4AF37]/35 shadow-[0_0_50px_rgba(212,175,55,0.15)] rounded-2xl sm:rounded-3xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E7D3] to-[#AA8224] shrink-0" />

        {/* Close Button */}
        <button
          onClick={() => setIsDemoGuideOpen(false)}
          className="absolute top-3.5 right-3.5 z-20 p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Fechar guia e explorar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="p-4 sm:p-7 md:p-9 space-y-6 sm:space-y-8 overflow-y-auto flex-1">
          
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] sm:text-xs font-medium uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Modelo Demonstrativo Interativo · Salão de Alto Padrão</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Seja Bem-vinda(o) à Demonstração <span className="text-gold-gradient">AURUM Haute Beauté</span>
            </h1>
            
            <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
              Este é um sistema completo e 100% funcional. Você pode testar tanto a <strong>experiência da cliente</strong> (agendamento online, fotos e WhatsApp) quanto o <strong>painel executivo da dona (CEO)</strong> pelo celular ou computador.
            </p>
          </div>

          {/* Interactive Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            
            {/* Feature 1 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">1. Agendamento Online & WhatsApp</h3>
                  <span className="text-[11px] text-[#D4AF37]">Visão Cliente</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Faça agendamentos reais de teste com serviços, Master Stylist, horários e mimos com champagne. Alimenta a agenda na hora!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">2. Painel da Dona & Gestão da Agenda</h3>
                  <span className="text-[11px] text-[#D4AF37]">Painel Administrativo (CEO)</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Altere status dos atendimentos, envie lembretes no WhatsApp e crie horários manuais em layout adaptado para smartphone.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">3. Controle de Estoque & Insumos</h3>
                  <span className="text-[11px] text-[#D4AF37]">Gestão de Produtos</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Controle produtos como Kérastase e Olaplex, alertas de estoque baixo e botões rápidos de + / - direto pelo celular.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">4. DRE & Relatórios Financeiros</h3>
                  <span className="text-[11px] text-[#D4AF37]">Métricas Mensais</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Faturamento mensal, ticket médio, margem de lucro líquido e acompanhamento de comissões da equipe.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">5. Club Privilège (Fidelidade VIP)</h3>
                  <span className="text-[11px] text-[#D4AF37]">Retenção & Recompensa</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Níveis Silver, Gold, Diamond e Black Edition. Credite pontos bônus e resgate mimos exclusivos com um clique.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">6. Integração WhatsApp Concierge</h3>
                  <span className="text-[11px] text-[#D4AF37]">Comunicação Direta</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Disparos rápidos de mensagens pré-formatadas para clientes no WhatsApp com detalhes do atendimento.
              </p>
            </div>

          </div>

          {/* Interactive Notice */}
          <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="text-xs text-stone-200 leading-relaxed">
              <strong>100% Interativo:</strong> Você pode navegar à vontade, fazer agendamentos, alterar produtos e navegar pelo menu inferior do app.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Dados Originais
            </button>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => handleOpenAdminView('overview')}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/40 hover:bg-[#D4AF37]/20 rounded-xl transition-all text-center"
              >
                💼 Painel da Dona (CEO)
              </button>

              <button
                onClick={handleStartBooking}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-200 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all text-center"
              >
                📅 Fazer Agendamento Teste
              </button>

              <button
                onClick={handleStartClientView}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 shadow-md shadow-[#D4AF37]/20 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explorar Site</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
