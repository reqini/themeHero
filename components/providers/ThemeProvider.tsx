'use client';

import { useEffect, useRef, useState } from 'react';
import { useThemeSync } from '../../lib/useThemeSync';
import { useThemeStore } from '../../store/themeStore';
import { getThemeFromUrl } from '../../lib/themeSharing';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useThemeSync();
  const initFromLocalStorage = useThemeStore((state) => state.initFromLocalStorage);
  const updateActiveTokens = useThemeStore((state) => state.updateActiveTokens);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || initialized.current) return;

    try {
      initFromLocalStorage();

      const urlTheme = getThemeFromUrl();
      if (urlTheme) {
        updateActiveTokens(urlTheme);
        const url = new URL(window.location.href);
        url.searchParams.delete('theme');
        window.history.replaceState({}, '', url.toString());
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      initialized.current = true;
      setIsLoading(false);
    }
  }, [initFromLocalStorage, updateActiveTokens]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return <>{children}</>;
}

