'use client';

import { useThemeStore } from '../../store/themeStore';
import { Input } from '../ui/Input';

export function ColorEditor() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const updateActiveTokens = useThemeStore((state) => state.updateActiveTokens);

  const handleColorChange = (key: string, value: string) => {
    updateActiveTokens({
      colors: {
        ...tokens.colors,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎨</span>
        <h3 className="text-lg font-semibold">Colors</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(tokens.colors).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3">
            <input
              type="color"
              value={value}
              onChange={(e) => handleColorChange(key, e.target.value)}
              className="w-12 h-12 rounded-md border border-border cursor-pointer"
            />
            <div className="flex-1">
              <Input
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')}
                type="text"
                value={value}
                onChange={(e) => handleColorChange(key, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

