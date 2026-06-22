import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'
import ChartCard from '../../components/admin/ChartCard'
import { buildCategoryChartData, buildMonthlyActivity } from '../../lib/adminUtils'

export default function AdminStatistics() {
  const [monthlyReports, setMonthlyReports] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [statusData, setStatusData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: reports } = await supabase.from('reports').select('*')
      if (reports) {
        setMonthlyReports(buildMonthlyActivity(reports))
        setCategoryData(buildCategoryChartData(reports))

        const statuses = ['Submitted', 'In Progress', 'Resolved']
        setStatusData(statuses.map((s) => ({
          name: s,
          count: reports.filter((r) => r.status === s).length,
        })))
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
        <p className="text-sm text-gray-500 mt-1">Platform analytics and performance metrics.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Active Users Over Time" subtitle="Monthly active citizens">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReports}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Reports by Status" subtitle="Current status breakdown">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="lg:col-span-2">
            <ChartCard title="Reports by Category" subtitle="Issue type distribution">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="text-center p-4 rounded-lg bg-gray-50">
                    <p className="text-2xl font-bold text-gray-900">{cat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{cat.name}</p>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
