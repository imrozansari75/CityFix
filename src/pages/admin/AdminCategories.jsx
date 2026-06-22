import { useState, useEffect } from 'react'
import { Tags } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'
import { normalizeCategory } from '../../lib/adminUtils'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('reports').select('category')
      if (data) {
        const counts = {}
        data.forEach((r) => {
          const label = normalizeCategory(r.category)
          counts[label] = (counts[label] || 0) + 1
        })
        setCategories(Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count))
      }
      setLoading(false)
    }
    fetchCategories()
  }, [])

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-sm text-gray-500 mt-1">Report categories and their usage across the platform.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Tags size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Tags size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{cat.name}</p>
                  <p className="text-sm text-gray-400">{cat.count} report{cat.count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
