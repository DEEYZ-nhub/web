import React from 'react';
import { Tag } from 'lucide-react';
import { CHANGELOG_DATA } from '../../data/serverData';

export function CambiosModal() {
  return (
    <div className="modal-inner">
      <div className="modal-top">
        <div>
          <span className="modal-kicker">HISTORIAL DE PARCHES</span>
          <h2 className="modal-title">Notas de Actualización</h2>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-4">
        {CHANGELOG_DATA.map((patch, idx) => (
          <div key={idx} className="patch-card">
            <div className="flex items-center justify-between mb-2">
              <span className={`version-pill ${patch.status === 'latest' ? 'pill-latest' : 'pill-stable'}`}>
                <Tag size={11} className="inline mr-1" />
                {patch.version}
              </span>
              <span className="text-[11px] text-slate-400">{patch.date}</span>
            </div>
            <h4 className="text-white font-bold text-sm mb-2">{patch.title}</h4>
            <ul className="flex flex-col gap-1.5 text-xs text-slate-300">
              {patch.changes.map((change, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
