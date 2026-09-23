import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Package, 
  TrendingUp, 
  Crown, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MessageCircle, 
  ChevronRight, 
  Trash2, 
  Edit3, 
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Gift,
  DollarSign,
  UserCheck
} from 'lucide-react';
import { AppointmentStatus, StockProduct, LoyaltyTier } from '../../types/salon';
import { SALON_INFO } from '../../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    addAppointment,
    stock,
    updateStockQuantity,
    addNewProduct,
    financials,
    loyaltyClients,
    addLoyaltyPoints,
    redeemLoyaltyReward,
    loyaltyRewards,
    specialists,
    services,
    setCurrentView,
    resetDemoData
  } = useSalon();

  // Filters & State for Agenda
  const [calendarDate, setCalendarDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [specialistFilter, setSpecialistFilter] = useState<string>('todos');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [isManualAptOpen, setIsManualAptOpen] = useState(false);

  // Manual Appointment Form State
  const [manualClientName, setManualClientName] = useState('');
  const [manualClientPhone, setManualClientPhone] = useState('');
  const [manualServiceId, setManualServiceId] = useState(services[0]?.id || '');
  const [manualSpecialistId, setManualSpecialistId] = useState(specialists[0]?.id || '');
  const [manualTime, setManualTime] = useState('15:00');
  const [manualNotes, setManualNotes] = useState('');

  // Stock Filter & Add Product Modal State
  const [stockCategoryFilter, setStockCategoryFilter] = useState<string>('todos');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('Kérastase');
  const [newProdCategory, setNewProdCategory] = useState<any>('capilar');
  const [newProdType, setNewProdType] = useState<any>('revenda');
  const [newProdQty, setNewProdQty] = useState(10);
  const [newProdMin, setNewProdMin] = useState(5);
  const [newProdCost, setNewProdCost] = useState(120);
  const [newProdPrice, setNewProdPrice] = useState(250);

  // Loyalty Add Points Modal State
  const [selectedLoyaltyClient, setSelectedLoyaltyClient] = useState<any>(null);
  const [pointsToAdd, setPointsToAdd] = useState<number>(100);

  // Today's stats calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === todayStr);
  const currentMonthFinancial = financials[financials.length - 1];
  const lowStockItems = stock.filter(item => item.quantity <= item.minThreshold);
  const totalStockValue = stock.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);

  const handleCreateManualApt = (e: React.FormEvent) => {
    e.preventDefault();
    const service = services.find(s => s.id === manualServiceId) || services[0];
    const specialist = specialists.find(s => s.id === manualSpecialistId) || specialists[0];

    addAppointment({
      clientName: manualClientName.trim(),
      clientPhone: manualClientPhone.trim() || '(11) 99999-9999',
      serviceId: service.id,
      serviceName: service.name,
      specialistId: specialist.id,
      specialistName: specialist.name,
      date: calendarDate,
      time: manualTime,
      durationMinutes: service.durationMinutes,
      totalPrice: service.price,
      status: 'confirmado',
      notes: manualNotes.trim() || undefined,
    });

    setIsManualAptOpen(false);
    setManualClientName('');
    setManualClientPhone('');
    setManualNotes('');
  };

  const handleCreateNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addNewProduct({
      name: newProdName.trim(),
      brand: newProdBrand.trim(),
      category: newProdCategory,
      type: newProdType,
      quantity: Number(newProdQty),
      minThreshold: Number(newProdMin),
      unitCost: Number(newProdCost),
      salePrice: Number(newProdPrice),
      sku: `${newProdBrand.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      lastRestocked: new Date().toISOString().split('T')[0],
    });

    setIsAddProductOpen(false);
    setNewProdName('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E8E6E3] pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Admin Header Bar */}
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-black/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Maison Direção Executiva</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Painel de Gestão AURUM
            </h1>
            <p className="text-xs text-stone-400">
              Controle automatizado de agenda, estoque, fluxo de caixa e programa de fidelidade VIP.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('client')}
              className="px-4 py-2 text-xs font-semibold text-stone-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Ver Site da Cliente</span>
            </button>

            <button
              onClick={resetDemoData}
              className="px-3.5 py-2 text-xs font-medium text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all flex items-center gap-1.5"
              title="Restaura os dados originais de exemplo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar Dados</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/10">
          {[
            { id: 'overview', label: 'Visão Geral & Métricas', icon: LayoutDashboard },
            { id: 'calendar', label: 'Agenda & Horários', icon: Calendar, badge: appointments.length },
            { id: 'stock', label: 'Controle de Estoque', icon: Package, alert: lowStockItems.length > 0 },
            { id: 'financial', label: 'Relatórios Financeiros', icon: TrendingUp },
            { id: 'loyalty', label: 'Club Privilège (Fidelidade)', icon: Crown },
            { id: 'team', label: 'Equipe & Comissões', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-gold-gradient text-[#0D0D10] font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'text-stone-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${isActive ? 'bg-black/20 text-[#0D0D10]' : 'bg-white/10 text-stone-300'}`}>
                    {tab.badge}
                  </span>
                )}
                {tab.alert && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: VISÃO GERAL & MÉTRICAS */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-xs">
                  <span>Faturamento (Setembro)</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                  R$ {currentMonthFinancial.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+9.2% vs mês anterior</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-xs">
                  <span>Lucro Líquido Estimado</span>
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#D4AF37] tabular-nums">
                  R$ {currentMonthFinancial.netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <span className="text-xs text-stone-400">Margem líquida de 35.0%</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-xs">
                  <span>Ticket Médio por Cliente</span>
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Crown className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                  R$ {currentMonthFinancial.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <span className="text-xs text-stone-400">Alto poder aquisitivo</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-xs">
                  <span>Atendimentos Hoje</span>
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                  {todayAppointments.length} Sessões
                </h3>
                <span className="text-xs text-stone-400">Taxa de ocupação: 88%</span>
              </div>

            </div>

            {/* Quick Actions & Low Stock Banner */}
            {lowStockItems.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Alerta de Reposição de Estoque ({lowStockItems.length} itens críticos)</h4>
                    <p className="text-xs text-stone-300">
                      Produtos como {lowStockItems.map(i => i.name.split(' ')[0]).join(', ')} estão abaixo do nível mínimo de segurança.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAdminTab('stock')}
                  className="px-4 py-1.5 text-xs font-semibold text-rose-200 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-lg transition-colors whitespace-nowrap"
                >
                  Gerenciar Estoque
                </button>
              </div>
            )}

            {/* Today's Schedule Overview + Top Stylists Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Today's appointments list */}
              <div className="lg:col-span-8 bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">Agenda do Dia ({todayStr.split('-').reverse().join('/')})</h3>
                    <p className="text-xs text-stone-400">Atendimentos programados para hoje na Maison</p>
                  </div>
                  <button
                    onClick={() => setAdminTab('calendar')}
                    className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Ver Agenda Completa</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {todayAppointments.length === 0 ? (
                    <div className="text-center py-8 text-stone-500 text-sm">
                      Nenhum agendamento para hoje ainda. Clique em "Agendar Online" ou use o botão de agendamento manual.
                    </div>
                  ) : (
                    todayAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-serif font-bold text-[#D4AF37] tabular-nums">{apt.time}</span>
                            <span className="text-stone-500">·</span>
                            <h4 className="text-sm font-semibold text-white">{apt.clientName}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              apt.status === 'em_atendimento' ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30' :
                              apt.status === 'concluido' ? 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30' :
                              apt.status === 'cancelado' ? 'bg-rose-400/15 text-rose-400 border border-rose-400/30' :
                              'bg-blue-400/15 text-blue-400 border border-blue-400/30'
                            }`}>
                              {apt.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-stone-400">
                            {apt.serviceName} com <strong className="text-stone-300">{apt.specialistName}</strong> ({apt.durationMinutes} min)
                          </p>
                          {apt.notes && (
                            <p className="text-[11px] text-stone-500 italic">Obs: {apt.notes}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <span className="text-sm font-serif font-bold text-white tabular-nums">
                            R$ {apt.totalPrice.toFixed(2)}
                          </span>

                          <select
                            value={apt.status}
                            onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)}
                            className="text-xs bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-stone-300 focus:border-[#D4AF37] outline-none"
                          >
                            <option value="confirmado" className="bg-[#141418]">Confirmado</option>
                            <option value="em_atendimento" className="bg-[#141418]">Em Atendimento</option>
                            <option value="concluido" className="bg-[#141418]">Concluído</option>
                            <option value="cancelado" className="bg-[#141418]">Cancelado</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Top Specialists Performance */}
              <div className="lg:col-span-4 bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">Desempenho da Equipe</h3>
                  <p className="text-xs text-stone-400">Faturamento acumulado no mês</p>
                </div>

                <div className="space-y-4">
                  {specialists.map((spec, idx) => (
                    <div key={spec.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{spec.name}</span>
                        <span className="text-[#D4AF37] font-serif font-bold tabular-nums">
                          R$ {(65000 - (idx * 14000)).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gold-gradient rounded-full"
                          style={{ width: `${95 - (idx * 18)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500">
                        <span>{spec.role.split('&')[0]}</span>
                        <span>{spec.activeClientsCount} atendimentos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: AGENDA & HORÁRIOS */}
        {adminTab === 'calendar' && (
          <div className="space-y-6">
            
            {/* Controls Bar */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-stone-400">Data:</label>
                  <input
                    type="date"
                    value={calendarDate}
                    onChange={(e) => setCalendarDate(e.target.value)}
                    className="px-3 py-1.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-stone-400">Profissional:</label>
                  <select
                    value={specialistFilter}
                    onChange={(e) => setSpecialistFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="todos" className="bg-[#141418]">Todos os Especialistas</option>
                    {specialists.map(s => (
                      <option key={s.id} value={s.id} className="bg-[#141418]">{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-stone-400">Status:</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="todos" className="bg-[#141418]">Todos os Status</option>
                    <option value="confirmado" className="bg-[#141418]">Confirmado</option>
                    <option value="em_atendimento" className="bg-[#141418]">Em Atendimento</option>
                    <option value="concluido" className="bg-[#141418]">Concluído</option>
                    <option value="cancelado" className="bg-[#141418]">Cancelado</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsManualAptOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Agendamento Manual</span>
              </button>

            </div>

            {/* Manual Appointment Modal */}
            {isManualAptOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141418] border border-[#D4AF37]/40 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-lg font-serif font-bold text-white">Inserir Agendamento Manual</h3>
                    <button onClick={() => setIsManualAptOpen(false)} className="text-stone-400 hover:text-white">
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateManualApt} className="space-y-3.5 text-xs">
                    <div>
                      <label className="text-stone-300 font-semibold block mb-1">Nome da Cliente *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Vanessa Guimarães"
                        value={manualClientName}
                        onChange={(e) => setManualClientName(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">WhatsApp</label>
                        <input
                          type="tel"
                          placeholder="(11) 98888-7777"
                          value={manualClientPhone}
                          onChange={(e) => setManualClientPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Horário</label>
                        <input
                          type="time"
                          value={manualTime}
                          onChange={(e) => setManualTime(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Serviço</label>
                        <select
                          value={manualServiceId}
                          onChange={(e) => setManualServiceId(e.target.value)}
                          className="w-full px-3 py-2 bg-[#141418] border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        >
                          {services.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Especialista</label>
                        <select
                          value={manualSpecialistId}
                          onChange={(e) => setManualSpecialistId(e.target.value)}
                          className="w-full px-3 py-2 bg-[#141418] border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        >
                          {specialists.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-stone-300 font-semibold block mb-1">Observações Especiais</label>
                      <input
                        type="text"
                        placeholder="Ex: Primeira vez na Maison, prefere atendimento silencioso"
                        value={manualNotes}
                        onChange={(e) => setManualNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsManualAptOpen(false)}
                        className="px-4 py-2 rounded-lg bg-white/5 text-stone-300 hover:bg-white/10"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-gold-gradient text-black font-bold"
                      >
                        Salvar Agendamento
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Appointments Table */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.03] border-b border-white/10 text-stone-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Horário / Data</th>
                      <th className="py-3.5 px-4 font-semibold">Cliente</th>
                      <th className="py-3.5 px-4 font-semibold">Serviço & Extras</th>
                      <th className="py-3.5 px-4 font-semibold">Especialista</th>
                      <th className="py-3.5 px-4 font-semibold">Valor</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-stone-300">
                    {appointments
                      .filter(a => {
                        if (specialistFilter !== 'todos' && a.specialistId !== specialistFilter) return false;
                        if (statusFilter !== 'todos' && a.status !== statusFilter) return false;
                        return true;
                      })
                      .map((apt) => (
                        <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-bold text-white font-serif text-sm tabular-nums">{apt.time}</span>
                            <span className="text-[11px] text-stone-500 block">{apt.date.split('-').reverse().join('/')}</span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-semibold text-white block">{apt.clientName}</span>
                            <span className="text-stone-400 text-[11px]">{apt.clientPhone}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-stone-200 block">{apt.serviceName}</span>
                            {apt.addOns && apt.addOns.length > 0 && (
                              <span className="text-[10px] text-[#D4AF37] block">+{apt.addOns.join(', ')}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="text-stone-200">{apt.specialistName}</span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap font-serif font-bold text-[#D4AF37] tabular-nums text-sm">
                            R$ {apt.totalPrice.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={apt.status}
                              onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none ${
                                apt.status === 'em_atendimento' ? 'bg-amber-400/15 border-amber-400/30 text-amber-400' :
                                apt.status === 'concluido' ? 'bg-emerald-400/15 border-emerald-400/30 text-emerald-400' :
                                apt.status === 'cancelado' ? 'bg-rose-400/15 border-rose-400/30 text-rose-400' :
                                'bg-blue-400/15 border-blue-400/30 text-blue-400'
                              }`}
                            >
                              <option value="confirmado" className="bg-[#141418] text-white">Confirmado</option>
                              <option value="em_atendimento" className="bg-[#141418] text-white">Em Atendimento</option>
                              <option value="concluido" className="bg-[#141418] text-white">Concluído</option>
                              <option value="cancelado" className="bg-[#141418] text-white">Cancelado</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <a
                                href={`https://wa.me/55${apt.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${apt.clientName}! Confirmando seu horário na AURUM Maison para dia ${apt.date.split('-').reverse().join('/')} às ${apt.time}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 transition-colors"
                                title="Enviar lembrete WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => deleteAppointment(apt.id)}
                                className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 transition-colors"
                                title="Excluir Agendamento"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: CONTROLE DE ESTOQUE */}
        {adminTab === 'stock' && (
          <div className="space-y-6">
            
            {/* Top Stock Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                <span className="text-xs text-stone-400">Total de Itens em Estoque</span>
                <h3 className="text-2xl font-serif font-bold text-white tabular-nums">
                  {stock.reduce((sum, i) => sum + i.quantity, 0)} unidades
                </h3>
                <span className="text-[11px] text-stone-500">{stock.length} produtos cadastrados</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                <span className="text-xs text-stone-400">Valor Imobilizado em Estoque</span>
                <h3 className="text-2xl font-serif font-bold text-[#D4AF37] tabular-nums">
                  R$ {totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <span className="text-[11px] text-stone-500">Custo de aquisição</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                <span className="text-xs text-stone-400">Itens em Nível Crítico</span>
                <h3 className="text-2xl font-serif font-bold text-rose-400 tabular-nums">
                  {lowStockItems.length} alertas
                </h3>
                <span className="text-[11px] text-rose-300">Abaixo do limite mínimo</span>
              </div>
            </div>

            {/* Actions & Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-stone-400">Filtrar Categoria:</label>
                <select
                  value={stockCategoryFilter}
                  onChange={(e) => setStockCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:border-[#D4AF37] outline-none"
                >
                  <option value="todos" className="bg-[#141418]">Todas as Categorias</option>
                  <option value="capilar" className="bg-[#141418]">Tratamentos Capilares</option>
                  <option value="coloracao" className="bg-[#141418]">Coloração & Descoloração</option>
                  <option value="finalizadores" className="bg-[#141418]">Finalizadores & Óleos</option>
                  <option value="esmaltes" className="bg-[#141418]">Esmaltes & Nails</option>
                  <option value="skin_care" className="bg-[#141418]">Skin Care & Facial</option>
                </select>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Novo Produto</span>
              </button>
            </div>

            {/* Add Product Modal */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141418] border border-[#D4AF37]/40 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-lg font-serif font-bold text-white">Cadastrar Produto / Insumo</h3>
                    <button onClick={() => setIsAddProductOpen(false)} className="text-stone-400 hover:text-white">✕</button>
                  </div>

                  <form onSubmit={handleCreateNewProduct} className="space-y-3.5 text-xs">
                    <div>
                      <label className="text-stone-300 font-semibold block mb-1">Nome do Produto *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Kérastase Nutritive 8H Magic Night Serum"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Marca / Fornecedor</label>
                        <input
                          type="text"
                          value={newProdBrand}
                          onChange={(e) => setNewProdBrand(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Tipo de Uso</label>
                        <select
                          value={newProdType}
                          onChange={(e) => setNewProdType(e.target.value as any)}
                          className="w-full px-3 py-2 bg-[#141418] border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        >
                          <option value="revenda">Revenda para Clientes</option>
                          <option value="uso_interno">Uso Interno no Lavatório</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Qtd Inicial</label>
                        <input
                          type="number"
                          value={newProdQty}
                          onChange={(e) => setNewProdQty(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Mínimo Alerta</label>
                        <input
                          type="number"
                          value={newProdMin}
                          onChange={(e) => setNewProdMin(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Custo (R$)</label>
                        <input
                          type="number"
                          value={newProdCost}
                          onChange={(e) => setNewProdCost(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="text-stone-300 font-semibold block mb-1">Venda (R$)</label>
                        <input
                          type="number"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2 rounded-lg bg-white/5 text-stone-300 hover:bg-white/10"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-gold-gradient text-black font-bold"
                      >
                        Adicionar ao Estoque
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Stock Table */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.03] border-b border-white/10 text-stone-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Produto / Marca</th>
                      <th className="py-3.5 px-4 font-semibold">Finalidade</th>
                      <th className="py-3.5 px-4 font-semibold">Quantidade</th>
                      <th className="py-3.5 px-4 font-semibold">Custo Unitário</th>
                      <th className="py-3.5 px-4 font-semibold">Preço Revenda</th>
                      <th className="py-3.5 px-4 font-semibold">Status Estoque</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Ajuste Rápido</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-stone-300">
                    {stock
                      .filter(item => stockCategoryFilter === 'todos' || item.category === stockCategoryFilter)
                      .map((item) => {
                        const isLow = item.quantity <= item.minThreshold;
                        return (
                          <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-white block">{item.name}</span>
                              <span className="text-[11px] text-[#D4AF37]">{item.brand} · SKU: {item.sku}</span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded bg-white/5 text-stone-300 text-[11px]">
                                {item.type === 'revenda' ? 'Revenda' : 'Uso Interno'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap font-serif font-bold text-white text-sm tabular-nums">
                              {item.quantity} un
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap tabular-nums">
                              R$ {item.unitCost.toFixed(2)}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap font-serif font-semibold text-[#D4AF37] tabular-nums">
                              {item.salePrice > 0 ? `R$ ${item.salePrice.toFixed(2)}` : '—'}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {isLow ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-400/10 px-2.5 py-0.5 rounded-full">
                                  <AlertTriangle className="w-3 h-3" />
                                  Estoque Baixo (Mín: {item.minThreshold})
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Regular
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => updateStockQuantity(item.id, -1)}
                                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 font-bold flex items-center justify-center"
                                  title="Dar baixa em 1 unidade"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => updateStockQuantity(item.id, +1)}
                                  className="w-7 h-7 rounded-lg bg-gold-gradient text-black font-bold flex items-center justify-center shadow-sm"
                                  title="Adicionar 1 unidade"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: RELATÓRIOS FINANCEIROS MENSAIS */}
        {adminTab === 'financial' && (
          <div className="space-y-8">
            
            {/* Header Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                <span className="text-xs text-stone-400">Receita Bruta Total</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                  R$ {financials.reduce((sum, f) => sum + f.revenue, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <span className="text-[11px] text-emerald-400">+18% no trimestre</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                <span className="text-xs text-stone-400">Comissões Pagas à Equipe</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-300 tabular-nums">
                  R$ {financials.reduce((sum, f) => sum + f.commissions, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <span className="text-[11px] text-stone-500">Média 38% por atendimento</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                <span className="text-xs text-stone-400">Despesas Operacionais & Insumos</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-300 tabular-nums">
                  R$ {financials.reduce((sum, f) => sum + f.expenses, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <span className="text-[11px] text-stone-500">Produtos, aluguel & energia</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-[#D4AF37]/40 space-y-1">
                <span className="text-xs text-[#D4AF37] font-semibold">Lucro Líquido Acumulado</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#D4AF37] tabular-nums">
                  R$ {financials.reduce((sum, f) => sum + f.netProfit, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <span className="text-[11px] text-emerald-400">Margem líquida saudável</span>
              </div>
            </div>

            {/* Monthly History Chart Simulation */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Evolução de Faturamento & Margem Líquida</h3>
                <p className="text-xs text-stone-400">Comparativo mês a mês dos últimos 5 períodos</p>
              </div>

              <div className="space-y-4">
                {financials.map((fin) => {
                  const maxRevenue = 200000;
                  const revPercent = Math.min(100, (fin.revenue / maxRevenue) * 100);
                  const profitPercent = Math.min(100, (fin.netProfit / maxRevenue) * 100);

                  return (
                    <div key={fin.month} className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <span className="font-semibold text-white">{fin.month}</span>
                        <div className="flex items-center gap-4 text-[11px]">
                          <span>Faturamento: <strong className="text-white font-serif tabular-nums">R$ {fin.revenue.toLocaleString('pt-BR')}</strong></span>
                          <span>Comissões: <span className="text-stone-400 font-serif tabular-nums">R$ {fin.commissions.toLocaleString('pt-BR')}</span></span>
                          <span>Lucro Líquido: <strong className="text-[#D4AF37] font-serif tabular-nums">R$ {fin.netProfit.toLocaleString('pt-BR')}</strong></span>
                        </div>
                      </div>

                      {/* Bar Visualization */}
                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex gap-1">
                        <div 
                          className="h-full bg-gold-gradient rounded-full"
                          style={{ width: `${revPercent}%` }}
                          title={`Receita: R$ ${fin.revenue}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: CLUBE DE FIDELIDADE (CLUB PRIVILÈGE) */}
        {adminTab === 'loyalty' && (
          <div className="space-y-6">
            
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="text-lg font-serif font-bold text-white">Membros do Club Privilège VIP</h3>
                </div>
                <p className="text-xs text-stone-400">Gestão de pontos de fidelidade, níveis de benefício e resgate de experiências.</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400">Total de Pontos Ativos:</span>
                <span className="text-lg font-serif font-bold text-[#D4AF37] tabular-nums">
                  {loyaltyClients.reduce((sum, c) => sum + c.points, 0)} pts
                </span>
              </div>
            </div>

            {/* Clients Loyalty Table */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.03] border-b border-white/10 text-stone-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Cliente VIP</th>
                      <th className="py-3.5 px-4 font-semibold">Nível / Tier</th>
                      <th className="py-3.5 px-4 font-semibold">Saldo de Pontos</th>
                      <th className="py-3.5 px-4 font-semibold">Gasto Total Acumulado</th>
                      <th className="py-3.5 px-4 font-semibold">Visitas</th>
                      <th className="py-3.5 px-4 font-semibold">Especialista Favorito</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Ações VIP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-stone-300">
                    {loyaltyClients.map((client) => (
                      <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-white block">{client.name}</span>
                          <span className="text-[11px] text-stone-400">{client.phone}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            client.tier === 'Black Edition' ? 'bg-[#D4AF37] text-black font-extrabold' :
                            client.tier === 'Diamond' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40' :
                            client.tier === 'Gold' ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' :
                            'bg-stone-500/20 text-stone-300 border border-stone-500/30'
                          }`}>
                            {client.tier}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-serif font-bold text-[#D4AF37] text-base tabular-nums">
                          {client.points} pts
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-serif font-semibold text-white tabular-nums">
                          R$ {client.totalSpend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap tabular-nums">
                          {client.visitsCount} idas
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-stone-300">
                          {client.favoriteSpecialist}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => addLoyaltyPoints(client.id, 100)}
                              className="px-2.5 py-1 rounded bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] font-semibold text-[11px] transition-colors"
                              title="Creditar 100 pontos bônus"
                            >
                              +100 pts
                            </button>

                            <button
                              onClick={() => redeemLoyaltyReward(client.id, loyaltyRewards[0].id)}
                              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] transition-colors"
                              title="Resgatar Ampola Fusio-Dose"
                            >
                              Resgatar Mimo
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: EQUIPE & PROFISSIONAIS */}
        {adminTab === 'team' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialists.map((spec) => (
                <div key={spec.id} className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={spec.avatar}
                      alt={spec.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border border-[#D4AF37]/40 shrink-0"
                    />
                    <div>
                      <h4 className="text-base font-serif font-bold text-white">{spec.name}</h4>
                      <p className="text-xs text-[#D4AF37]">{spec.role.split('&')[0]}</p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-3 text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Taxa de Comissão:</span>
                      <span className="font-bold text-white tabular-nums">{(spec.commissionRate * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Clientes Atendidos:</span>
                      <span className="font-bold text-white tabular-nums">{spec.activeClientsCount}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Nota Média:</span>
                      <span className="font-bold text-[#D4AF37] tabular-nums">★ {spec.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
