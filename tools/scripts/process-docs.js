const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// ...
const DOCS_DIR = path.join(__dirname, '../../docs/core-concepts');
const OUTPUT_FILE = path.join(
  __dirname,
  '../../libs/data/src/lib/philosophies.ts',
);

function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const metaBlock = match[1];
  const body = match[2];

  const meta = {};
  metaBlock.split('\n').forEach((line) => {
    const [key, ...value] = line.split(':');
    if (key && value) {
      meta[key.trim()] = value.join(':').trim();
    }
  });

  return { meta, body };
}

function buildDocs() {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`Docs directory not found: ${DOCS_DIR}`);
    return;
  }

  const files = fs
    .readdirSync(DOCS_DIR)
    .filter((file) => file.endsWith('.yml'));
  const docs = files
    .map((file) => {
      const content = fs.readFileSync(path.join(DOCS_DIR, file), 'utf8');
      const { meta, body } = parseFrontMatter(content);
      return {
        id: file.replace('.yml', ''),
        ...meta,
        content: marked.parse(body.trim()),
      };
    })
    .sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tsContent = `export const philosophies = ${JSON.stringify(docs, null, 2)};`;
  fs.writeFileSync(OUTPUT_FILE, tsContent);
  console.log(`Generated docs to ${OUTPUT_FILE}`);
}

buildDocs();
