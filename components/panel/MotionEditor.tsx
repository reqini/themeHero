'use client';

import { useThemeStore } from '../../store/themeStore';
import { Input } from '../ui/Input';

export function MotionEditor() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const updateActiveTokens = useThemeStore((state) => state.updateActiveTokens);

  const handleMotionChange = (key: string, value: string) => {
    updateActiveTokens({
      motion: {
        ...tokens.motion,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">⚡</span>
        <h3 className="text-lg font-semibold">Motion</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(tokens.motion).map(([key, value]) => (
          <Input
            key={key}
            label={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
            type="text"
            value={value}
            onChange={(e) => handleMotionChange(key, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

