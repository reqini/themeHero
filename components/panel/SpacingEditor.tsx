'use client';

import { useThemeStore } from '../../store/themeStore';
import { Slider } from '../ui/Slider';

export function SpacingEditor() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const updateActiveTokens = useThemeStore((state) => state.updateActiveTokens);

  const handleSpacingChange = (key: string, value: string) => {
    updateActiveTokens({
      spacing: {
        ...tokens.spacing,
        [key]: value,
      },
    });
  };

  const getUnit = (value: string): 'rem' | 'px' | 'em' => {
    if (value.includes('px')) return 'px';
    if (value.includes('em')) return 'em';
    return 'rem';
  };

  const getNumericValue = (value: string): number => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const getMaxValue = (key: string): number => {
    const maxValues: Record<string, number> = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 6,
      '2xl': 8,
    };
    return maxValues[key] || 5;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📏</span>
        <h3 className="text-lg font-semibold">Spacing</h3>
      </div>

      <div className="p-4 rounded-lg border border-border bg-card/50 mb-4">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Preview</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div
              className="bg-primary/20 rounded border-2 border-primary/50 flex items-center justify-center text-xs text-primary font-medium"
              style={{
                padding: tokens.spacing.xs,
                minWidth: '60px',
                minHeight: '40px',
              }}
            >
              XS
            </div>
            <div
              className="bg-secondary/20 rounded border-2 border-secondary/50 flex items-center justify-center text-xs text-secondary font-medium"
              style={{
                padding: tokens.spacing.sm,
                minWidth: '60px',
                minHeight: '40px',
              }}
            >
              SM
            </div>
            <div
              className="bg-accent/20 rounded border-2 border-accent/50 flex items-center justify-center text-xs text-accent font-medium"
              style={{
                padding: tokens.spacing.md,
                minWidth: '60px',
                minHeight: '40px',
              }}
            >
              MD
            </div>
            <div
              className="bg-primary/20 rounded border-2 border-primary/50 flex items-center justify-center text-xs text-primary font-medium"
              style={{
                padding: tokens.spacing.lg,
                minWidth: '60px',
                minHeight: '40px',
              }}
            >
              LG
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(tokens.spacing).map(([key, value]) => {
          const unit = getUnit(value);
          const numValue = getNumericValue(value);
          const maxValue = getMaxValue(key);

          return (
            <Slider
              key={key}
              label={`${key.toUpperCase()}`}
              value={value}
              onChange={(newValue) => handleSpacingChange(key, newValue)}
              min={0}
              max={maxValue}
              step={unit === 'rem' ? 0.125 : 1}
              unit={unit}
              preview={true}
            />
          );
        })}
      </div>
    </div>
  );
}

