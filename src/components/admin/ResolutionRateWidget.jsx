import { TrendingUp } from 'lucide-react'
import ChartCard from './ChartCard'

export default function ResolutionRateWidget({ rate, trend }) {
  return (
    <ChartCard title="Resolution Rate" subtitle="Resolved vs total reports">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-3xl font-bold text-gray-900">{rate}%</p>
          <p className="text-xs text-gray-500 mt-1">Resolved Issues</p>
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
            <TrendingUp size={14} />
            {trend} from last month
          </div>
        )}
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
    </ChartCard>
  )
}
