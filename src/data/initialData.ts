import { 
  Service, 
  Specialist, 
  Appointment, 
  StockProduct, 
  LoyaltyClient, 
  LoyaltyReward, 
  MonthlyFinancialRecord, 
  AddOnItem, 
  Review, 
  GalleryItem 
} from '../types/salon';

import heroSalonImg from '../assets/images/hero_luxury_salon_1790183778991.jpg';
import balayageImg from '../assets/images/hair_balayage_luxury_1790183789548.jpg';
import spaFacialImg from '../assets/images/spa_facial_treatment_1790183800817.jpg';
import directorPortraitImg from '../assets/images/salon_owner_portrait_1790183810490.jpg';
import blondePearlImg from '../assets/images/blonde_pearl_luxury_1790184314606.jpg';
import brunetteGlowImg from '../assets/images/brunette_glow_luxury_1790184324940.jpg';
import brideHairImg from '../assets/images/bride_hair_styling_1790184335077.jpg';
import hairProcessBlowoutImg from '../assets/images/hair_process_blowout_1790184344635.jpg';
import hairKeratinGlossImg from '../assets/images/hair_keratin_gloss_1790184357090.jpg';
import curlsLuxuryCutImg from '../assets/images/curls_luxury_cut_1790184370149.jpg';
import nailArtHauteImg from '../assets/images/nail_art_haute_1790184380761.jpg';

export const SALON_INFO = {
  name: "AURUM Maison de Beauté",
  tagline: "Haute Coiffure, Estética Avançada & Experiência Sob Medida",
  address: "Av. Brigadeiro Faria Lima, 3477 - 14º Andar - Itaim Bibi, São Paulo - SP",
  phone: "(11) 98765-4321",
  whatsappNumber: "5511987654321",
  instagram: "@aurum.maison",
  email: "concierge@aurummaison.com.br",
  hours: "Terça a Sábado: 09h às 20h | Segunda: 10h às 18h",
  heroImage: heroSalonImg,
  directorImage: directorPortraitImg,
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "serv-1",
    name: "Balayage Glow & Contorno Iluminado",
    category: "mechas",
    description: "Técnica francesa exclusiva de iluminação gradual personalizada com proteção de plex e tonalização gloss de alto brilho.",
    durationMinutes: 180,
    price: 880,
    image: balayageImg,
    popular: true,
  },
  {
    id: "serv-2",
    name: "Corte Haute Coiffure + Visagismo",
    category: "cabelos",
    description: "Diagnóstico biométrico facial, lavagem aromaterapêutica, corte de precisão e finalização modelada com babyliss de seda.",
    durationMinutes: 75,
    price: 340,
    image: balayageImg,
    popular: true,
  },
  {
    id: "serv-3",
    name: "Ritual Kérastase Chronologiste Caviar",
    category: "tratamentos",
    description: "O mais sublime tratamento capilar com pérolas miméticas de caviar para regeneração profunda do couro cabeludo e fios.",
    durationMinutes: 90,
    price: 520,
    popular: true,
  },
  {
    id: "serv-4",
    name: "Olaplex 4-in-1 Moisture Bond Builder",
    category: "tratamentos",
    description: "Reconstrução molecular imediata para cabelos fragilizados ou pós-química, devolvendo 100% da elasticidade e maciez.",
    durationMinutes: 60,
    price: 410,
  },
  {
    id: "serv-5",
    name: "Facial Glow Lift & Drenagem Francesa",
    category: "estetica",
    description: "Higienização profunda, esfoliação com ácidos nobres, massagem lifting manual e máscara de ouro 24k com bio-colágeno.",
    durationMinutes: 80,
    price: 460,
    image: spaFacialImg,
    popular: true,
  },
  {
    id: "serv-6",
    name: "Manicure & Pedicure Couture Russa",
    category: "nails",
    description: "Cuticulagem a seco com micromotores, blindagem com gel de alta aderência e esmaltação premium Dior/Chanel.",
    durationMinutes: 90,
    price: 240,
  },
  {
    id: "serv-7",
    name: "Dia da Noiva Privilège & Acompanhantes",
    category: "noivas",
    description: "Suíte privativa com champagne, prévia completa, massagem relaxante, make de alta durabilidade e penteado de alta-costura.",
    durationMinutes: 300,
    price: 2600,
    popular: true,
  },
  {
    id: "serv-8",
    name: "Make-up Editorial & Airbrush Glamour",
    category: "noivas",
    description: "Maquiagem sofisticada com acabamento acetinado de longa duração, contorno suave e cílios artesanais em seda.",
    durationMinutes: 75,
    price: 390,
  },
];

