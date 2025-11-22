'use client';

import { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { tokensToJson } from '../../lib/tokensToJson';
import { tokensToCss } from '../../lib/tokensToCss';
import { tokensToTs } from '../../lib/tokensToTs';
import { Button } from '../ui/Button';

export function ExportPanel() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const [copied, setCopied] = useState<string | null>(null);

  const handleExport = async (format: 'json' | 'css' | 'ts') => {
    let content = '';
    let filename = '';

    switch (format) {
      case 'json':
        content = tokensToJson(tokens);
        filename = 'theme.json';
        break;
      case 'css':
        content = tokensToCss(tokens);
        filename = 'theme.css';
        break;
      case 'ts':
        content = tokensToTs(tokens);
        filename = 'theme.ts';
        break;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async (format: 'json' | 'css' | 'ts') => {
    let content = '';

    switch (format) {
      case 'json':
        content = tokensToJson(tokens);
        break;
      case 'css':
        content = tokensToCss(tokens);
        break;
      case 'ts':
        content = tokensToTs(tokens);
        break;
    }

    await navigator.clipboard.writeText(content);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Export</h3>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => handleExport('json')}
            className="flex-1"
          >
            Export JSON
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleCopy('json')}
            className="px-4"
          >
            {copied === 'json' ? '✓' : '📋'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => handleExport('css')}
            className="flex-1"
          >
            Export CSS
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleCopy('css')}
            className="px-4"
          >
            {copied === 'css' ? '✓' : '📋'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => handleExport('ts')}
            className="flex-1"
          >
            Export TS
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleCopy('ts')}
            className="px-4"
          >
            {copied === 'ts' ? '✓' : '📋'}
          </Button>
        </div>
      </div>
    </div>
  );
}

