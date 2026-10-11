# SanDiegoMake website

Astro site, stored on GitHub, hosted on Cloudflare. Every change pushed to
GitHub is published automatically in about a minute.

## Where things live

| To change…                       | Edit                                   |
| -------------------------------- | -------------------------------------- |
| Email, Amazon/Etsy/YouTube links | `src/data/site.ts`                     |
| Product lines (coming soon etc.) | `src/data/site.ts`                     |
| A product                        | `src/content/products/<name>.md`       |
| Add a product                    | copy `src/content/products/_template.md` |
| Build-log post                   | `src/content/log/<name>.md` (copy `_template.md`) |
| Page text                        | `src/pages/*.astro`                    |
| Colors and fonts                 | `src/styles/global.css` (top of file)  |
| Old Shopify URL redirects        | `public/_redirects`                    |

Files starting with `_` and anything with `draft: true` are not published.

**Quick edits without any setup:** open the file on github.com, click the
pencil icon, edit, and click **Commit changes**. The site updates by itself.

## Photos and video

1. Put full-size photos in `photos-inbox/products/` or `photos-inbox/log/`.
2. Run `npm run photos`. Resized copies (about 2,400 px, a few hundred KB)
   appear in `src/assets/products/` or `src/assets/log/`.
3. Reference one in a product or post, e.g. `image: ../../assets/products/running-blue.jpg`.

Astro then makes small, fast versions for each screen size automatically.

Video: upload to YouTube and put the video ID (the part after `v=`) in a
product's or post's `youtube:` field. Don't commit video files.

Save photos from the current Shopify store: `npm run shopify-photos`
(saves product images to `photos-inbox/shopify/`). Images uploaded to
Shopify pages (like the gallery) are under Shopify admin → Content → Files.

## Working on your computer

One-time install: [Node.js LTS](https://nodejs.org) and
[GitHub Desktop](https://desktop.github.com) (or git), plus an editor such as
[VS Code](https://code.visualstudio.com).

```sh
npm install        # once
npm run dev        # preview at http://localhost:4321, updates as you edit
npm run build      # check that the site builds
```

Commit and push with GitHub Desktop; Cloudflare publishes it.

## First-time setup

### 1. GitHub
1. Create a free account at github.com if needed.
2. New repository → name `sandiegomake-site` → Private is fine.
3. In GitHub Desktop: **File → Add local repository** → pick this folder →
   **Publish repository**.

### 2. Cloudflare
1. Create a free account at cloudflare.com.
2. **Workers & Pages → Create → Import a repository** → connect GitHub →
   choose `sandiegomake-site`.
3. Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
4. Deploy. You get a free `*.workers.dev` address to review the site
   before switching the domain.

### 3. Move the domain from GoDaddy/Shopify (no downtime)
Do this only once the new site looks right on the `workers.dev` address.

1. In Cloudflare: **Add a domain** → `sandiegomake.com` → Free plan.
   Cloudflare copies the existing DNS records, so the Shopify site keeps
   working for now. Check that any **MX** (email) records were copied.
2. Cloudflare shows two nameservers. In GoDaddy: **My Products → Domain →
   DNS → Nameservers → Change** → enter Cloudflare's two nameservers.
   Takes from minutes to a few hours.
3. In Cloudflare, open the `sandiegomake` Worker → **Settings → Domains &
   Routes → Add → Custom domain** → add `sandiegomake.com` and
   `www.sandiegomake.com`. Remove the old Shopify DNS records
   (A `23.227.38.65`, CNAME `shops.myshopify.com`) if Cloudflare asks.
4. Optional, later: transfer the domain registration itself to Cloudflare
   (at-cost renewals). GoDaddy → unlock domain → get auth code → Cloudflare
   **Domain Registration → Transfer**.

### 4. Wind down Shopify (after the new site is live)
1. Shopify admin → **Products → Export** (CSV), **Customers → Export**,
   **Orders → Export**, and download anything in **Content → Files**.
2. Run `npm run shopify-photos` before closing the store.
3. Uninstall paid apps (e.g. Kickflip), then **Settings → Plan → Deactivate store**.
   If the domain was ever bought through Shopify, transfer it out first.

## Later: customizer and checkout

The site is static today. To add a customizer and Stripe checkout:
`npx astro add cloudflare` (adds server functions on Cloudflare), build the
customizer as an interactive component on product pages, and add an API route
that creates a Stripe Checkout session. Existing pages stay static.
