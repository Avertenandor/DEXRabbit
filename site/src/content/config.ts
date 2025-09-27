import { defineCollection, z } from 'astro:content';

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().optional().default(0),
  }),
});

export const collections = {
  faq,
};
