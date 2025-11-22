import { ThemeTokens } from '../../store/themeStore';

export function tokensToJss(tokens: ThemeTokens): string {
  const lines: string[] = [];

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
  lines.push('  radius: {');

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

  return lines.join('\n');
}

