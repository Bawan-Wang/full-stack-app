import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FilePage from './pages/FilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/file/:workerName" element={<FilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
