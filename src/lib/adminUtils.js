const CATEGORY_LABELS = {
  'Road Damage': 'Road Issues',
  'Road Issues': 'Road Issues',
  Garbage: 'Garbage',
  'Street Light': 'Street Lights',
  'Street Lights': 'Street Lights',
  'Water Leakage': 'Water Leakage',
  'Traffic Signals': 'Traffic Signals',
  Other: 'Others',
  Others: 'Others',
}

const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#6b7280']

export function normalizeCategory(category) {
  return CATEGORY_LABELS[category] || category || 'Others'
}

export function getMonthRange(offset = 0) {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const end = new Date(now.getFullYear(), now.getMonth() + offset + 1, 0, 23, 59, 59)
  return { start, end }
}

export function isInRange(dateStr, start, end) {
  const date = new Date(dateStr)
  return date >= start && date <= end
}

export function calcTrend(current, previous) {
  if (previous === 0) return current > 0 ? '+100%' : '0%'
  const change = ((current - previous) / previous) * 100
  const sign = change >= 0 ? '+' : ''
  return `${sign}${Math.round(change)}%`
}

export function buildCategoryChartData(reports) {
  const counts = {}
  reports.forEach((r) => {
    const label = normalizeCategory(r.category)
    counts[label] = (counts[label] || 0) + 1
  })

  return Object.entries(counts).map(([name, value], i) => ({
    name,
    value,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }))
}

export function buildMonthlyActivity(reports) {
  const months = []
  for (let i = 5; i >= 0; i--) {
    const { start, end } = getMonthRange(-i)
    const label = start.toLocaleString('en-US', { month: 'short' })
    const activeUsers = new Set(
      reports.filter((r) => isInRange(r.created_at, start, end)).map((r) => r.user_id)
    ).size
    months.push({ month: label, users: activeUsers })
  }
  return months
}

export function formatDate(dateStr, options = {}) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}