export const INITIAL_SPECIALISTS: Specialist[] = [
  {
    id: "spec-1",
    name: "Helena Vianna",
    role: "Diretora Criativa & Master Colorist",
    bio: "Formada na Académie Alexandre de Paris, com mais de 14 anos de experiência em mechas de luxo e visagismo internacional.",
    avatar: directorPortraitImg,
    rating: 5.0,
    reviewCount: 312,
    specialties: ["Balayage Glow", "Loiras Naturais", "Corte de Precisão"],
    commissionRate: 0.45,
    availableDays: [1, 2, 3, 4, 5, 6],
    activeClientsCount: 420,
  },
  {
    id: "spec-2",
    name: "Gabriel Montes",
    role: "Master Hair Sculptor & Terapeuta Capilar",
    bio: "Especialista em texturização, cortes modernos sem perder o comprimento e cronogramas capilares de alta performance.",
    avatar: balayageImg,
    rating: 4.9,
    reviewCount: 248,
    specialties: ["Cortes Estruturados", "Tratamento Caviar", "Brushing Glamour"],
    commissionRate: 0.40,
    availableDays: [2, 3, 4, 5, 6],
    activeClientsCount: 315,
  },
  {
    id: "spec-3",
    name: "Camille Rossi",
    role: "Facialist & Dermo-Esteta Avançada",
    bio: "Pós-graduada em cosmiatria francesa com foco em protocolos glow, estimulação de colágeno e bem-estar sensorial.",
    avatar: spaFacialImg,
    rating: 5.0,
    reviewCount: 194,
    specialties: ["Glow Lift Facial", "Peelings Iluminadores", "Drenagem Facial"],
    commissionRate: 0.40,
    availableDays: [2, 3, 4, 5, 6],
    activeClientsCount: 230,
  },
  {
    id: "spec-4",
    name: "Isabella Duarte",
    role: "Nail Artist & Especialista em Gel Couture",
    bio: "Referência em unhas com acabamento natural, alongamentos sutis em fibra de vidro e esmaltação importada de longa duração.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewCount: 186,
    specialties: ["Cutilagem Russa", "Blindagem Diamante", "Nail Art Minimalista"],
    commissionRate: 0.40,
    availableDays: [1, 2, 3, 4, 5, 6],
    activeClientsCount: 280,
  }
];

