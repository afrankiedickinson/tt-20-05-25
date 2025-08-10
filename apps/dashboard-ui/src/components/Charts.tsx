import { ParticipationTrendBarChart } from "./charts/ParticipantionTrendBarChart";
import { StudyBarChart } from "./charts/StudyBarChart";

export const Charts = () => (
  <div className="overflow-hidden rounded-lg bg-white shadow-md flex flex-col md:flex-row gap-5 mb-6">
    <ParticipationTrendBarChart />
    <StudyBarChart />
  </div>
);
