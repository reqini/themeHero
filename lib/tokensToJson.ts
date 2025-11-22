import { ThemeTokens } from '../store/themeStore';

export function tokensToJson(tokens: ThemeTokens): string {
  return JSON.stringify(tokens, null, 2);
}

