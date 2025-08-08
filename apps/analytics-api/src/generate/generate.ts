import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { STUDIES, STUDY_NAMES } from "./studies";
import z from "zod";

// Age group: 18 - 24, 25 - 34, 35 - 44, 45 - 54, 64+

const REGIONS = [
  "North America",
  "South America",
  "Europe",
  "Africa",
  "Asia",
  "Australia/Oceania",
];

const participantZod = z.object({
  participantId: z.string(),
  fullName: z.string(),
  demographics: z.object({
    age: z.number(),
    region: z.string(),
  }),
});

type Participant = z.infer<typeof participantZod>;

const participantEventZod = z.object({
  eventId: z.string(),
  participantId: z.string(),
  studyId: z.string(),
  eventType: z.union([
    z.literal("applied"),
    z.literal("screened_eligible"),
    z.literal("screened_ineligible"),
    z.literal("completed"),
  ]),
  timestamp: z.date(),
});

type ParticipantEvent = z.infer<typeof participantEventZod>;

export const participants: Participant[] = [];
export const participantEvents: ParticipantEvent[] = [];

const findRandomStudy = () => {
  const studyType = faker.helpers.arrayElement(STUDY_NAMES);

  const studies = STUDIES[studyType];

  const randomStudy = faker.helpers.arrayElement(studies);

  return { randomStudy, studyType };
};

const addParticipantToStudy = ({
  participantId,
  previousStudyId,
}: {
  participantId: string;
  previousStudyId?: string;
}) => {
  const { randomStudy } = findRandomStudy();

  if (previousStudyId === randomStudy.studyId) {
    return undefined;
  }

  const eventId = randomUUID();

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 30);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 180);

  const randomDate = faker.date.between({ from: startDate, to: endDate });

  participantEvents.push({
    eventId,
    participantId,
    eventType: "applied",
    studyId: randomStudy.studyId,
    timestamp: randomDate,
  });

  const isEligible = faker.number.int({ min: 0, max: 100 }) > 20;

  const eligibilityDate = new Date(randomDate);

  eligibilityDate.setDate(randomDate.getDate() + 3);

  if (isEligible) {
    const eligibleEventId = randomUUID();
    participantEvents.push({
      eventId: eligibleEventId,
      participantId,
      eventType: "screened_eligible",
      studyId: randomStudy.studyId,
      timestamp: eligibilityDate,
    });
  } else {
    const inEligibleEventId = randomUUID();
    participantEvents.push({
      eventId: inEligibleEventId,
      participantId,
      eventType: "screened_ineligible",
      studyId: randomStudy.studyId,
      timestamp: eligibilityDate,
    });

    return;
  }

  const studyCompleted = faker.number.int({ min: 0, max: 100 }) > 30;

  if (studyCompleted) {
    const completedEventId = randomUUID();
    const completedStudyDate = new Date(eligibilityDate);

    completedStudyDate.setDate(randomDate.getDate() + 14);

    participantEvents.push({
      eventId: completedEventId,
      participantId,
      eventType: "completed",
      studyId: randomStudy.studyId,
      timestamp: completedStudyDate,
    });
  }

  return {
    studyId: randomStudy.studyId,
  };
};

const createRandomParticipant = () => {
  const participantId = randomUUID();

  const firstUserStudy = addParticipantToStudy({ participantId });

  addParticipantToStudy({
    participantId,
    previousStudyId: firstUserStudy?.studyId,
  });

  const newParticipant = {
    participantId,
    fullName: faker.person.fullName(),
    demographics: {
      age: faker.number.int({ min: 18, max: 75 }),
      region: faker.helpers.arrayElement(REGIONS),
    },
  };

  participants.push(newParticipant);
};

for (let i = 0; i < 100_000; i++) {
  createRandomParticipant();
}
