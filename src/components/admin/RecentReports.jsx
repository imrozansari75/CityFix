import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import StatusBadge from '../StatusBadge'
import { formatDate } from '../../lib/adminUtils'

export default function RecentReports({ reports }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Recent Reports</h2>
        <button
          onClick={() => navigate('/admin/reports')}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View All Reports
        </button>
      </div>

      {reports.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">No reports submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Issue</th>
                <th className="px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide hidden sm:table-cell">Category</th>
                <th className="px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide hidden md:table-cell">Location</th>
                <th className="px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide hidden lg:table-cell">Reporter</th>
                <th className="px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => navigate(`/admin/reports/${report.id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {report.image_url ? (
                        <img src={report.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          <MapPin size={14} className="text-gray-400" />
                        </div>
                      )}
                      <span className="font-medium text-gray-900 truncate max-w-[140px]">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-gray-500 hidden sm:table-cell">{report.category}</td>
                  <td className="px-3 py-3 text-gray-500 hidden md:table-cell truncate max-w-[120px]">{report.location}</td>
                  <td className="px-3 py-3 text-gray-500 hidden lg:table-cell">{report.profiles?.full_name || 'Unknown'}</td>
                  <td className="px-3 py-3"><StatusBadge status={report.status} /></td>
                  <td className="px-5 py-3 text-gray-400 hidden sm:table-cell whitespace-nowrap">{formatDate(report.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
