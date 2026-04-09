import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthView from '../components/chat/AuthView';
import { io } from 'socket.io-client';

const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem('ld_user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      socketRef.current = io('http://localhost:5000');
      socketRef.current.on('connect', () => {
        setIsConnected(true);
        socketRef.current.emit('join_chat', user);
      });
      socketRef.current.on('receive_message', (msg) => setMessages((prev) => [...prev, msg]));
      socketRef.current.on('disconnect', () => setIsConnected(false));
      return () => socketRef.current.disconnect();
    }
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem('ld_token');
    localStorage.removeItem('ld_user');
    setUser(null);
    setMessages([]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && isConnected) {
      socketRef.current.emit('send_message', { text: input, sender: user.username, senderId: user._id });
      setInput('');
    }
  };

  const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-28">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <AuthView onAuthSuccess={(u) => setUser(u)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl h-[75vh] flex flex-col glass-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Chat Room</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                    <span className="text-[11px] text-white/30">{user.username}</span>
                  </div>
                </div>
              </div>

              <button onClick={handleLogout} className="text-white/20 hover:text-white/60 transition-colors p-2 rounded-lg hover:bg-white/5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 select-none">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/40 mb-3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <p className="text-sm text-white/30">No messages yet</p>
                </div>
              ) : (
                messages.map((msg, i) => {
                  const isMe = msg.senderId === user._id;
                  const showName = i === 0 || messages[i - 1].senderId !== msg.senderId;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                        {showName && !isMe && (
                          <span className="text-[11px] text-white/20 ml-1 mb-1">{msg.sender}</span>
                        )}
                        <div className={`px-4 py-2.5 text-sm leading-relaxed ${
                          isMe
                            ? 'rounded-2xl rounded-tr-md text-white'
                            : 'rounded-2xl rounded-tl-md text-white/70'
                        }`} style={
                          isMe
                            ? { background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }
                            : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }
                        }>
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-white/15 mt-1 mx-1">{formatTime(msg.timestamp)}</span>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Input */}
            <div className="p-4 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/15 outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || !isConnected}
                  className="px-4 rounded-xl text-white disabled:opacity-20 transition-all hover:opacity-80"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;
