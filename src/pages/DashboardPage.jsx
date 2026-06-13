import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome, FaList, FaEdit, FaBell, FaUser, FaCog,
  FaMapMarkerAlt, FaCheckCircle, FaClock, FaExclamationTriangle,
  FaSignOutAlt, FaBars, FaTimes, FaSearch
} from "react-icons/fa";

const sidebarItems = [
  { label: "Dashboard", icon: <FaHome size={14} />, active: true },
  { label: "My Reports", icon: <FaList size={14} /> },
  { label: "New Report", icon: <FaEdit size={14} /> },
  { label: "Notifications", icon: <FaBell size={14} /> },
  { label: "Profile", icon: <FaUser size={14} /> },
  { label: "Settings", icon: <FaCog size={14} /> },
];

const stats = [
  { label: "Total Reports", value: "127", color: "text-blue-600" },
  { label: "Resolved", value: "95", color: "text-green-600" },
  { label: "In Progress", value: "18", color: "text-amber-500" },
  { label: "Submitted", value: "14", color: "text-purple-600" },
];

const reports = [
  { title: "Pothole on MG Road", location: "Indiranagar, Bangalore", status: "Resolved", time: "2h ago" },
  { title: "Broken Street Light", location: "Koramangala, Bangalore", status: "In Progress", time: "1d ago" },
  { title: "Garbage Dump Near Park", location: "HSR Layout, Bangalore", status: "Assigned", time: "2d ago" },
  { title: "Water Pipe Burst", location: "Jayanagar, Bangalore", status: "Submitted", time: "3d ago" },
  { title: "Footpath Damaged", location: "Whitefield, Bangalore", status: "In Progress", time: "5d ago" },
];

const statusColors = {
  Resolved: "bg-green-100 text-green-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Assigned: "bg-purple-100 text-purple-700",
  Submitted: "bg-blue-100 text-blue-700",
};

const statusIcons = {
  Resolved: <FaCheckCircle size={12} />,
  "In Progress": <FaClock size={12} />,
  Assigned: <FaUser size={12} />,
  Submitted: <FaExclamationTriangle size={12} />,
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2 px-6 h-16 border-b border-gray-100 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">
            CF
          </div>
          CityFix
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition ${
                item.active
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Imroz Khan</p>
              <p className="text-xs text-gray-400 truncate">imroz@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-500"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={18} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-400 w-64">
              <FaSearch size={14} />
              <span>Search reports...</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition"
            >
              <FaSignOutAlt size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Welcome back, Imroz! Here&apos;s what&apos;s happening.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                <FaEdit size={14} />
                New Report
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Recent Reports</h2>
                <button className="text-sm text-blue-600 hover:underline">View All</button>
              </div>
              <div className="divide-y divide-gray-50">
                {reports.map((report) => (
                  <div
                    key={report.title}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <FaMapMarkerAlt size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{report.title}</p>
                        <p className="text-xs text-gray-400">{report.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                          statusColors[report.status]
                        }`}
                      >
                        {statusIcons[report.status]}
                        {report.status}
                      </span>
                      <span className="text-xs text-gray-400">{report.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
