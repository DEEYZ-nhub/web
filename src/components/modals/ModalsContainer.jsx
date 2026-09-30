import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RankingModal } from './RankingModal';
import { TiendaModal } from './TiendaModal';
import { ComoEntrarModal } from './ComoEntrarModal';
import { CambiosModal } from './CambiosModal';
import { ComunidadModal } from './ComunidadModal';
import { SoporteModal } from './SoporteModal';
import { ModosModal } from './ModosModal';

export function ModalsContainer() {
  const { activeModal, closeModal, playSound } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#02060e]/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Modal Container Card */}
          <motion.div
            className={`relative z-10 w-full overflow-y-auto rounded-3xl border border-white/15 bg-gradient-to-b from-[#181116] via-[#0d080b] to-[#070507] p-4 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95)] ${
              activeModal === 'tienda' || activeModal === 'comunidad' || activeModal === 'equipo'
                ? 'max-w-6xl max-h-[94vh]'
                : 'max-w-4xl max-h-[90vh]'
            }`}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              onClick={() => {
                playSound('click');
                closeModal();
              }}
              aria-label="Cerrar ventana"
            >
              <X size={20} />
            </button>

            {activeModal === 'ranking' && <RankingModal />}
            {activeModal === 'tienda' && <TiendaModal />}
            {activeModal === 'como-entrar' && <ComoEntrarModal />}
            {activeModal === 'cambios' && <CambiosModal />}
            {(activeModal === 'comunidad' || activeModal === 'equipo' || activeModal === 'postulaciones') && (
              <ComunidadModal initialTab={activeModal === 'postulaciones' ? 'postular' : 'comunidad'} />
            )}
            {activeModal === 'soporte' && <SoporteModal />}
            {activeModal === 'modos' && <ModosModal />}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
