export class ComparisonService {
  report() {
    return {
      dimension: "studyType",
      metrics: [
        {
          name: "Clinical Trials",
          applications: 1240,
          completions: 380,
        },
        {
          name: "Surveys",
          applications: 3800,
          completions: 2800,
        },
        {
          name: "Focus Groups",
          applications: 980,
          completions: 480,
        },
        {
          name: "Longitudinal Studies",
          applications: 750,
          completions: 240,
        },
      ],
    };
  }
}
