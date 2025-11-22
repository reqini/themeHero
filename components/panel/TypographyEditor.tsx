'use client';

import { useMemo, useCallback } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Input } from '../ui/Input';
import { FontSelector } from '../ui/FontSelector';
import { loadGoogleFont } from '../../lib/googleFonts';

export function TypographyEditor() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const updateActiveTokens = useThemeStore((state) => state.updateActiveTokens);

  const currentFontName = useMemo(() => {
    return tokens.typography.fontFamily.sans.split(',')[0].trim().replace(/['"]/g, '');
  }, [tokens.typography.fontFamily.sans]);

  const handleFontFamilyChange = useCallback((fontName: string) => {
    loadGoogleFont(fontName, [400, 500, 600, 700]);
    updateActiveTokens({
      typography: {
        ...tokens.typography,
        fontFamily: {
          ...tokens.typography.fontFamily,
          sans: fontName,
        },
      },
    });
  }, [tokens.typography, updateActiveTokens]);

  const handleFontSizeChange = useCallback((key: string, value: string) => {
    updateActiveTokens({
      typography: {
        ...tokens.typography,
        fontSize: {
          ...tokens.typography.fontSize,
          [key]: value,
        },
      },
    });
  }, [tokens.typography, updateActiveTokens]);

  const handleFontWeightChange = useCallback((key: string, value: string) => {
    updateActiveTokens({
      typography: {
        ...tokens.typography,
        fontWeight: {
          ...tokens.typography.fontWeight,
          [key]: value,
        },
      },
    });
  }, [tokens.typography, updateActiveTokens]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🔤</span>
        <h3 className="text-lg font-semibold">Typography</h3>
      </div>

      <div className="space-y-4">
        <FontSelector
          value={tokens.typography.fontFamily.sans}
          onChange={handleFontFamilyChange}
          label="Font Family"
        />

        <div className="p-4 rounded-lg border border-border bg-card/50">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Preview</h4>
          <div className="space-y-3">
            <h1
              style={{
                fontFamily: tokens.typography.fontFamily.sans,
                fontSize: tokens.typography.fontSize['4xl'],
                fontWeight: tokens.typography.fontWeight.bold,
                lineHeight: tokens.typography.lineHeight.tight,
              }}
              className="text-foreground"
            >
              Heading 1 - The quick brown fox
            </h1>
            <p
              style={{
                fontFamily: tokens.typography.fontFamily.sans,
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.normal,
                lineHeight: tokens.typography.lineHeight.normal,
              }}
              className="text-muted-foreground"
            >
              Body text - The quick brown fox jumps over the lazy dog. This is how your body text will look with the selected font.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Font Sizes</h4>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(tokens.typography.fontSize).map(([key, value]) => (
            <Input
              key={key}
              label={`${key.toUpperCase()}: ${value}`}
              type="text"
              value={value}
              onChange={(e) => handleFontSizeChange(key, e.target.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Font Weights</h4>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(tokens.typography.fontWeight).map(([key, value]) => (
            <Input
              key={key}
              label={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
              type="text"
              value={value}
              onChange={(e) => handleFontWeightChange(key, e.target.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

