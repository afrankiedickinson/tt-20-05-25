import z from "zod";

export const studyTypeZod = z.union([
  z.literal("Clinical Trials"),
  z.literal("Surveys"),
  z.literal("Focus Groups"),
]);

export const participantZod = z.object({
  id: z.string(),
  ageGroup: z.string(),
  createdDate: z.date(),
  region: z.string(),
  email: z.string(),
  demographics: z.object({
    age: z.number(),
    country: z.string(),
  }),
  studyType: studyTypeZod,
});
