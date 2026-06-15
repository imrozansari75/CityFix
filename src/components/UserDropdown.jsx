import { useNavigate } from 'react-router-dom'
import { User, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function UserDropdown({ onClose }) {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
      <button
        onClick={() => { navigate('/settings'); onClose() }}
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
      >
        <User size={16} />
        Profile
      </button>
      <button
        onClick={() => { navigate('/settings'); onClose() }}
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
      >
        <Settings size={16} />
        Settings
      </button>
      <hr className="my-1 border-gray-100" />
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  )
}
