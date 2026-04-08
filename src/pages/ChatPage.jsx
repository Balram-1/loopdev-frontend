import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthView from '../components/chat/AuthView';
import { Terminal, Lock, LogOut, Shield, Send, User, Clock } from 'lucide-react';
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
    const savedUser = localStorage.getItem('ld_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      // Connect to Socket.io server
      socketRef.current = io('http://localhost:5000');

      socketRef.current.on('connect', () => {
        setIsConnected(true);
        socketRef.current.emit('join_chat', user);
      });

      socketRef.current.on('receive_message', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socketRef.current.on('disconnect', () => {
        setIsConnected(false);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
      const messageData = {
        text: input,
        sender: user.username,
        senderId: user._id
      };
      
      socketRef.current.emit('send_message', messageData);
      setInput('');
    }
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-[80vh] relative flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Cyber Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full flex justify-center"
          >
            <AuthView onAuthSuccess={(u) => setUser(u)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl glass-card flex flex-col h-[700px] relative overflow-hidden bg-black/80 border-white/10"
          >
            {/* Chat Header */}
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/40 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Shield className="text-primary" size={20} />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-black ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-widest text-white uppercase">LoopHub : Sector 7</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-mono text-primary uppercase tracking-tighter">Identity: {user.username}</span>
                    <span className="text-[9px] font-mono text-zinc-500">•</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">{isConnected ? 'Uplink Stable' : 'Synchronizing...'}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="p-3 rounded-lg glass-hover text-zinc-500 hover:text-red-400 transition-all group"
                title="Disconnect from Hub"
              >
                <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            {/* Message Area */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto px-8 py-10 space-y-6 scrollbar-thin scrollbar-thumb-primary/10"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 pointer-events-none select-none">
                  <Terminal size={48} className="text-primary mb-4" />
                  <p className="text-[10px] uppercase tracking-[0.5em] font-mono">No decryption signals found</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.senderId === user._id;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] group ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        <div className={`flex items-center gap-2 mb-1 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{msg.sender}</span>
                          <span className="text-[8px] font-mono text-zinc-600 font-bold">{formatTime(msg.timestamp)}</span>
                        </div>
                        
                        <div className={`relative px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                          isMe 
                            ? 'bg-primary text-black font-medium rounded-tr-none' 
                            : 'bg-white/5 text-zinc-100 border border-white/10 rounded-tl-none'
                        }`}>
                          {msg.text}
                          {/* Bubble Arrow */}
                          <div className={`absolute top-0 w-4 h-4 ${
                            isMe 
                              ? '-right-1 bg-primary [clip-path:polygon(0%_0%,100%_0%,0%_100%)]' 
                              : '-left-1 bg-white/5 border-l border-t border-white/10 [clip-path:polygon(0%_0%,100%_0%,100%_100%)]'
                          }`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Input Footer */}
            <div className="p-6 bg-zinc-900/50 backdrop-blur-md border-t border-white/5">
              <form onSubmit={sendMessage} className="relative">
                <input
                  type="text"
                  placeholder="TRANSMIT DATA TO HUB..."
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-6 pr-20 text-xs font-mono tracking-widest outline-none focus:border-primary/50 transition-all placeholder:text-zinc-700"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || !isConnected}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-primary text-black disabled:bg-zinc-800 disabled:text-zinc-500 transition-all active:scale-95 shadow-neon"
                >
                  <Send size={18} />
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
