interface SummaryMetrics {
  totalParticipants: number;
  activeParticipants: number;
  totalStudies: number;
  activeStudies: number;
  averageEligibilityRate: number;
  completionRate: number;
}

interface SummaryCardProps {
  title: string;
  value: string | number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

const metrics: SummaryMetrics = {
  totalParticipants: 12500,
  activeParticipants: 4200,
  totalStudies: 48,
  activeStudies: 18,
  averageEligibilityRate: 32.5,
  completionRate: 68.7,
};

export const Summary = () => {
  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US").format(num);

  const cardData = [
    {
      title: "Total Participants",
      value: formatNumber(metrics.totalParticipants),
    },
    {
      title: "Active Participants",
      value: formatNumber(metrics.activeParticipants),
    },
    {
      title: "Total Studies",
      value: formatNumber(metrics.totalStudies),
    },
    {
      title: "Active Studies",
      value: formatNumber(metrics.activeStudies),
    },
    {
      title: "Avg. Eligibility Rate",
      value: `${metrics.averageEligibilityRate}%`,
    },
    {
      title: "Completion Rate",
      value: `${metrics.completionRate}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <SummaryCard key={index} title={card.title} value={card.value} />
      ))}
    </div>
  );
};
