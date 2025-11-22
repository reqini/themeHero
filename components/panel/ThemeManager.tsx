'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { createShareUrl } from '../../lib/themeSharing';
import { useToast } from '../ui/ToastProvider';

export function ThemeManager() {
  const themes = useThemeStore((state) => state.themes);
  const activeThemeId = useThemeStore((state) => state.activeThemeId);
  const setActiveTheme = useThemeStore((state) => state.setActiveTheme);
  const saveCurrentAsNew = useThemeStore((state) => state.saveCurrentAsNew);
  const renameTheme = useThemeStore((state) => state.renameTheme);
  const duplicateTheme = useThemeStore((state) => state.duplicateTheme);
  const deleteTheme = useThemeStore((state) => state.deleteTheme);
  const resetToDefault = useThemeStore((state) => state.resetToDefault);
  const activeTokens = useThemeStore((state) => state.activeTokens);
  const { showToast } = useToast();

  const [showNewModal, setShowNewModal] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSaveNew = () => {
    if (newThemeName.trim()) {
      saveCurrentAsNew(newThemeName.trim());
      setNewThemeName('');
      setShowNewModal(false);
      showToast('Theme guardado exitosamente', 'success');
    }
  };

  const handleStartRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveRename = (id: string) => {
    if (editingName.trim()) {
      renameTheme(id, editingName.trim());
      setEditingId(null);
      setEditingName('');
      showToast('Theme renombrado', 'success');
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateTheme(id);
    showToast('Theme duplicado', 'success');
  };

  const handleDelete = (id: string) => {
    deleteTheme(id);
    showToast('Theme eliminado', 'info');
  };

  const handleReset = () => {
    resetToDefault();
    showToast('Theme reseteado a valores por defecto', 'info');
  };

  const handleShare = async () => {
    const url = createShareUrl(activeTokens);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    showToast('Link copiado al portapapeles', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎭</span>
          <h3 className="text-lg font-semibold">Themes</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setShowNewModal(true)}
            className="text-sm px-3 py-1.5"
          >
            + Nuevo
          </Button>
          <Button
            variant="ghost"
            onClick={handleShare}
            className="text-sm px-3 py-1.5"
          >
            {copied ? '✓ Copiado' : '🔗 Compartir'}
          </Button>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            className={`p-3 rounded-lg border transition-all duration-normal ${
              activeThemeId === theme.id
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card hover:border-primary/50'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {editingId === theme.id ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveRename(theme.id);
                    if (e.key === 'Escape') {
                      setEditingId(null);
                      setEditingName('');
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={() => handleSaveRename(theme.id)}
                  className="text-primary hover:opacity-80 text-sm"
                >
                  ✓
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingName('');
                  }}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{theme.name}</span>
                    {activeThemeId === theme.id && (
                      <span className="text-xs text-primary font-medium">Activo</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(theme.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => setActiveTheme(theme.id)}
                    className="p-1.5 hover:bg-muted rounded text-sm"
                    title="Activar"
                  >
                    ▶
                  </button>
                  <button
                    onClick={() => handleDuplicate(theme.id)}
                    className="p-1.5 hover:bg-muted rounded text-sm"
                    title="Duplicar"
                  >
                    📋
                  </button>
                  <button
                    onClick={() => handleStartRename(theme.id, theme.name)}
                    className="p-1.5 hover:bg-muted rounded text-sm"
                    title="Renombrar"
                  >
                    ✏️
                  </button>
                  {themes.length > 1 && (
                    <button
                      onClick={() => handleDelete(theme.id)}
                      className="p-1.5 hover:bg-muted rounded text-sm text-red-400"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Button
        variant="ghost"
        onClick={handleReset}
        className="w-full text-sm"
      >
        Reset a Default
      </Button>

      <AnimatePresence>
        {showNewModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewModal(false)}
          >
            <motion.div
              className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Guardar Theme</h3>
              <Input
                label="Nombre del theme"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                placeholder="Mi Theme Personalizado"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveNew();
                }}
                autoFocus
              />
              <div className="flex gap-2 mt-4">
                <Button variant="primary" onClick={handleSaveNew} className="flex-1">
                  Guardar
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowNewModal(false);
                    setNewThemeName('');
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

