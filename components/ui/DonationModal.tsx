'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const mpAlias = 'lucianorecchini';
  const donationUrl = `https://mpago.la/${mpAlias}`;

  const handleDonate = () => {
    window.open(donationUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Aporta para que ThemeHero siga creciendo</h2>
              
              <p className="text-muted-foreground mb-6">
                ThemeHero es una herramienta 100% gratuita y sin restricciones. Tu colaboración es opcional y ayuda a mantener la herramienta libre y disponible para todos.
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  variant="primary"
                  onClick={handleDonate}
                  className="w-full"
                >
                  💙 Colaborar vía Mercado Pago
                </Button>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="w-full"
                >
                  Cerrar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

