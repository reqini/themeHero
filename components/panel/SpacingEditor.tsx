'use client';

import { useThemeStore } from '../../store/themeStore';
import { Input } from '../ui/Input';

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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📏</span>
        <h3 className="text-lg font-semibold">Spacing</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(tokens.spacing).map(([key, value]) => (
          <Input
            key={key}
            label={`${key.toUpperCase()}: ${value}`}
            type="text"
            value={value}
            onChange={(e) => handleSpacingChange(key, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

