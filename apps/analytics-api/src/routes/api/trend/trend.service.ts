import { generatedParticipantEvents } from "../../../generate/generateParticipants";
import { ParticipantEvent } from "../participants/participants.type";
import { DataPoint, Metric, TrendParam } from "./trend.types";

export class TrendService {
  calculate(params: TrendParam) {
    const dateRangeMapping = {
      ["last 7 days"]: 7,
      ["last 14 days"]: 14,
      ["last 30 days"]: 30,
    };

    const numberOfDays = dateRangeMapping[params.dateRange];

    const {
      appliedEvents,
      screenedEligibleEvents,
      screenedIneligibleEvents,
      completedEvents,
    } = this.separateEventsByType({
      allEvents: generatedParticipantEvents,
    });

    const metrics: Metric[] = [
      {
        name: "Application",
        data: this.groupEventsByDay(appliedEvents, numberOfDays),
      },
      {
        name: "Eligibility",
        data: this.groupEventsByDay(screenedEligibleEvents, numberOfDays),
      },
      {
        name: "Ineligibility",
        data: this.groupEventsByDay(screenedIneligibleEvents, numberOfDays),
      },
      {
        name: "Completion",
        data: this.groupEventsByDay(completedEvents, numberOfDays),
      },
    ];

    return {
      timeRange: `${numberOfDays}d`,
      interval: "day",
      metrics,
    };
  }

  separateEventsByType({ allEvents }: { allEvents: ParticipantEvent[] }): {
    appliedEvents: ParticipantEvent[];
    screenedEligibleEvents: ParticipantEvent[];
    screenedIneligibleEvents: ParticipantEvent[];
    completedEvents: ParticipantEvent[];
  } {
    const appliedEvents: ParticipantEvent[] = [];

    const screenedEligibleEvents: ParticipantEvent[] = [];

    const screenedIneligibleEvents: ParticipantEvent[] = [];

    const completedEvents: ParticipantEvent[] = [];

    for (const event of allEvents) {
      switch (event.eventType) {
        case "applied":
          appliedEvents.push(event);
          break;
        case "screened_eligible":
          screenedEligibleEvents.push(event);
          break;
        case "screened_ineligible":
          screenedIneligibleEvents.push(event);
          break;
        case "completed":
          completedEvents.push(event);
          break;
      }
    }

    return {
      appliedEvents,
      screenedEligibleEvents,
      screenedIneligibleEvents,
      completedEvents,
    };
  }

  groupEventsByDay(
    events: ParticipantEvent[],
    numberOfDays: number,
  ): DataPoint[] {
    const dailyCounts = new Map<string, number>();
    const today = new Date();

    for (let i = 0; i < numberOfDays; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const formattedDate = day.toISOString().slice(0, 10);
      dailyCounts.set(formattedDate, 0);
    }

    for (const event of events) {
      const formattedEventDate = event.timestamp.toISOString().slice(0, 10);
      if (dailyCounts.has(formattedEventDate)) {
        dailyCounts.set(
          formattedEventDate,
          dailyCounts.get(formattedEventDate)! + 1,
        );
      }
    }

    return Array.from(dailyCounts.entries()).map(([date, value]) => ({
      date,
      value,
    }));
  }
}
