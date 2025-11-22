'use client';

import { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { ColorEditor } from './ColorEditor';
import { TypographyEditor } from './TypographyEditor';
import { SpacingEditor } from './SpacingEditor';
import { RadiusEditor } from './RadiusEditor';
import { ShadowEditor } from './ShadowEditor';
import { MotionEditor } from './MotionEditor';
import { ExportCenterV2 } from './ExportCenterV2';
import { ThemeManager } from './ThemeManager';
import { Button } from '../ui/Button';

type Tab = 'themes' | 'colors' | 'typography' | 'spacing' | 'radius' | 'shadows' | 'motion' | 'export';

export function ControlPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('themes');
  const resetToDefault = useThemeStore((state) => state.resetToDefault);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'themes', label: 'Themes' },
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius' },
    { id: 'shadows', label: 'Shadows' },
    { id: 'motion', label: 'Motion' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Theme Builder</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-sm rounded-md transition-all duration-normal ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'themes' && <ThemeManager />}
        {activeTab === 'colors' && <ColorEditor />}
        {activeTab === 'typography' && <TypographyEditor />}
        {activeTab === 'spacing' && <SpacingEditor />}
        {activeTab === 'radius' && <RadiusEditor />}
        {activeTab === 'shadows' && <ShadowEditor />}
        {activeTab === 'motion' && <MotionEditor />}
        {activeTab === 'export' && <ExportCenterV2 />}
      </div>
    </div>
  );
}

