import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Appointment, 
  StockProduct, 
  LoyaltyClient, 
  LoyaltyReward, 
  MonthlyFinancialRecord, 
  Service, 
  Specialist, 
  AppointmentStatus,
  LoyaltyTier
} from '../types/salon';
import { 
  INITIAL_APPOINTMENTS, 
  INITIAL_STOCK, 
  INITIAL_LOYALTY_CLIENTS, 
  INITIAL_LOYALTY_REWARDS, 
  INITIAL_FINANCIALS, 
  INITIAL_SERVICES, 
  INITIAL_SPECIALISTS 
} from '../data/initialData';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'gold' | 'warning';
}

interface SalonContextType {
  currentView: 'client' | 'admin';
  setCurrentView: (view: 'client' | 'admin') => void;
  adminTab: 'overview' | 'calendar' | 'stock' | 'financial' | 'loyalty' | 'team' | 'settings';
  setAdminTab: (tab: 'overview' | 'calendar' | 'stock' | 'financial' | 'loyalty' | 'team' | 'settings') => void;
  
  services: Service[];
  specialists: Specialist[];
  appointments: Appointment[];
  stock: StockProduct[];
  loyaltyClients: LoyaltyClient[];
  loyaltyRewards: LoyaltyReward[];
  financials: MonthlyFinancialRecord[];
  
  // Booking modal state
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  preselectedServiceId: string | null;
  setPreselectedServiceId: (id: string | null) => void;

  // Welcome / Demo Guide Modal
  isDemoGuideOpen: boolean;
  setIsDemoGuideOpen: (open: boolean) => void;

  // Actions
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  deleteAppointment: (id: string) => void;
  updateStockQuantity: (id: string, delta: number) => void;
  addNewProduct: (product: Omit<StockProduct, 'id'>) => void;
  addLoyaltyPoints: (clientId: string, points: number) => void;
  redeemLoyaltyReward: (clientId: string, rewardId: string) => boolean;
  addNewClient: (client: Omit<LoyaltyClient, 'id' | 'memberSince'>) => void;
  resetDemoData: () => void;
  
