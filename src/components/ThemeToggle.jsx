import useTheme from '../hooks/useTheme';
import useLocale from '../hooks/useLocale';

/**
 * ThemeToggle — Tombol pengalih Dark Mode / Light Mode.
 *
 * - Light Mode: Ikon Bulan (🌙), aria-label dari terjemahan 'themeToDark'.
 * - Dark Mode: Ikon Matahari (☀️), aria-label dari terjemahan 'themeToLight'.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();

  const isDarkMode = theme === 'dark';
  const label = isDarkMode ? t('themeToLight') : t('themeToDark');

  return (
    <button
      type="button"
      className="nav-icon-btn theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
