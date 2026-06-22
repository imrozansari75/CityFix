import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapPin, Calendar, Search, Filter } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'
import StatusBadge from '../../components/StatusBadge'

const statusFilters = ['All', 'Submitted', 'In Progress', 'Resolved']

export default function AdminReports() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialStatus = searchParams.get('status') || 'All'
  const initialCategory = searchParams.get('category') || ''

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState(initialStatus)
  const [categoryFilter, setCategoryFilter] = useState(initialCategory)

  useEffect(() => {
    async function fetchReports() {
      setLoading(true)
      const { data } = await supabase
        .from('reports')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false })

      if (data) setReports(data)
      setLoading(false)
    }

    fetchReports()
  }, [])

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.profiles?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter
    const matchesCategory = !categoryFilter || r.category?.toLowerCase().includes(categoryFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <AdminLayout searchQuery={searchTerm} onSearchChange={setSearchTerm}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Reports</h1>
        <p className="text-sm text-gray-500 mt-1">Review and manage all citizen reports.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, location, or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg pl-10 pr-8 py-2.5 text-sm outline-none focus:border-blue-400 transition bg-white appearance-none cursor-pointer"
          >
            {statusFilters.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500">No reports match your filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filtered.map((report) => (
              <div
                key={report.id}
                onClick={() => navigate(`/admin/reports/${report.id}`)}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition cursor-pointer"
              >
                {report.image_url ? (
                  <img src={report.image_url} alt="" className="w-14 h-14 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 truncate">{report.title}</p>
                    <StatusBadge status={report.status} />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    {report.category} &middot; Submitted by {report.profiles?.full_name || 'Unknown'}
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
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
