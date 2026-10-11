// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.sandiegomake.com',
  // Static output for now. When checkout is added, install @astrojs/cloudflare
  // and add `adapter: cloudflare()` here; existing pages stay static.
});
