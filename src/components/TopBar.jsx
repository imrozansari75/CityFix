import { FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";

export default function TopBar({ onMenuClick, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500" onClick={onMenuClick}>
          <FaBars size={18} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-400 w-64">
          <FaSearch size={14} />
          <span>Search reports...</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition"
        >
          <FaSignOutAlt size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
