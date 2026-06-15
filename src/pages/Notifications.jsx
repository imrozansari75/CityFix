import { useState } from 'react'
import { Bell } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500 mt-1">Stay updated on your report status.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Bell size={28} className="text-gray-400" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">No notifications yet</h3>
                <p className="text-sm text-gray-500">
                  You&apos;ll receive updates here when your reports are reviewed.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