  // Toast notifications
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'gold' | 'warning') => void;
  removeToast: (id: string) => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'aurum_salon_demo_v1';

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'client' | 'admin'>('client');
  const [adminTab, setAdminTab] = useState<'overview' | 'calendar' | 'stock' | 'financial' | 'loyalty' | 'team' | 'settings'>('overview');
  
  const [services] = useState<Service[]>(INITIAL_SERVICES);
  const [specialists] = useState<Specialist[]>(INITIAL_SPECIALISTS);
  const [loyaltyRewards] = useState<LoyaltyReward[]>(INITIAL_LOYALTY_REWARDS);
  const [financials, setFinancials] = useState<MonthlyFinancialRecord[]>(INITIAL_FINANCIALS);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_appointments`);
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [stock, setStock] = useState<StockProduct[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_stock`);
    return saved ? JSON.parse(saved) : INITIAL_STOCK;
  });

  const [loyaltyClients, setLoyaltyClients] = useState<LoyaltyClient[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_loyalty`);
    return saved ? JSON.parse(saved) : INITIAL_LOYALTY_CLIENTS;
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  // Demo Guide Modal opens automatically on every new entry so prospect clients always see the tutorial
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(true);

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_appointments`, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_stock`, JSON.stringify(stock));
  }, [stock]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_loyalty`, JSON.stringify(loyaltyClients));
  }, [loyaltyClients]);

  const showToast = (message: string, type: 'success' | 'info' | 'gold' | 'warning' = 'gold') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const calculateTier = (totalSpend: number): LoyaltyTier => {
    if (totalSpend >= 20000) return 'Black Edition';
    if (totalSpend >= 10000) return 'Diamond';
    if (totalSpend >= 4000) return 'Gold';
    return 'Silver';
  };

  const addAppointment = (data: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Automatically update or create loyalty record
    setLoyaltyClients((prev) => {
      const existingIndex = prev.findIndex(c => c.name.toLowerCase() === data.clientName.toLowerCase() || c.phone === data.clientPhone);
      const pointsEarned = Math.floor(data.totalPrice / 10); // 1 point for every 10 BRL

      if (existingIndex >= 0) {
        const updated = [...prev];
        const client = updated[existingIndex];
        const newSpend = client.totalSpend + data.totalPrice;
        updated[existingIndex] = {
          ...client,
          points: client.points + pointsEarned,
          totalSpend: newSpend,
          visitsCount: client.visitsCount + 1,
          lastVisit: "Hoje",
          tier: calculateTier(newSpend),
          favoriteSpecialist: data.specialistName
        };
        return updated;
      } else {
        const newClient: LoyaltyClient = {
          id: `loy-${Date.now()}`,
          name: data.clientName,
          phone: data.clientPhone,
          email: data.clientEmail || 'cliente@aurum.com',
          points: pointsEarned + 50, // 50 bonus welcome points
          tier: 'Silver',
          totalSpend: data.totalPrice,
          visitsCount: 1,
          lastVisit: "Hoje",
          favoriteSpecialist: data.specialistName,
          memberSince: new Date().toISOString().split('T')[0]
        };
        return [newClient, ...prev];
      }
    });

    // Update current month revenue in financials
    setFinancials((prev) => {
      const currentIdx = prev.length - 1;
      const updated = [...prev];
      const current = updated[currentIdx];
      const addedRevenue = data.totalPrice;
      const addedCommissions = addedRevenue * 0.4;
      const addedExpenses = addedRevenue * 0.15;
      const newRevenue = current.revenue + addedRevenue;
      const newExpenses = current.expenses + addedExpenses;
      const newCommissions = current.commissions + addedCommissions;
      const newAppointmentsCount = current.appointmentsCount + 1;

      updated[currentIdx] = {
        ...current,
        revenue: newRevenue,
        expenses: newExpenses,
        commissions: newCommissions,
        netProfit: newRevenue - newExpenses - newCommissions,
        appointmentsCount: newAppointmentsCount,
        averageTicket: Number((newRevenue / newAppointmentsCount).toFixed(2))
      };
      return updated;
    });

    showToast(`✨ Agendamento de ${data.clientName} registrado com sucesso! Já está visível na Agenda Admin.`, 'gold');
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
    showToast(`Status do agendamento atualizado para: ${status.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    showToast(`Agendamento removido da agenda.`, 'warning');
  };

  const updateStockQuantity = (id: string, delta: number) => {
    setStock((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty, lastRestocked: new Date().toISOString().split('T')[0] };
        }
        return item;
      })
    );
    showToast(`Estoque atualizado com sucesso!`, 'info');
  };

  const addNewProduct = (productData: Omit<StockProduct, 'id'>) => {
    const newProduct: StockProduct = {
      ...productData,
      id: `stk-${Date.now()}`
    };
    setStock((prev) => [newProduct, ...prev]);
    showToast(`Produto "${productData.name}" adicionado ao inventário!`, 'gold');
  };

  const addLoyaltyPoints = (clientId: string, points: number) => {
    setLoyaltyClients((prev) =>
      prev.map((client) => {
        if (client.id === clientId) {
          const newPts = Math.max(0, client.points + points);
          return { ...client, points: newPts };
        }
        return client;
      })
    );
    showToast(`+${points} Pontos VIP creditados com sucesso!`, 'gold');
  };

  const redeemLoyaltyReward = (clientId: string, rewardId: string): boolean => {
    const reward = loyaltyRewards.find(r => r.id === rewardId);
    if (!reward) return false;

    let success = false;
    setLoyaltyClients((prev) =>
      prev.map((client) => {
        if (client.id === clientId) {
          if (client.points >= reward.pointsRequired) {
            success = true;
            return { ...client, points: client.points - reward.pointsRequired };
          }
        }
        return client;
      })
    );

    if (success) {
      showToast(`🎁 Recompensa "${reward.title}" resgatada com sucesso!`, 'success');
      return true;
    } else {
      showToast(`Saldo insuficiente de pontos para esta recompensa.`, 'warning');
      return false;
    }
  };

  const addNewClient = (clientData: Omit<LoyaltyClient, 'id' | 'memberSince'>) => {
    const newClient: LoyaltyClient = {
      ...clientData,
      id: `loy-${Date.now()}`,
      memberSince: new Date().toISOString().split('T')[0]
    };
    setLoyaltyClients((prev) => [newClient, ...prev]);
    showToast(`Cliente VIP "${clientData.name}" cadastrada no Club Privilège!`, 'gold');
  };

  const resetDemoData = () => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_appointments`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_stock`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_loyalty`);
    setAppointments(INITIAL_APPOINTMENTS);
    setStock(INITIAL_STOCK);
    setLoyaltyClients(INITIAL_LOYALTY_CLIENTS);
    setFinancials(INITIAL_FINANCIALS);
    setIsDemoGuideOpen(true);
    showToast(`Dados de demonstração restaurados para o padrão original!`, 'info');
  };

  return (
    <SalonContext.Provider
      value={{
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        services,
        specialists,
        appointments,
        stock,
        loyaltyClients,
        loyaltyRewards,
        financials,
        isBookingOpen,
        setIsBookingOpen,
        preselectedServiceId,
        setPreselectedServiceId,
        isDemoGuideOpen,
        setIsDemoGuideOpen,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        updateStockQuantity,
        addNewProduct,
        addLoyaltyPoints,
        redeemLoyaltyReward,
        addNewClient,
        resetDemoData,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
