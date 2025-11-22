import { ThemeTokens } from '../../store/themeStore';

export function tokensToBootstrap(tokens: ThemeTokens): string {
  const cssVars: string[] = [];

  cssVars.push(':root {');
  cssVars.push('  /* Bootstrap Theme Override */');

  Object.entries(tokens.colors).forEach(([key, value]) => {
    if (key === 'primary') {
      cssVars.push(`  --bs-primary: ${value};`);
      cssVars.push(`  --bs-primary-rgb: ${hexToRgb(value)};`);
    } else if (key === 'secondary') {
      cssVars.push(`  --bs-secondary: ${value};`);
      cssVars.push(`  --bs-secondary-rgb: ${hexToRgb(value)};`);
    } else if (key === 'accent') {
      cssVars.push(`  --bs-info: ${value};`);
      cssVars.push(`  --bs-info-rgb: ${hexToRgb(value)};`);
    }
    cssVars.push(`  --bs-${key}: ${value};`);
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

