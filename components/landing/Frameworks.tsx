'use client';

import { motion } from 'framer-motion';

const frameworks = [
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'CSS Variables', icon: '🎨' },
  { name: 'SCSS', icon: '💅' },
  { name: 'Bootstrap', icon: '🅱️' },
  { name: 'Material UI', icon: '🎯' },
  { name: 'Chakra UI', icon: '✨' },
  { name: 'React Native', icon: '📱' },
  { name: 'Styled Components', icon: '💄' },
  { name: 'Figma Tokens', icon: '🎨' },
];

export function Frameworks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frameworks soportados</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exporta tu theme a los frameworks y herramientas más populares
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6">
          {frameworks.map((framework, index) => (
            <motion.div
              key={framework.name}
              className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50 hover:border-primary/50 transition-all cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">{framework.icon}</div>
              <div className="text-xs text-center text-muted-foreground">{framework.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

