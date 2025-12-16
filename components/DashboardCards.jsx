import { Users, Ticket, DollarSign } from 'lucide-react';

const Card = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-700">
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        {value}
      </p>
    </div>
    <div className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600">
      <Icon size={22} />
    </div>
  </div>
);

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card icon={Users} label="Total Users" value="12,340" />
      <Card icon={Ticket} label="Tickets Sold" value="4,512" />
      <Card icon={DollarSign} label="Revenue" value="$92,340" />
    </div>
  );
}
