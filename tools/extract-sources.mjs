// One-off migration helper: pulls base64 data-URI images and fonts out of the
// Lagoon standalone HTMLs into real files and writes cleaned HTML copies for
// porting to Astro. Images -> _source/extracted (later moved to src/assets),
// fonts -> public/fonts (served as static files, referenced from CSS).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '/Users/sarahrail/Library/CloudStorage/OneDrive-MinoDesignStudio/Claude/Client Projects/Lagoon Main Beach/Design/Lagoon Main Beach Design System/homepage';
const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, '_source');

const pages = [
  { file: join(SRC, 'Lagoon-Homepage-Standalone.html'), slug: 'home' },
  { file: join(SRC, 'Lagoon-Owners-Standalone.html'), slug: 'owners' },
];

mkdirSync(join(OUT, 'extracted'), { recursive: true });
mkdirSync(join(ROOT, 'public', 'fonts'), { recursive: true });

const imgExt = { 'svg+xml': 'svg', jpeg: 'jpg', jpg: 'jpg', png: 'png', webp: 'webp', gif: 'gif', avif: 'avif' };
const fontExt = { woff2: 'woff2', woff: 'woff', ttf: 'ttf', otf: 'otf', 'x-font-woff': 'woff' };

// Fonts are shared across both pages; dedupe by content hash so 'Siena' and
// 'Montserrat' are written once and referenced by stable names.
import { createHash } from 'node:crypto';
const fontByHash = new Map();
let fontSeq = 0;

for (const { file, slug } of pages) {
  let html = readFileSync(file, 'utf8');
  let imgN = 0;

  // Images -> extracted/ as EXTRACTED:<name> placeholders.
  html = html.replace(
    /data:image\/(png|jpe?g|webp|gif|svg\+xml|avif);base64,([A-Za-z0-9+/=]+)/g,
    (_, type, b64) => {
      imgN += 1;
      const ext = imgExt[type] || type;
      const name = `${slug}-embedded-${imgN}.${ext}`;
      writeFileSync(join(OUT, 'extracted', name), Buffer.from(b64, 'base64'));
      return `EXTRACTED:${name}`;
    },
  );

  // Fonts -> public/fonts, deduped, rewritten to absolute /fonts/<name> URLs.
  html = html.replace(
    /data:(?:font\/|application\/(?:x-font-|font-)?)(woff2|woff|ttf|otf)[^;]*;base64,([A-Za-z0-9+/=]+)/g,
    (_, type, b64) => {
      const hash = createHash('sha1').update(b64).digest('hex').slice(0, 8);
      let name = fontByHash.get(hash);
      if (!name) {
        fontSeq += 1;
        name = `font-${fontSeq}-${hash}.${fontExt[type] || type}`;
        fontByHash.set(hash, name);
        writeFileSync(join(ROOT, 'public', 'fonts', name), Buffer.from(b64, 'base64'));
      }
      return `/fonts/${name}`;
    },
  );

  writeFileSync(join(OUT, `${slug}.html`), html);
  console.log(`${slug}: ${imgN} images extracted, cleaned HTML ${(html.length / 1024).toFixed(0)}KB`);
}
console.log(`fonts: ${fontByHash.size} unique font files written to public/fonts`);
