'use client';

import { memo } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export const PreviewArea = memo(function PreviewArea() {
  return (
    <div className="h-full overflow-y-auto p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
          <h2 className="text-3xl font-semibold mb-2">Heading 2</h2>
          <h3 className="text-2xl font-semibold mb-2">Heading 3</h3>
          <p className="text-base text-muted-foreground mb-4">
            Este es un párrafo de ejemplo que muestra cómo se ve la tipografía con los tokens actuales.
            Los cambios se aplican en tiempo real mientras editas los valores.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-xl font-semibold mb-2">Card Title</h3>
            <p className="text-muted-foreground mb-4">
              Esta tarjeta muestra cómo se ven los componentes con los tokens actuales.
            </p>
            <Button variant="primary">Action</Button>
          </Card>

          <Card variant="pricing">
            <h3 className="text-2xl font-bold mb-2">Pricing</h3>
            <div className="text-3xl font-bold mb-4">
              $29<span className="text-lg text-muted-foreground">/mes</span>
            </div>
            <ul className="space-y-2 mb-4 text-sm">
              <li>✓ Feature 1</li>
              <li>✓ Feature 2</li>
              <li>✓ Feature 3</li>
            </ul>
            <Button variant="primary" className="w-full">Get Started</Button>
          </Card>
        </div>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
          <div className="space-y-4">
            <Input label="Email" type="email" placeholder="tu@email.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Select label="Plan">
              <option>Básico</option>
              <option>Pro</option>
              <option>Enterprise</option>
            </Select>
            <Button variant="primary" className="w-full">Submit</Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-primary text-white text-center">
            Primary
          </div>
          <div className="p-4 rounded-lg bg-secondary text-white text-center">
            Secondary
          </div>
          <div className="p-4 rounded-lg bg-accent text-white text-center">
            Accent
          </div>
          <div className="p-4 rounded-lg bg-muted text-center">
            Muted
          </div>
        </div>
      </div>
    </div>
  );
});

