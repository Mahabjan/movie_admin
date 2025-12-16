import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', tickets: 120, revenue: 2400 },
  { name: 'Tue', tickets: 98, revenue: 2210 },
  { name: 'Wed', tickets: 150, revenue: 2800 },
  { name: 'Thu', tickets: 130, revenue: 2600 },
  { name: 'Fri', tickets: 200, revenue: 4000 },
  { name: 'Sat', tickets: 250, revenue: 5000 },
  { name: 'Sun', tickets: 180, revenue: 3200 },
];

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Tickets per day
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Bar dataKey="tickets" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Revenue per day
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
