import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Crown, Sparkles, Gift, Flame, Shield, ArrowRight } from 'lucide-react';

export const LoyaltyProgramSection: React.FC = () => {
  const { setIsBookingOpen } = useSalon();
  const [monthlySpend, setMonthlySpend] = useState<number>(1200);

  const estimatedPoints = Math.floor(monthlySpend / 10);
  const estimatedTier = monthlySpend >= 2000 ? 'Black Edition' : monthlySpend >= 1000 ? 'Diamond' : monthlySpend >= 400 ? 'Gold' : 'Silver';

  return (
    <section id="club-privilege" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D10] relative overflow-hidden">
      
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            <Crown className="w-3.5 h-3.5" />
            <span>Programa de Fidelidade Exclusivo</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Club Privilège AURUM: <span className="text-gold-gradient">Sua Lealdade Reconhecida</span>
          </h2>
          
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            A cada atendimento ou aquisição de produtos, você acumula pontos automáticos convertidos em rituais capilares, presentes de aniversário e experiências VIP.
          </p>
        </div>

        {/* 4 Tiers Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Silver */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Nível Inicial</span>
                <span className="text-xs font-bold text-stone-300 bg-white/10 px-2 py-0.5 rounded">Silver</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Boas-Vindas</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Ao realizar seu primeiro agendamento online.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-stone-300 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>+50 Pontos de Entrada</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Café & Espumante Cortesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Acumula 1 pt a cada R$ 10</span>
              </li>
            </ul>
          </div>

          {/* Gold */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Acima de R$ 4.000</span>
                <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">Gold</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Frequência VIP</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Para clientes com visitas regulares na Maison.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-stone-300 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>5% Cashback em Pontos</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Ritual Fusio-Dose no Mês de Aniversário</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Prioridade na Lista de Espera</span>
              </li>
            </ul>
          </div>

          {/* Diamond (Highlighted) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1E1B18] to-[#141418] border border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/10 space-y-4 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gold-gradient text-[10px] font-bold text-[#0D0D10] uppercase tracking-wider">
              Mais Desejado
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Acima de R$ 10.000</span>
                <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/20 px-2 py-0.5 rounded">Diamond</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Alta Excelência</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Acesso irrestrito a privilégios e mimos de alta-costura.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-stone-200 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>10% Cashback em Pontos</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Reserva Garantida em Horários Nobres</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Tratamento Kérastase Caviar Anual</span>
              </li>
            </ul>
          </div>

          {/* Black Edition */}
          <div className="p-6 rounded-2xl bg-[#09090C] border border-[#D4AF37]/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F3E7D3] uppercase tracking-wider">Acima de R$ 20.000</span>
                <span className="text-xs font-bold text-black bg-[#D4AF37] px-2 py-0.5 rounded">Black</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Privilège Absolu</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Atendimento em suíte master isolada com sommelier.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-stone-300 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Suíte Privativa Dedicada</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Concierge Direto no WhatsApp 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Convite para Eventos de Alta Moda</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Points Simulator */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#141418] border border-[#D4AF37]/30 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-serif font-bold text-white">Simulador de Benefícios Club Privilège</h3>
            <p className="text-xs sm:text-sm text-stone-400">Arraste para calcular seus pontos estimados com seus cuidados mensais</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-stone-300">Investimento Mensal Estimado:</span>
              <span className="text-xl font-serif font-bold text-[#D4AF37] tabular-nums">
                R$ {monthlySpend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <input
              type="range"
              min={300}
              max={3500}
              step={100}
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[11px] text-stone-500">
              <span>R$ 300/mês</span>
              <span>R$ 1.800/mês</span>
              <span>R$ 3.500+/mês</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center items-center">
            <div>
              <span className="text-xs text-stone-400 block">Pontos por Mês</span>
              <span className="text-2xl font-serif font-bold text-white tabular-nums">+{estimatedPoints}</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Nível Alcançado</span>
              <span className="text-sm font-bold text-[#D4AF37] block mt-1">{estimatedTier}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-2 px-3 text-xs font-bold text-[#0D0D10] bg-gold-gradient rounded-lg hover:opacity-95 transition-all shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-1.5"
              >
                <span>Fazer Parte</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
