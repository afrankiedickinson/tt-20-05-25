import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const studyData = {
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

export const StudyBarChart = () => {
  return (
    <div className="w-full max-w-4xl p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Study Performance
      </h1>
      <p className="text-gray-500 mb-6">
        Applications vs. Completions by Study Type
      </p>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={studyData.metrics}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
            barGap={8}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e0e0e0"
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db" }}
            />

            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip cursor={{ fill: "rgba(239, 246, 255, 0.5)" }} />

            <Legend wrapperStyle={{ paddingTop: "20px" }} />

            <Bar
              dataKey="applications"
              fill="#6366f1"
              name="Applications"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="completions"
              fill="#22c55e"
              name="Completions"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
