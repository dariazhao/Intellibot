'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeId = 'dark' | 'light' | 'aubergine' | 'ocean' | 'midnight' | 'moss';

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  preview: { bg: string; sidebar: string; accent: string; text: string };
}

export const THEMES: ThemeMeta[] = [
  { id: 'dark', name: 'Datadog Dark', preview: { bg: '#1a1633', sidebar: '#130f28', accent: '#632CA6', text: '#e2dff0' } },
  { id: 'light', name: 'Light', preview: { bg: '#f8f8fa', sidebar: '#ffffff', accent: '#632CA6', text: '#1a1633' } },
  { id: 'aubergine', name: 'Aubergine', preview: { bg: '#1a1d21', sidebar: '#3F0E40', accent: '#E01E5A', text: '#d1d2d3' } },
  { id: 'ocean', name: 'Ocean Blue', preview: { bg: '#0f1923', sidebar: '#0a1628', accent: '#2196f3', text: '#ccd6e0' } },
  { id: 'midnight', name: 'Midnight', preview: { bg: '#111111', sidebar: '#0a0a0a', accent: '#6366f1', text: '#e0e0e0' } },
  { id: 'moss', name: 'Moss', preview: { bg: '#161d17', sidebar: '#0f1510', accent: '#4caf50', text: '#c8d6ca' } },
];

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('intellibot-theme') as ThemeId | null;
    if (stored && THEMES.some(t => t.id === stored)) {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    // Remove all theme classes
    THEMES.forEach(t => html.classList.remove(`theme-${t.id}`));
    html.classList.remove('dark');
    // Apply new theme class
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.add(`theme-${theme}`);
    }
  }, [theme, mounted]);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    localStorage.setItem('intellibot-theme', t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
