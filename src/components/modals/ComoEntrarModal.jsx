import React from 'react';
import { ExternalLink, Copy, Terminal, Check, Rocket } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ComoEntrarModal() {
  const { copyCfxIP, cfxCommand } = useApp();

  return (
    <div className="modal-inner">
      <div className="modal-top">
        <div>
          <span className="modal-kicker">GUÍA PASO A PASO</span>
          <h2 className="modal-title">¿Cómo Entrar a Global Arena?</h2>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {/* Step 1 */}
        <div className="step-row">
          <div className="step-num-badge">1</div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm">GTA V y Cliente FiveM</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Necesitas una copia original de Grand Theft Auto V (Steam, Epic Games o Rockstar Launcher) y tener instalado el cliente gratuito de{' '}
              <a
                href="https://fivem.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline inline-flex items-center gap-0.5"
              >
                FiveM.net <ExternalLink size={10} />
              </a>.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="step-row">
          <div className="step-num-badge">2</div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm">Conexión Directa con 1 Clic</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Si ya tienes FiveM instalado en tu ordenador, pulsa el botón directo para iniciar el juego y conectar automáticamente:
            </p>
            <div className="mt-3">
              <a
                href="fivem://connect/cfx.re/join/globalarena"
                className="btn-launch-glow inline-flex items-center gap-2"
                onClick={copyCfxIP}
              >
                <Rocket size={16} />
                <span>Abrir Servidor en FiveM</span>
              </a>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step-row">
          <div className="step-num-badge">3</div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm">O mediante Consola F8</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Dentro de FiveM, pulsa la tecla <kbd className="kbd-style">F8</kbd> y pega este comando:
            </p>
            <div className="f8-code-deck mt-2">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs overflow-x-auto">
                <Terminal size={14} className="shrink-0 text-slate-500" />
                <span>{cfxCommand}</span>
              </div>
              <button
                className="copy-btn-f8"
                onClick={copyCfxIP}
                title="Copiar comando al portapapeles"
              >
                <Copy size={13} />
                <span>Copiar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
