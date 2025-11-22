import { ThemeTokens } from '../../store/themeStore';

export function tokensToGoogleFonts(tokens: ThemeTokens): string {
  const lines: string[] = [];

  const fonts = tokens.typography.fontFamily.sans.split(',').map(f => f.trim());
  const fontNames: string[] = [];

  fonts.forEach(font => {
    const cleanFont = font.replace(/['"]/g, '').trim();
    if (cleanFont && !cleanFont.includes('system-ui') && !cleanFont.includes('sans-serif') && !cleanFont.includes('monospace')) {
      const googleFontName = cleanFont.replace(/\s+/g, '+');
      fontNames.push(googleFontName);
    }
  });

  if (fontNames.length > 0) {
    lines.push('/* Google Fonts Import */');
    lines.push(`@import url('https://fonts.googleapis.com/css2?family=${fontNames[0]}:wght@400;500;600;700&display=swap');`);
    lines.push('');
    const fontNameForImport = fontNames[0].replace(/\+/g, '');
    lines.push('/* Next.js Font Object */');
    lines.push(`import { ${fontNameForImport} } from 'next/font/google';`);
    lines.push('');
    lines.push(`const ${fontNameForImport.toLowerCase()} = ${fontNameForImport}({`);
    lines.push("  subsets: ['latin'],");
    lines.push(`  variable: '--font-${fontNameForImport.toLowerCase()}',`);
    lines.push('});');
    lines.push('');
    lines.push('/* Usage in tailwind.config.js */');
    lines.push('fontFamily: {');
    lines.push(`  sans: ['${fonts[0]}', 'system-ui', 'sans-serif'],`);
    lines.push(`  mono: ['${tokens.typography.fontFamily.mono.split(',')[0].trim()}', 'monospace'],`);
    lines.push('},');
  } else {
    lines.push('// No Google Fonts detected in theme');
    lines.push('// Using system fonts');
  }

  return lines.join('\n');
}

