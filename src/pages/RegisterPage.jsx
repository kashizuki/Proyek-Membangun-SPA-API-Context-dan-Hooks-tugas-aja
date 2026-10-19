import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useInput from '../hooks/useInput';
import useLocale from '../hooks/useLocale';
import { register } from '../utils/network-data';
import '../css/LoginRegister.css';

/**
 * RegisterPage — Halaman Registrasi Akun Pengguna
 *
 * Menggunakan Navbar bersama, controlled input (useInput),
 * dukungan multibahasa (useLocale), serta penanganan loading dan validasi.
 */
function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useLocale();

  // Controlled input hooks
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmPassword, handleConfirmPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  // Handler saat form registrasi disubmit
  async function handleSubmit(event) {
    event.preventDefault();

    // Validasi client-side: password dan konfirmasi harus cocok
    if (password !== confirmPassword) {
      alert(t('passwordMismatch'));
      return;
    }

    setLoading(true);
    // Pesan error registrasi berasal dari network-data.js (bawaan Dicoding)
    const { error } = await register({ name, email, password });
    setLoading(false);

    // Jika sukses mendaftar, arahkan pengguna ke halaman login ('/')
    if (!error) {
      navigate('/');
    }
  }

  return (
    <div>
      {/* Navbar bersama tanpa authedUser */}
      <Navbar />

      <main className="auth-container">
        {/* Teks instruksi */}
        <p className="auth-description">
          <strong>{t('registerPrompt')}</strong>
        </p>

        {/* Formulir pendaftaran */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t('name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          {/* Tombol submit register — dinonaktifkan saat loading */}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? t('loading') : t('register')}
          </button>
        </form>

        {/* Tautan kembali ke Halaman Login */}
        <p className="auth-footer">
          {t('hasAccount')} <Link to="/">{t('loginHere')}</Link>
        </p>
      </main>
    </div>
  );
}

export default RegisterPage;
