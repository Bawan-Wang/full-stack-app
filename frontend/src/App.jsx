import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FilePage from './pages/FilePage';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/file/:workerName" element={<FilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
