export default function StatsCard({ icon: Icon, label, value, subtitle, bgColor, iconColor }) {
  return (
    <div className="bg-white rounded-xl flex justify-between items-center border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${bgColor}`}>
        <Icon size={24} className={iconColor} />
      </div>
    </div>
  )
}
