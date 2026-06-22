import { useState, useEffect } from 'react'
import { Shield, Users } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'

export default function AdminRoles() {
  const [roles, setRoles] = useState({ admin: 0, user: 0, other: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRoles() {
      const { data } = await supabase.from('profiles').select('role')
      if (data) {
        const counts = { admin: 0, user: 0, other: 0 }
        data.forEach((p) => {
          if (p.role === 'admin') counts.admin++
          else if (p.role === 'user' || !p.role) counts.user++
          else counts.other++
        })
        setRoles(counts)
      }
      setLoading(false)
    }
    fetchRoles()
  }, [])

  const roleCards = [
    { name: 'Admin', count: roles.admin, description: 'Full access to admin panel and all management features.', icon: Shield, bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
    { name: 'User', count: roles.user, description: 'Can submit reports, view own reports, and manage profile.', icon: Users, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  ]

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of user roles and their access levels.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roleCards.map(({ name, count, description, icon: Icon, bgColor, iconColor }) => (
            <div key={name} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{name}</h3>
                  <p className="text-sm text-gray-400">{count} user{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
