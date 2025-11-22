'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';

const steps = [
  {
    number: '01',
    title: 'Define tu theme',
    description: 'Personaliza colores, tipografía, espaciados y más con nuestro editor visual en tiempo real.',
    icon: '🎨',
  },
  {
    number: '02',
    title: 'Míralo aplicado',
    description: 'Ve tus cambios reflejados instantáneamente en la landing y el preview del builder.',
    icon: '👁️',
  },
  {
    number: '03',
    title: 'Exporta tokens',
    description: 'Descarga tu theme en múltiples formatos: Tailwind, CSS, SCSS, Material UI, Chakra UI y más.',
    icon: '📦',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Cómo funciona</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tres pasos simples para crear y exportar tu sistema de diseño
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="p-6 rounded-xl border border-border bg-card/80 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="text-sm font-mono text-primary mb-2">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/builder">
            <Button variant="primary" className="text-lg px-8 py-4">
              Comenzar ahora
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

