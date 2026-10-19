import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Catatan from './pages/Catatan';
import TambahCatatan from './pages/TambahCatatan';
import BacaCatatan from './pages/BacaCatatan';
import Terarsip from './pages/Terarsip';
import { getUserLogged, putAccessToken } from './utils/network-data';
import useLocale from './hooks/useLocale';

// Komponen utama aplikasi yang mengelola state autentikasi dan routing
function App() {
  const { t } = useLocale();

  // State authedUser dan flag inisialisasi
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Verifikasi token saat pertama kali aplikasi dimuat
  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    fetchUser();
  }, []);

  // Handler login berhasil: simpan token dan ambil data pengguna
  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  // Handler logout: bersihkan token dan reset state
  function onLogout() {
    putAccessToken('');
    setAuthedUser(null);
  }

  // Tampilkan pesan loading saat inisialisasi
  if (initializing) {
    return <p className="loading-message">{t('loading')}</p>;
  }

  // Rute publik: hanya login dan register
  if (authedUser === null) {
    return (
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLoginSuccess={onLoginSuccess} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Rute terproteksi: semua halaman saat pengguna sudah login
  return (
    <Routes>
      <Route
        path="/"
        element={<Catatan authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/archives"
        element={<Terarsip authedUser={authedUser} onLogout={onLogout} />}
      />
      {/* TambahCatatan juga menerima authedUser & onLogout untuk Navbar */}
      <Route
        path="/notes/new"
        element={<TambahCatatan authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/notes/:id"
        element={<BacaCatatan authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
