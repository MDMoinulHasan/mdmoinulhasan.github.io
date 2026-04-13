import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeName = 'dark' | 'light' | 'sunset' | 'ocean' | 'forest';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const stored = localStorage.getItem('voboghure-theme') as ThemeName | null;
    if (stored && ['dark', 'light', 'sunset', 'ocean', 'forest'].includes(stored)) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'sunset', 'ocean', 'forest');
    root.classList.add(theme);
  }, [theme]);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    localStorage.setItem('voboghure-theme', t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
