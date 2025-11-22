'use client';

import { useState } from 'react';
import { DonationModal } from '../ui/DonationModal';
import { Button } from '../ui/Button';

export function Footer() {
  const [showDonationModal, setShowDonationModal] = useState(false);

  return (
    <>
      <footer className="py-12 px-6 border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-2">
                Esta herramienta es <span className="font-semibold text-foreground">100% gratuita</span>.
              </p>
              <p className="text-sm text-muted-foreground">
                Si querés ayudar a mantenerla online, podés colaborar:
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowDonationModal(true)}
              className="text-sm"
            >
              💙 Colaborar
            </Button>
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

