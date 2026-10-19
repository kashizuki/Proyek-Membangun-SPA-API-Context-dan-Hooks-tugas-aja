import { createContext } from 'react';

/**
 * ThemeContext
 *
 * React Context untuk state tema global ('light' | 'dark').
 * Digunakan oleh ThemeProvider untuk menyediakan data dan useTheme untuk mengonsumsinya.
 */
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export default ThemeContext;
