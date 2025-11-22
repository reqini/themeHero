'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DonationModal } from '../ui/DonationModal';

export function Footer() {
  const [showDonationModal, setShowDonationModal] = useState(false);

  return (
    <>
      <footer className="py-12 px-6 border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-2">
                ThemeHero es <span className="font-semibold text-foreground">100% gratuito</span>.
              </p>
              <p className="text-sm text-muted-foreground">
                Si querés colaborar para ayudar al desarrollo:
              </p>
            </div>
            <motion.button
              onClick={() => setShowDonationModal(true)}
              className="px-5 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-80 transition-all text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💙 Colaborar
            </motion.button>
          </div>
        </div>
      </footer>
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
    </>
  );
}

