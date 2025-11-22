import Link from 'next/link';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link href="/">
          <Button variant="primary">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}

