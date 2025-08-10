import { DashboardContext } from "@/context/DashboardContext";
import { useTrend } from "@/hooks/useTrend";
import { Trend } from "@/lib/api";
import { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const ParticipationTrendBarChart = () => {
  const { dateRange } = useContext(DashboardContext);
  const { data: trendDataServer } = useTrend({
    dateRange: dateRange || "last 7 days",
  });

  const processTrendData = ({ metrics }: Trend) => {
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

  const chartData = trendDataServer?.data
    ? processTrendData(trendDataServer.data)
    : [];

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
        {dateRange || "Last 7 Days"} Study Trends
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
              dataKey="Application"
              stroke="#6366f1"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Completion"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Eligibility"
              stroke="#22c55e"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Ineligibility"
              stroke="#ef4444"
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
