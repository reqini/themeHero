'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export function Showcase() {
  return (
    <section id="demo-section" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Componentes que se adaptan en tiempo real
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Todos los componentes reaccionan instantáneamente a los cambios en tus tokens de diseño
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="pricing">
              <h3 className="text-2xl font-bold mb-2">Pricing Card</h3>
              <p className="text-muted-foreground mb-4">
                Ejemplo de tarjeta de precios con estilos dinámicos
              </p>
              <div className="text-3xl font-bold mb-4">$29<span className="text-lg text-muted-foreground">/mes</span></div>
              <Button variant="primary" className="w-full">Get Started</Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <h3 className="text-xl font-semibold mb-3">Info Card</h3>
              <p className="text-muted-foreground mb-4">
                Las tarjetas se adaptan automáticamente a tus colores y espaciados personalizados.
              </p>
              <Button variant="ghost">Learn More</Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <h3 className="text-xl font-semibold mb-4">Form Elements</h3>
              <div className="space-y-4">
                <Input label="Email" type="email" placeholder="tu@email.com" />
                <Select label="Plan">
                  <option>Básico</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </Select>
                <Button variant="primary" className="w-full">Submit</Button>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">✨ Usando tu theme actual</span>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Tipografía, colores, espaciados, bordes y sombras se actualizan en tiempo real
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-2xl font-bold mb-8">
            <span className="text-primary">Primary</span>
            <span className="text-secondary">Secondary</span>
            <span className="text-accent">Accent</span>
          </div>
          <motion.div
            className="p-6 rounded-xl bg-card border border-border max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-2">
              💡 <span className="font-semibold text-foreground">Tip:</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Cambia el theme en el builder y vuelve acá para ver la demo aplicada. Todos los componentes se actualizan automáticamente.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

