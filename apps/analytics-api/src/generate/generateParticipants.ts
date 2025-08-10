import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { STUDIES, STUDY_TYPES } from "./studies";
import {
  Participant,
  ParticipantEvent,
} from "src/routes/api/participants/participants.type";
import { REGIONS } from "./regions";

export const generatedParticipants: Participant[] = [];
export const generatedParticipantEvents: ParticipantEvent[] = [];

const findRandomStudy = () => {
  const studyType = faker.helpers.arrayElement(STUDY_TYPES);

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
  const { randomStudy, studyType } = findRandomStudy();

  if (previousStudyId && previousStudyId === randomStudy.studyId) {
    return undefined;
  }

  const eventId = randomUUID();

  const endDate = new Date();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 180);

  const randomDate = faker.date.between({ from: startDate, to: endDate });

  const createdDate = new Date(randomDate);

  generatedParticipantEvents.push({
    eventId,
    participantId,
    eventType: "applied",
    studyId: randomStudy.studyId,
    studyType: studyType,
    timestamp: randomDate,
  });

  const isEligible = faker.number.int({ min: 0, max: 100 }) > 20;

  const eligibilityDate = new Date(randomDate);

  eligibilityDate.setDate(randomDate.getDate() + 3);

  if (isEligible) {
    const eligibleEventId = randomUUID();
    generatedParticipantEvents.push({
      eventId: eligibleEventId,
      participantId,
      eventType: "screened_eligible",
      studyId: randomStudy.studyId,
      studyType: studyType,
      timestamp: eligibilityDate,
    });
  } else {
    const inEligibleEventId = randomUUID();
    generatedParticipantEvents.push({
      eventId: inEligibleEventId,
      participantId,
      eventType: "screened_ineligible",
      studyId: randomStudy.studyId,
      studyType: studyType,
      timestamp: eligibilityDate,
    });

    return {
      studyId: randomStudy.studyId,
      createdDate,
      studyType,
      active: false,
    };
  }

  const studyCompleted = faker.number.int({ min: 0, max: 100 }) > 30;

  if (studyCompleted) {
    const completedEventId = randomUUID();
    const completedStudyDate = new Date(eligibilityDate);

    completedStudyDate.setDate(randomDate.getDate() + 14);

    if (completedStudyDate.getTime() > endDate.getTime()) {
      completedStudyDate.setDate(endDate.getDate());
    }

    generatedParticipantEvents.push({
      eventId: completedEventId,
      participantId,
      eventType: "completed",
      studyId: randomStudy.studyId,
      studyType: studyType,
      timestamp: completedStudyDate,
    });
  }

  return {
    studyId: randomStudy.studyId,
    createdDate,
    studyType,
    active: !studyCompleted,
  };
};

const createRandomParticipant = () => {
  const participantId = randomUUID();

  const firstParticipantStudy = addParticipantToStudy({ participantId });

  const secondParticipantStudy = addParticipantToStudy({
    participantId,
    previousStudyId: firstParticipantStudy?.studyId,
  });

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 180);

  if (!firstParticipantStudy) {
    throw new Error("First user study not found and is required");
  }

  const studyTypes = [firstParticipantStudy.studyType];

  if (secondParticipantStudy) {
    studyTypes.push(secondParticipantStudy.studyType);
  }

  const newParticipant = {
    participantId,
    studyTypes,
    fullName: faker.person.fullName(),
    demographics: {
      age: faker.number.int({ min: 18, max: 75 }),
      region: faker.helpers.arrayElement(REGIONS),
    },
    createdDate: firstParticipantStudy.createdDate,
    active: firstParticipantStudy.active || !!secondParticipantStudy?.active,
  };

  generatedParticipants.push(newParticipant);
};

for (let i = 0; i < 100_000; i++) {
  createRandomParticipant();
}

setInterval(() => {
  const newParticipant = {
    participantId: randomUUID(),
    studyTypes: [],
    fullName: faker.person.fullName(),
    demographics: {
      age: faker.number.int({ min: 18, max: 75 }),
      region: faker.helpers.arrayElement(REGIONS),
    },
    createdDate: new Date(),
    active: true,
  };

  generatedParticipants.push(newParticipant);
  generatedParticipants.sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
  );
}, 5000);

generatedParticipants.sort(
  (a, b) =>
    new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
);
