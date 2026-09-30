import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ArenaBot() {
  const { playSound, copyCfxIP } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola combatiente! Soy el bot de <strong>Global Arena</strong>. ¿En qué puedo asistirte hoy para dominar la arena?'
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleBot = () => {
    playSound('click');
    setIsOpen(prev => !prev);
  };

  const handleSend = (userText) => {
    const text = (userText || inputVal).trim();
    if (!text) return;

    playSound('click');
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!userText) setInputVal('');

    setTimeout(() => {
      const q = text.toLowerCase();
      let botReply = '';

      if (q.includes('ip') || q.includes('conectar') || q.includes('servidor') || q.includes('connect')) {
        botReply = `📡 <strong>Conexión FiveM:</strong><br>Abre FiveM, pulsa F8 y escribe:<br><code style="color:#ef4444; background:#050508; padding:2px 6px; border-radius:4px; border:1px solid #ef444440;">connect cfx.re/join/globalarena</code>.<br>¡Copiado también a tu portapapeles!`;
        copyCfxIP();
      } else if (q.includes('como') || q.includes('entrar') || q.includes('jugar') || q.includes('descargar')) {
        botReply = `🎮 <strong>Cómo entrar en 3 pasos:</strong><br>1. Inicia tu GTA V y abre <strong>FiveM</strong>.<br>2. Presiona <strong>F8</strong> en el teclado.<br>3. Pega el comando de conexión. ¡O pulsa en la pestaña <em>Cómo Entrar</em>!`;
      } else if (q.includes('regla') || q.includes('norma') || q.includes('ban') || q.includes('cheat')) {
        botReply = `⚖️ <strong>Reglas Clave:</strong><br>1. Cero tolerancia a hacks o modificadores de hitbox.<br>2. Respetar zonas seguras de spawn.<br>3. Fair play competitivo en todo momento.`;
      } else if (q.includes('discord')) {
        botReply = `💬 <strong>Discord Oficial:</strong><br>Únete a nuestra comunidad de más de 4,000 miembros: <a href="https://discord.gg/globalarena" target="_blank" style="color:#ef4444; text-decoration:underline;">discord.gg/globalarena</a>`;
      } else if (q.includes('vip') || q.includes('tienda') || q.includes('comprar') || q.includes('donar')) {
        botReply = `⭐ <strong>Tienda VIP:</strong><br>Paquetes Plata, Oro y Diamante con skins exclusivas, tracers y slots reservados 100% sin Pay-to-Win.`;
      } else {
        botReply = `Entendido. Para hablar con un administrador o reportar incidencias con video, puedes abrir un ticket en nuestro Discord o revisar la sección de <strong>Soporte</strong>.`;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply }]);
      playSound('success');
    }, 450);
  };

  return (
    <div className="floating-bot-anchor">
      {/* TRIGGER BUTTON */}
      <motion.button
        className="bot-circle-btn-red"
        onClick={toggleBot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Abrir asistente de Global Arena"
      >
        <div className="bot-ambient-pulse-red" />
        <Bot size={26} className="text-white relative z-10" />
        <span className="bot-notify-badge-red">1</span>
      </motion.button>

      {/* CHAT POPUP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bot-chat-window-red"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="bot-window-header-red">
              <div className="bot-header-info">
                <div className="bot-icon-badge-red">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold leading-tight">Arena Bot</h4>
                  <span className="text-[11px] text-red-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Online 24/7
                  </span>
                </div>
              </div>
              <button
                className="bot-close-btn"
                onClick={() => {
                  playSound('click');
                  setIsOpen(false);
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="bot-window-messages">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`chat-bubble ${msg.sender === 'user' ? 'bubble-user-red' : 'bubble-bot-red'}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="bot-quick-chips">
              <button
                className="quick-chip-red"
                onClick={() => handleSend('¿Cuál es la IP del servidor?')}
              >
                📡 Copiar IP
              </button>
              <button
                className="quick-chip-red"
                onClick={() => handleSend('¿Cómo entrar al servidor?')}
              >
                🎮 ¿Cómo entrar?
              </button>
              <button
                className="quick-chip-red"
                onClick={() => handleSend('¿Cuáles son las reglas?')}
              >
                ⚖️ Reglas
              </button>
              <button
                className="quick-chip-red"
                onClick={() => handleSend('¿Qué incluye la tienda VIP?')}
              >
                ⭐ Tienda VIP
              </button>
            </div>

            {/* Input Form */}
            <form
              className="bot-window-footer"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                placeholder="Pregunta algo sobre el servidor..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="bot-text-input"
              />
              <button type="submit" className="bot-send-btn-red" aria-label="Enviar mensaje">
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
