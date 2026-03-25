import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    duration: z.string().optional(),
    services: z.array(z.string()).optional(),
    metrics: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    date: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().optional(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { cases, blog };
