import { defaultTokens } from '../store/themeStore';
import { exportConfigs } from '../lib/exporters';

console.log('🔍 Validación Intensiva de Exportadores...\n');

const validations: Record<string, (content: string) => boolean> = {
  json: (content) => {
    try {
      const parsed = JSON.parse(content);
      return typeof parsed === 'object' && parsed !== null && 'colors' in parsed;
    } catch {
      return false;
    }
  },
  css: (content) => {
    return content.includes(':root') && 
           content.includes('--color-primary') && 
           content.endsWith('}');
  },
  typescript: (content) => {
    return content.includes('export const theme') && 
           content.includes('as const') &&
           !content.includes('undefined');
  },
  scss: (content) => {
    return content.includes('$color-primary') && 
           content.split('\n').some(line => line.trim().startsWith('$'));
  },
  tailwind: (content) => {
    return content.includes('module.exports') && 
           content.includes('theme:') &&
           content.includes('extend:');
  },
  bootstrap: (content) => {
    return content.includes(':root') && 
           content.includes('--bs-primary') &&
           !content.match(/--bs-primary.*--bs-primary/g);
  },
  jss: (content) => {
    return content.includes('export const theme') && 
           content.includes('colors:') &&
           !content.includes('undefined');
  },
  'css-in-js': (content) => {
    return content.includes('export const theme') && 
           content.includes('styled-components') &&
           !content.includes('undefined');
  },
  'material-ui': (content) => {
    return content.includes('createTheme') && 
           content.includes('palette:') &&
           !content.includes('undefined') &&
           !content.includes('NaN');
  },
  'chakra-ui': (content) => {
    return content.includes('extendTheme') && 
           content.includes('colors:') &&
           !content.includes('undefined');
  },
  'react-native': (content) => {
    return content.includes('StyleSheet') && 
           content.includes('export const theme') &&
           !content.includes('NaN') &&
           !content.includes('undefined');
  },
  figma: (content) => {
    try {
      const parsed = JSON.parse(content);
      return parsed.$schema && parsed.tokens && typeof parsed.tokens === 'object';
    } catch {
      return false;
    }
  },
  'google-fonts': (content) => {
    return content.length > 0 && 
           (content.includes('@import') || content.includes('// No Google Fonts'));
  },
};

let allPassed = true;
const issues: string[] = [];

Object.entries(exportConfigs).forEach(([format, config]) => {
  try {
    const content = config.getContent(defaultTokens);
    
    if (!content || content.trim().length === 0) {
      console.error(`❌ ${config.name}: Contenido vacío`);
      allPassed = false;
      issues.push(`${config.name}: Contenido vacío`);
      return;
    }
    
    const validator = validations[format];
    if (validator && !validator(content)) {
      console.error(`❌ ${config.name}: Validación falló`);
      allPassed = false;
      issues.push(`${config.name}: Validación de formato falló`);
      return;
    }
    
    if (format === 'json' || format === 'figma') {
      try {
        JSON.parse(content);
      } catch (e) {
        console.error(`❌ ${config.name}: JSON inválido`);
        allPassed = false;
        issues.push(`${config.name}: JSON inválido`);
        return;
      }
    }
    
    console.log(`✅ ${config.name}: Validado (${content.length} chars, extensión: .${config.extension})`);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${config.name}: ERROR - ${errorMsg}`);
    allPassed = false;
    issues.push(`${config.name}: ${errorMsg}`);
  }
});

console.log(`\n📊 Resumen:`);
if (allPassed) {
  console.log(`✅ Todos los exportadores pasaron la validación intensiva!`);
  console.log(`\n🎯 Formatos validados:`);
  Object.values(exportConfigs).forEach(config => {
    console.log(`   • ${config.name} (.${config.extension})`);
  });
} else {
  console.log(`❌ Se encontraron ${issues.length} problema(s):`);
  issues.forEach(issue => console.log(`   - ${issue}`));
  process.exit(1);
}

