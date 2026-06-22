import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function WelcomeHeader({ name, onRefresh, refreshing }) {
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setLastUpdated(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const formatted = lastUpdated.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const handleRefresh = () => {
    setLastUpdated(new Date())
    onRefresh?.()
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, {name}! 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Here&apos;s what&apos;s happening in CityFix today.</p>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-xs text-gray-400">Last Updated: {formatted}</p>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
        </button>
      </div>
    </div>
  )
}
