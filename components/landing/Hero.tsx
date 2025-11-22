'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real-time Theme & Design Token Builder
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Crea, personaliza y exporta sistemas de diseño profesionales con actualización en tiempo real.
            Ve tus cambios aplicados instantáneamente en toda la interfaz.
          </motion.p>

          <motion.div
            className="mb-12 p-4 rounded-xl bg-card border border-primary/20 backdrop-blur-sm max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-semibold text-foreground">✨ Live Preview:</span> Esta misma landing está usando el theme que defines en el builder.
              Los colores, tipografía y espaciados que ves aquí se actualizan en tiempo real mientras editas.
            </p>
          </motion.div>

          <motion.div
            className="mb-8 p-4 rounded-lg bg-muted/30 border border-border/50 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-sm text-muted-foreground text-center">
              ThemeHero es una herramienta <span className="font-semibold text-foreground">100% gratuita y abierta</span>.
              Creada con amor para la comunidad. Si te sirve y querés colaborar, ¡gracias! 💙
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/builder">
              <Button variant="primary" className="text-lg px-8 py-4">
                Launch Theme Builder
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="text-lg px-8 py-4"
              onClick={() => {
                const demoSection = document.getElementById('demo-section');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Ver Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

