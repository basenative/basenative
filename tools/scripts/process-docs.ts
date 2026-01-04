import * as fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '../../libs/data/src/assets/articles');
const OUTPUT_FILE = path.join(
  __dirname,
  '../../libs/data/src/lib/philosophies.ts',
);

interface DocMeta {
  [key: string]: string;
}

interface Doc {
  id: string;
  content: string;
  [key: string]: string;
}

function parseFrontMatter(content: string): { meta: DocMeta; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const metaBlock = match[1];
  const body = match[2];

  const meta: DocMeta = {};
  metaBlock.split('\n').forEach((line) => {
    const [key, ...value] = line.split(':');
    if (key && value) {
      meta[key.trim()] = value.join(':').trim();
    }
  });

  return { meta, body };
}

async function buildDocs() {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`Docs directory not found: ${DOCS_DIR}`);
    return;
  }

  const files = fs.readdirSync(DOCS_DIR).filter((file) => file.endsWith('.md'));
  const docs: Doc[] = await Promise.all(
    files.map(async (file) => {
      const content = fs.readFileSync(path.join(DOCS_DIR, file), 'utf8');
      const { meta, body } = parseFrontMatter(content);
      const parsedContent = await marked.parse(body.trim());
      return {
        id: file.replace('.md', ''),
        ...meta,
        content: parsedContent,
      };
    }),
  );

  docs.sort(
    (a, b) => parseInt(a['order'] || '99') - parseInt(b['order'] || '99'),
  );

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tsContent = `export const philosophies = ${JSON.stringify(docs, null, 2)};`;
  fs.writeFileSync(OUTPUT_FILE, tsContent);
  console.log(`Generated docs to ${OUTPUT_FILE}`);
}

buildDocs();
