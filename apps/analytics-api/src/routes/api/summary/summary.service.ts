import {
  generatedParticipantEvents,
  generatedParticipants,
} from "../../../generate/generateParticipants";

export class SummaryService {
  createSummaryMetrics() {
    const activeParticipants = [];

    for (const participant of generatedParticipants) {
      if (participant.active) {
        activeParticipants.push(participant);
      }
    }

    const numberOfStudiesApplied = generatedParticipantEvents.filter(
      (event) => event.eventType === "applied",
    );

    const eligibleEvents = generatedParticipantEvents.filter(
      (event) => event.eventType === "screened_eligible",
    );

    const completedStudyEvent = generatedParticipantEvents.filter(
      (event) => event.eventType === "completed",
    );

    const completionRate =
      (completedStudyEvent.length / eligibleEvents.length) * 100;

    const averageEligibilityRate =
      (eligibleEvents.length / numberOfStudiesApplied.length) * 100;

    return {
      totalParticipants: generatedParticipants.length,
      activeParticipants: activeParticipants.length,
      totalStudies: 100,
      activeStudies: 30,
      averageEligibilityRate: Number(averageEligibilityRate.toFixed(1)),
      completionRate: Number(completionRate.toFixed(1)),
    };
  }
}
