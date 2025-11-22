'use client';

import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { Showcase } from '../components/landing/Showcase';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Frameworks } from '../components/landing/Frameworks';
import { Footer } from '../components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Showcase />
      <Frameworks />
      <Footer />
    </main>
  );
}

