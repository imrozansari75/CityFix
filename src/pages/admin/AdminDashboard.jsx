import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Send, Clock, CheckCircle, MapPin, Calendar, Users } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/Sidebar'
import TopNavbar from '../../components/TopNavbar'
import StatsCard from '../../components/StatsCard'
import StatusBadge from '../../components/StatusBadge'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({ total: 0, submitted: 0, inProgress: 0, resolved: 0 })
  const [recentReports, setRecentReports] = useState([])
  const [userCount, setUserCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const { data: allReports } = await supabase
        .from('reports')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false })

      if (allReports) {
        setStats({
          total: allReports.length,
          submitted: allReports.filter((r) => r.status === 'Submitted').length,
          inProgress: allReports.filter((r) => r.status === 'In Progress').length,
          resolved: allReports.filter((r) => r.status === 'Resolved').length,
        })
        setRecentReports(allReports.slice(0, 5))
      }

      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      if (count !== null) setUserCount(count)

      setLoading(false)
    }

    fetchData()
  }, [])

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const statCards = [
    { icon: LayoutDashboard, label: 'Total Reports', value: String(stats.total), subtitle: 'All time', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { icon: Send, label: 'Submitted', value: String(stats.submitted), subtitle: 'Awaiting review', bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
    { icon: Clock, label: 'In Progress', value: String(stats.inProgress), subtitle: 'Under review', bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
    { icon: CheckCircle, label: 'Resolved', value: String(stats.resolved), subtitle: 'Successfully fixed', bgColor: 'bg-green-50', iconColor: 'text-green-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Overview of all reports and platform activity.</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {statCards.map((stat) => (
                    <StatsCard key={stat.label} {...stat} />
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Users size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <p className="text-xl font-bold text-gray-900">{userCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                    <button onClick={() => navigate('/admin/reports')} className="text-sm text-blue-600 hover:underline">
                      View All
                    </button>
                  </div>

                  {recentReports.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">No reports submitted yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {recentReports.map((report) => (
                        <div
                          key={report.id}
                          onClick={() => navigate(`/admin/reports/${report.id}`)}
                          className="flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-sm font-medium text-gray-900 truncate">{report.title}</p>
                              <StatusBadge status={report.status} />
                            </div>
                            <p className="text-xs text-gray-400 mb-1">
                              {report.category} &middot; by {report.profiles?.full_name || 'Unknown'}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {report.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(report.created_at)}
                              </span>
                            </div>
                          </div>
                          {report.image_url && (
                            <img src={report.image_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
