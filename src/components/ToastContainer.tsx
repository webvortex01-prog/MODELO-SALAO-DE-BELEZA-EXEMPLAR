import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Sparkles, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSalon();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl border shadow-xl flex items-start gap-3 animate-slideIn backdrop-blur-md ${
            toast.type === 'gold'
              ? 'bg-[#181612]/95 border-[#D4AF37]/50 text-white shadow-[0_0_20px_rgba(212,175,55,0.15)]'
              : toast.type === 'success'
              ? 'bg-[#0f1f14]/95 border-emerald-500/40 text-white'
              : toast.type === 'warning'
              ? 'bg-[#221010]/95 border-rose-500/40 text-white'
              : 'bg-[#121216]/95 border-white/20 text-white'
          }`}
        >
          {toast.type === 'gold' && <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />}
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}

          <div className="text-xs leading-relaxed flex-1">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
