import { describe, expect, test } from "vitest";
import { faker } from "@faker-js/faker";
import { TrendService } from "./trend.service";

import type {
  EventType,
  ParticipantEvent,
  StudyType,
} from "../participants/participants.type";

function generateMockEvents({
  studyType,
  timestamp,
  eventType,
}: {
  studyType: StudyType;
  timestamp: Date;
  eventType?: EventType;
}): ParticipantEvent {
  const eventTypes = [
    "applied",
    "screened_eligible",
    "screened_ineligible",
    "completed",
  ] as const;

  return {
    eventId: faker.string.uuid(),
    participantId: faker.string.uuid(),
    studyType,
    studyId: faker.string.uuid(),
    eventType: eventType ?? faker.helpers.arrayElement(eventTypes),
    timestamp,
  };
}

describe("TrendService", () => {
  describe("separateEventsByType()", () => {
    test("separates events by type", () => {
      const trendService = new TrendService();
      const appliedEvent = generateMockEvents({
        studyType: "Surveys",
        timestamp: new Date(),
        eventType: "applied",
      });
      const completedEvent = generateMockEvents({
        studyType: "Clinical Trials",
        timestamp: new Date(),
        eventType: "completed",
      });
      const eligibleEvent = generateMockEvents({
        studyType: "Focus Groups",
        timestamp: new Date(),
        eventType: "screened_eligible",
      });
      const ineligibleEvent = generateMockEvents({
        studyType: "Longitudinal Studies",
        timestamp: new Date(),
        eventType: "screened_ineligible",
      });

      const fakeEvents = [
        appliedEvent,
        completedEvent,
        eligibleEvent,
        ineligibleEvent,
      ];

      const events = trendService.separateEventsByType({
        allEvents: fakeEvents,
      });

      expect(events).toEqual({
        appliedEvents: [appliedEvent],
        completedEvents: [completedEvent],
        screenedEligibleEvents: [eligibleEvent],
        screenedIneligibleEvents: [ineligibleEvent],
      });
    });
  });

  describe("groupEventsByDay()", () => {
    test("if we filter out events older than number of days", () => {
      const trendService = new TrendService();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const today = new Date();
      const oldDate = faker.date.past({ years: 1, refDate: oneWeekAgo });

      const newEvent = generateMockEvents({
        studyType: "Clinical Trials",
        timestamp: today,
      });

      const events: ParticipantEvent[] = [
        newEvent,
        generateMockEvents({ studyType: "Surveys", timestamp: oldDate }),
      ];

      expect(trendService.groupEventsByDay(events, 7)[0]).toEqual({
        date: "2025-08-10",
        value: 1,
      });
    });
  });
});
