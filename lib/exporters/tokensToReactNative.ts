import { ThemeTokens } from '../../store/themeStore';

export function tokensToReactNative(tokens: ThemeTokens): string {
  const lines: string[] = [];

  lines.push("import { StyleSheet } from 'react-native';");
  lines.push('');
  lines.push('export const theme = {');
  lines.push('  colors: {');

  Object.entries(tokens.colors).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  spacing: {');

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    const numValue = parseFloat(value);
    lines.push(`    ${key}: ${numValue},`);
  });

  lines.push('  },');
  lines.push('  borderRadius: {');

  Object.entries(tokens.radius).forEach(([key, value]) => {
    const numValue = parseFloat(value);
    lines.push(`    ${key}: ${numValue},`);
  });

  lines.push('  },');
  lines.push('  typography: {');
  lines.push('    fontFamily: {');

  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    const fontName = value.split(',')[0].trim().replace(/['"]/g, '');
    lines.push(`      ${key}: '${fontName}',`);
  });

  lines.push('    },');
  lines.push('    fontSize: {');

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    const numValue = parseFloat(value);
    lines.push(`      ${key}: ${numValue},`);
  });

  lines.push('    },');
  lines.push('    fontWeight: {');

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    lines.push(`      ${key}: '${value}',`);
  });

  lines.push('    },');
  lines.push('  },');
  lines.push('};');
  lines.push('');
  lines.push('export const styles = StyleSheet.create({');
  lines.push('  container: {');
  lines.push(`    backgroundColor: theme.colors.background,`);
  lines.push(`    padding: theme.spacing.md,`);
  lines.push('  },');
  lines.push('  text: {');
  lines.push(`    color: theme.colors.foreground,`);
  lines.push(`    fontSize: theme.typography.fontSize.base,`);
  lines.push(`    fontFamily: theme.typography.fontFamily.sans,`);
  lines.push('  },');
  lines.push('});');

  return lines.join('\n');
}

