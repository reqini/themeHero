import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SavedTheme = {
  id: string;
  name: string;
  tokens: ThemeTokens;
  createdAt: string;
  updatedAt: string;
};

export interface TypographyTokens {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  'muted-foreground': string;
  border: string;
  card: string;
  'card-foreground': string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface RadiusTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface MotionTokens {
  fast: string;
  normal: string;
  slow: string;
}

export interface ThemeTokens {
  typography: TypographyTokens;
  colors: ColorTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  motion: MotionTokens;
}

export const defaultTokens: ThemeTokens = {
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  colors: {
    primary: '#246BFD',
    secondary: '#8B5CF6',
    accent: '#EC4899',
    background: '#0A0E27',
    foreground: '#FFFFFF',
    muted: '#1E293B',
    'muted-foreground': '#94A3B8',
    border: '#1E293B',
    card: '#0F172A',
    'card-foreground': '#F1F5F9',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  motion: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

interface ThemeStore {
  themes: SavedTheme[];
  activeThemeId: string | null;
  activeTokens: ThemeTokens;
  
  initFromLocalStorage: () => void;
  setActiveTheme: (id: string) => void;
  updateActiveTokens: (partial: Partial<ThemeTokens>) => void;
  saveCurrentAsNew: (name: string) => string;
  renameTheme: (id: string, newName: string) => void;
  duplicateTheme: (id: string) => string;
  deleteTheme: (id: string) => void;
  resetToDefault: () => void;
  
  tokens: ThemeTokens;
  updateTokens: (tokens: Partial<ThemeTokens>) => void;
  resetTokens: () => void;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const createDefaultTheme = (): SavedTheme => ({
  id: generateId(),
  name: 'Default',
  tokens: defaultTokens,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themes: [],
      activeThemeId: null,
      activeTokens: defaultTokens,
      
      initFromLocalStorage: () => {
        if (typeof window === 'undefined') return;
        
        const storedThemes = localStorage.getItem('themeCraft:themes');
        const storedActiveId = localStorage.getItem('themeCraft:activeThemeId');
        
        let themes: SavedTheme[] = [];
        let activeThemeId: string | null = null;
        
        if (storedThemes) {
          try {
            themes = JSON.parse(storedThemes);
          } catch {
            themes = [];
          }
        }
        
        if (themes.length === 0) {
          const defaultTheme = createDefaultTheme();
          themes = [defaultTheme];
          activeThemeId = defaultTheme.id;
        } else {
          activeThemeId = storedActiveId || themes[0].id;
        }
        
        const activeTheme = themes.find(t => t.id === activeThemeId) || themes[0];
        
        set({
          themes,
          activeThemeId,
          activeTokens: activeTheme.tokens,
          tokens: activeTheme.tokens,
        });
      },
      
      setActiveTheme: (id: string) => {
        const state = get();
        const theme = state.themes.find(t => t.id === id);
        if (theme) {
          set({
            activeThemeId: id,
            activeTokens: theme.tokens,
            tokens: theme.tokens,
          });
          localStorage.setItem('themeCraft:activeThemeId', id);
        }
      },
      
      updateActiveTokens: (partial: Partial<ThemeTokens>) => {
        const state = get();
        const updatedTokens = { ...state.activeTokens };
        
        if (partial.colors) {
          updatedTokens.colors = { ...updatedTokens.colors, ...partial.colors };
        }
        if (partial.spacing) {
          updatedTokens.spacing = { ...updatedTokens.spacing, ...partial.spacing };
        }
        if (partial.radius) {
          updatedTokens.radius = { ...updatedTokens.radius, ...partial.radius };
        }
        if (partial.shadows) {
          updatedTokens.shadows = { ...updatedTokens.shadows, ...partial.shadows };
        }
        if (partial.motion) {
          updatedTokens.motion = { ...updatedTokens.motion, ...partial.motion };
        }
        if (partial.typography) {
          updatedTokens.typography = {
            ...updatedTokens.typography,
            ...partial.typography,
            fontSize: partial.typography.fontSize
              ? { ...updatedTokens.typography.fontSize, ...partial.typography.fontSize }
              : updatedTokens.typography.fontSize,
            fontWeight: partial.typography.fontWeight
              ? { ...updatedTokens.typography.fontWeight, ...partial.typography.fontWeight }
              : updatedTokens.typography.fontWeight,
            lineHeight: partial.typography.lineHeight
              ? { ...updatedTokens.typography.lineHeight, ...partial.typography.lineHeight }
              : updatedTokens.typography.lineHeight,
            fontFamily: partial.typography.fontFamily
              ? { ...updatedTokens.typography.fontFamily, ...partial.typography.fontFamily }
              : updatedTokens.typography.fontFamily,
          };
        }
        
        set({
          activeTokens: updatedTokens,
          tokens: updatedTokens,
        });
        
        if (state.activeThemeId) {
          const updatedThemes = state.themes.map(t =>
            t.id === state.activeThemeId
              ? { ...t, tokens: updatedTokens, updatedAt: new Date().toISOString() }
              : t
          );
          set({ themes: updatedThemes });
          localStorage.setItem('themeCraft:themes', JSON.stringify(updatedThemes));
        }
      },
      
      saveCurrentAsNew: (name: string) => {
        const state = get();
        const newTheme: SavedTheme = {
          id: generateId(),
          name,
          tokens: state.activeTokens,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        const updatedThemes = [...state.themes, newTheme];
        set({
          themes: updatedThemes,
          activeThemeId: newTheme.id,
        });
        
        localStorage.setItem('themeCraft:themes', JSON.stringify(updatedThemes));
        localStorage.setItem('themeCraft:activeThemeId', newTheme.id);
        
        return newTheme.id;
      },
      
      renameTheme: (id: string, newName: string) => {
        const state = get();
        const updatedThemes = state.themes.map(t =>
          t.id === id ? { ...t, name: newName, updatedAt: new Date().toISOString() } : t
        );
        set({ themes: updatedThemes });
        localStorage.setItem('themeCraft:themes', JSON.stringify(updatedThemes));
      },
      
      duplicateTheme: (id: string) => {
        const state = get();
        const theme = state.themes.find(t => t.id === id);
        if (!theme) return '';
        
        const newTheme: SavedTheme = {
          id: generateId(),
          name: `${theme.name} (Copy)`,
          tokens: theme.tokens,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        const updatedThemes = [...state.themes, newTheme];
        set({ themes: updatedThemes });
        localStorage.setItem('themeCraft:themes', JSON.stringify(updatedThemes));
        
        return newTheme.id;
      },
      
      deleteTheme: (id: string) => {
        const state = get();
        const updatedThemes = state.themes.filter(t => t.id !== id);
        
        if (updatedThemes.length === 0) {
          const defaultTheme = createDefaultTheme();
          updatedThemes.push(defaultTheme);
          set({
            themes: updatedThemes,
            activeThemeId: defaultTheme.id,
            activeTokens: defaultTheme.tokens,
            tokens: defaultTheme.tokens,
          });
        } else {
          const newActiveId = state.activeThemeId === id ? updatedThemes[0].id : state.activeThemeId;
          const newActiveTheme = updatedThemes.find(t => t.id === newActiveId) || updatedThemes[0];
          
          set({
            themes: updatedThemes,
            activeThemeId: newActiveId,
            activeTokens: newActiveTheme.tokens,
            tokens: newActiveTheme.tokens,
          });
          localStorage.setItem('themeCraft:activeThemeId', newActiveId || '');
        }
        
        localStorage.setItem('themeCraft:themes', JSON.stringify(updatedThemes));
      },
      
      resetToDefault: () => {
        const state = get();
        const defaultTheme = createDefaultTheme();
        
        let updatedThemes = state.themes;
        const existingDefault = updatedThemes.find(t => t.id === state.activeThemeId);
        
        if (existingDefault) {
          updatedThemes = updatedThemes.map(t =>
            t.id === state.activeThemeId
              ? { ...t, tokens: defaultTokens, updatedAt: new Date().toISOString() }
              : t
          );
        } else {
          updatedThemes = [...updatedThemes, defaultTheme];
        }
        
        const finalActiveId = existingDefault ? state.activeThemeId : defaultTheme.id;
        const finalActiveTheme = updatedThemes.find(t => t.id === finalActiveId) || defaultTheme;
        
        set({
          themes: updatedThemes,
          activeThemeId: finalActiveId,
          activeTokens: finalActiveTheme.tokens,
          tokens: finalActiveTheme.tokens,
        });
        
        localStorage.setItem('themeCraft:themes', JSON.stringify(updatedThemes));
        localStorage.setItem('themeCraft:activeThemeId', finalActiveId || '');
      },
      
      tokens: defaultTokens,
      updateTokens: (newTokens) => {
        get().updateActiveTokens(newTokens);
      },
      resetTokens: () => {
        get().resetToDefault();
      },
    }),
    {
      name: 'themeTokens',
      partialize: (state) => ({ tokens: state.tokens }),
    }
  )
);

