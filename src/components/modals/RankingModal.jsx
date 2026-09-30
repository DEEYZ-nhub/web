import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Crosshair, Search } from 'lucide-react';
import { LEADERBOARD_PLAYERS, LEADERBOARD_GANGS, WEAPON_STATS } from '../../data/serverData';
import { useApp } from '../../context/AppContext';

export function RankingModal() {
  const [activeTab, setActiveTab] = useState('players');
  const [searchQuery, setSearchQuery] = useState('');
  const { playSound } = useApp();

  const filteredPlayers = LEADERBOARD_PLAYERS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.gang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal-inner modal-wide">
      <div className="modal-top">
        <div>
          <span className="modal-kicker">COMPETITIVO OFICIAL · TEMPORADA 4</span>
          <h2 className="modal-title">Tabla de Clasificación & Leaderboard</h2>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4">
        <div className="flex gap-2">
          <button
            className={`tab-btn ${activeTab === 'players' ? 'active' : ''}`}
            onClick={() => {
              playSound('click');
              setActiveTab('players');
            }}
          >
            <Trophy size={14} />
            <span>Top Jugadores</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'gangs' ? 'active' : ''}`}
            onClick={() => {
              playSound('click');
              setActiveTab('gangs');
            }}
          >
            <Users size={14} />
            <span>Top Bandas</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'weapons' ? 'active' : ''}`}
            onClick={() => {
              playSound('click');
              setActiveTab('weapons');
            }}
          >
            <Crosshair size={14} />
            <span>Armas Más Letales</span>
          </button>
        </div>

        {activeTab === 'players' && (
          <div className="search-box">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Buscar jugador o banda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </div>

      {/* Tab 1: Players */}
      {activeTab === 'players' && (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>JUGADOR</th>
                <th>BANDA</th>
                <th>KILLS</th>
                <th>MUERTES</th>
                <th>K/D</th>
                <th>ELO</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player.rank} className={player.isYou ? 'row-highlight' : ''}>
                  <td>
                    {player.badge === 'gold' && <span className="medal medal-gold">1</span>}
                    {player.badge === 'silver' && <span className="medal medal-silver">2</span>}
                    {player.badge === 'bronze' && <span className="medal medal-bronze">3</span>}
                    {!player.badge && <span className="medal medal-normal">{player.rank}</span>}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <strong>{player.name}</strong>
                      {player.isYou && <span className="badge-you">Tú</span>}
                    </div>
                  </td>
                  <td>
                    <span className={`gang-badge gang-${player.gang.toLowerCase()}`}>
                      {player.gang}
                    </span>
                  </td>
                  <td>{player.kills.toLocaleString()}</td>
                  <td>{player.deaths.toLocaleString()}</td>
                  <td><span className="text-sky-400 font-bold">{player.kd}</span></td>
                  <td><span className="text-amber-400 font-bold">{player.elo}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Gangs */}
      {activeTab === 'gangs' && (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ORGANIZACIÓN</th>
                <th>LÍDER</th>
                <th>MIEMBROS</th>
                <th>TERRITORIO</th>
                <th>KILLS TOTALES</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD_GANGS.map((gang) => (
                <tr key={gang.rank}>
                  <td>
                    <span className={`medal medal-${gang.rank === 1 ? 'gold' : gang.rank === 2 ? 'silver' : 'bronze'}`}>
                      {gang.rank}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: gang.color }}>{gang.name}</strong>
                  </td>
                  <td>{gang.leader}</td>
                  <td>{gang.members} activos</td>
                  <td><span className="text-amber-400 font-semibold">{gang.points}</span></td>
                  <td><span className="text-sky-400 font-bold">{gang.kills.toLocaleString()}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Weapons */}
      {activeTab === 'weapons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {WEAPON_STATS.map((wpn, idx) => (
            <div key={idx} className="weapon-card-box">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-bold text-sm">{wpn.name}</h4>
                  <span className="text-[11px] text-slate-400">{wpn.caliber}</span>
                </div>
                <span className="text-xs font-bold text-sky-400">{wpn.kills.toLocaleString()} Kills</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${wpn.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
