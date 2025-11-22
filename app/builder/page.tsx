'use client';

import { ControlPanel } from '../../components/panel/ControlPanel';
import { PreviewArea } from '../../components/preview/PreviewArea';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';

export default function BuilderPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border/50 bg-card/70 backdrop-blur-xl">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
ThemeHero
            </Link>
            <span className="text-sm text-muted-foreground">Theme Builder</span>
          </div>
          <Link href="/">
            <Button variant="ghost">Back to Landing</Button>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-96 flex-shrink-0">
          <ControlPanel />
        </div>
        <div className="flex-1">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
}