export const INITIAL_ADDONS: AddOnItem[] = [
  {
    id: "addon-1",
    name: "Massagem Craniana Aromaterapêutica (15 min)",
    price: 85,
    durationMinutes: 15,
    description: "Óleos essenciais orgânicos com foco em alívio de tensões e estímulo à microcirculação capilar.",
  },
  {
    id: "addon-2",
    name: "Boas-Vindas Champagne Veuve Clicquot + Trufas Lindt",
    price: 95,
    durationMinutes: 0,
    description: "Serviço exclusivo de taça gelada com seleção de chocolates finos durante seu atendimento.",
  },
  {
    id: "addon-3",
    name: "Ampola Fusio-Dose Booster Kérastase",
    price: 130,
    durationMinutes: 10,
    description: "Concentrado de nutrientes sob medida misturado na hora para nutrição ou brilho imediato.",
  },
  {
    id: "addon-4",
    name: "Design de Sobrancelhas Visagista",
    price: 110,
    durationMinutes: 30,
    description: "Alinhamento personalizado e mapeamento facial suave.",
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-101",
    clientName: "Carolina Siqueira",
    clientPhone: "(11) 99123-8844",
    clientEmail: "carolina.siqueira@luxury.com",
    serviceId: "serv-1",
    serviceName: "Balayage Glow & Contorno Iluminado",
    specialistId: "spec-1",
    specialistName: "Helena Vianna",
    date: new Date().toISOString().split('T')[0],
    time: "10:00",
    durationMinutes: 180,
    totalPrice: 975,
    status: "em_atendimento",
    notes: "Cliente prefere tons aveludados e champagne. Servir café espresso duplo.",
    addOns: ["Boas-Vindas Champagne Veuve Clicquot + Trufas Lindt"],
    createdAt: "2026-09-22T14:30:00Z"
  },
  {
    id: "apt-102",
    clientName: "Beatriz Bittencourt",
    clientPhone: "(11) 98845-1209",
    clientEmail: "beatriz.b@advocacia.com.br",
    serviceId: "serv-2",
    serviceName: "Corte Haute Coiffure + Visagismo",
    specialistId: "spec-2",
    specialistName: "Gabriel Montes",
    date: new Date().toISOString().split('T')[0],
    time: "14:00",
    durationMinutes: 75,
    totalPrice: 425,
    status: "confirmado",
    notes: "Manter comprimento nas costas, repicado leve na frente.",
    addOns: ["Massagem Craniana Aromaterapêutica (15 min)"],
    createdAt: "2026-09-23T08:10:00Z"
  },
  {
    id: "apt-103",
    clientName: "Mariana Alvarenga",
    clientPhone: "(11) 97321-4455",
    clientEmail: "mari.alvarenga@gmail.com",
    serviceId: "serv-5",
    serviceName: "Facial Glow Lift & Drenagem Francesa",
    specialistId: "spec-3",
    specialistName: "Camille Rossi",
    date: new Date().toISOString().split('T')[0],
    time: "16:00",
    durationMinutes: 80,
    totalPrice: 460,
    status: "confirmado",
    notes: "Pele sensível com tendência a ressecamento.",
    createdAt: "2026-09-21T11:00:00Z"
  },
  {
    id: "apt-104",
    clientName: "Valentina Rezende",
    clientPhone: "(11) 99801-6677",
    clientEmail: "val.rezende@fashion.br",
    serviceId: "serv-3",
    serviceName: "Ritual Kérastase Chronologiste Caviar",
    specialistId: "spec-1",
    specialistName: "Helena Vianna",
    date: new Date().toISOString().split('T')[0],
    time: "17:30",
    durationMinutes: 90,
    totalPrice: 650,
    status: "pendente_whatsapp",
    notes: "Aguardando confirmação de carona/motorista.",
    addOns: ["Ampola Fusio-Dose Booster Kérastase"],
    createdAt: "2026-09-23T09:00:00Z"
  },
  {
    id: "apt-105",
    clientName: "Fernanda Castilho",
    clientPhone: "(11) 99443-3221",
    serviceId: "serv-6",
    serviceName: "Manicure & Pedicure Couture Russa",
    specialistId: "spec-4",
    specialistName: "Isabella Duarte",
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    durationMinutes: 90,
    totalPrice: 240,
    status: "concluido",
    notes: "Esmalte Chanel Rouge Noir aplicado com sucesso.",
    createdAt: "2026-09-20T17:00:00Z"
  }
];

