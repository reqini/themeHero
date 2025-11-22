import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import { tokensToCss } from './tokensToCss';

export function useThemeSync() {
  const activeTokens = useThemeStore((state) => state.activeTokens);
  const initFromLocalStorage = useThemeStore((state) => state.initFromLocalStorage);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initFromLocalStorage();
    }
  }, [initFromLocalStorage]);

  useEffect(() => {
    const css = tokensToCss(activeTokens);
    const styleId = 'theme-tokens-style';

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, [activeTokens]);
}

