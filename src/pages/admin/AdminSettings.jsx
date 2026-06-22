import { Settings } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

export default function AdminSettings() {
  return (
    <AdminLayout maxWidth="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure admin panel preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <Settings size={20} className="text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">General Settings</h3>
            <p className="text-sm text-gray-400">Platform configuration options</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
              <p className="text-xs text-gray-400">Receive alerts for new report submissions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Auto-assign Reports</p>
              <p className="text-xs text-gray-400">Automatically assign new reports to available admins</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
