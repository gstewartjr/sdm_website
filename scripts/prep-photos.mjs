// Shrinks photos before they go into the repo.
//
//   1. Drop photos into photos-inbox/products/ or photos-inbox/log/
//   2. Run: npm run photos
//   3. Resized copies land in src/assets/products/ or src/assets/log/
//
// Originals stay in photos-inbox/ (ignored by git), so you can delete them after.
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const INBOX = 'photos-inbox';
const OUT = 'src/assets';
const MAX = 2400; // longest edge in pixels
const EXT = /\.(jpe?g|png|webp|tiff?)$/i; // iPhone HEIC: export as JPEG first

const folders = ['products', 'log'];
let count = 0;

for (const folder of folders) {
  const src = path.join(INBOX, folder);
  let files = [];
  try { files = await readdir(src); } catch { continue; }
  await mkdir(path.join(OUT, folder), { recursive: true });

  for (const file of files.filter((f) => EXT.test(f))) {
    const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const input = path.join(src, file);
    const output = path.join(OUT, folder, `${name}.jpg`);
    const before = (await stat(input)).size;
    await sharp(input)
      .rotate() // respect phone orientation
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(output);
    const after = (await stat(output)).size;
    console.log(`${file} → ${output}  (${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(2)} MB)`);
    count++;
  }
}

console.log(count ? `\nDone: ${count} photo(s).` : `No photos found. Put them in ${INBOX}/products/ or ${INBOX}/log/.`);
