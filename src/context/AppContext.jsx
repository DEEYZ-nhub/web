import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useSoundFX } from '../hooks/useSoundFX';

const AppContext = createContext();

const FIVEM_CFX_COMMAND = 'connect cfx.re/join/globalarena';

export function AppProvider({ children }) {
  // Sound state
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('ga_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const { playSound } = useSoundFX(soundEnabled);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('ga_sound', JSON.stringify(next));
      return next;
    });
  }, []);

  // Navigation tab state (supports URL hash persistence)
  const [activeTab, setActiveTabState] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash.startsWith('tienda')) return 'tienda';
      if (hash.startsWith('comunidad')) return 'comunidad';
    }
    return 'inicio';
  });

  const setActiveTab = useCallback((tab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      if (tab === 'inicio') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } else {
        window.location.hash = tab;
      }
    }
  }, []);

  // Modal system
  const [activeModal, setActiveModal] = useState(null);

  const openModal = useCallback((modalId) => {
    setActiveModal(modalId);
    playSound('modal');
  }, [playSound]);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    playSound('click');
  }, [playSound]);

  // Toast system
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: 'info' });

  const showToast = useCallback((title, message, type = 'info') => {
    setToast({ show: true, title, message, type });
    playSound('success');
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3800);
  }, [playSound]);

  // Live Server Status Simulation
  const [playersOnline, setPlayersOnline] = useState(148);
  const [serverPing, setServerPing] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayersOnline(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(Math.max(132, prev + delta), 288);
      });
      setServerPing(prev => {
        const jitter = Math.floor(Math.random() * 3) - 1;
        return Math.min(Math.max(18, prev + jitter), 30);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Copy IP & Connect Action with Red & Crimson Confetti
  const copyCfxIP = useCallback(() => {
    navigator.clipboard.writeText(FIVEM_CFX_COMMAND).then(() => {
      playSound('success');
      showToast('¡IP Copiada al Portapapeles!', 'Pega en consola F8 o conéctate directamente.');

      // Crimson & Red Confetti burst
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ef4444', '#dc2626', '#b91c1c', '#ffffff', '#fbbf24']
      });
    }).catch(() => {
      showToast('IP Global Arena', FIVEM_CFX_COMMAND);
    });
  }, [playSound, showToast]);

  return (
    <AppContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playSound,
        activeTab,
        setActiveTab,
        activeModal,
        openModal,
        closeModal,
        toast,
        showToast,
        playersOnline,
        serverPing,
        maxPlayers: 300,
        cfxCommand: FIVEM_CFX_COMMAND,
        copyCfxIP
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
