import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Catatan from './pages/Catatan';
import { getUserLogged, putAccessToken } from './utils/network-data';

// Komponen utama aplikasi yang mengelola state autentikasi dan routing aplikasi
function App() {
  // A1: State authedUser (data pengguna terautentikasi) dan initializing (status inisialisasi awal)
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // A2: Pengecekan token saat aplikasi pertama kali dimuat
  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    fetchUser();
  }, []);

  // Handler saat login berhasil: simpan accessToken dan set data pengguna
  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  // Handler logout: kosongkan token di localStorage dan reset state authedUser
  function onLogout() {
    putAccessToken('');
    setAuthedUser(null);
  }

  // A3: Tampilkan teks memuat saat masih dalam proses inisialisasi agar halaman tidak berkedip
  if (initializing) {
    return <p>Memuat...</p>;
  }

  // A4: Jika pengguna belum login (authedUser === null), hanya rute login dan register yang tersedia
  if (authedUser === null) {
    return (
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLoginSuccess={onLoginSuccess} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        {/* Mengarahkan rute yang tidak dikenal kembali ke halaman login */}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // A5: Jika pengguna sudah login, langsung diarahkan ke halaman Catatan
  return (
    <Routes>
      <Route
        path="/"
        element={<Catatan authedUser={authedUser} onLogout={onLogout} />}
      />
      {/* Pengguna yang sudah login diarahkan ke halaman utama jika membuka rute lain seperti /register */}
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
