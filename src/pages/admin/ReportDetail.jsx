import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Clock, CheckCircle, Trash2, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'
import StatusBadge from '../../components/StatusBadge'

export default function ReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

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

  async function updateStatus(status) {
    setUpdating(true)
    const { error } = await supabase
      .from('reports')
      .update({ status })
      .eq('id', id)

    if (!error) setReport({ ...report, status })
    setUpdating(false)
  }

  async function handleDelete() {
    setDeleting(true)
    const { error } = await supabase.from('reports').delete().eq('id', id)
    if (!error) navigate('/admin/reports')
    setDeleting(false)
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
      <AdminLayout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </AdminLayout>
    )
  }

  if (!report) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-gray-500">Report not found.</p>
          <button onClick={() => navigate('/admin/reports')} className="text-blue-600 text-sm mt-2 hover:underline">
            Back to Reports
          </button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout maxWidth="max-w-4xl">
      <button
        onClick={() => navigate('/admin/reports')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition"
      >
        <ArrowLeft size={16} />
        Back to Reports
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {report.image_url && (
              <div className="w-full h-64 bg-gray-100">
                <img src={report.image_url} alt={report.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-xl font-bold text-gray-900">{report.title}</h1>
                    <StatusBadge status={report.status} />
                  </div>
                  <p className="text-sm text-gray-500">{report.category}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  {report.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} className="text-gray-400 shrink-0" />
                  {formatDate(report.created_at)}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{report.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Reporter Information</h3>
            {profile ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                    {profile.full_name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{profile.full_name || 'Unknown'}</p>
                    <p className="text-xs text-gray-400 capitalize">{profile.role || 'user'}</p>
                  </div>
                </div>
                {profile.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={14} className="text-gray-400" />
                    {profile.email}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Reporter info unavailable</p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => updateStatus('In Progress')}
                disabled={updating || report.status === 'In Progress'}
                className="flex items-center justify-center gap-2 w-full bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Clock size={16} />
                Mark In Progress
              </button>
              <button
                onClick={() => updateStatus('Resolved')}
                disabled={updating || report.status === 'Resolved'}
                className="flex items-center justify-center gap-2 w-full bg-green-50 text-green-700 border border-green-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={16} />
                Mark Resolved
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center justify-center gap-2 w-full bg-red-50 text-red-600 border border-red-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-100 transition"
              >
                <Trash2 size={16} />
                Delete Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Report?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. The report &quot;{report.title}&quot; will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
