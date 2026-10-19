import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import useLocale from '../hooks/useLocale';

/**
 * Navbar — Komponen navigasi bersama untuk semua halaman.
 *
 * Props:
 * - authedUser: data pengguna login (null jika belum login / halaman publik).
 * - onLogout: callback fungsi logout (opsional; hanya relevan jika authedUser ada).
 *
 * Tampilan:
 * - Semua halaman: logo "Aplikasi Catatan" (link ke /), ThemeToggle, tombol ganti bahasa.
 * - Halaman terautentikasi: ditambahkan link Terarsip, nama pengguna, dan tombol Logout.
 */
function Navbar({ authedUser, onLogout }) {
  const { locale, toggleLocale, t } = useLocale();

  return (
    <header className="navbar">
      {/* Logo: tautan ke halaman utama */}
      <Link to="/" className="navbar__logo">
        {t('appName')}
      </Link>

      {/* Grup navigasi kanan */}
      <nav className="navbar__nav">
        {/* Khusus pengguna yang sudah login */}
        {authedUser && (
          <>
            {/* Tautan ke halaman arsip */}
            <Link to="/archives" className="navbar__link">
              {t('navArchived')}
            </Link>
          </>
        )}

        {/* Tombol pengalih tema (Dark / Light Mode) */}
        <ThemeToggle />

        {/* Tombol pengalih bahasa (ID / EN) */}
        <button
          type="button"
          className="navbar__lang-btn nav-icon-btn"
          onClick={toggleLocale}
          aria-label={t('langToggle')}
          title={t('langToggle')}
        >
          {locale === 'id' ? 'EN' : 'ID'}
        </button>

        {/* Khusus pengguna yang sudah login: profil dan logout */}
        {authedUser && (
          <>
            <span className="navbar__user">{authedUser.name} 👤</span>
            <button
              type="button"
              className="navbar__link navbar__logout"
              onClick={onLogout}
            >
              {t('navLogout')}
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