export const INITIAL_STOCK: StockProduct[] = [
  {
    id: "stk-1",
    name: "Kérastase Chronologiste Masque Régénérant 500ml",
    brand: "Kérastase",
    category: "capilar",
    type: "uso_interno",
    quantity: 4,
    minThreshold: 5,
    unitCost: 310,
    salePrice: 0,
    sku: "KER-CHR-500",
    lastRestocked: "2026-09-10"
  },
  {
    id: "stk-2",
    name: "Kérastase Huile Elixir Ultime L'Original 100ml",
    brand: "Kérastase",
    category: "finalizadores",
    type: "revenda",
    quantity: 18,
    minThreshold: 6,
    unitCost: 190,
    salePrice: 380,
    sku: "KER-ELX-100",
    lastRestocked: "2026-09-15"
  },
  {
    id: "stk-3",
    name: "Olaplex No. 3 Hair Perfector 100ml",
    brand: "Olaplex",
    category: "capilar",
    type: "revenda",
    quantity: 3,
    minThreshold: 8,
    unitCost: 140,
    salePrice: 290,
    sku: "OLA-NO3-100",
    lastRestocked: "2026-09-02"
  },
  {
    id: "stk-4",
    name: "Wella Blondor Multi Blonde Powder 800g",
    brand: "Wella Professionals",
    category: "coloracao",
    type: "uso_interno",
    quantity: 9,
    minThreshold: 4,
    unitCost: 185,
    salePrice: 0,
    sku: "WEL-BLD-800",
    lastRestocked: "2026-09-18"
  },
  {
    id: "stk-5",
    name: "Truss Uso Obrigatório Reconstrutor 260ml",
    brand: "Truss",
    category: "capilar",
    type: "revenda",
    quantity: 14,
    minThreshold: 6,
    unitCost: 85,
    salePrice: 175,
    sku: "TRS-USO-260",
    lastRestocked: "2026-09-12"
  },
  {
    id: "stk-6",
    name: "Esmalte Dior Le Vernis 999 Rouge",
    brand: "Dior",
    category: "esmaltes",
    type: "uso_interno",
    quantity: 2,
    minThreshold: 4,
    unitCost: 130,
    salePrice: 0,
    sku: "DIO-VRN-999",
    lastRestocked: "2026-08-28"
  },
  {
    id: "stk-7",
    name: "Sérum Skinceuticals C E Ferulic 30ml",
    brand: "SkinCeuticals",
    category: "skin_care",
    type: "revenda",
    quantity: 6,
    minThreshold: 3,
    unitCost: 320,
    salePrice: 580,
    sku: "SKN-CEF-030",
    lastRestocked: "2026-09-05"
  }
];

export const INITIAL_LOYALTY_CLIENTS: LoyaltyClient[] = [
  {
    id: "loy-1",
    name: "Carolina Siqueira",
    phone: "(11) 99123-8844",
    email: "carolina.siqueira@luxury.com",
    points: 840,
    tier: "Diamond",
    totalSpend: 14650,
    visitsCount: 16,
    lastVisit: "Hoje",
    favoriteSpecialist: "Helena Vianna",
    memberSince: "2025-02-14"
  },
  {
    id: "loy-2",
    name: "Luciana Magalhães Prado",
    phone: "(11) 98112-9900",
    email: "luciana.prado@invest.com.br",
    points: 1250,
    tier: "Black Edition",
    totalSpend: 28900,
    visitsCount: 28,
    lastVisit: "2026-09-18",
    favoriteSpecialist: "Helena Vianna",
    memberSince: "2024-11-05"
  },
  {
    id: "loy-3",
    name: "Beatriz Bittencourt",
    phone: "(11) 98845-1209",
    email: "beatriz.b@advocacia.com.br",
    points: 390,
    tier: "Gold",
    totalSpend: 6200,
    visitsCount: 8,
    lastVisit: "Hoje",
    favoriteSpecialist: "Gabriel Montes",
    memberSince: "2025-08-20"
  },
  {
    id: "loy-4",
    name: "Mariana Alvarenga",
    phone: "(11) 97321-4455",
    email: "mari.alvarenga@gmail.com",
    points: 210,
    tier: "Silver",
    totalSpend: 3100,
    visitsCount: 4,
    lastVisit: "Hoje",
    favoriteSpecialist: "Camille Rossi",
    memberSince: "2026-01-10"
  }
];

