import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Send, Clock, CheckCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import AdminLayout from '../../components/admin/AdminLayout'
import WelcomeHeader from '../../components/admin/WelcomeHeader'
import StatsCard from '../../components/StatsCard'
import ResolutionRateWidget from '../../components/admin/ResolutionRateWidget'
import ActiveCitizensWidget from '../../components/admin/ActiveCitizensWidget'
import CategoryChart from '../../components/admin/CategoryChart'
import RecentReports from '../../components/admin/RecentReports'
import RecentUsers from '../../components/admin/RecentUsers'
import DashboardSkeleton from '../../components/admin/DashboardSkeleton'
import {
  getMonthRange,
  isInRange,
  calcTrend,
  buildCategoryChartData,
  buildMonthlyActivity,
} from '../../lib/adminUtils'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, submitted: 0, inProgress: 0, resolved: 0 })
  const [trends, setTrends] = useState({ total: '0%', submitted: '0%', inProgress: '0%', resolved: '0%' })
  const [resolutionRate, setResolutionRate] = useState(0)
  const [resolutionTrend, setResolutionTrend] = useState('0%')
  const [activeCitizens, setActiveCitizens] = useState(0)
  const [activeCitizensTrend, setActiveCitizensTrend] = useState('0%')
  const [monthlyActivity, setMonthlyActivity] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [recentReports, setRecentReports] = useState([])
  const [recentUsers, setRecentUsers] = useState([])

  const firstName = profile?.full_name?.split(' ')[0] || 'Admin'

  const fetchData = useCallback(async () => {
    setLoading(true)

    const [reportsRes, usersRes] = await Promise.all([
      supabase.from('reports').select('*, profiles(full_name)').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5),
    ])

    const allReports = reportsRes.data || []
    const currentMonth = getMonthRange(0)
    const prevMonth = getMonthRange(-1)

    const countByStatus = (reports, status) =>
      reports.filter((r) => r.status === status).length

    const currentReports = allReports.filter((r) => isInRange(r.created_at, currentMonth.start, currentMonth.end))
    const prevReports = allReports.filter((r) => isInRange(r.created_at, prevMonth.start, prevMonth.end))

    const total = allReports.length
    const submitted = countByStatus(allReports, 'Submitted')
    const inProgress = countByStatus(allReports, 'In Progress')
    const resolved = countByStatus(allReports, 'Resolved')

    setStats({ total, submitted, inProgress, resolved })
    setTrends({
      total: calcTrend(currentReports.length, prevReports.length),
      submitted: calcTrend(countByStatus(currentReports, 'Submitted'), countByStatus(prevReports, 'Submitted')),
      inProgress: calcTrend(countByStatus(currentReports, 'In Progress'), countByStatus(prevReports, 'In Progress')),
      resolved: calcTrend(countByStatus(currentReports, 'Resolved'), countByStatus(prevReports, 'Resolved')),
    })

    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0
    const prevRate = prevReports.length > 0
      ? Math.round((countByStatus(prevReports, 'Resolved') / prevReports.length) * 100)
      : 0
    setResolutionRate(rate)
    setResolutionTrend(calcTrend(rate, prevRate))

    const currentActive = new Set(
      allReports.filter((r) => isInRange(r.created_at, currentMonth.start, currentMonth.end)).map((r) => r.user_id)
    ).size
    const prevActive = new Set(
      allReports.filter((r) => isInRange(r.created_at, prevMonth.start, prevMonth.end)).map((r) => r.user_id)
    ).size
    setActiveCitizens(currentActive)
    setActiveCitizensTrend(calcTrend(currentActive, prevActive))
    setMonthlyActivity(buildMonthlyActivity(allReports))
    setCategoryData(buildCategoryChartData(allReports))
    setRecentReports(allReports.slice(0, 5))
    setRecentUsers(usersRes.data || [])

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const statCards = [
    { icon: LayoutDashboard, label: 'Total Reports', value: String(stats.total), trend: trends.total, bgColor: 'bg-blue-50', iconColor: 'text-blue-600', filter: 'All' },
    { icon: Send, label: 'Submitted', value: String(stats.submitted), trend: trends.submitted, bgColor: 'bg-purple-50', iconColor: 'text-purple-600', filter: 'Submitted' },
    { icon: Clock, label: 'In Progress', value: String(stats.inProgress), trend: trends.inProgress, bgColor: 'bg-amber-50', iconColor: 'text-amber-600', filter: 'In Progress' },
    { icon: CheckCircle, label: 'Resolved', value: String(stats.resolved), trend: trends.resolved, bgColor: 'bg-green-50', iconColor: 'text-green-600', filter: 'Resolved' },
  ]

  return (
    <AdminLayout>
      <WelcomeHeader name={firstName} onRefresh={fetchData} refreshing={loading} />

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((stat) => (
              <StatsCard
                key={stat.label}
                {...stat}
                onClick={() => navigate(`/admin/reports?status=${encodeURIComponent(stat.filter)}`)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <ResolutionRateWidget rate={resolutionRate} trend={resolutionTrend} />
            <ActiveCitizensWidget count={activeCitizens} chartData={monthlyActivity} trend={activeCitizensTrend} />
            <CategoryChart data={categoryData} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <RecentReports reports={recentReports} />
            <RecentUsers users={recentUsers} />
          </div>
        </>
      )}
    </AdminLayout>
  )
}
