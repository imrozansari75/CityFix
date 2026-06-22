import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import ChartCard from './ChartCard'

export default function ActiveCitizensWidget({ count, chartData, trend }) {
  return (
    <ChartCard title="Active Citizens" subtitle="Users who submitted reports this month">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-3xl font-bold text-gray-900">{count}</p>
          <p className="text-xs text-gray-500 mt-1">Active this month</p>
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-600">{trend} from last month</span>
        )}
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              formatter={(value) => [value, 'Active Users']}
            />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
