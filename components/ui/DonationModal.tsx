'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const donationUrl =
    process.env.NEXT_PUBLIC_MERCADO_PAGO_DONATION_URL ||
    'https://www.mercadopago.com.ar/ayuda/donaciones';

  const handleDonate = () => {
    if (!donationUrl.startsWith('http')) {
      console.error('Invalid Mercado Pago URL configuration');
      alert('Error al procesar el link de colaboración. Intentá nuevamente.');
      return;
    }
    window.open(donationUrl, '_blank', 'noopener,noreferrer');
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
              
              <div className="space-y-4 mb-6">
                <p className="text-foreground font-semibold">
                  Esta herramienta es 100% gratuita para siempre 🚀
                </p>
                <p className="text-muted-foreground">
                  Si querés colaborar para que siga creciendo, ¡gracias!
                </p>
                <p className="text-muted-foreground">
                  Tu aporte es opcional 💙
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <motion.button
                  onClick={handleDonate}
                  className="px-5 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-80 transition-all w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  💙 Colaborar vía Mercado Pago
                </motion.button>
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

