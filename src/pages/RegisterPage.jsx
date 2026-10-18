import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';

// Komponen fungsional untuk Halaman Register Aplikasi Catatan
// Dilengkapi controlled input, validasi client, submit handler, dan redirect
function RegisterPage() {
  const navigate = useNavigate();

  // Controlled input hooks menggunakan useInput
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmPassword, handleConfirmPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  // Handler saat form registrasi disubmit
  async function handleSubmit(event) {
    event.preventDefault();

    // R3: Validasi client side - password dan confirm password harus cocok
    if (password !== confirmPassword) {
      alert('Password dan Confirm Password tidak sama');
      return;
    }

    setLoading(true);

    // R4: Memanggil API register dari network-data.js (confirmPassword tidak dikirim)
    const { error } = await register({ name, email, password });

    setLoading(false);

    // R6: Jika sukses, arahkan pengguna ke halaman login ('/')
    if (!error) {
      navigate('/');
    }
  }

  return (
    <div>
      {/* 1. Header: Judul aplikasi (identik dengan Halaman Login) */}
      <header>
        <h1>Aplikasi Catatan</h1>
      </header>

      {/* 2. Bagian Utama / Form Registrasi */}
      <main>
        {/* Instruksi Form (Teks tebal di atas form) */}
        <p>
          <strong>Isi form untuk mendaftar akun.</strong>
        </p>

        {/* Formulir Pendaftaran */}
        <form onSubmit={handleSubmit}>
          {/* Kolom input Name */}
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              size="40"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

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

          {/* Kolom input Confirm Password */}
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              size="40"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          {/* Tombol submit Register (disabled saat loading untuk cegah request ganda) */}
          <button type="submit" disabled={loading}>
            {loading ? 'Memuat...' : 'Register'}
          </button>
        </form>

        {/* 3. Tautan navigasi SPA kembali ke Halaman Login */}
        <p>
          Sudah punya akun? <Link to="/">Login di sini</Link>
        </p>

        {/* 4. Ikon Asisten / Floating Widget (elemen visual div, styling diterapkan pada tahap CSS) */}
        <div id="assistant-icon" aria-label="Ikon Asisten">
          {/* Ikon asisten visual */}
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
