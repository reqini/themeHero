export interface GoogleFont {
  name: string;
  category: 'sans-serif' | 'serif' | 'display' | 'mono';
  weights: number[];
}

export const curatedFonts: GoogleFont[] = [
  { name: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Roboto', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Poppins', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Montserrat', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Space Grotesk', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Lato', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Source Sans 3', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Open Sans', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Nunito', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Raleway', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Merriweather', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Bebas Neue', category: 'display', weights: [400] },
  { name: 'Oswald', category: 'display', weights: [400, 500, 600, 700] },
];

export function getGoogleFontsUrl(fontName: string, weights: number[]): string {
  const fontFamily = fontName.replace(/\s+/g, '+');
  const weightsParam = weights.join(';');
  return `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weightsParam}&display=swap`;
}

export function loadGoogleFont(fontName: string, weights: number[]): void {
  if (typeof window === 'undefined') return;
  
  const fontId = `google-font-${fontName.toLowerCase().replace(/\s+/g, '-')}`;
  let existingLink = document.getElementById(fontId) as HTMLLinkElement;
  
  if (existingLink) {
    // Update existing link if font changed
    existingLink.href = getGoogleFontsUrl(fontName, weights);
  } else {
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = getGoogleFontsUrl(fontName, weights);
    document.head.appendChild(link);
  }
  
  // Update CSS variable immediately for real-time sync
  const root = document.documentElement;
  root.style.setProperty('--font-family-sans', `"${fontName}", system-ui, sans-serif`);
  
  // Also update body font-family for immediate effect
  document.body.style.fontFamily = `"${fontName}", system-ui, sans-serif`;
}

