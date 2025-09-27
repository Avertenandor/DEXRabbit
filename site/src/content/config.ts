import { defineCollection, z } from 'astro:content';

const animals = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    breed: z.string(),
    sex: z.enum(['м','ж']),
    ageMonths: z.number().int().positive(),
    weightKg: z.number().positive(),
    price: z.number().int().positive(),
    status: z.enum(['free','reserved']),
    photo: z.string()
  })
});

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
  animals,
};
