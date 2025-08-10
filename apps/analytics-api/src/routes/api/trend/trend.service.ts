import { generatedParticipantEvents } from "../../../generate/generateParticipants";

/**
 * Counts events that occurred in a specified number of past days.
 * @param {string[]} eventDates - An array of date strings (ISO format recommended).
 * @param {number} [numberOfDays=7] - The number of past days to check (including today).
 * @returns {Map<string, number>} A map with dates ('YYYY-MM-DD') as keys and event counts as values.
 */
// function countEventsInPastDays(eventDates, numberOfDays = 7) {
//   // 1. Create a map to store counts
//   const dailyCounts = new Map();
//   const today = new Date();
//
//   // 2. Initialize the map for the specified number of days
//   // The only change is replacing '7' with the 'numberOfDays' parameter.
//   for (let i = 0; i < numberOfDays; i++) {
//     const day = new Date(today);
//     day.setDate(today.getDate() - i);
//
//     const formattedDate = day.toISOString().slice(0, 10);
//     dailyCounts.set(formattedDate, 0);
//   }
//
//   // 3. Iterate through your events and increment the counter (this part is unchanged)
//   for (const eventDateString of eventDates) {
//     const eventDate = new Date(eventDateString);
//     const formattedEventDate = eventDate.toISOString().slice(0, 10);
//
//     if (dailyCounts.has(formattedEventDate)) {
//       dailyCounts.set(
//         formattedEventDate,
//         dailyCounts.get(formattedEventDate) + 1,
//       );
//     }
//   }
//
//   return dailyCounts;
// }

export class TrendService {
  create() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const eventsFromSevenDaysAgo = generatedParticipantEvents.filter(
      (event) => event.timestamp.getTime() > sevenDaysAgo.getTime(),
    );

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
