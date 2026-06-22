export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-16 bg-gray-200 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="h-44 bg-gray-200 rounded-xl" />
        <div className="h-44 bg-gray-200 rounded-xl" />
        <div className="h-44 bg-gray-200 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="h-64 bg-gray-200 rounded-xl" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}
