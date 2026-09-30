import { useCallback } from 'react';

let audioCtx = null;

export function useSoundFX(soundEnabled = true) {
  const getAudioContext = useCallback(() => {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }, []);

  const playSound = useCallback((type = 'click') => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(1040, now + 0.04);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'modal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.12);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      }
    } catch (e) {
      // Audio fallback without throwing
    }
  }, [soundEnabled, getAudioContext]);

  return { playSound };
}
