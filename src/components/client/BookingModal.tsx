import React, { useState, useEffect } from 'react';
import { useSalon } from '../../context/SalonContext';
import { INITIAL_ADDONS, SALON_INFO } from '../../data/initialData';
import { 
  X, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft,
  Crown,
  LayoutDashboard
} from 'lucide-react';

const TIME_SLOTS = [
  "09:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30"
];

export const BookingModal: React.FC = () => {
  const { 
    isBookingOpen, 
    setIsBookingOpen, 
    preselectedServiceId, 
    setPreselectedServiceId,
    services, 
    specialists, 
    addAppointment,
    setCurrentView,
    setAdminTab
  } = useSalon();

  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('14:30');
  
  // Client Details Form
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Confirmed appointment result
  const [confirmedApt, setConfirmedApt] = useState<any>(null);

  // Sync preselected service
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    } else if (services.length > 0 && !selectedServiceId) {
      setSelectedServiceId(services[0].id);
    }
  }, [preselectedServiceId, services]);

  // Set default specialist
  useEffect(() => {
    if (specialists.length > 0 && !selectedSpecialistId) {
      setSelectedSpecialistId(specialists[0].id);
    }
  }, [specialists]);

  if (!isBookingOpen) return null;

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];
  const currentSpecialist = specialists.find(s => s.id === selectedSpecialistId) || specialists[0];

  const totalAddOnsPrice = selectedAddOns.reduce((sum, addonName) => {
    const item = INITIAL_ADDONS.find(a => a.name === addonName);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalDuration = currentService.durationMinutes + selectedAddOns.reduce((sum, addonName) => {
    const item = INITIAL_ADDONS.find(a => a.name === addonName);
    return sum + (item ? item.durationMinutes : 0);
  }, 0);

  const totalPrice = currentService.price + totalAddOnsPrice;

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnName) 
        ? prev.filter(name => name !== addOnName) 
        : [...prev, addOnName]
    );
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setPreselectedServiceId(null);
    setStep(1);
    setConfirmedApt(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert("Por favor, preencha ao menos Nome e WhatsApp para confirmar a reserva.");
      return;
    }

    const apt = addAppointment({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      serviceId: currentService.id,
      serviceName: currentService.name,
      specialistId: currentSpecialist.id,
      specialistName: currentSpecialist.name,
      date: selectedDate,
      time: selectedTime,
      durationMinutes: totalDuration,
      totalPrice: totalPrice,
      status: 'confirmado',
      notes: clientNotes.trim() || undefined,
      addOns: selectedAddOns.length > 0 ? selectedAddOns : undefined,
    });

    setConfirmedApt(apt);
    setStep(5); // Success step
  };

  const generateWhatsAppUrl = () => {
    if (!confirmedApt) return '#';
    const message = `✨ *SOLICITAÇÃO DE AGENDAMENTO AURUM MAISON DE BEAUTÉ* ✨\n\n` +
      `👤 *Cliente:* ${confirmedApt.clientName}\n` +
      `📱 *WhatsApp:* ${confirmedApt.clientPhone}\n` +
      `💇‍♀️ *Serviço:* ${confirmedApt.serviceName}\n` +
      `💎 *Especialista:* ${confirmedApt.specialistName}\n` +
      `📅 *Data:* ${confirmedApt.date.split('-').reverse().join('/')}\n` +
      `⏰ *Horário:* ${confirmedApt.time} (${confirmedApt.durationMinutes} min)\n` +
      (confirmedApt.addOns?.length ? `🍾 *Extras:* ${confirmedApt.addOns.join(', ')}\n` : '') +
      `💰 *Total Previsto:* R$ ${confirmedApt.totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n` +
      (confirmedApt.notes ? `📝 *Observações:* ${confirmedApt.notes}\n` : '') +
      `\n_Por favor, confirme a disponibilidade deste horário na Maison._`;

    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleGoToAdminAgenda = () => {
    handleClose();
    setCurrentView('admin');
    setAdminTab('calendar');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#121216] border border-[#D4AF37]/35 shadow-[0_0_50px_rgba(212,175,55,0.15)] rounded-2xl overflow-hidden my-auto">
        
        {/* Gold accent top line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E7D3] to-[#AA8224]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                {step === 5 ? 'Agendamento Confirmado' : 'Agendamento Online VIP'}
              </h2>
              <span className="text-xs text-stone-400">
                {step === 1 && 'Etapa 1 de 4: Escolha o Serviço & Mimos'}
                {step === 2 && 'Etapa 2 de 4: Selecione o Master Specialist'}
                {step === 3 && 'Etapa 3 de 4: Data & Horário Desejado'}
                {step === 4 && 'Etapa 4 de 4: Seus Dados para Reserva'}
                {step === 5 && 'Sua experiência foi registrada com sucesso'}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Select Service & Add-ons */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                  1. Selecione o Protocolo Principal
                </label>
                <div className="grid grid-cols-1 gap-2.5 max-h-60 overflow-y-auto pr-1">
                  {services.map((service) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-sm'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{service.name}</p>
                          <p className="text-xs text-stone-400">{service.durationMinutes} min · {service.description.substring(0, 70)}...</p>
                        </div>
                        <span className="text-sm font-serif font-bold text-[#D4AF37] whitespace-nowrap tabular-nums">
                          R$ {service.price.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons selection */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                    Mimos & Upgrades Opcionais
                  </label>
                  <span className="text-[11px] text-stone-400">Personalize seu momento</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {INITIAL_ADDONS.map((addon) => {
                    const isChecked = selectedAddOns.includes(addon.name);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.name)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all text-xs flex items-start justify-between gap-2 ${
                          isChecked
                            ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                            : 'bg-white/[0.01] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="font-semibold text-white">{addon.name}</p>
                          <p className="text-stone-400 text-[11px]">{addon.description}</p>
                        </div>
                        <span className="font-bold text-[#D4AF37] shrink-0 tabular-nums">
                          +R$ {addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Specialist */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Escolha o Especialista de sua preferência
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {specialists.map((spec) => {
                  const isSelected = selectedSpecialistId === spec.id;
                  return (
                    <div
                      key={spec.id}
                      onClick={() => setSelectedSpecialistId(spec.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-sm'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <img
                        src={spec.avatar}
                        alt={spec.name}
                        referrerPolicy="no-referrer"
                        className="w-13 h-13 rounded-full object-cover border border-[#D4AF37]/40 shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{spec.name}</p>
                        <p className="text-xs text-[#D4AF37] truncate">{spec.role}</p>
                        <p className="text-[11px] text-stone-400">{spec.specialties.join(', ')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Slot */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                  Selecione o Dia do Atendimento
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white focus:border-[#D4AF37] outline-none text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                  Horários Disponíveis com {currentSpecialist.name}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all tabular-nums ${
                          isSelected
                            ? 'bg-gold-gradient text-[#0D0D10] font-bold shadow-md'
                            : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Client Contact & Confirmation Form */}
          {step === 4 && (
            <form id="booking-form" onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-start gap-3">
                <Crown className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="text-xs text-stone-300">
                  <p className="font-semibold text-white">Resumo da Reserva VIP</p>
                  <p>{currentService.name} com {currentSpecialist.name}</p>
                  <p className="text-stone-400">{selectedDate.split('-').reverse().join('/')} às {selectedTime} ({totalDuration} min)</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gabriela Monteiro"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-stone-600 focus:border-[#D4AF37] outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">WhatsApp para Confirmação *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-stone-600 focus:border-[#D4AF37] outline-none text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">E-mail (Opcional)</label>
                  <input
                    type="email"
                    placeholder="gabriela@email.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-stone-600 focus:border-[#D4AF37] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Preferências ou Observações (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Gostaria de café expresso sem açúcar, cabelos sensíveis a química..."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-stone-600 focus:border-[#D4AF37] outline-none text-sm resize-none"
                />
              </div>
            </form>
          )}

          {/* STEP 5: Success & Instant Confirmation */}
          {step === 5 && confirmedApt && (
            <div className="text-center space-y-6 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-white">Reserva Confirmada com Sucesso!</h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
                  Olá, <strong>{confirmedApt.clientName}</strong>. Seu horário foi registrado no sistema AURUM para o dia <strong>{confirmedApt.date.split('-').reverse().join('/')} às {confirmedApt.time}</strong>.
                </p>
              </div>

              {/* Loyalty Reward Points Earned Preview */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 to-[#AA8224]/10 border border-[#D4AF37]/40 text-left flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    Club Privilège AURUM
                  </span>
                  <p className="text-xs text-stone-200">Você acumulou <strong>+{Math.floor(confirmedApt.totalPrice / 10)} pontos VIP</strong> com este agendamento!</p>
                </div>
                <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/20 px-2.5 py-1 rounded-md">
                  Nível Silver
                </span>
              </div>

              {/* Action Buttons: Direct WhatsApp Test + Shortcut to Admin Agenda */}
              <div className="space-y-3 pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5 text-black" />
                  <span>Enviar Confirmação pelo WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleGoToAdminAgenda}
                  className="w-full py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-stone-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                  <span>Ver este agendamento no Painel da Dona (Admin)</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Steps 1 to 4) */}
        {step < 5 && (
          <div className="p-5 sm:p-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-stone-400 block">Total Previsto</span>
              <span className="text-lg font-serif font-bold text-white tabular-nums">
                R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev + 1)}
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20"
                >
                  <span>Próximo Passo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="booking-form"
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#0D0D10] bg-gold-gradient hover:opacity-95 rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/25"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finalizar Reserva</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
