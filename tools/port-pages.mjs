// One-off migration helper: turns the two standalone `text/babel` apps into
// real ES-module React components, so the page markup is never retyped by hand.
// Edits are mechanical and minimal; the components themselves are verbatim.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, '_source');
mkdirSync(join(ROOT, 'src', 'components'), { recursive: true });

function port(srcFile, rootComponent, outFile) {
  let s = readFileSync(join(SRC, srcFile), 'utf8');

  // 1. Drop the original Icon (it drove the global window.lucide runtime); we
  //    import a lucide-react version instead.
  s = s.replace(/function Icon\(\{[\s\S]*?return <span ref=\{ref\}[^\n]*\n\}\n?/, '');

  // 2. Remove the global registration shims used to share components between
  //    the separate <script> blocks of the standalone file. In a single module
  //    every component is already in lexical scope.
  s = s.replace(/^\s*window\.Lagoon\s*=\s*\{[^}]*\};.*$/m, '');
  s = s.replace(/^\s*const L\s*=\s*window\.Lagoon;.*$/m, '');
  s = s.replace(/^\s*Object\.assign\(window,\s*\{[^}]*\}\);.*$/gm, '');
  s = s.replace(/^\s*const \{[^}]*\}\s*=\s*window\.Lagoon;.*$/gm, '');
  // Each component also self-registered as a global (window.Nav = Nav; ...) so
  // later <script> blocks could reach it. Unnecessary in one module, and these
  // run at import time and break server-side rendering.
  s = s.replace(/^\s*window\.[A-Za-z]\w*\s*=\s*[A-Za-z]\w*;.*$/gm, '');

  // 3. The intersection-observer reveal effect also poked window.lucide; drop
  //    those calls (icons now render via React).
  s = s.replace(/^\s*if \(window\.lucide\) window\.lucide\.createIcons\(\);.*$/gm, '');

  // 4. Images extracted from base64 now live in public/img. They are referenced
  //    from JS strings (not CSS), so Vite can't rewrite them for the GitHub
  //    Pages base path - prefix every /img/ URL with import.meta.env.BASE_URL so
  //    it resolves on both the preview subpath and the production root.
  s = s.replace(/EXTRACTED:/g, '/img/');
  // a) paths already inside template literals: `/img/x` -> `${B}/img/x`
  s = s.replace(/`\/img\//g, '`${B}/img/');
  // b) single-quoted CSS url strings: 'url("/img/x")' -> `url("${B}/img/x")`
  s = s.replace(/'url\("\/img\/([^']*)'/g, '`url("${B}/img/$1`');
  // c) plain single-quoted paths: '/img/x' -> `${B}/img/x`
  s = s.replace(/'\/img\/([^']*)'/g, '`${B}/img/$1`');
  // d) double-quoted JSX attributes: ="/img/x" -> ={`${B}/img/x`}
  s = s.replace(/="\/img\/([^"]*)"/g, '={`${B}/img/$1`}');

  // 5. Swap the client mount for a module export. (The file's own
  //    `const { useState, useEffect, useRef } = React;` is kept, so we import
  //    only the React default to avoid redeclaring those bindings.)
  s = s.replace(
    /ReactDOM\.createRoot\([\s\S]*?\.render\(<(\w+)\s*\/?>\);?/,
    'export default $1;',
  );

  // BASE_URL is '/lagoon-main-beach/' for the Pages preview, '/' for production;
  // strip the trailing slash so `${B}/img/...` yields a single clean separator.
  const header =
    `import React from 'react';\n` +
    `import { Icon } from './Icon.jsx';\n\n` +
    `const B = import.meta.env.BASE_URL.replace(/\\/$/, '');\n\n`;
  writeFileSync(join(ROOT, 'src', 'components', outFile), header + s.trim() + '\n');
  console.log(`${outFile}: ${((header.length + s.length) / 1024).toFixed(1)}KB`);
}

port('home-app.jsx', 'App', 'HomeApp.jsx');
port('owners-app.jsx', 'OwnersApp', 'OwnersApp.jsx');
