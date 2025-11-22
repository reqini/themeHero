'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';
import { exportConfigs, ExportFormat } from '../../lib/exporters';
import { Button } from '../ui/Button';

const frameworkLogos: Record<string, string> = {
  json: '📄',
  css: '🎨',
  scss: '💅',
  tailwind: '🌊',
  bootstrap: '🅱️',
  jss: '⚛️',
  'css-in-js': '💄',
  'material-ui': '🎯',
  'chakra-ui': '✨',
  'react-native': '📱',
  figma: '🎨',
  'google-fonts': '🔤',
  typescript: '📘',
};

export function ExportCenter() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const [selectedFormats, setSelectedFormats] = useState<Set<ExportFormat>>(new Set(['json', 'css']));
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');

  const toggleFormat = (format: ExportFormat) => {
    const newSet = new Set(selectedFormats);
    if (newSet.has(format)) {
      newSet.delete(format);
    } else {
      newSet.add(format);
    }
    setSelectedFormats(newSet);
  };

  const handleCopy = async (format: ExportFormat) => {
    const config = exportConfigs[format];
    const content = config.getContent(tokens);
    await navigator.clipboard.writeText(content);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (format: ExportFormat) => {
    const config = exportConfigs[format];
    const content = config.getContent(tokens);
    const blob = new Blob([content], { type: config.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme.${config.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      selectedFormats.forEach(format => {
        const config = exportConfigs[format];
        const content = config.getContent(tokens);
        zip.file(`theme.${config.extension}`, content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'theme-export.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error al generar el archivo ZIP. Descarga los formatos individualmente.');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Export Center</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              activeTab === 'single'
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setActiveTab('multi')}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              activeTab === 'multi'
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Múltiple
          </button>
        </div>
      </div>

      {activeTab === 'multi' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Selecciona los formatos que deseas exportar:
            </p>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 border border-border rounded-lg">
              {Object.entries(exportConfigs).map(([key, config]) => {
                const format = key as ExportFormat;
                const isSelected = selectedFormats.has(format);
                return (
                  <motion.button
                    key={key}
                    onClick={() => toggleFormat(format)}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{frameworkLogos[format] || '📄'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{config.name}</div>
                        <div className="text-xs text-muted-foreground">.{config.extension}</div>
                      </div>
                      {isSelected && (
                        <span className="text-primary">✓</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <Button
            variant="primary"
            onClick={handleDownloadAll}
            className="w-full"
            disabled={selectedFormats.size === 0}
          >
            Descargar {selectedFormats.size} formato{selectedFormats.size !== 1 ? 's' : ''} (.zip)
          </Button>
        </motion.div>
      )}

      {activeTab === 'single' && (
        <div className="space-y-3">
          {Object.entries(exportConfigs).map(([key, config]) => {
            const format = key as ExportFormat;
            return (
              <motion.div
                key={key}
                className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Object.keys(exportConfigs).indexOf(key) * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl">{frameworkLogos[format] || '📄'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{config.name}</div>
                      <div className="text-xs text-muted-foreground">.{config.extension}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleCopy(format)}
                      className="px-3 py-1.5 text-sm"
                      title="Copiar al portapapeles"
                    >
                      {copied === format ? '✓' : '📋'}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleDownload(format)}
                      className="px-4 py-1.5 text-sm"
                    >
                      Descargar
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

