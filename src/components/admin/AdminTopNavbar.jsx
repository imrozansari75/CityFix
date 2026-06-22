import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Bell, Search, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

export default function AdminTopNavbar({ onMenuClick, searchQuery, onSearchChange }) {
  const { profile, user, signOut } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const dropdownRef = useRef(null)
  const notifRef = useRef(null)

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'A'

  useEffect(() => {
    async function fetchNotifications() {
      const { data } = await supabase
        .from('reports')
        .select('id, title, status, created_at')
        .eq('status', 'Submitted')
        .order('created_at', { ascending: false })
        .limit(5)

      if (data) setNotifications(data)
    }
    fetchNotifications()
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 gap-4">
      <button className="lg:hidden text-gray-500 hover:text-gray-700 shrink-0" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-blue-400 transition bg-gray-50"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {notifications.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">New Reports</p>
              {notifications.length === 0 ? (
                <p className="px-4 py-3 text-sm text-gray-400">No new submissions</p>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => { navigate(`/admin/reports/${n.id}`); setNotifOpen(false) }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition"
                  >
                    <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">New submission</p>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                {initials}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {profile?.full_name || user?.email?.split('@')[0]}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => { navigate('/settings'); setDropdownOpen(false) }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User size={16} />
                  View Profile
                </button>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
