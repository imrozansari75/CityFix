import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopNavbar from './AdminTopNavbar'

export default function AdminLayout({ children, maxWidth = 'max-w-7xl', searchQuery, onSearchChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <AdminTopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className={`${maxWidth} mx-auto`}>{children}</div>
        </main>
      </div>
    </div>
  )
}
