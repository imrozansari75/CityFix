import { FaMapMarkerAlt } from "react-icons/fa";
import StatusBadge from "./StatusBadge";

export default function RecentReports({ reports }) {
  return (
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
              <StatusBadge status={report.status} />
              <span className="text-xs text-gray-400">{report.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
