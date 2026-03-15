import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const threadSchema = z.object({
  id: z.string(),
  label: z.string(),
  period_summary: z.string(),
});

const units = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/units' }),
  schema: z.object({
    unit: z.string(),
    period: z.string(),
    dates: z.string(),
    domain: z.enum(['philosophy', 'art', 'music']),
    core_text: z.string().nullable().optional(),
    author: z.string().nullable().optional(),
    note: z.string().optional(),
    title: z.string().optional(),
    threads: z.array(threadSchema),

    // Philosophy
    readings: z.array(z.object({
      title: z.string(),
      author: z.string(),
      date: z.union([z.number(), z.string()]).nullable().optional(),
      threads: z.array(z.string()),
    })).optional(),

    // Music — featured_listening can be a single object or an array (Modernism has two)
    featured_listening: z.union([
      z.object({
        title: z.string(),
        composer: z.string(),
        date: z.union([z.number(), z.string()]),
        duration: z.string(),
        listen_for: z.string(),
      }),
      z.array(z.object({
        title: z.string(),
        composer: z.string(),
        date: z.union([z.number(), z.string()]),
        duration: z.string(),
        listen_for: z.string(),
      })),
    ]).optional(),
    gallery_listening: z.array(z.object({
      title: z.string(),
      composer: z.string(),
      date: z.union([z.number(), z.string()]),
      duration: z.string(),
      threads: z.array(z.string()),
    })).optional(),

    // Art
    hero_painting: z.object({
      title: z.string(),
      artist: z.string(),
      date: z.union([z.number(), z.string()]),
      medium: z.string().optional(),
      dimensions: z.string().optional(),
      location: z.string().optional(),
      image: z.string().optional(),
    }).optional(),
    gallery_paintings: z.array(z.object({
      title: z.string(),
      artist: z.string(),
      date: z.union([z.number(), z.string()]),
      threads: z.array(z.string()),
      image: z.string().optional(),
    })).optional(),

    // Navigation
    compare_back: z.string().nullable().optional(),
    compare_forward: z.string().nullable().optional(),
  }),
});

export const collections = { units };
