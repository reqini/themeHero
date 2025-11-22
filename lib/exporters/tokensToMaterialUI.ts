import { ThemeTokens } from '../../store/themeStore';

export function tokensToMaterialUI(tokens: ThemeTokens): string {
  const lines: string[] = [];

  lines.push("import { createTheme } from '@mui/material/styles';");
  lines.push('');
  lines.push('const theme = createTheme({');
  lines.push('  palette: {');
  lines.push('    mode: "dark",');
  lines.push('    primary: {');
  lines.push(`      main: '${tokens.colors.primary}',`);
  lines.push('    },');
  lines.push('    secondary: {');
  lines.push(`      main: '${tokens.colors.secondary}',`);
  lines.push('    },');
  lines.push('    background: {');
  lines.push(`      default: '${tokens.colors.background}',`);
  lines.push(`      paper: '${tokens.colors.card}',`);
  lines.push('    },');
  lines.push('    text: {');
  lines.push(`      primary: '${tokens.colors.foreground}',`);
  lines.push(`      secondary: '${tokens.colors['muted-foreground']}',`);
  lines.push('    },');
  lines.push('  },');
  lines.push('  typography: {');
  lines.push('    fontFamily: [');
  const fontFamilies = tokens.typography.fontFamily.sans.split(',').map(f => `'${f.trim()}'`);
  lines.push(`      ${fontFamilies.join(', ')},`);
  lines.push('      "Arial", "sans-serif"');
  lines.push('    ].join(","),');
  lines.push('    h1: {');
  lines.push(`      fontSize: '${tokens.typography.fontSize['4xl']}',`);
  lines.push(`      fontWeight: ${tokens.typography.fontWeight.bold},`);
  lines.push('    },');
  lines.push('    h2: {');
  lines.push(`      fontSize: '${tokens.typography.fontSize['3xl']}',`);
  lines.push(`      fontWeight: ${tokens.typography.fontWeight.bold},`);
  lines.push('    },');
  lines.push('    h3: {');
  lines.push(`      fontSize: '${tokens.typography.fontSize['2xl']}',`);
  lines.push(`      fontWeight: ${tokens.typography.fontWeight.semibold},`);
  lines.push('    },');
  lines.push('    body1: {');
  lines.push(`      fontSize: '${tokens.typography.fontSize.base}',`);
  lines.push(`      fontWeight: ${tokens.typography.fontWeight.normal},`);
  lines.push('    },');
  lines.push('  },');
  lines.push('  shape: {');
  lines.push(`    borderRadius: ${parseFloat(tokens.radius.md)} * 4,`);
  lines.push('  },');
  lines.push('  spacing: (factor: number) => {');
  lines.push(`    const baseUnit = ${parseFloat(tokens.spacing.md)};`);
  lines.push('    return `${baseUnit * factor}px`;');
  lines.push('  },');
  lines.push('});');
  lines.push('');
  lines.push('export default theme;');

  return lines.join('\n');
}

