import { ThemeTokens } from '../../store/themeStore';

export function tokensToFigma(tokens: ThemeTokens): string {
  const figmaTokens: Record<string, any> = {
    $schema: 'https://schemas.figma.com/tokens/v1',
    tokens: {},
  };

  Object.entries(tokens.colors).forEach(([key, value]) => {
    figmaTokens.tokens[`color.${key}`] = {
      $type: 'color',
      $value: value,
    };
  });

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    figmaTokens.tokens[`spacing.${key}`] = {
      $type: 'dimension',
      $value: value,
    };
  });

  Object.entries(tokens.radius).forEach(([key, value]) => {
    figmaTokens.tokens[`radius.${key}`] = {
      $type: 'dimension',
      $value: value,
    };
  });

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    figmaTokens.tokens[`fontSize.${key}`] = {
      $type: 'dimension',
      $value: value,
    };
  });

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    figmaTokens.tokens[`fontWeight.${key}`] = {
      $type: 'number',
      $value: parseInt(value),
    };
  });

  return JSON.stringify(figmaTokens, null, 2);
}

