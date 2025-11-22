import { ThemeTokens } from '../store/themeStore';

export function encodeTheme(tokens: ThemeTokens): string {
  try {
    const json = JSON.stringify(tokens);
    return btoa(encodeURIComponent(json));
  } catch {
    return '';
  }
}

export function decodeTheme(encoded: string): ThemeTokens | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getThemeFromUrl(): ThemeTokens | null {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get('theme');
  
  if (!themeParam) return null;
  
  return decodeTheme(themeParam);
}

export function createShareUrl(tokens: ThemeTokens): string {
  if (typeof window === 'undefined') return '';
  
  const encoded = encodeTheme(tokens);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?theme=${encoded}`;
}

