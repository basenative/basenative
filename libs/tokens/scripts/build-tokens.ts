import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to tokens.json and the output file
const TOKENS_PATH = join(__dirname, '../src/tokens.json');
const OUTPUT_PATH = join(__dirname, '../src/lib/tokens.css');

interface Token {
  $value?: string | number;
  $type?: string;
  [key: string]: unknown;
}

interface TokenGroup {
  [key: string]: Token | TokenGroup | unknown;
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function processTokens(obj: TokenGroup, prefix = '-'): string[] {
  const cssVars: string[] = [];

  for (const key in obj) {
    if (key.startsWith('$')) continue; // Skip metadata

    const token = obj[key] as Token | TokenGroup;
    const tokenName = `${prefix}-${camelToKebab(key)}`;

    if (token && typeof token === 'object' && '$value' in token) {
      // It's a token
      const t = token as Token;
      cssVars.push(`${tokenName}: ${t.$value};`);
    } else if (token && typeof token === 'object') {
      // It's a group, recurse
      cssVars.push(...processTokens(token as TokenGroup, tokenName));
    }
  }

  return cssVars;
}

try {
  console.log('Building tokens...');
  const tokensContent = readFileSync(TOKENS_PATH, 'utf-8');
  const tokens = JSON.parse(tokensContent);

  const cssVariables = processTokens(tokens);

  const cssContent = `@layer tokens {
  :root {
    ${cssVariables.join('\n    ')}
  }
}
`;

  // Ensure directory exists
  const outputDir = dirname(OUTPUT_PATH);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(OUTPUT_PATH, cssContent);
  console.log(`Tokens built successfully to ${OUTPUT_PATH}`);
} catch (error) {
  console.error('Error building tokens:', error);
  process.exit(1);
}
