import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

/**
 * useLocale
 *
 * Custom hook untuk mengakses state bahasa (locale), toggle, dan fungsi terjemahan t().
 *
 * @returns {{ locale: 'id'|'en', toggleLocale: Function, t: Function }}
 */
function useLocale() {
  return useContext(LocaleContext);
}

export default useLocale;
