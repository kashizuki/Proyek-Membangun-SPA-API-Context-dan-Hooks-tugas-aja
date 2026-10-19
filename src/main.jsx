import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider';
import { LocaleProvider } from './contexts/LocaleProvider';
import App from './App.jsx';
import './index.css';

// Entry point aplikasi:
// - BrowserRouter: menyediakan routing SPA
// - ThemeProvider: mengelola state tema global (Dark / Light Mode)
// - LocaleProvider: mengelola state bahasa global (Indonesia / English)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
