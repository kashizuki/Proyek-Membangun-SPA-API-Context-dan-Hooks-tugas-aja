import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

/**
 * useTheme
 *
 * Custom hook untuk mengakses state tema dan fungsi pengubah tema (toggleTheme).
 *
 * @returns {{ theme: 'light'|'dark', toggleTheme: Function }}
 */
export function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;
