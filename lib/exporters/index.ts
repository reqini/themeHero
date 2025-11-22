export { tokensToJson } from '../tokensToJson';
export { tokensToCss } from '../tokensToCss';
export { tokensToTs } from '../tokensToTs';
export { tokensToScss } from './tokensToScss';
export { tokensToTailwind } from './tokensToTailwind';
export { tokensToBootstrap } from './tokensToBootstrap';
export { tokensToJss } from './tokensToJss';
export { tokensToCssInJs } from './tokensToCssInJs';
export { tokensToMaterialUI } from './tokensToMaterialUI';
export { tokensToChakraUI } from './tokensToChakraUI';
export { tokensToReactNative } from './tokensToReactNative';
export { tokensToFigma } from './tokensToFigma';
export { tokensToGoogleFonts } from './tokensToGoogleFonts';

export type ExportFormat = 
  | 'json'
  | 'css'
  | 'scss'
  | 'tailwind'
  | 'bootstrap'
  | 'jss'
  | 'css-in-js'
  | 'material-ui'
  | 'chakra-ui'
  | 'react-native'
  | 'figma'
  | 'google-fonts'
  | 'typescript';

export interface ExportConfig {
  name: string;
  format: ExportFormat;
  extension: string;
  mimeType: string;
  getContent: (tokens: any) => string;
}

import { tokensToJson } from '../tokensToJson';
import { tokensToCss } from '../tokensToCss';
import { tokensToTs } from '../tokensToTs';
import { tokensToScss } from './tokensToScss';
import { tokensToTailwind } from './tokensToTailwind';
import { tokensToBootstrap } from './tokensToBootstrap';
import { tokensToJss } from './tokensToJss';
import { tokensToCssInJs } from './tokensToCssInJs';
import { tokensToMaterialUI } from './tokensToMaterialUI';
import { tokensToChakraUI } from './tokensToChakraUI';
import { tokensToReactNative } from './tokensToReactNative';
import { tokensToFigma } from './tokensToFigma';
import { tokensToGoogleFonts } from './tokensToGoogleFonts';
import { ThemeTokens } from '../../store/themeStore';

export const exportConfigs: Record<ExportFormat, ExportConfig> = {
  json: {
    name: 'JSON Tokens',
    format: 'json',
    extension: 'json',
    mimeType: 'application/json',
    getContent: (tokens: ThemeTokens) => tokensToJson(tokens),
  },
  css: {
    name: 'CSS Variables',
    format: 'css',
    extension: 'css',
    mimeType: 'text/css',
    getContent: (tokens: ThemeTokens) => tokensToCss(tokens),
  },
  scss: {
    name: 'SCSS Variables',
    format: 'scss',
    extension: 'scss',
    mimeType: 'text/scss',
    getContent: (tokens: ThemeTokens) => tokensToScss(tokens),
  },
  tailwind: {
    name: 'Tailwind Config',
    format: 'tailwind',
    extension: 'js',
    mimeType: 'application/javascript',
    getContent: (tokens: ThemeTokens) => tokensToTailwind(tokens),
  },
  bootstrap: {
    name: 'Bootstrap Theme',
    format: 'bootstrap',
    extension: 'css',
    mimeType: 'text/css',
    getContent: (tokens: ThemeTokens) => tokensToBootstrap(tokens),
  },
  jss: {
    name: 'JSS (React)',
    format: 'jss',
    extension: 'js',
    mimeType: 'application/javascript',
    getContent: (tokens: ThemeTokens) => tokensToJss(tokens),
  },
  'css-in-js': {
    name: 'CSS-in-JS',
    format: 'css-in-js',
    extension: 'js',
    mimeType: 'application/javascript',
    getContent: (tokens: ThemeTokens) => tokensToCssInJs(tokens),
  },
  'material-ui': {
    name: 'Material UI',
    format: 'material-ui',
    extension: 'js',
    mimeType: 'application/javascript',
    getContent: (tokens: ThemeTokens) => tokensToMaterialUI(tokens),
  },
  'chakra-ui': {
    name: 'Chakra UI',
    format: 'chakra-ui',
    extension: 'js',
    mimeType: 'application/javascript',
    getContent: (tokens: ThemeTokens) => tokensToChakraUI(tokens),
  },
  'react-native': {
    name: 'React Native',
    format: 'react-native',
    extension: 'js',
    mimeType: 'application/javascript',
    getContent: (tokens: ThemeTokens) => tokensToReactNative(tokens),
  },
  figma: {
    name: 'Figma Tokens',
    format: 'figma',
    extension: 'json',
    mimeType: 'application/json',
    getContent: (tokens: ThemeTokens) => tokensToFigma(tokens),
  },
  'google-fonts': {
    name: 'Google Fonts',
    format: 'google-fonts',
    extension: 'css',
    mimeType: 'text/css',
    getContent: (tokens: ThemeTokens) => tokensToGoogleFonts(tokens),
  },
  typescript: {
    name: 'TypeScript',
    format: 'typescript',
    extension: 'ts',
    mimeType: 'application/typescript',
    getContent: (tokens: ThemeTokens) => tokensToTs(tokens),
  },
};

