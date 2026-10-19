import { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';

/**
 * ThemeProvider
 *
 * Menyediakan konteks tema kepada seluruh komponen turunan.
 * - Membaca preferensi dari localStorage (kunci 'theme').
 * - Nilai selain 'light' atau 'dark' dianggap 'light'.
 * - Menyinkronkan atribut data-theme pada <html>.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    // Validasi: hanya izinkan 'light' atau 'dark'
    return saved === 'dark' ? 'dark' : 'light';
  });

  // Sinkronisasikan data-theme pada <html> dan simpan ke localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle antara 'light' dan 'dark'
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
