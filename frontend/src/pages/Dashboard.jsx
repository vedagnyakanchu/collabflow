import { FolderKanban, CheckCircle, Clock, AlertTriangle } from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Total Projects",
      value: "8",
      icon: <FolderKanban size={22} />,
    },
    {
      title: "Completed Tasks",
      value: "124",
      icon: <CheckCircle size={22} />,
    },
    {
      title: "Pending Tasks",
      value: "32",
      icon: <Clock size={22} />,
    },
    {
      title: "Overdue Tasks",
      value: "5",
      icon: <AlertTriangle size={22} />,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">
          Dashboard 🚀
        </h2>
        <p className="text-gray-400 mt-2">
          Overview of your workspace activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2 text-white">
                  {stat.value}
                </h3>
              </div>
              <div className="text-blue-500">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-3">
          Recent Activity
        </h3>
        <p className="text-gray-400">
          Activity tracking coming soon...
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
