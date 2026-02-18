import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  BarChart3,
} from "lucide-react";

const Sidebar = () => {
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800";

  const activeStyle = "bg-blue-600 text-white shadow-lg";

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 p-5">
      <h1 className="text-2xl font-bold text-blue-500 mb-8">
        CollabFlow
      </h1>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <FolderKanban size={20} />
          Projects
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <CheckSquare size={20} />
          Tasks
        </NavLink>

        <NavLink
          to="/team"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <Users size={20} />
          Team
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <BarChart3 size={20} />
          Analytics
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
