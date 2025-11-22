import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { ToastProvider } from '../components/ui/ToastProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ThemeHero — Real-time Theme & Token Builder',
  description: 'Crea, personaliza y exporta sistemas de diseño profesionales con actualización en tiempo real. Exporta a Tailwind, CSS, SCSS, Material UI, Chakra UI y más.',
  keywords: 'design tokens, theme builder, design system, tailwind, css variables, design tools',
  openGraph: {
    title: 'ThemeHero — Real-time Theme & Token Builder',
    description: 'Crea, personaliza y exporta sistemas de diseño profesionales con actualización en tiempo real',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

