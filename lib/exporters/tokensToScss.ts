import { ThemeTokens } from '../../store/themeStore';

export function tokensToScss(tokens: ThemeTokens): string {
  const scssVars: string[] = [];

  scssVars.push('// Theme Tokens - SCSS Variables');
  scssVars.push('');

  Object.entries(tokens.colors).forEach(([key, value]) => {
    const scssKey = key.replace(/-/g, '-');
    scssVars.push(`$color-${scssKey}: ${value};`);
  });

  scssVars.push('');
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    scssVars.push(`$spacing-${key}: ${value};`);
  });

  scssVars.push('');
  Object.entries(tokens.radius).forEach(([key, value]) => {
    scssVars.push(`$radius-${key}: ${value};`);
  });

  scssVars.push('');
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    scssVars.push(`$shadow-${key}: ${value};`);
  });

  scssVars.push('');
  Object.entries(tokens.motion).forEach(([key, value]) => {
    scssVars.push(`$motion-${key}: ${value};`);
  });

  scssVars.push('');
  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    scssVars.push(`$font-family-${key}: ${value};`);
  });

  scssVars.push('');
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    scssVars.push(`$font-size-${key}: ${value};`);
  });

  return scssVars.join('\n');
}

