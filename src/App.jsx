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
    // Temporarily disabled for testing
    // const hasSeenIntro = sessionStorage.getItem('ld_intro_seen');
    // if (hasSeenIntro) {
    //   setShowIntro(false);
    // }
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
            </Routes>
          </Layout>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;