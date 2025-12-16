import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';


export default function Topbar({ onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onToggleSidebar}
        >
          <Menu className="text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Admin Dashboard
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {theme === 'light' ? (
          <Moon className="text-gray-700" />
        ) : (
          <Sun className="text-yellow-400" />
        )}
      </button>
    </header>
  );
}
