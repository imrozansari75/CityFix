import { useState, useRef, useEffect } from 'react'
import { Menu, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import UserDropdown from './UserDropdown'

export default function TopNavbar({ onMenuClick }) {
  const { profile } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const firstName = profile?.full_name?.split(' ')[0] || 'there'

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-xs text-gray-500">
            Here&apos;s what&apos;s happening in your city today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium hover:bg-blue-700 transition"
          >
            {initials}
          </button>
          {dropdownOpen && <UserDropdown onClose={() => setDropdownOpen(false)} />}
        </div>
      </div>
    </header>
  )
}
