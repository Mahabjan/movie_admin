import { Film, LayoutDashboard, Calendar, BarChart, Table } from 'lucide-react';
import { useRoute } from '../context/RouteContext';

const NavItem = ({ id, label, icon: Icon }) => {
  const { route, setRoute } = useRoute();
  const active = route === id;

  return (
    <button
      onClick={() => setRoute(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm w-full text-left
      ${active ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700'}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 hidden md:flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Film className="text-indigo-600" />
        <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
          Movie Admin
        </span>
      </div>

      <nav className="space-y-1">
        <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
        <NavItem id="calendar" label="Calendar" icon={Calendar} />
        <NavItem id="kanban" label="Kanban" icon={Table} />
        <NavItem id="analytics" label="Analytics" icon={BarChart} />
        <NavItem id="tickets" label="Tickets" icon={Table} />
      </nav>
    </aside>
  );
}
