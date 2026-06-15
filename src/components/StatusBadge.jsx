import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

const statusConfig = {
  Resolved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
  'In Progress': { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
  Submitted: { bg: 'bg-blue-100', text: 'text-blue-700', icon: AlertCircle },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status]
  if (!config) return null

  const Icon = config.icon

  return (
    <span
      className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${config.bg} ${config.text}`}
    >
      <Icon size={12} />
      {status}
    </span>
  )
}
