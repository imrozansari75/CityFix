import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import ChartCard from './ChartCard'

export default function CategoryChart({ data }) {
  const navigate = useNavigate()

  return (
    <ChartCard title="Reports by Category" subtitle="Distribution of issue types">
      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No report data yet</p>
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="w-full lg:w-1/2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/2 space-y-2">
            {data.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(`/admin/reports?category=${encodeURIComponent(item.name)}`)}
                className="flex items-center justify-between w-full text-left px-2 py-1.5 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </ChartCard>
  )
}
