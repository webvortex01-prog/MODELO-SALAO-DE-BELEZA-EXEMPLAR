export type ServiceCategory = 
  | 'cabelos' 
  | 'mechas' 
  | 'tratamentos' 
  | 'estetica' 
  | 'nails' 
  | 'noivas';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  durationMinutes: number;
  price: number;
  image?: string;
  popular?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  commissionRate: number; // e.g. 0.40 = 40%
  availableDays: number[]; // 0-6 (0 = Sun, 1 = Mon, etc.)
  activeClientsCount: number;
}

export type AppointmentStatus = 
  | 'confirmado' 
  | 'em_atendimento' 
  | 'concluido' 
  | 'pendente_whatsapp' 
  | 'cancelado';

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  specialistId: string;
  specialistName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  durationMinutes: number;
  totalPrice: number;
  status: AppointmentStatus;
  notes?: string;
  addOns?: string[];
  createdAt: string;
}

export interface StockProduct {
  id: string;
  name: string;
  brand: string;
  category: 'capilar' | 'coloracao' | 'finalizadores' | 'esmaltes' | 'skin_care' | 'insumos';
  type: 'uso_interno' | 'revenda';
  quantity: number;
  minThreshold: number;
  unitCost: number;
  salePrice: number;
  sku: string;
  lastRestocked: string;
}

export type LoyaltyTier = 'Silver' | 'Gold' | 'Diamond' | 'Black Edition';

export interface LoyaltyClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  points: number;
  tier: LoyaltyTier;
  totalSpend: number;
  visitsCount: number;
  lastVisit: string;
  favoriteSpecialist: string;
  memberSince: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  category: string;
  tierRequired: LoyaltyTier;
}

export interface MonthlyFinancialRecord {
  month: string;
  revenue: number;
  expenses: number;
  commissions: number;
  netProfit: number;
  appointmentsCount: number;
  averageTicket: number;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategory | 'todos' | 'processos';
  image: string;
  description: string;
  specialistName: string;
  likes: number;
  duration?: string;
  technique?: string;
  productsUsed?: string[];
  processSteps?: string[];
  badge?: string;
}
