import { useState, useEffect } from 'react';
import LocaleContext, { translations } from './LocaleContext';

/**
 * LocaleProvider
 *
 * Menyediakan konteks bahasa (locale) ke seluruh komponen turunan.
 * - Membaca preferensi dari localStorage (kunci 'locale'), default 'id'.
 * - Nilai selain 'id' atau 'en' dianggap 'id'.
 * - Memperbarui atribut <html lang> agar aksesibel.
 * - Menyediakan fungsi helper t(key) untuk mengambil teks berdasarkan bahasa aktif.
 */
export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem('locale');
    // Validasi: hanya izinkan 'id' atau 'en'
    return saved === 'en' ? 'en' : 'id';
  });

  // Sinkronisasi <html lang> dan localStorage setiap kali locale berubah
  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Toggle antara 'id' dan 'en'
  function toggleLocale() {
    setLocale((prev) => (prev === 'id' ? 'en' : 'id'));
  }

  // Fungsi helper: ambil teks berdasarkan kunci dan locale saat ini
  function t(key) {
    return translations[locale][key] ?? key;
  }

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export default LocaleProvider;
