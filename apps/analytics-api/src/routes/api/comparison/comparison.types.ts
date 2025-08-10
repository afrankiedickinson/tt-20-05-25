import z from "zod";

const comparisonResponseZod = z.object({
  dimension: z.string(),
  metrics: z.array(
    z.object({
      name: z.string(),
      applications: z.number(),
      completions: z.number(),
    }),
  ),
});

export type ComparisonResponse = z.infer<typeof comparisonResponseZod>;
