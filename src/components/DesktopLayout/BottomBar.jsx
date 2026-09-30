import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export function BottomBar() {
  const { openModal } = useApp();

  const items = [
    { n: '01', label: 'Modos', value: 'DM · TDM · FFA · Zona', modal: 'modos' },
    { n: '02', label: 'Partidas', value: 'Todos los días', modal: 'cambios' },
    { n: '03', label: 'Ranking', value: 'Por jugador y banda', modal: 'ranking' },
    { n: '04', label: 'Requisitos', value: 'GTA V + FiveM', modal: 'como-entrar' }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="relative z-10 border-t border-[var(--color-line)] bg-[rgba(5,13,26,0.65)] backdrop-blur-md"
    >
      <div className="grid grid-cols-2 md:grid-cols-4">
        {items.map((item, idx) => (
          <div
            key={item.label}
            onClick={() => item.modal && openModal(item.modal)}
            className={`flex flex-col gap-1.5 px-5 py-5 md:px-8 cursor-pointer transition-colors duration-200 hover:bg-white/[0.02] ${
              idx % 2 === 1 ? 'border-l border-[var(--color-line)]' : ''
            } ${
              idx >= 2 ? 'border-t border-[var(--color-line)] md:border-t-0' : ''
            } ${
              idx > 0 ? 'md:border-l md:border-[var(--color-line)]' : ''
            }`}
          >
            <span className="[font-family:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--color-ink-dim)] uppercase">
              {item.n} · {item.label}
            </span>
            <span className="data-cond text-[17px] text-white uppercase sm:text-[19px]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.footer>
  );
}
