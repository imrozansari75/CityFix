import { NavLink } from 'react-router-dom'
import { X, LayoutDashboard, FileText, Tags, Users, Shield, BarChart3, PieChart, Settings, ScrollText, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navGroups = [
  {
    label: 'Main',
    items: [{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    label: 'Report Management',
    items: [
      { to: '/admin/reports', label: 'All Reports', icon: FileText },
      { to: '/admin/categories', label: 'Categories', icon: Tags },
    ],
  },
  {
    label: 'User Management',
    items: [
      { to: '/admin/users', label: 'Users', icon: Users },
      { to: '/admin/roles', label: 'Roles & Permissions', icon: Shield },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { to: '/admin/statistics', label: 'Statistics', icon: BarChart3 },
      { to: '/admin/reports-overview', label: 'Reports Overview', icon: PieChart },
    ],
  },
  {
    label: 'Settings',
    items: [
      { to: '/admin/settings', label: 'Settings', icon: Settings },
      { to: '/admin/logs', label: 'System Logs', icon: ScrollText },
    ],
  },
]

export default function AdminSidebar({ isOpen, onClose }) {
  const { profile, user, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'A'

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#111827] flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              CF
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">CityFix</p>
              <p className="text-white/50 text-[10px] uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider px-3 mb-1.5">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                        isActive
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon size={16} />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3 relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">{profile?.full_name || 'Admin'}</p>
              <p className="text-xs text-white/50 truncate capitalize">{profile?.role || 'admin'}</p>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-[#1f2937] rounded-lg border border-white/10 py-1 shadow-xl">
              <button
                onClick={() => { navigate('/settings'); setMenuOpen(false); onClose() }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
              >
                <User size={14} />
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-white/5"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
