import { ThemeTokens } from '../../store/themeStore';

export function tokensToTailwind(tokens: ThemeTokens): string {
  const lines: string[] = [];

  lines.push("module.exports = {");
  lines.push("  theme: {");
  lines.push("    extend: {");
  lines.push("      colors: {");

  Object.entries(tokens.colors).forEach(([key, value]) => {
    lines.push(`        '${key}': '${value}',`);
  });

  lines.push("      },");
  lines.push("      spacing: {");

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    lines.push(`        '${key}': '${value}',`);
  });

  lines.push("      },");
  lines.push("      borderRadius: {");

  Object.entries(tokens.radius).forEach(([key, value]) => {
    lines.push(`        '${key}': '${value}',`);
  });

  lines.push("      },");
  lines.push("      boxShadow: {");

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    lines.push(`        '${key}': '${value}',`);
  });

  lines.push("      },");
  lines.push("      fontFamily: {");

  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    lines.push(`        '${key}': [${value.split(',').map(f => `'${f.trim()}'`).join(', ')}],`);
  });

  lines.push("      },");
  lines.push("      fontSize: {");

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    lines.push(`        '${key}': '${value}',`);
  });

  lines.push("      },");
  lines.push("    },");
  lines.push("  },");
  lines.push("};");

  return lines.join('\n');
}

