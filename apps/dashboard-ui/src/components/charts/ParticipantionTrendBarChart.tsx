import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Data for Bar Chart ---
const studyData = {
  dimension: "studyType",
  metrics: [
    { name: "Clinical Trials", applications: 1240, completions: 380 },
    { name: "Surveys", applications: 3800, completions: 2800 },
    { name: "Focus Groups", applications: 980, completions: 480 },
    { name: "Longitudinal Studies", applications: 750, completions: 240 },
  ],
};

// --- Data for Line Chart ---
const trendData = {
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

export const ParticipationTrendBarChart = () => {
  // Recharts expects a flat data array, so we need to transform the trendData.
  const processTrendData = (data) => {
    const { metrics } = data;
    const allDates = [
      ...new Set(metrics.flatMap((m) => m.data.map((d) => d.date))),
    ].sort();

    return allDates.map((date) => {
      const entry = { date };
      metrics.forEach((metric) => {
        const dataPoint = metric.data.find((d) => d.date === date);
        entry[metric.name] = dataPoint ? dataPoint.value : null;
      });
      return entry;
    });
  };

  const chartData = processTrendData(trendData);

  // Formatter for the X-axis ticks to show a more readable date
  const formatDateTick = (tickItem: Date) => {
    return new Date(tickItem).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Participation Trends
      </h2>
      <p className="text-gray-500 mb-6">
        7-Day Study Application and Completion Trends
      </p>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e0e0e0"
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateTick}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{
                stroke: "#a5b4fc",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "0.5rem",
              }}
              labelFormatter={formatDateTick}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="Study Applications"
              stroke="#6366f1"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Study Completions"
              stroke="#22c55e"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
