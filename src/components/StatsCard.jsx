import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCard({ icon: Icon, label, value, subtitle, trend, bgColor, iconColor, onClick }) {
  const isPositive = trend?.startsWith('+')
  const isNegative = trend?.startsWith('-')

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`bg-white rounded-xl flex justify-between items-center border border-gray-100 p-5 text-left w-full transition-all ${
        onClick ? 'hover:shadow-md hover:border-blue-100 cursor-pointer' : 'hover:shadow-md'
      }`}
    >
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-0.5">{value}</p>
        {trend ? (
          <div className="flex items-center gap-1 mt-1.5">
            {isPositive && <TrendingUp size={12} className="text-green-500" />}
            {isNegative && <TrendingDown size={12} className="text-red-500" />}
            <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-400'}`}>
              {trend}
            </span>
            <span className="text-xs text-gray-400">from last month</span>
          </div>
        ) : (
          subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${bgColor}`}>
        <Icon size={22} className={iconColor} />
      </div>
    </button>
  )
}
