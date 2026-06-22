import { ScrollText } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

const sampleLogs = [
  { action: 'Report status updated', detail: 'Report #123 marked as Resolved', time: '2 hours ago' },
  { action: 'New user registered', detail: 'User joined the platform', time: '5 hours ago' },
  { action: 'Report submitted', detail: 'New pothole report in Andheri West', time: '1 day ago' },
]

export default function AdminLogs() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
        <p className="text-sm text-gray-500 mt-1">Recent platform activity and audit trail.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {sampleLogs.length === 0 ? (
          <div className="p-12 text-center">
            <ScrollText size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No system logs yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {sampleLogs.map((log, i) => (
              <div key={i} className="px-6 py-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{log.detail}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
