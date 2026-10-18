import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Inisialisasi root DOM untuk aplikasi React
// BrowserRouter membungkus komponen App untuk menyediakan context routing SPA (Single Page Application)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
