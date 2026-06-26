import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import { DEFAULT_THEME, STORAGE_KEYS } from '../utils/constants';
import type { Theme } from '../types/common';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_THEME' };

function themeReducer(state: Theme, action: ThemeAction): Theme {
  switch (action.type) {
    case 'SET_THEME':
      return action.payload;
    case 'TOGGLE_THEME':
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
}

function getInitialTheme(): Theme {
  // 1. Verificar localStorage
  const stored = localStorage.getItem(STORAGE_KEYS.THEME);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  // 2. Verificar preferência do sistema
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  // 3. Padrão
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(themeReducer, DEFAULT_THEME, getInitialTheme);

  // Aplicar tema ao DOM
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Monitorar mudanças de preferência do sistema
  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      dispatch({ type: 'SET_THEME', payload: newTheme });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: newTheme });
  }, []);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}