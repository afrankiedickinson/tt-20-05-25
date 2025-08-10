import { generatedParticipantEvents } from "../../../generate/generateParticipants";
import { ComparisonResponse } from "./comparison.types";

export class ComparisonService {
  createStudyComparison(): ComparisonResponse {
    let longitudinalStudyApplications = 0;
    let longitudinalStudyCompletions = 0;

    let surveyApplications = 0;
    let surveyCompletions = 0;

    let interviewApplications = 0;
    let interviewCompletions = 0;

    let focusGroupApplications = 0;
    let focusGroupCompletions = 0;

    let clinicalTrailApplications = 0;
    let clinicalTrailCompletions = 0;

    let observationalStudyApplications = 0;
    let observationalStudyCompletions = 0;

    for (const event of generatedParticipantEvents) {
      if (
        event.studyType === "Clinical Trials" &&
        event.eventType === "applied"
      ) {
        clinicalTrailApplications++;
      }

      if (
        event.studyType === "Clinical Trials" &&
        event.eventType === "completed"
      ) {
        clinicalTrailCompletions++;
      }

      if (event.studyType === "Surveys" && event.eventType === "applied") {
        surveyApplications++;
      }

      if (event.studyType === "Surveys" && event.eventType === "completed") {
        surveyCompletions++;
      }

      if (event.studyType === "Focus Groups" && event.eventType === "applied") {
        focusGroupApplications++;
      }

      if (
        event.studyType === "Focus Groups" &&
        event.eventType === "completed"
      ) {
        focusGroupCompletions++;
      }

      if (
        event.studyType === "Longitudinal Studies" &&
        event.eventType === "applied"
      ) {
        longitudinalStudyApplications++;
      }

      if (
        event.studyType === "Longitudinal Studies" &&
        event.eventType === "completed"
      ) {
        longitudinalStudyCompletions++;
      }

      if (event.studyType === "Interviews" && event.eventType === "applied") {
        interviewApplications++;
      }

      if (event.studyType === "Interviews" && event.eventType === "completed") {
        interviewCompletions++;
      }

      if (
        event.studyType === "Observational Studies" &&
        event.eventType === "applied"
      ) {
        observationalStudyApplications++;
      }

      if (
        event.studyType === "Observational Studies" &&
        event.eventType === "completed"
      ) {
        observationalStudyCompletions++;
      }
    }

    return {
      dimension: "studyType",
      metrics: [
        {
          name: "Clinical Trials",
          applications: clinicalTrailApplications,
          completions: clinicalTrailCompletions,
        },
        {
          name: "Surveys",
          applications: surveyApplications,
          completions: surveyCompletions,
        },
        {
          name: "Focus Groups",
          applications: focusGroupApplications,
          completions: focusGroupCompletions,
        },
        {
          name: "Longitudinal Studies",
          applications: longitudinalStudyApplications,
          completions: longitudinalStudyCompletions,
        },
        {
          name: "Interviews",
          applications: interviewApplications,
          completions: interviewCompletions,
        },
        {
          name: "Observational Studies",
          applications: observationalStudyApplications,
          completions: observationalStudyCompletions,
        },
      ],
    };
  }
}
