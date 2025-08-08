export class TrendService {
  report() {
    return {
      timeRange: "7d",
      interval: "day",
      metrics: [
        {
          name: "Study Applications",
          data: [
            { date: "2025-05-14", value: 250 },
            { date: "2025-05-15", value: 280 },
            { date: "2025-05-16", value: 340 },
            { date: "2025-05-17", value: 270 },
            { date: "2025-05-18", value: 200 },
            { date: "2025-05-19", value: 310 },
            { date: "2025-05-20", value: 380 },
          ],
        },
        {
          name: "Study Completions",
          data: [
            { date: "2025-05-14", value: 180 },
            { date: "2025-05-15", value: 190 },
            { date: "2025-05-16", value: 210 },
            { date: "2025-05-17", value: 175 },
            { date: "2025-05-18", value: 140 },
            { date: "2025-05-19", value: 200 },
            { date: "2025-05-20", value: 220 },
          ],
        },
      ],
    };
  }
}