export const INITIAL_LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: "rew-1",
    title: "Ritual Fusio-Dose Kérastase Cortesia",
    description: "Aplicação completa de ampola sob medida no lavatório após qualquer corte ou escova.",
    pointsRequired: 250,
    category: "Tratamento",
    tierRequired: "Silver"
  },
  {
    id: "rew-2",
    title: "Voucher R$ 150 em Produtos da Boutique",
    description: "Desconto direto para levar seus cuidados favoritos Kérastase ou Olaplex para casa.",
    pointsRequired: 500,
    category: "Produtos",
    tierRequired: "Gold"
  },
  {
    id: "rew-3",
    title: "Sessão Completa Facial Glow Lift",
    description: "Procedimento facial rejuvenescedor de 80 minutos com nossa master esteta.",
    pointsRequired: 750,
    category: "Estética",
    tierRequired: "Diamond"
  },
  {
    id: "rew-4",
    title: "Dia VIP com Suíte Privativa & Chandon",
    description: "Atendimento exclusivo com direito a acompanhante, degustação de espumante e produção completa.",
    pointsRequired: 1200,
    category: "Experiência",
    tierRequired: "Black Edition"
  }
];

export const INITIAL_FINANCIALS: MonthlyFinancialRecord[] = [
  {
    month: "Maio 2026",
    revenue: 128400,
    expenses: 39200,
    commissions: 48600,
    netProfit: 40600,
    appointmentsCount: 294,
    averageTicket: 436.70
  },
  {
    month: "Junho 2026",
    revenue: 142000,
    expenses: 42100,
    commissions: 53900,
    netProfit: 46000,
    appointmentsCount: 318,
    averageTicket: 446.50
  },
  {
    month: "Julho 2026",
    revenue: 156800,
    expenses: 45000,
    commissions: 59500,
    netProfit: 52300,
    appointmentsCount: 342,
    averageTicket: 458.40
  },
  {
    month: "Agosto 2026",
    revenue: 168900,
    expenses: 47200,
    commissions: 64100,
    netProfit: 57600,
    appointmentsCount: 360,
    averageTicket: 469.10
  },
  {
    month: "Setembro 2026 (Atual)",
    revenue: 184500,
    expenses: 49800,
    commissions: 70100,
    netProfit: 64600,
    appointmentsCount: 388,
    averageTicket: 475.50
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Dra. Patricia Mendonça",
    role: "Dermatologista & Cliente VIP Diamond",
    rating: 5,
    comment: "O atendimento da Helena e de toda a equipe é impecável. O corte e as mechas ficaram iluminados e extremamente saudáveis. A experiência do salão é de nível internacional.",
    service: "Balayage Glow & Corte",
    date: "12 de Setembro de 2026"
  },
  {
    id: "rev-2",
    author: "Roberta Vianna Junqueira",
    role: "Empresária",
    rating: 5,
    comment: "O sistema de agendamento online é super rápido e organizado. Cheguei, meu horário estava reservado com precisão e fui recebida com café e champagne. Nota mil!",
    service: "Tratamento Caviar + Escova",
    date: "18 de Setembro de 2026"
  },
  {
    id: "rev-3",
    author: "Juliana Barreto Castro",
    role: "Arquiteta de Interiores",
    rating: 5,
    comment: "A sofisticação do espaço reflete a excelência do trabalho técnico. A massagem facial da Camille rejuvenesceu minha pele antes de um evento importante.",
    service: "Facial Glow Lift",
    date: "20 de Setembro de 2026"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Balayage Pearl Blonde & Contour",
    category: "mechas",
    image: blondePearlImg,
    description: "Iluminação pérola com transição em degradê invisível e raiz natural esfumada, preservando a elasticidade do fio.",
    specialistName: "Helena Vianna",
    likes: 428,
    duration: "4h 30min",
    technique: "Freehand Balayage + Plex Protect",
    productsUsed: ["Kérastase Blond Absolu", "Olaplex Nº 1 & Nº 2", "Wella Shinefinity"],
    processSteps: [
      "Diagnóstico tricológico e teste de mecha prévio",
      "Descoloração precisa com pó aclarante enriquecido com óleos protetores",
      "Matização gloss fria e selagem ácida com Kérastase Blond Absolu",
      "Finalização com escova modelada Dyson Supersonic"
    ],
    badge: "Loiro Assinatura"
  },
  {
    id: "gal-2",
    title: "Morena Iluminada Avelã & Honey Caramel",
    category: "mechas",
    image: brunetteGlowImg,
    description: "Tons quentes de mel, avelã e caramelo fundidos sobre base castanha escura para brilho tridimensional e elegância sem manutenção frequente.",
    specialistName: "Gabriel Montes",
    likes: 389,
    duration: "3h 45min",
    technique: "Contour Hair & Micro-Costura",
    productsUsed: ["Wella Color Touch", "Kérastase Nutritive", "Moroccanoil Treatment"],
    processSteps: [
      "Mapeamento de pontos de luz no contorno facial (Visagismo)",
      "Clareamento suave em tom sobre tom",
      "Tonalização rica em reflexos dourados e aveludados",
      "Banho de brilho com óleos essenciais"
    ],
    badge: "Tendência 2026"
  },
  {
    id: "gal-3",
    title: "Processo de Modelagem Dyson & Selagem Térmica",
    category: "processos",
    image: hairProcessBlowoutImg,
    description: "Etapa de styling e modelagem com tecnologia iônica de baixo aquecimento para fechamento de cutículas e balanço acetinado.",
    specialistName: "Helena Vianna",
    likes: 512,
    duration: "1h 15min",
    technique: "Dyson Haute Coiffure Blowout",
    productsUsed: ["Kérastase Discipline Fluidissime", "Gisou Honey Infused Hair Oil"],
    processSteps: [
      "Aplicação de protetor térmico Kérastase Discipline",
      "Secagem em mechas finas com controle térmico inteligente Dyson",
      "Curvatura com escova de cerâmica para volume na raiz",
      "Gotas de elixir nutritivo para fixação sedosa"
    ],
    badge: "Bastidores & Ação"
  },
  {
    id: "gal-4",
    title: "Penteado Noiva Real & Grinalda de Joias",
    category: "noivas",
    image: brideHairImg,
    description: "Coque clássico desconstruído com mechas frontais esculpidas e fixação com efeito natural à prova de umidade.",
    specialistName: "Gabriel Montes",
    likes: 674,
    duration: "2h 30min",
    technique: "Penteado Esculpido Alta-Costura",
    productsUsed: ["L'Oréal Professionnel Infinium Pure", "Kérastase Elixir Ultime"],
    processSteps: [
      "Preparação e texturização dos fios com mousse de volume",
      "Construção de estrutura de sustentação interna",
      "Fixação da grinalda artesanal de pérolas e cristais",
      "Blindagem anti-umidade para 14 horas de durabilidade"
    ],
    badge: "Coleção Noivas"
  },
  {
    id: "gal-5",
    title: "Liquid Hair: Alinhamento Silk & Brilho Espelho",
    category: "tratamentos",
    image: hairKeratinGlossImg,
    description: "Tratamento de botox capilar e alinhamento de queratina orgânica com efeito vidro (Glass Hair), zero frizz e toque de seda.",
    specialistName: "Helena Vianna",
    likes: 462,
    duration: "2h 00min",
    technique: "Nano-Infusão de Queratina e Ácido Hialurônico",
    productsUsed: ["Kérastase Chronologiste Caviar", "Olaplex Nº 7 Bonding Oil"],
    processSteps: [
      "Lavagem purificante com shampoo quelante",
      "Infusão de pérolas de caviar mimetizadas e queratina",
      "Pausa em câmara térmica de vapor ozônio",
      "Selamento com prancha de titânio a temperatura controlada"
    ],
    badge: "Brilho Espelhado"
  },
  {
    id: "gal-6",
    title: "Corte Visagista para Cachos & Definição Hidranutritiva",
    category: "cabelos",
    image: curlsLuxuryCutImg,
    description: "Corte a seco em camadas com técnica de encaixe de cachos, proporcionando volume harmônico e halo de brilho.",
    specialistName: "Gabriel Montes",
    likes: 315,
    duration: "2h 15min",
    technique: "Dry Cutting Visagism + Fitagem com Difusor",
    productsUsed: ["Kérastase Curl Manifesto", "Olaplex Nº 8 Bond Intense Moisture Mask"],
    processSteps: [
      "Leitura morfológica e visagista do formato do rosto",
      "Corte esculpido mecha a mecha com os fios em sua curvatura natural",
      "Protocolo de nutrição lipídica profunda",
      "Secagem suave com difusor de fluxo circular"
    ],
    badge: "Cachos de Luxo"
  },
  {
    id: "gal-7",
    title: "Nail Couture em Folha de Ouro 24k & Dior",
    category: "nails",
    image: nailArtHauteImg,
    description: "Esmaltação em gel nude leitoso com acabamento de folha de ouro 24k e cutilagem russa impecável.",
    specialistName: "Sofia Bernardes",
    likes: 284,
    duration: "1h 30min",
    technique: "Manicure Russa Combinada + Nail Art Minimalista",
    productsUsed: ["Dior Le Vernis Muguet", "OPI Gel Color", "Óleo de Cutículas Kérastase"],
    processSteps: [
      "Cutilagem a seco com microfresas de diamante",
      "Alinhamento da lâmina com base niveladora de borracha",
      "Aplicação delicada de flocos de ouro 24k",
      "Finalização com Top Coat diamante de alto brilho"
    ],
    badge: "Alta Manicure"
  },
  {
    id: "gal-8",
    title: "Balayage Golden Sand & Ondas Naturais",
    category: "mechas",
    image: balayageImg,
    description: "Mechas douradas quentes e aveludadas inspiradas nas praias do Mediterrâneo, com acabamento fluido.",
    specialistName: "Helena Vianna",
    likes: 410,
    duration: "4h 00min",
    technique: "Air Touch + Tonalização Golden Glow",
    productsUsed: ["Wella Blondor Multi Blonde", "Kérastase Nutritive 8H Magic Night"],
    processSteps: [
      "Separação das camadas com sopro de ar controlado",
      "Aplicação precisa com pincel chanfrado",
      "Tonalização luminosa em degradê",
      "Ondas soltas de estilo praiano refinado"
    ],
    badge: "Efeito Praia Chic"
  },
  {
    id: "gal-9",
    title: "Facial Glow Lift & Drenagem Facial Francesa",
    category: "estetica",
    image: spaFacialImg,
    description: "Massagem escultórica de lifting manual combinada com ampola de ácido hialurônico de baixo peso molecular.",
    specialistName: "Camille Rossi",
    likes: 275,
    duration: "1h 20min",
    technique: "Kobido Imperial & Drenagem Linfática",
    productsUsed: ["Biologique Recherche Paris", "Sérum Revitalizante AURUM"],
    processSteps: [
      "Higienização profunda com espuma de camomila e rosas",
      "Esfoliação enzimática suave com microgrânulos de jojoba",
      "Manobras de lifting muscular facial Kobido",
      "Máscara oclusiva de alginatos com água termal"
    ],
    badge: "Spa & Glow"
  },
  {
    id: "gal-10",
    title: "Arquitetura da Maison & Bancadas VIP",
    category: "todos",
    image: heroSalonImg,
    description: "Ambiente assinado com isolamento acústico, espelhos com iluminação neutra de estúdio e lavatórios relaxantes.",
    specialistName: "Espaço AURUM",
    likes: 540,
    duration: "Experiência Contínua",
    technique: "Design de Interiores de Alto Padrão",
    productsUsed: ["Veuve Clicquot", "Nespresso Master Origins", "Acqua di Parma Home Diffuser"],
    processSteps: [
      "Recepção com concierge e espumante de cortesia",
      "Lavatório com massagem corporal integrada e cromoterapia",
      "Bancada privativa com tomadas e conexão de alta velocidade",
      "Atendimento exclusivo com hora marcada"
    ],
    badge: "Nosso Espaço"
  }
];
