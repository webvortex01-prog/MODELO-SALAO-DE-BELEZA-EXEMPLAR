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
    sessionStorage.setItem('aurum_demo_seen', 'true');
    setIsDemoGuideOpen(false);
    setCurrentView('client');
  };

  const handleOpenAdminView = (tab?: 'overview' | 'calendar' | 'stock' | 'financial' | 'loyalty') => {
    sessionStorage.setItem('aurum_demo_seen', 'true');
    setIsDemoGuideOpen(false);
    setCurrentView('admin');
    if (tab) setAdminTab(tab);
  };

  const handleStartBooking = () => {
    sessionStorage.setItem('aurum_demo_seen', 'true');
    setIsDemoGuideOpen(false);
    setCurrentView('client');
    setIsBookingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#121216] border border-[#D4AF37]/35 shadow-[0_0_50px_rgba(212,175,55,0.15)] rounded-2xl overflow-hidden my-auto">
        
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E7D3] to-[#AA8224]" />

        {/* Close Button */}
        <button
          onClick={() => {
            sessionStorage.setItem('aurum_demo_seen', 'true');
            setIsDemoGuideOpen(false);
          }}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Fechar guia e explorar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 md:p-10 space-y-8 max-h-[85vh] overflow-y-auto">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Modelo Exemplar Interativo · Portfólio de Alta Conversão
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Seja Bem-vinda(o) à Demonstração <span className="text-gold-gradient">AURUM Haute Beauté</span>
            </h1>
            
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Este é um sistema completo e 100% interativo projetado para <strong>Salões de Beleza de Alto Padrão</strong>. 
              Você pode simular tanto a <strong>experiência luxuosa da cliente</strong> quanto a <strong>gestão completa da dona do salão</strong>.
            </p>
          </div>

          {/* Interactive Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Feature 1 */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">1. Agendamento Online & WhatsApp</h3>
                  <span className="text-xs text-[#D4AF37]">Visão Cliente</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Faça agendamentos de teste selecionando serviço (Mechas, Corte, Caviar, Nails), escolha o Master Stylist, horário real e extras como Champagne. Dispara mensagem formatada no WhatsApp e alimenta a agenda em tempo real!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">2. Painel da Dona & Gestão de Agenda</h3>
                  <span className="text-xs text-[#D4AF37]">Painel Administrativo</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Veja os horários do dia e semana, mude status dos atendimentos (Em Atendimento, Concluído, Confirmado), crie horários manuais e visualize a taxa de ocupação da equipe.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">3. Controle de Estoque & Insumos</h3>
                  <span className="text-xs text-[#D4AF37]">Gestão de Produtos</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Controle produtos de uso interno e revenda (Kérastase, Olaplex, Wella). Receba alertas automáticos de reposição, dê baixa no estoque com 1 clique e cadastre novos itens.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">4. DRE & Relatórios Financeiros</h3>
                  <span className="text-xs text-[#D4AF37]">Métricas Mensais</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Acompanhe o faturamento mensal, ticket médio, lucro líquido, comissões pagas aos profissionais e faturamento por categoria de serviços.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">5. Club Privilège (Fidelidade VIP)</h3>
                  <span className="text-xs text-[#D4AF37]">Retenção de Clientes</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Sistema automatizado de pontos e níveis (Silver, Gold, Diamond, Black Edition). Credite pontos, resgate vouchers e premiações exclusivas.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">6. Integração WhatsApp Concierge</h3>
                  <span className="text-xs text-[#D4AF37]">Comunicação Direta</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Mensagens automáticas prontas para confirmação de horário, lembretes de sessão e ofertas VIP personalizadas com 1 clique no WhatsApp.
              </p>
            </div>

          </div>

          {/* Demonstration Interactive Notice */}
          <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              <strong>Tudo é interativo e persistente:</strong> você pode criar quantos agendamentos quiser, alterar o estoque, mudar status da agenda ou testar o resgate de pontos. A qualquer momento você pode alternar entre a visão de Cliente e o Painel da Dona no topo da tela.
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-stone-200 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Dados Originais da Demo
            </button>

            <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleOpenAdminView('overview')}
                className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/40 hover:bg-[#D4AF37]/20 rounded-xl transition-all"
              >
                💼 Abrir Painel da Dona
              </button>

              <button
                onClick={handleStartBooking}
                className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-200 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all"
              >
                📅 Fazer Agendamento Teste
              </button>

              <button
                onClick={handleStartClientView}
                className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 shadow-md shadow-[#D4AF37]/20 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explorar Site do Cliente</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
