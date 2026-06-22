import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'
import ChartCard from '../../components/admin/ChartCard'
import StatusBadge from '../../components/StatusBadge'
import { buildCategoryChartData, formatDate } from '../../lib/adminUtils'

export default function AdminReportsOverview() {
  const [reports, setReports] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('reports')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false })

      if (data) {
        setReports(data)
        setCategoryData(buildCategoryChartData(data))
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const statusCounts = {
    Submitted: reports.filter((r) => r.status === 'Submitted').length,
    'In Progress': reports.filter((r) => r.status === 'In Progress').length,
    Resolved: reports.filter((r) => r.status === 'Resolved').length,
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Comprehensive view of all report activity.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <StatusBadge status={status} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <ChartCard title="Category Distribution">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {categoryData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Recent Activity" subtitle={`${reports.length} total reports`}>
              <div className="space-y-3 max-h-56 overflow-y-auto">
                {reports.slice(0, 8).map((r) => (
                  <div key={r.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 truncate flex-1 mr-2">{r.title}</span>
                    <span className="text-gray-400 text-xs shrink-0">{formatDate(r.created_at)}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
