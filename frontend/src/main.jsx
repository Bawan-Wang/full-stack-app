import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import FilePage from './FilePage.jsx'; // <-- 新增的頁面元件

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/file/:workerName" element={<FilePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
