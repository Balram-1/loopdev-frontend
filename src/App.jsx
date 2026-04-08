import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Portfolio from './pages/Portfolio';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/chat" element={
            <div className="py-20 text-center">
              <h1 className="text-4xl font-bold mb-4">Secure Chat</h1>
              <p className="text-text-muted">Coming Soon: AES-256 Encrypted Messaging Hub.</p>
            </div>
          } />
          <Route path="/networth" element={
            <div className="py-20 text-center">
              <h1 className="text-4xl font-bold mb-4">Networth Tracker</h1>
              <p className="text-text-muted">Coming Soon: Visualizing your financial growth.</p>
            </div>
          } />
          <Route path="/tools" element={
            <div className="py-20 text-center">
              <h1 className="text-4xl font-bold mb-4">OSINT Tools</h1>
              <p className="text-text-muted">Coming Soon: Cybersecurity & Intelligence Toolset.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;