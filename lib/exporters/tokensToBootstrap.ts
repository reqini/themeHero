import { ThemeTokens } from '../../store/themeStore';

export function tokensToBootstrap(tokens: ThemeTokens): string {
  const cssVars: string[] = [];

  cssVars.push(':root {');
  cssVars.push('  /* Bootstrap Theme Override */');

  if (tokens.colors.primary) {
    cssVars.push(`  --bs-primary: ${tokens.colors.primary};`);
    cssVars.push(`  --bs-primary-rgb: ${hexToRgb(tokens.colors.primary)};`);
  }
  if (tokens.colors.secondary) {
    cssVars.push(`  --bs-secondary: ${tokens.colors.secondary};`);
    cssVars.push(`  --bs-secondary-rgb: ${hexToRgb(tokens.colors.secondary)};`);
  }
  if (tokens.colors.accent) {
    cssVars.push(`  --bs-info: ${tokens.colors.accent};`);
    cssVars.push(`  --bs-info-rgb: ${hexToRgb(tokens.colors.accent)};`);
  }
  
  Object.entries(tokens.colors).forEach(([key, value]) => {
    if (key !== 'primary' && key !== 'secondary' && key !== 'accent') {
      cssVars.push(`  --bs-${key}: ${value};`);
    }
  });

  cssVars.push('');
  cssVars.push('  /* Custom Theme Tokens */');
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars.push(`  --spacing-${key}: ${value};`);
  });

  Object.entries(tokens.radius).forEach(([key, value]) => {
    cssVars.push(`  --radius-${key}: ${value};`);
  });

  cssVars.push('}');

  return cssVars.join('\n');
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
}

