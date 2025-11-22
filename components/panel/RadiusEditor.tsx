'use client';

import { useThemeStore } from '../../store/themeStore';
import { Slider } from '../ui/Slider';

export function RadiusEditor() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const updateActiveTokens = useThemeStore((state) => state.updateActiveTokens);

  const handleRadiusChange = (key: string, value: string) => {
    updateActiveTokens({
      radius: {
        ...tokens.radius,
        [key]: value,
      },
    });
  };

  const getUnit = (value: string): 'rem' | 'px' => {
    return value.includes('px') ? 'px' : 'rem';
  };

  const getNumericValue = (value: string): number => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">⭕</span>
        <h3 className="text-lg font-semibold">Border Radius</h3>
      </div>

      <div className="p-4 rounded-lg border border-border bg-card/50 mb-4">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Preview</h4>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(tokens.radius).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 bg-primary/20 border-2 border-primary flex items-center justify-center text-xs text-primary font-medium"
                style={{
                  borderRadius: value,
                }}
              >
                {key.toUpperCase()}
              </div>
              <span className="text-xs text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(tokens.radius).map(([key, value]) => {
          const unit = getUnit(value);
          const numValue = getNumericValue(value);

          return (
            <Slider
              key={key}
              label={`${key.toUpperCase()}`}
              value={value}
              onChange={(newValue) => handleRadiusChange(key, newValue)}
              min={0}
              max={unit === 'rem' ? 2 : 32}
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

