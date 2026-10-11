// Downloads every product photo from the current Shopify store into
// photos-inbox/shopify/ so nothing is lost when Shopify is shut off.
//
//   Run: node scripts/get-shopify-photos.mjs
//
// Gallery/page images uploaded in Shopify admin are not in this feed: download
// those from Shopify admin → Content → Files.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const STORE = 'https://www.sandiegomake.com';
const OUT = 'photos-inbox/shopify';
await mkdir(OUT, { recursive: true });

const res = await fetch(`${STORE}/products.json?limit=250`);
if (!res.ok) throw new Error(`Could not read product list: ${res.status}`);
const { products } = await res.json();

let n = 0;
for (const p of products) {
  for (const [i, img] of p.images.entries()) {
    const url = img.src.split('?')[0];
    const ext = path.extname(new URL(url).pathname) || '.jpg';
    const file = path.join(OUT, `${p.handle}${i ? '-' + (i + 1) : ''}${ext}`);
    const r = await fetch(url);
    if (!r.ok) { console.warn(`skip ${url} (${r.status})`); continue; }
    await writeFile(file, Buffer.from(await r.arrayBuffer()));
    console.log(`saved ${file}`);
    n++;
  }
}
console.log(`\n${n} image(s) from ${products.length} product(s) saved to ${OUT}/`);
