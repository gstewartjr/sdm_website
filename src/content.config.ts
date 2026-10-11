import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Products: one Markdown file per product in src/content/products/
const products = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      line: z.enum(['medal-hangers', 'electronics', 'metal-works']),
      kind: z.enum(['custom', 'stock']).default('stock'),
      summary: z.string(),
      // Shown on the placeholder art until a real photo is added
      label: z.string().optional(),
      image: image().optional(),
      gallery: z.array(image()).default([]),
      features: z.array(z.string()).default([]),
      amazon: z.string().url().optional(),
      etsy: z.string().url().optional(),
      youtube: z.string().optional(), // YouTube video ID
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

// Build log: one Markdown file per post in src/content/log/
const log = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/log' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      cover: image().optional(),
      youtube: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { products, log };
