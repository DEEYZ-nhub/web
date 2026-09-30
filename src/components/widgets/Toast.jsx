import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Toast() {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] pointer-events-none"
          initial={{ opacity: 0, y: -20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.94 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#0d1627] border border-sky-400/40 shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.25)] text-white backdrop-blur-md">
            <div className="w-6 h-6 rounded-full bg-sky-400/20 text-sky-400 flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-400 tracking-wide uppercase">
                {toast.title}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {toast.message}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
