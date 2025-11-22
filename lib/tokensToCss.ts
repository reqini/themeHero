import { ThemeTokens } from '../store/themeStore';

export function tokensToCss(tokens: ThemeTokens): string {
  const cssVars: string[] = [];

  cssVars.push(':root {');

  Object.entries(tokens.colors).forEach(([key, value]) => {
    cssVars.push(`  --color-${key}: ${value};`);
  });

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars.push(`  --spacing-${key}: ${value};`);
  });

  Object.entries(tokens.radius).forEach(([key, value]) => {
    cssVars.push(`  --radius-${key}: ${value};`);
  });

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    cssVars.push(`  --shadow-${key}: ${value};`);
  });

  Object.entries(tokens.motion).forEach(([key, value]) => {
    cssVars.push(`  --motion-${key}: ${value};`);
  });

  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    cssVars.push(`  --font-family-${key}: ${value};`);
  });

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`  --font-size-${key}: ${value};`);
  });

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    cssVars.push(`  --font-weight-${key}: ${value};`);
  });

  Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
    cssVars.push(`  --line-height-${key}: ${value};`);
  });

  cssVars.push('}');

  return cssVars.join('\n');
}

