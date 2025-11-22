import { defaultTokens } from '../store/themeStore';
import { exportConfigs } from '../lib/exporters';

console.log('📋 REPORTE DE QA - ThemeHero Exportadores\n');
console.log('=' .repeat(60));

const report: Array<{
  format: string;
  name: string;
  extension: string;
  size: number;
  valid: boolean;
  issues: string[];
}> = [];

Object.entries(exportConfigs).forEach(([format, config]) => {
  const issues: string[] = [];
  let valid = true;
  
  try {
    const content = config.getContent(defaultTokens);
    
    if (!content || content.trim().length === 0) {
      issues.push('Contenido vacío');
      valid = false;
    }
    
    if (format === 'json' || format === 'figma') {
      try {
        JSON.parse(content);
      } catch {
        issues.push('JSON inválido');
        valid = false;
      }
    }
    
    if (content.includes('undefined')) {
      issues.push('Contiene undefined');
      valid = false;
    }
    
    if (content.includes('NaN')) {
      issues.push('Contiene NaN');
      valid = false;
    }
    
    if (format === 'tailwind' && !content.includes('module.exports')) {
      issues.push('Formato Tailwind inválido');
      valid = false;
    }
    
    if (format === 'material-ui' && !content.includes('createTheme')) {
      issues.push('Formato Material UI inválido');
      valid = false;
    }
    
    if (format === 'chakra-ui' && !content.includes('extendTheme')) {
      issues.push('Formato Chakra UI inválido');
      valid = false;
    }
    
    if (format === 'react-native' && !content.includes('StyleSheet')) {
      issues.push('Formato React Native inválido');
      valid = false;
    }
    
    report.push({
      format,
      name: config.name,
      extension: config.extension,
      size: content.length,
      valid,
      issues,
    });
  } catch (error) {
    report.push({
      format,
      name: config.name,
      extension: config.extension,
      size: 0,
      valid: false,
      issues: [error instanceof Error ? error.message : String(error)],
    });
  }
});

console.log('\n📊 RESULTADOS POR FORMATO:\n');

report.forEach(({ format, name, extension, size, valid, issues }) => {
  const status = valid ? '✅' : '❌';
  console.log(`${status} ${name} (.${extension})`);
  console.log(`   Formato: ${format}`);
  console.log(`   Tamaño: ${size} caracteres`);
  if (issues.length > 0) {
    console.log(`   Problemas: ${issues.join(', ')}`);
  }
  console.log('');
});

const allValid = report.every(r => r.valid);
const totalFormats = report.length;
const validFormats = report.filter(r => r.valid).length;

console.log('=' .repeat(60));
console.log(`\n📈 RESUMEN FINAL:\n`);
console.log(`Total de formatos: ${totalFormats}`);
console.log(`✅ Válidos: ${validFormats}`);
console.log(`❌ Con problemas: ${totalFormats - validFormats}`);

if (allValid) {
  console.log(`\n🎉 TODOS LOS EXPORTADORES ESTÁN FUNCIONANDO PERFECTAMENTE!`);
  console.log(`\n✅ Listo para producción`);
} else {
  console.log(`\n⚠️  Se encontraron problemas que requieren atención`);
  process.exit(1);
}

console.log('\n' + '=' .repeat(60));

