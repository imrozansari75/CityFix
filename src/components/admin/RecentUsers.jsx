import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../lib/adminUtils'

export default function RecentUsers({ users }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Recent Users</h2>
        <button
          onClick={() => navigate('/admin/users')}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View All Users
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">No users registered yet.</p>
      ) : (
        <div className="divide-y divide-gray-50">
          {users.map((user) => {
            const initials = user.full_name
              ? user.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
              : 'U'

            return (
              <button
                key={user.id}
                onClick={() => navigate(`/admin/users?highlight=${user.id}`)}
                className="flex items-center gap-3 w-full px-5 py-3.5 hover:bg-gray-50 transition text-left"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.full_name || 'Unknown'}</p>
                    <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  </div>
                  <p className="text-xs text-gray-400 truncate">{user.email || 'No email'}</p>
                </div>
                <p className="text-xs text-gray-400 shrink-0 hidden sm:block">
                  Joined {formatDate(user.created_at)}
                </p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
