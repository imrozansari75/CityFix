import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, Plus, MapPin, Calendar } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'
import StatusBadge from '../components/StatusBadge'

export default function MyReports() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function fetchReports() {
    setLoading(true)
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setReports(data)
    }
      setLoading(false)
    }

    fetchReports()
  }, [user])

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
                <p className="text-sm text-gray-500 mt-1">View and track all your submitted reports.</p>
              </div>
              <button
                onClick={() => navigate('/submit-report')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                <Plus size={16} />
                New Report
              </button>
            </div>

            {loading ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : reports.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <ClipboardList size={28} className="text-gray-400" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">No reports yet</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Your submitted reports will appear here.
                  </p>
                  <button
                    onClick={() => navigate('/submit-report')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    <Plus size={16} />
                    Create Your First Report
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{report.title}</h3>
                          <StatusBadge status={report.status} />
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{report.category}</p>
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
                        <img
                          src={report.image_url}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
