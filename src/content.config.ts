import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      heroImage: image().optional(),
    }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      coverImage: image(),
      images: z.array(
        z.object({
          src: image(),
          caption: z.string().optional(),
        })
      ),
      location: z.string().optional(),
    }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Project year as shown in the original copy ("2013", "2015-17") —
      // not a real Date, so kept as a display string rather than z.date().
      date: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      heroImage: image().optional(),
      dotColor: z.enum(['red', 'green', 'blue']).optional(),
      // Drives the prev/next chain; sorted ascending at render time.
      order: z.number(),
    }),
});

export const collections = {
  blog,
  gallery,
  'case-studies': caseStudies,
};
