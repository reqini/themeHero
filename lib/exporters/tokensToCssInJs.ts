import { ThemeTokens } from '../../store/themeStore';

export function tokensToCssInJs(tokens: ThemeTokens): string {
  const lines: string[] = [];

  lines.push('// For styled-components / Emotion');
  lines.push('export const theme = {');
  lines.push('  colors: {');

  Object.entries(tokens.colors).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  spacing: {');

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  borderRadius: {');

  Object.entries(tokens.radius).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  shadows: {');

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  typography: {');
  lines.push('    fontFamily: {');

  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    const escaped = value.replace(/'/g, "\\'");
    lines.push(`      ${key}: '${escaped}',`);
  });

  lines.push('    },');
  lines.push('    fontSize: {');

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    lines.push(`      ${key}: '${value}',`);
  });

  lines.push('    },');
  lines.push('    fontWeight: {');

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    lines.push(`      ${key}: ${value},`);
  });

  lines.push('    },');
  lines.push('  },');
  lines.push('};');
  lines.push('');
  lines.push('// Usage with styled-components:');
  lines.push('// import { ThemeProvider } from "styled-components";');
  lines.push('// <ThemeProvider theme={theme}>...</ThemeProvider>');
  lines.push('');
  lines.push('// Usage with Emotion:');
  lines.push('// import { ThemeProvider } from "@emotion/react";');
  lines.push('// <ThemeProvider theme={theme}>...</ThemeProvider>');

  return lines.join('\n');
}

