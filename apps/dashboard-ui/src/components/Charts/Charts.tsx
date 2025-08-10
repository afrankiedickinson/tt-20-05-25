import { ParticipationTrendBarChart } from "./ParticipantionTrendBarChart";
import { StudyBarChart } from "./StudyBarChart";

export const Charts = () => (
  <div className="overflow-hidden rounded-lg bg-white shadow-md flex flex-col md:flex-row gap-5 mb-6">
    <ParticipationTrendBarChart />
    <StudyBarChart />
  </div>
);
