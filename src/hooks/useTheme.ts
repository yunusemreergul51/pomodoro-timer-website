import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => storage.getTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    storage.saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
