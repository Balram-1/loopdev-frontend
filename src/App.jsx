import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Portfolio from './pages/Portfolio';
import ChatPage from './pages/ChatPage';
import IntroScreen from './components/IntroScreen';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if intro has already been shown this session
    const hasSeenIntro = sessionStorage.getItem('ld_intro_seen');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('ld_intro_seen', 'true');
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen key="intro" onComplete={handleIntroComplete} />
        ) : (
          <Layout key="main">
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/networth" element={
                <div className="py-20 text-center">
                  <h1 className="text-4xl font-bold mb-4">Networth Tracker</h1>
                  <p className="text-text-muted text-zinc-500">Coming Soon: Visualizing your financial growth.</p>
                </div>
              } />
              <Route path="/tools" element={
                <div className="py-20 text-center">
                  <h1 className="text-4xl font-bold mb-4">OSINT Tools</h1>
                  <p className="text-text-muted text-zinc-500">Coming Soon: Cybersecurity & Intelligence Toolset.</p>
                </div>
              } />
            </Routes>
          </Layout>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;