'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';
import { exportConfigs, ExportFormat } from '../../lib/exporters';
import { Button } from '../ui/Button';
import { useToast } from '../ui/ToastProvider';

const formatDescriptions: Record<ExportFormat, string> = {
  json: 'Usa este JSON con Style Dictionary o cualquier herramienta de design tokens',
  css: 'Copia estas variables CSS en tu archivo de estilos globales',
  scss: 'Importa este archivo SCSS en tu proyecto para usar las variables',
  tailwind: 'Usa este snippet en tu tailwind.config.js',
  bootstrap: 'Aplica este override de tema Bootstrap en tu proyecto',
  jss: 'Usa este objeto JS para React inline styling con JSS',
  'css-in-js': 'Usa esto como base para tu ThemeProvider de styled-components o Emotion',
  'material-ui': 'Usa esto como base para tu createTheme de Material UI',
  'chakra-ui': 'Usa esto como base para tu extendTheme de Chakra UI',
  'react-native': 'Importa este archivo en tu proyecto React Native',
  figma: 'Importa este JSON en Figma Tokens plugin',
  'google-fonts': 'Copia este import CSS y el objeto Next.js font',
  typescript: 'Importa este archivo TypeScript con tipos completos',
};

export function ExportCenterV2() {
  const tokens = useThemeStore((state) => state.activeTokens);
  const [activeFormat, setActiveFormat] = useState<ExportFormat>('json');
  const { showToast } = useToast();

  const activeConfig = useMemo(() => exportConfigs[activeFormat], [activeFormat]);
  const content = useMemo(() => activeConfig.getContent(tokens), [activeConfig, tokens]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(content);
    showToast('Copiado al portapapeles', 'success');
  }, [content, showToast]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: activeConfig.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme.${activeConfig.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Archivo descargado', 'success');
  }, [content, activeConfig, showToast]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📦</span>
        <h3 className="text-lg font-semibold">Export Center</h3>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-4">
          {formatDescriptions[activeFormat]}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-muted/30 rounded-lg">
          {Object.entries(exportConfigs).map(([key, config]) => {
            const format = key as ExportFormat;
            const isActive = activeFormat === format;
            return (
              <button
                key={key}
                onClick={() => setActiveFormat(format)}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {config.name}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <Button
              variant="ghost"
              onClick={handleCopy}
              className="text-sm px-3 py-1.5"
            >
              📋 Copiar
            </Button>
            <Button
              variant="primary"
              onClick={handleDownload}
              className="text-sm px-3 py-1.5"
            >
              ⬇️ Descargar
            </Button>
          </div>
          
          <motion.pre
            key={activeFormat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-lg border border-border bg-background text-sm overflow-x-auto max-h-96 font-mono text-foreground"
          >
            <code>{content}</code>
          </motion.pre>
        </div>
      </div>
    </div>
  );
}

