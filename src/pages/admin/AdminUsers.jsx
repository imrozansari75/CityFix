import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Filter, Shield, User, MoreVertical } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'

const roleFilters = ['All', 'admin', 'user']

export default function AdminUsers() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const highlightId = searchParams.get('highlight')

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [actionMenu, setActionMenu] = useState(null)
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setUsers(data)
    setLoading(false)
  }

  async function changeRole(userId, newRole) {
    setUpdating(userId)
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)

    if (!error) {
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
    }
    setUpdating(null)
    setActionMenu(null)
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const filtered = users
    .filter((u) => {
      const matchesSearch =
        (u.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = roleFilter === 'All' || u.role === roleFilter
      return matchesSearch && matchesRole
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

  return (
    <AdminLayout searchQuery={searchTerm} onSearchChange={setSearchTerm}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage user accounts, roles, and permissions.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-200 rounded-lg pl-10 pr-8 py-2.5 text-sm outline-none focus:border-blue-400 transition bg-white appearance-none cursor-pointer"
          >
            {roleFilters.map((r) => (
              <option key={r} value={r}>{r === 'All' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </select>
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition bg-white cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <User size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No users match your filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left bg-gray-50/50">
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase">User</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase">Role</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase hidden md:table-cell">Joined</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((user) => {
                  const initials = user.full_name
                    ? user.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
                    : 'U'

                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-gray-50 transition ${highlightId === user.id ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                            {initials}
                          </div>
                          <span className="font-medium text-gray-900">{user.full_name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">{user.email || '—'}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.role === 'admin' && <Shield size={11} />}
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-400 hidden md:table-cell">{formatDate(user.created_at)}</td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <button
                            onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {actionMenu === user.id && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                              <button
                                onClick={() => navigate('/settings')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                View Profile
                              </button>
                              {user.role !== 'admin' ? (
                                <button
                                  onClick={() => changeRole(user.id, 'admin')}
                                  disabled={updating === user.id}
                                  className="w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 disabled:opacity-50"
                                >
                                  Make Admin
                                </button>
                              ) : (
                                <button
                                  onClick={() => changeRole(user.id, 'user')}
                                  disabled={updating === user.id}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                >
                                  Remove Admin
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
