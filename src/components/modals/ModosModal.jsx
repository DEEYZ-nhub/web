import React from 'react';
import { Swords, Shield, Users, Target } from 'lucide-react';

export function ModosModal() {
  const modes = [
    {
      badge: 'DM',
      title: 'Deathmatch Clásico',
      icon: Swords,
      color: '#38bdf8',
      desc: 'Respawn instantáneo y salud restaurada al 100% tras cada baja lograda. El modo por excelencia para calentar muñeca y puntería rápida.'
    },
    {
      badge: 'TDM',
      title: 'Team Deathmatch (Guerra de Bandas)',
      icon: Users,
      color: '#a855f7',
      desc: 'Enfrentamientos tácticos 5v5 o 10v10 en mapas icónicos como Legion Square, Mirror Park y Cantera. Comunicación por radio y cobertura obligatoria.'
    },
    {
      badge: 'FFA',
      title: 'Free For All (Todos contra Todos)',
      icon: Target,
      color: '#f59e0b',
      desc: 'Hasta 32 jugadores en simultáneo en un cuadrilátero urbano cerrado. El primer combatiente en alcanzar 30 bajas se lleva el botín de la ronda.'
    },
    {
      badge: 'ZONA',
      title: 'Control de Zonas Tácticas',
      icon: Shield,
      color: '#10b981',
      desc: 'Captura y retención de 3 bases estratégicas con tormenta de gas dinámica que reduce el perímetro jugable cada 90 segundos.'
    }
  ];

  return (
    <div className="modal-inner">
      <div className="modal-top">
        <div>
          <span className="modal-kicker">ARENAS DE COMBATE</span>
          <h2 className="modal-title">Modos de Juego Competitivos</h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {modes.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="modo-card-row">
              <div className="modo-badge-icon" style={{ borderColor: `${m.color}40`, backgroundColor: `${m.color}15`, color: m.color }}>
                <Icon size={20} />
                <span className="text-[10px] font-black">{m.badge}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-sm">{m.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
