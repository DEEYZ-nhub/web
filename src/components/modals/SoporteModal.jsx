import React from 'react';
import { MessageSquare, ShieldAlert, Wrench, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SoporteModal() {
  const { showToast, playSound } = useApp();

  return (
    <div className="modal-inner">
      <div className="modal-top">
        <div>
          <span className="modal-kicker">CENTRO DE AYUDA</span>
          <h2 className="modal-title">Soporte Técnico & Reportes</h2>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {/* Discord Ticket */}
        <div className="support-card-box">
          <div className="flex items-start gap-3">
            <div className="support-icon-wrap text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              <MessageSquare size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">Ticket Directo por Discord</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Respuesta en menos de 10 minutos por parte de un miembro del equipo de administración.
              </p>
              <a
                href="https://discord.gg/globalarena"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sub-action mt-2 inline-flex items-center gap-1.5"
                onClick={() => playSound('click')}
              >
                <span>Abrir Ticket en Discord</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* In-game Report */}
        <div className="support-card-box">
          <div className="flex items-start gap-3">
            <div className="support-icon-wrap text-rose-400 bg-rose-500/10 border border-rose-500/20">
              <ShieldAlert size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">Reportar Jugador / Cheater</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Usa el comando in-game <code>/report [ID] [Motivo]</code> con clip de video. El sistema SentinelCore almacena el registro del combate.
              </p>
              <button
                className="btn-sub-action mt-2"
                onClick={() => {
                  playSound('success');
                  showToast('Comando de Reporte', 'Usa /report [ID] dentro del servidor con tu clip.');
                }}
              >
                Copiar Formato de Reporte
              </button>
            </div>
          </div>
        </div>

        {/* Cache Fix */}
        <div className="support-card-box">
          <div className="flex items-start gap-3">
            <div className="support-icon-wrap text-amber-400 bg-amber-500/10 border border-amber-500/20">
              <Wrench size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">Limpieza de Caché FiveM</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Si experimentas caídas de FPS o texturas parpadeantes, borra la carpeta <code>%localappdata%/FiveM/FiveM.app/data/cache</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
