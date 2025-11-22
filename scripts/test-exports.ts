import { defaultTokens } from '../store/themeStore';
import { tokensToJson } from '../lib/tokensToJson';
import { tokensToCss } from '../lib/tokensToCss';
import { tokensToTs } from '../lib/tokensToTs';
import { tokensToScss } from '../lib/exporters/tokensToScss';
import { tokensToTailwind } from '../lib/exporters/tokensToTailwind';
import { tokensToBootstrap } from '../lib/exporters/tokensToBootstrap';
import { tokensToJss } from '../lib/exporters/tokensToJss';
import { tokensToCssInJs } from '../lib/exporters/tokensToCssInJs';
import { tokensToMaterialUI } from '../lib/exporters/tokensToMaterialUI';
import { tokensToChakraUI } from '../lib/exporters/tokensToChakraUI';
import { tokensToReactNative } from '../lib/exporters/tokensToReactNative';
import { tokensToFigma } from '../lib/exporters/tokensToFigma';
import { tokensToGoogleFonts } from '../lib/exporters/tokensToGoogleFonts';

const tests = [
  { name: 'JSON', fn: tokensToJson, validate: (s: string) => JSON.parse(s) },
  { name: 'CSS', fn: tokensToCss, validate: (s: string) => s.includes(':root') && s.includes('--color-primary') },
  { name: 'TypeScript', fn: tokensToTs, validate: (s: string) => s.includes('export const theme') },
  { name: 'SCSS', fn: tokensToScss, validate: (s: string) => s.includes('$color-primary') },
  { name: 'Tailwind', fn: tokensToTailwind, validate: (s: string) => s.includes('module.exports') && s.includes('theme:') },
  { name: 'Bootstrap', fn: tokensToBootstrap, validate: (s: string) => s.includes(':root') && s.includes('--bs-primary') },
  { name: 'JSS', fn: tokensToJss, validate: (s: string) => s.includes('export const theme') && s.includes('colors:') },
  { name: 'CSS-in-JS', fn: tokensToCssInJs, validate: (s: string) => s.includes('export const theme') && s.includes('styled-components') },
  { name: 'Material UI', fn: tokensToMaterialUI, validate: (s: string) => s.includes('createTheme') && s.includes('palette:') },
  { name: 'Chakra UI', fn: tokensToChakraUI, validate: (s: string) => s.includes('extendTheme') && s.includes('colors:') },
  { name: 'React Native', fn: tokensToReactNative, validate: (s: string) => s.includes('StyleSheet') && s.includes('export const theme') },
  { name: 'Figma', fn: tokensToFigma, validate: (s: string) => JSON.parse(s) && JSON.parse(s).$schema },
  { name: 'Google Fonts', fn: tokensToGoogleFonts, validate: (s: string) => s.length > 0 },
];

console.log('🧪 Iniciando QA de Exportadores...\n');

let passed = 0;
let failed = 0;
const errors: string[] = [];

tests.forEach(({ name, fn, validate }) => {
  try {
    const result = fn(defaultTokens);
    
    if (!result || result.trim().length === 0) {
      throw new Error('Resultado vacío');
    }
    
    if (validate(result)) {
      console.log(`✅ ${name}: OK (${result.length} caracteres)`);
      passed++;
    } else {
      throw new Error('Validación falló');
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${name}: ERROR - ${errorMsg}`);
    failed++;
    errors.push(`${name}: ${errorMsg}`);
  }
});

console.log(`\n📊 Resultados:`);
console.log(`✅ Pasados: ${passed}`);
console.log(`❌ Fallidos: ${failed}`);

if (errors.length > 0) {
  console.log(`\n🔍 Errores encontrados:`);
  errors.forEach(e => console.log(`  - ${e}`));
  process.exit(1);
} else {
  console.log(`\n🎉 Todos los exportadores funcionan correctamente!`);
  process.exit(0);
}

