import { ThemeTokens } from '../store/themeStore';
import { exportConfigs } from '../lib/exporters';

console.log('🧪 Testing Edge Cases...\n');

const edgeCaseTokens: ThemeTokens = {
  typography: {
    fontFamily: {
      sans: "Font Name With Spaces, 'Another Font', system-ui",
      mono: "Mono Font, monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  colors: {
    primary: '#FF0000',
    secondary: '#00FF00',
    accent: '#0000FF',
    background: '#000000',
    foreground: '#FFFFFF',
    muted: '#333333',
    'muted-foreground': '#CCCCCC',
    border: '#666666',
    card: '#111111',
    'card-foreground': '#EEEEEE',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
    '2xl': '8rem',
  },
  radius: {
    sm: '0.125rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '2rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.2)',
    lg: '0 10px 15px rgba(0,0,0,0.3)',
    xl: '0 20px 25px rgba(0,0,0,0.4)',
  },
  motion: {
    fast: '100ms',
    normal: '200ms',
    slow: '400ms',
  },
};

let passed = 0;
let failed = 0;

console.log('Testing with edge case tokens (fuentes con espacios, colores extremos)...\n');

Object.entries(exportConfigs).forEach(([format, config]) => {
  try {
    const content = config.getContent(edgeCaseTokens);
    
    if (!content || content.trim().length === 0) {
      throw new Error('Contenido vacío');
    }
    
    if (format === 'json' || format === 'figma') {
      JSON.parse(content);
    }
    
    if (content.includes('undefined') || content.includes('NaN') || content.includes('null')) {
      throw new Error('Contiene valores inválidos');
    }
    
    console.log(`✅ ${config.name}: OK con edge cases`);
    passed++;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${config.name}: ERROR - ${errorMsg}`);
    failed++;
  }
});

console.log(`\n📊 Edge Cases:`);
console.log(`✅ Pasados: ${passed}`);
console.log(`❌ Fallidos: ${failed}`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log(`\n🎉 Todos los exportadores manejan edge cases correctamente!`);
  process.exit(0);
}

