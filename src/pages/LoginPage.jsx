import { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login } from '../utils/network-data';

// Komponen fungsional untuk Halaman Login Aplikasi Catatan
// Dilengkapi logic controlled input, submit handler, dan pemanggilan API login
function LoginPage({ onLoginSuccess }) {
  // Controlled input hooks menggunakan custom hook useInput
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  // Handler saat form login disubmit
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    // Memanggil API login dari network-data.js
    const { error, data } = await login({ email, password });

    setLoading(false);

    // Jika berhasil (tidak error), teruskan data token ke handler onLoginSuccess di App
    if (!error) {
      onLoginSuccess(data);
    }
  }

  return (
    <div>
      {/* 1. Header: Judul aplikasi */}
      <header>
        <h1>Aplikasi Catatan</h1>
      </header>

      {/* Konten Utama */}
      <main>
        {/* 2. Pesan ajakan login */}
        <p>Yuk, login untuk menggunakan aplikasi.</p>

        {/* 3. Form Login */}
        <form onSubmit={handleSubmit}>
          {/* Kolom input Email */}
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              size="40"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {/* Kolom input Password */}
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              size="40"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* 4. Tombol submit Login (disabled saat proses loading untuk cegah request ganda) */}
          <button type="submit" disabled={loading}>
            {loading ? 'Memuat...' : 'Login'}
          </button>
        </form>

        {/* 5. Tautan navigasi SPA ke halaman registrasi */}
        <p>
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;
