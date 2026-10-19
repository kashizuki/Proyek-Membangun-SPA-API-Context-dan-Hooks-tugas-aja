import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useInput from '../hooks/useInput';
import useLocale from '../hooks/useLocale';
import { login } from '../utils/network-data';
import '../css/LoginRegister.css';

// Halaman Login
function LoginPage({ onLoginSuccess }) {
  const { t } = useLocale();
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  // Handler submit form login
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    // Pesan error login berasal dari network-data.js (bawaan Dicoding)
    const { error, data } = await login({ email, password });
    setLoading(false);
    if (!error) {
      onLoginSuccess(data);
    }
  }

  return (
    <div>
      {/* Navbar tanpa authedUser: hanya logo, ThemeToggle, dan ganti bahasa */}
      <Navbar />

      <main className="auth-container">
        <p className="auth-description">{t('loginPrompt')}</p>

        <form onSubmit={handleSubmit}>
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

          {/* Tombol submit — disabled saat loading */}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? t('loading') : t('login')}
          </button>
        </form>

        <p className="auth-footer">
          {t('noAccount')} <Link to="/register">{t('registerHere')}</Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;
