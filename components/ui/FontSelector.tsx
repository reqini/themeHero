'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { curatedFonts, loadGoogleFont, GoogleFont } from '../../lib/googleFonts';

interface FontSelectorProps {
  value: string;
  onChange: (fontName: string) => void;
  label?: string;
}

export function FontSelector({ value, onChange, label = 'Font Family' }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentFont = useMemo(() => {
    const fontName = value.split(',')[0].trim().replace(/['"]/g, '');
    return curatedFonts.find(f => f.name === fontName) || curatedFonts[0];
  }, [value]);

  const filteredFonts = useMemo(() => {
    if (!searchQuery) return curatedFonts;
    const query = searchQuery.toLowerCase();
    return curatedFonts.filter(font => 
      font.name.toLowerCase().includes(query) ||
      font.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const groupedFonts = useMemo(() => {
    const groups: Record<string, GoogleFont[]> = {
      'sans-serif': [],
      'serif': [],
      'display': [],
    };
    
    filteredFonts.forEach(font => {
      if (groups[font.category]) {
        groups[font.category].push(font);
      }
    });
    
    return groups;
  }, [filteredFonts]);

  const handleSelectFont = useCallback((font: GoogleFont) => {
    loadGoogleFont(font.name, font.weights);
    onChange(`${font.name}, system-ui, sans-serif`);
    setIsOpen(false);
    setSearchQuery('');
  }, [onChange]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-normal flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span style={{ fontFamily: currentFont.name }}>{currentFont.name}</span>
            <span className="text-xs text-muted-foreground">({currentFont.category})</span>
          </span>
          <span className="text-muted-foreground">{isOpen ? '▲' : '▼'}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-card border border-border rounded-md shadow-xl max-h-96 overflow-hidden"
            >
              <div className="p-2 border-b border-border">
                <input
                  type="text"
                  placeholder="Buscar fuente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>
              
              <div className="overflow-y-auto max-h-80">
                {Object.entries(groupedFonts).map(([category, fonts]) => {
                  if (fonts.length === 0) return null;
                  
                  return (
                    <div key={category} className="p-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-2">
                        {category}
                      </div>
                      {fonts.map((font) => (
                        <button
                          key={font.name}
                          type="button"
                          onClick={() => handleSelectFont(font)}
                          className={`w-full text-left px-3 py-2 rounded-md mb-1 transition-all ${
                            currentFont.name === font.name
                              ? 'bg-primary/20 border border-primary/50'
                              : 'hover:bg-muted border border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ fontFamily: font.name }} className="font-medium">
                              {font.name}
                            </span>
                            {currentFont.name === font.name && (
                              <span className="text-primary text-sm">✓</span>
                            )}
                          </div>
                          <div
                            style={{ fontFamily: font.name }}
                            className="text-xs text-muted-foreground"
                          >
                            The quick brown fox jumps over the lazy dog
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

