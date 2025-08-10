import z from "zod";

export const studyTypeZod = z.union([
  z.literal("Longitudinal Studies"),
  z.literal("Surveys"),
  z.literal("Interviews"),
  z.literal("Focus Groups"),
  z.literal("Clinical Trials"),
  z.literal("Observational Studies"),
]);

export type StudyType = z.infer<typeof studyTypeZod>;

export const regionZod = z.union([
  z.literal("North America"),
  z.literal("South America"),
  z.literal("Europe"),
  z.literal("Africa"),
  z.literal("Asia"),
  z.literal("Australia/Oceania"),
]);

const participantZod = z.object({
  participantId: z.string(),
  studyTypes: studyTypeZod.array(),
  fullName: z.string(),
  demographics: z.object({
    age: z.number(),
    region: regionZod,
  }),
  createdDate: z.date(),
  active: z.boolean(),
});

export type Participant = z.infer<typeof participantZod>;

export const participantEventZod = z.object({
  eventId: z.string(),
  participantId: z.string(),
  studyType: studyTypeZod,
  studyId: z.string(),
  eventType: z.union([
    z.literal("applied"),
    z.literal("screened_eligible"),
    z.literal("screened_ineligible"),
    z.literal("completed"),
  ]),
  timestamp: z.date(),
});

export type ParticipantEvent = z.infer<typeof participantEventZod>;

export type Region = z.infer<typeof regionZod>;

export const ageRangeZod = z.union([
  z.literal("18-24"),
  z.literal("25-34"),
  z.literal("35-44"),
  z.literal("45-54"),
  z.literal("54-64"),
  z.literal("65+"),
]);

export const dateRangeZod = z.union([
  z.literal("last 7 days"),
  z.literal("last 14 days"),
  z.literal("last 30 days"),
]);

export const participantsQueryParamsZod = z.object({
  currentPageNumber: z.coerce.number(),
  numberOfRows: z
    .union([z.literal("10"), z.literal("20"), z.literal("50")])
    .transform(Number),
  region: regionZod.optional(),
  studyType: studyTypeZod.optional(),
  ageRange: ageRangeZod.optional(),
  dateRange: dateRangeZod.optional(),
});

export type ParticipantsQueryParams = z.infer<
  typeof participantsQueryParamsZod
>;
