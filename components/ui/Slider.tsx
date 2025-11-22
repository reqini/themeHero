'use client';

interface SliderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: 'rem' | 'px' | 'em';
  preview?: boolean;
}

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 5,
  step = 0.125,
  unit = 'rem',
  preview = true,
}: SliderProps) {
  const numValue = parseFloat(value) || 0;
  const displayValue = numValue.toFixed(unit === 'rem' ? 3 : 0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(`${newValue}${unit}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onChange('0' + unit);
      return;
    }
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      onChange(`${num}${unit}`);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex items-center gap-2">
          {preview && (
            <div
              className="w-8 h-8 rounded border-2 border-primary/50 bg-primary/10 flex items-center justify-center transition-all"
              style={{
                borderRadius: unit === 'rem' ? `${Math.min(numValue * 0.25, 1)}rem` : `${Math.min(numValue * 0.5, 16)}px`,
                padding: unit === 'rem' ? `${Math.min(numValue * 0.25, 1)}rem` : `${Math.min(numValue * 0.5, 16)}px`,
              }}
            />
          )}
          <input
            type="number"
            value={displayValue}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className="w-16 px-2 py-1 text-sm rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer range-slider"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(numValue / max) * 100}%, var(--color-muted) ${(numValue / max) * 100}%, var(--color-muted) 100%)`,
          }}
        />
      </div>
      <style jsx global>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .range-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
