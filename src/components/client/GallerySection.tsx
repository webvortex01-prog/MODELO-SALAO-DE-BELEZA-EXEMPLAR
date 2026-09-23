import React, { useState } from 'react';
import { INITIAL_GALLERY, SALON_INFO } from '../../data/initialData';
import { useSalon } from '../../context/SalonContext';
import { GalleryItem } from '../../types/salon';
import { 
  Sparkles, 
  Heart, 
  Eye, 
  SlidersHorizontal, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Sparkle, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MessageCircle, 
  Check, 
  Flame,
  Camera,
  Scissors
} from 'lucide-react';
import balayageImg from '../../assets/images/hair_balayage_luxury_1790183789548.jpg';

export const GallerySection: React.FC = () => {
  const { setIsBookingOpen, showToast } = useSalon();

  const [activeTab, setActiveTab] = useState<'galeria' | 'transformacoes' | 'processo'>('galeria');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  
  // Selected Image for Lightbox Modal
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Likes state
  const [likes, setLikes] = useState<{ [key: string]: number }>({
    'gal-1': 428,
    'gal-2': 389,
    'gal-3': 512,
    'gal-4': 674,
    'gal-5': 462,
    'gal-6': 315,
    'gal-7': 284,
    'gal-8': 410,
    'gal-9': 275,
    'gal-10': 540,
  });

  const [likedMap, setLikedMap] = useState<{ [key: string]: boolean }>({});

  const handleLike = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (likedMap[id]) return;

    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    setLikedMap(prev => ({ ...prev, [id]: true }));
    showToast(`Você curtiu "${title}"!`, 'gold');
  };

  const filteredGallery = INITIAL_GALLERY.filter(item => {
    if (categoryFilter === 'todos') return true;
    if (categoryFilter === 'processos') return item.category === 'processos';
    if (categoryFilter === 'mechas') return item.category === 'mechas';
    if (categoryFilter === 'cabelos') return item.category === 'cabelos';
    if (categoryFilter === 'tratamentos') return item.category === 'tratamentos';
    if (categoryFilter === 'noivas') return item.category === 'noivas';
    if (categoryFilter === 'nails') return item.category === 'nails' || item.category === 'estetica';
    return item.category === categoryFilter;
  });

  const handlePrevItem = () => {
    if (!selectedItem) return;
    const currentIndex = INITIAL_GALLERY.findIndex(i => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + INITIAL_GALLERY.length) % INITIAL_GALLERY.length;
    setSelectedItem(INITIAL_GALLERY[prevIndex]);
  };

  const handleNextItem = () => {
    if (!selectedItem) return;
    const currentIndex = INITIAL_GALLERY.findIndex(i => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % INITIAL_GALLERY.length;
    setSelectedItem(INITIAL_GALLERY[nextIndex]);
  };

  const handleBookSelected = () => {
    setSelectedItem(null);
    setIsBookingOpen(true);
  };

  const handleWhatsAppConsult = (item: GalleryItem) => {
    const text = encodeURIComponent(`Olá! Vi no site o resultado "${item.title}" executado por ${item.specialistName} e gostaria de agendar uma avaliação para o meu cabelo.`);
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="galeria" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0C] relative">
      
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            <Camera className="w-3.5 h-3.5" />
            <span>Portfólio Editorial de Resultados & Processos</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            A Arte da Transformação em <span className="text-gold-gradient">Cada Fio & Detalhe</span>
          </h2>
          
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Confira imagens reais dos nossos trabalhos executados: loiros radiantes, morenas iluminadas, tratamentos de brilho espelhado, cortes visagistas e o passo a passo dos nossos bastidores.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('galeria')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'galeria'
                ? 'bg-gold-gradient text-[#0D0D10] font-bold shadow-md shadow-[#D4AF37]/20'
                : 'bg-white/5 text-stone-400 hover:text-white border border-white/10'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Galeria de Trabalhos & Processos ({INITIAL_GALLERY.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('transformacoes')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'transformacoes'
                ? 'bg-gold-gradient text-[#0D0D10] font-bold shadow-md shadow-[#D4AF37]/20'
                : 'bg-white/5 text-stone-400 hover:text-white border border-white/10'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Antes & Depois Interativo</span>
          </button>

          <button
            onClick={() => setActiveTab('processo')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'processo'
                ? 'bg-gold-gradient text-[#0D0D10] font-bold shadow-md shadow-[#D4AF37]/20'
                : 'bg-white/5 text-stone-400 hover:text-white border border-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>O Processo Criativo AURUM</span>
          </button>
        </div>

        {/* TAB 1: FULL PHOTO & PROCESS GALLERY */}
        {activeTab === 'galeria' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
              {[
                { id: 'todos', label: 'Todos os Trabalhos' },
                { id: 'mechas', label: 'Loiros & Balayage' },
                { id: 'processos', label: 'Processos & Bastidores' },
                { id: 'cabelos', label: 'Cortes & Visagismo' },
                { id: 'tratamentos', label: 'Gloss & Cronograma' },
                { id: 'noivas', label: 'Noivas & Penteados' },
                { id: 'nails', label: 'Nails & Estética' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    categoryFilter === cat.id
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'bg-white/5 text-stone-400 hover:text-stone-200 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Photo Grid with Rich Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative rounded-2xl bg-[#141418] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70"
                >
                  {/* Image Container with Zoom & Badge */}
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30 opacity-90 group-hover:opacity-75 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {item.badge && (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#D4AF37] text-black shadow-md">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Quick Specs Chip */}
                    {item.duration && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-stone-200">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>{item.duration}</span>
                      </div>
                    )}

                    {/* Click to inspect prompt overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 shadow-xl">
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Ver Detalhes do Processo</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-serif font-bold text-white group-hover:text-[#F3E7D3] transition-colors leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#D4AF37] font-medium">Por {item.specialistName}</p>
                        </div>
                      </div>

                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Products tags preview */}
                      {item.productsUsed && item.productsUsed.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.productsUsed.slice(0, 2).map((prod, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] text-stone-300 border border-white/5">
                              {prod.split(' ')[0]} {prod.split(' ')[1] || ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Likes & CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-stone-400">
                      <button
                        onClick={(e) => handleLike(e, item.id, item.title)}
                        className={`inline-flex items-center gap-1.5 transition-all px-2 py-1 rounded-lg hover:bg-white/5 ${
                          likedMap[item.id] ? 'text-rose-400 font-bold' : 'text-stone-400 hover:text-rose-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedMap[item.id] ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                        <span className="tabular-nums">{likes[item.id] || item.likes}</span>
                      </button>

                      <span className="text-[11px] font-semibold text-[#D4AF37] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>Ver Ficha Técnica</span>
                        <span>→</span>
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE BEFORE & AFTER SLIDER */}
        {activeTab === 'transformacoes' && (
          <div className="max-w-4xl mx-auto bg-[#121216] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Transformação Real</span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Correção de Tom & Balayage Vanilla Glow</h3>
                <p className="text-xs sm:text-sm text-stone-400">Assinado por Master Helena Vianna · 4h de protocolo + Cronograma Caviar</p>
              </div>
              <span className="text-xs text-stone-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                ↔ Arraste o divisor central
              </span>
            </div>

            {/* Comparison Canvas with custom interactive divider */}
            <div 
              className="relative aspect-16/10 rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-2xl"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }}
            >
              {/* After (Full) Image */}
              <img
                src={balayageImg}
                alt="Resultado Depois: Balayage de Luxo AURUM"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Depois (AURUM Glow)
              </div>

              {/* Before Image (Clipped) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={balayageImg}
                  alt="Antes"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover filter saturate-50 contrast-85 brightness-90 sepia-25"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Antes (Base Apagada)
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#0D0D10] shadow-xl flex items-center justify-center font-bold text-xs">
                  ↔
                </div>
              </div>

            </div>

            {/* Description & Proof */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-center">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-xs text-stone-400 block">Tempo de Execução</span>
                <span className="text-sm font-semibold text-white">4h 15min</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-xs text-stone-400 block">Técnica Empregada</span>
                <span className="text-sm font-semibold text-[#D4AF37]">Freehand + Plex Protect</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-xs text-stone-400 block">Saúde & Elasticidade</span>
                <span className="text-sm font-semibold text-emerald-400">100% Preservada</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md shadow-[#D4AF37]/20"
              >
                Agendar Avaliação de Transformação
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: THE 4-STEP CREATIVE PROCESS */}
        {activeTab === 'processo' && (
          <div className="space-y-10 max-w-5xl mx-auto animate-fadeIn">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif font-bold text-white">O Método AURUM em 4 Etapas</h3>
              <p className="text-xs sm:text-sm text-stone-400">
                Cada transformação é planejada com rigor técnico, visagismo morfológico e respeito inegociável à estrutura capilar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-3 relative">
                <div className="w-9 h-9 rounded-xl bg-gold-gradient text-black font-serif font-bold text-base flex items-center justify-center">
                  01
                </div>
                <h4 className="text-base font-serif font-bold text-white">Diagnóstico Visagista</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Avaliamos o tom de pele, formato facial, histórico químico e teste de mecha com microscópio de fibra.
                </p>
                <div className="text-[11px] text-[#D4AF37] font-semibold pt-1">
                  15 min iniciais
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-3 relative">
                <div className="w-9 h-9 rounded-xl bg-gold-gradient text-black font-serif font-bold text-base flex items-center justify-center">
                  02
                </div>
                <h4 className="text-base font-serif font-bold text-white">Proteção & Clareamento</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Descoloração com tecnologia de pontes de dissulfeto Olaplex Pro que blinda o córtex contra quebra.
                </p>
                <div className="text-[11px] text-[#D4AF37] font-semibold pt-1">
                  Pó clareador com óleos
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-3 relative">
                <div className="w-9 h-9 rounded-xl bg-gold-gradient text-black font-serif font-bold text-base flex items-center justify-center">
                  03
                </div>
                <h4 className="text-base font-serif font-bold text-white">Matização Gloss</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Pigmentação ácida translúcida personalizada para neutralizar reflexos quentes indesejados e dar brilho.
                </p>
                <div className="text-[11px] text-[#D4AF37] font-semibold pt-1">
                  Fórmula exclusiva
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-3 relative">
                <div className="w-9 h-9 rounded-xl bg-gold-gradient text-black font-serif font-bold text-base flex items-center justify-center">
                  04
                </div>
                <h4 className="text-base font-serif font-bold text-white">Ritual Caviar & Styling</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Selamento com infusão de caviar Kérastase e modelagem artística com secadores Dyson Supersonic.
                </p>
                <div className="text-[11px] text-[#D4AF37] font-semibold pt-1">
                  Toque de seda
                </div>
              </div>

            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#181612] to-[#121216] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-serif font-bold text-white">Deseja uma consultoria personalizada para o seu cabelo?</h4>
                <p className="text-xs text-stone-400">Nossos especialistas estão disponíveis para uma avaliação presencial ou online.</p>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:opacity-95 transition-all whitespace-nowrap shadow-md shadow-[#D4AF37]/20"
              >
                Agendar Consulta
              </button>
            </div>

          </div>
        )}

      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL WITH ZOOM & PROCESS DETAILS */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-[#121216] border border-[#D4AF37]/40 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-stone-300 hover:text-white border border-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: High-Res Image with Nav Arrows */}
            <div className="md:w-1/2 relative bg-stone-950 flex items-center justify-center overflow-hidden min-h-[280px] md:min-h-[500px]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Prev / Next buttons */}
              <button
                onClick={handlePrevItem}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105"
                title="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextItem}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105"
                title="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Badge on Photo */}
              {selectedItem.badge && (
                <div className="absolute bottom-4 left-4 bg-gold-gradient text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {selectedItem.badge}
                </div>
              )}
            </div>

            {/* Right Column: Process & Specifications Details */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[85vh] space-y-5">
              
              <div className="space-y-4">
                {/* Title & Specialist */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Ficha Técnica do Trabalho
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Executado por: <strong className="text-stone-200">{selectedItem.specialistName}</strong>
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {selectedItem.duration && (
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                      <span className="text-[10px] text-stone-400 uppercase font-semibold block">Duração Total</span>
                      <span className="text-xs font-bold text-white">{selectedItem.duration}</span>
                    </div>
                  )}

                  {selectedItem.technique && (
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                      <span className="text-[10px] text-stone-400 uppercase font-semibold block">Técnica</span>
                      <span className="text-xs font-bold text-[#D4AF37]">{selectedItem.technique}</span>
                    </div>
                  )}
                </div>

                {/* Products Used */}
                {selectedItem.productsUsed && selectedItem.productsUsed.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-stone-300 block">Produtos & Linhas Aplicadas:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.productsUsed.map((prod, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-stone-300 border border-white/10">
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process Steps */}
                {selectedItem.processSteps && selectedItem.processSteps.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-stone-300 block">Passo a Passo da Execução:</span>
                    <ul className="space-y-1.5 text-xs text-stone-400">
                      {selectedItem.processSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleBookSelected}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Este Resultado</span>
                </button>

                <button
                  onClick={() => handleWhatsAppConsult(selectedItem)}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
