import { ThemeTokens } from '../../store/themeStore';

export function tokensToChakraUI(tokens: ThemeTokens): string {
  const lines: string[] = [];

  lines.push("import { extendTheme } from '@chakra-ui/react';");
  lines.push('');
  lines.push('const theme = extendTheme({');
  lines.push('  colors: {');
  lines.push('    brand: {');

  Object.entries(tokens.colors).forEach(([key, value]) => {
    lines.push(`      ${key}: '${value}',`);
  });

  lines.push('    },');
  lines.push('  },');
  lines.push('  fonts: {');
  lines.push(`    body: ${JSON.stringify(tokens.typography.fontFamily.sans)},`);
  lines.push(`    heading: ${JSON.stringify(tokens.typography.fontFamily.sans)},`);
  lines.push(`    mono: ${JSON.stringify(tokens.typography.fontFamily.mono)},`);
  lines.push('  },');
  lines.push('  fontSizes: {');

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  fontWeights: {');

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    lines.push(`    ${key}: ${value},`);
  });

  lines.push('  },');
  lines.push('  radii: {');

  Object.entries(tokens.radius).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  shadows: {');

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  space: {');

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    lines.push(`    ${key}: '${value}',`);
  });

  lines.push('  },');
  lines.push('  config: {');
  lines.push('    initialColorMode: "dark",');
  lines.push('    useSystemColorMode: false,');
  lines.push('  },');
  lines.push('});');
  lines.push('');
  lines.push('export default theme;');

  return lines.join('\n');
}

