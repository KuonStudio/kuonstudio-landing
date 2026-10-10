// Injects prerendered HTML into dist/index.html after `vite build`.
// Run: node ./scripts/prerender.mjs  (expects dist-server/prerender.js to exist)
import { readFileSync, writeFileSync } from "node:fs";
import { render } from "../dist-server/prerender.js";

const html = render("/");
const path = "dist/index.html";
let index = readFileSync(path, "utf8");
if (!index.includes('<div id="root"></div>')) {
  throw new Error("root placeholder not found in dist/index.html");
}
index = index.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
writeFileSync(path, index);
console.log(`prerendered / -> ${html.length} chars of HTML`);
