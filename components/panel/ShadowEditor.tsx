'use client';

import { useThemeStore } from '../../store/themeStore';
import { Input } from '../ui/Input';

export function ShadowEditor() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const updateActiveTokens = useThemeStore((state) => state.updateActiveTokens);

  const handleShadowChange = (key: string, value: string) => {
    updateActiveTokens({
      shadows: {
        ...tokens.shadows,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🌑</span>
        <h3 className="text-lg font-semibold">Shadows</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(tokens.shadows).map(([key, value]) => (
          <Input
            key={key}
            label={`${key.toUpperCase()}`}
            type="text"
            value={value}
            onChange={(e) => handleShadowChange(key, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

