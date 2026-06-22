import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import MyReports from './pages/MyReports'
import SubmitReport from './pages/SubmitReport'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminReports from './pages/admin/AdminReports'
import ReportDetail from './pages/admin/ReportDetail'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCategories from './pages/admin/AdminCategories'
import AdminRoles from './pages/admin/AdminRoles'
import AdminStatistics from './pages/admin/AdminStatistics'
import AdminReportsOverview from './pages/admin/AdminReportsOverview'
import AdminSettings from './pages/admin/AdminSettings'
import AdminLogs from './pages/admin/AdminLogs'
import AdminLogin from './pages/AdminLogin'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/my-reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>} />
        <Route path="/submit-report" element={<ProtectedRoute><SubmitReport /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
        <Route path="/admin/reports/:id" element={<AdminRoute><ReportDetail /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
        <Route path="/admin/roles" element={<AdminRoute><AdminRoles /></AdminRoute>} />
        <Route path="/admin/statistics" element={<AdminRoute><AdminStatistics /></AdminRoute>} />
        <Route path="/admin/reports-overview" element={<AdminRoute><AdminReportsOverview /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
        <Route path="/admin/logs" element={<AdminRoute><AdminLogs /></AdminRoute>} />
      </Routes>
    </AuthProvider>
  )
}
