'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { DonationModal } from '../ui/DonationModal';

export function Navbar() {
  const [showDonationModal, setShowDonationModal] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
ThemeHero
          </motion.div>
          <div className="flex items-center gap-4">
            <Link href="/builder">
              <Button variant="ghost">Builder</Button>
            </Link>
            <Link href="/builder">
              <Button variant="primary">Launch Theme Builder</Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => setShowDonationModal(true)}
              className="text-sm"
            >
              💙 Colaborar
            </Button>
          </div>
        </div>
      </motion.nav>
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
    </>
  );
}

