import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, User, CheckCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/Sidebar'
import TopNavbar from '../../components/TopNavbar'
import StatusBadge from '../../components/StatusBadge'

const statusOptions = ['Submitted', 'In Progress', 'Resolved']

export default function ReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [report, setReport] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function fetchReport() {
    setLoading(true)
    const { data } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single()

    if (data) {
      setReport(data)
      setNewStatus(data.status)

      const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user_id)
        .single()

        if (userProfile) setProfile(userProfile)
      }
      setLoading(false)
    }

    fetchReport()
  }, [id])

  async function handleStatusUpdate() {
    if (!newStatus || newStatus === report.status) return
    setUpdating(true)
    setSuccess(false)

    const { error } = await supabase
      .from('reports')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setReport({ ...report, status: newStatus })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    }
    setUpdating(false)
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Report not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/admin/reports')}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition"
            >
              <ArrowLeft size={16} />
              Back to Reports
            </button>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {report.image_url && (
                <div className="w-full h-64 bg-gray-100">
                  <img src={report.image_url} alt={report.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-xl font-bold text-gray-900">{report.title}</h1>
                      <StatusBadge status={report.status} />
                    </div>
                    <p className="text-sm text-gray-500">{report.category}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                    {report.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                    {formatDate(report.created_at)}
                  </div>
                  {profile && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User size={16} className="text-gray-400 flex-shrink-0" />
                      Submitted by {profile.full_name || 'Unknown'} ({profile.email || ''})
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{report.description}</p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Update Status</h3>
                  <div className="flex items-center gap-3">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition bg-white"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleStatusUpdate}
                      disabled={updating || newStatus === report.status}
                      className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {updating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          Update
                        </>
                      )}
                    </button>
                    {success && (
                      <span className="text-sm text-green-600 font-medium">Status updated!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
