import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Send, Clock, CheckCircle, Plus, FileText, MapPin, Calendar } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'
import StatsCard from '../components/StatsCard'
import StatusBadge from '../components/StatusBadge'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    inProgress: 0,
    resolved: 0,
  })
  const [recentReports, setRecentReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function fetchData() {
    setLoading(true)

    const { data: allReports } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user.id)
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
      setLoading(false)
    }

    fetchData()
  }, [user])

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {statCards.map((stat) => (
                    <StatsCard key={stat.label} {...stat} />
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                      {recentReports.length > 0 && (
                        <button onClick={() => navigate('/my-reports')} className="text-sm text-blue-600 hover:underline">
                          View All
                        </button>
                      )}
                    </div>

                    {recentReports.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <FileText size={28} className="text-gray-400" />
                        </div>
                        <h3 className="text-base font-medium text-gray-900 mb-1">No reports yet</h3>
                        <p className="text-sm text-gray-500 mb-6 max-w-xs">
                          You haven&apos;t submitted any reports yet.
                          Create your first report to help improve your city.
                        </p>
                        <button
                          onClick={() => navigate('/submit-report')}
                          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                        >
                          <Plus size={16} />
                          Create Report
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {recentReports.map((report) => (
                          <div key={report.id} className="flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-sm font-medium text-gray-900 truncate">{report.title}</p>
                                <StatusBadge status={report.status} />
                              </div>
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

                  <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Impact</h2>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <LayoutDashboard size={28} className="text-gray-400" />
                      </div>
                      <h3 className="text-base font-medium text-gray-900 mb-1">No reports yet</h3>
                      <p className="text-sm text-gray-500 mb-6 max-w-xs">
                        Together, we can make our city better.
                        Start by reporting an issue.
                      </p>
                      <button
                        onClick={() => navigate('/submit-report')}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                      >
                        <Plus size={16} />
                        Create Report
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
