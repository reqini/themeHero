import { ThemeTokens } from '../store/themeStore';

export function tokensToTs(tokens: ThemeTokens): string {
  const lines: string[] = [];

  lines.push("export const theme = {");

  lines.push("  typography: {");
  lines.push(`    fontFamily: ${JSON.stringify(tokens.typography.fontFamily, null, 6)},`);
  lines.push(`    fontSize: ${JSON.stringify(tokens.typography.fontSize, null, 6)},`);
  lines.push(`    fontWeight: ${JSON.stringify(tokens.typography.fontWeight, null, 6)},`);
  lines.push(`    lineHeight: ${JSON.stringify(tokens.typography.lineHeight, null, 6)},`);
  lines.push("  },");

  lines.push(`  colors: ${JSON.stringify(tokens.colors, null, 2)},`);
  lines.push(`  spacing: ${JSON.stringify(tokens.spacing, null, 2)},`);
  lines.push(`  radius: ${JSON.stringify(tokens.radius, null, 2)},`);
  lines.push(`  shadows: ${JSON.stringify(tokens.shadows, null, 2)},`);
  lines.push(`  motion: ${JSON.stringify(tokens.motion, null, 2)},`);

  lines.push("} as const;");

  lines.push("");
  lines.push("export type Theme = typeof theme;");

  return lines.join('\n');
}

