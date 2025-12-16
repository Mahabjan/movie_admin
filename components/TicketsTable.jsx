import { useState, useMemo } from 'react';

const initialTickets = [
  { id: 1, user: 'John Doe', movie: 'Inception', seats: 2, status: 'Booked' },
  { id: 2, user: 'Jane Smith', movie: 'Dune', seats: 3, status: 'Cancelled' },
  { id: 3, user: 'Alex Lee', movie: 'Interstellar', seats: 1, status: 'Booked' },
  { id: 4, user: 'Sam Roy', movie: 'Tenet', seats: 4, status: 'Booked' },
  { id: 5, user: 'Chris Ray', movie: 'Avatar 2', seats: 2, status: 'Booked' },
];

export default function TicketsTable() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const [form, setForm] = useState({
    user: '',
    movie: '',
    seats: 1,
    status: 'Booked',
  });

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch =
        t.user.toLowerCase().includes(search.toLowerCase()) ||
        t.movie.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === 'All' ? true : t.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [tickets, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const data = filtered.slice((page - 1) * pageSize, page * pageSize);

  const addTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now(),
      user: form.user,
      movie: form.movie,
      seats: Number(form.seats),
      status: form.status,
    };
    setTickets((prev) => [newTicket, ...prev]);
    setForm({ user: '', movie: '', seats: 1, status: 'Booked' });
    setPage(1);
  };

  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Tickets
      </h2>

      <form
        onSubmit={addTicket}
        className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4"
      >
        <input
          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-transparent text-gray-800 dark:text-gray-100"
          placeholder="User"
          value={form.user}
          onChange={(e) => setForm({ ...form, user: e.target.value })}
          required
        />
        <input
          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-transparent text-gray-800 dark:text-gray-100"
          placeholder="Movie"
          value={form.movie}
          onChange={(e) => setForm({ ...form, movie: e.target.value })}
          required
        />
        <input
          type="number"
          min={1}
          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-transparent text-gray-800 dark:text-gray-100"
          placeholder="Seats"
          value={form.seats}
          onChange={(e) => setForm({ ...form, seats: e.target.value })}
          required
        />
        <select
          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-transparent text-gray-800 dark:text-gray-100"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Booked</option>
          <option>Cancelled</option>
        </select>
        <button className="bg-indigo-600 text-white text-sm rounded px-3 py-1 hover:bg-indigo-700">
          Add
        </button>
      </form>

      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between mb-3">
        <input
          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-transparent text-gray-800 dark:text-gray-100 w-full md:w-64"
          placeholder="Search by user or movie"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-transparent text-gray-800 dark:text-gray-100 w-full md:w-40"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option>All</option>
          <option>Booked</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="px-3 py-2 text-left">User</th>
              <th className="px-3 py-2 text-left">Movie</th>
              <th className="px-3 py-2 text-left">Seats</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-100 dark:border-gray-700"
              >
                <td className="px-3 py-2 text-gray-800 dark:text-gray-100">
                  {t.user}
                </td>
                <td className="px-3 py-2 text-gray-800 dark:text-gray-100">
                  {t.movie}
                </td>
                <td className="px-3 py-2 text-gray-800 dark:text-gray-100">
                  {t.seats}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t.status === 'Booked'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => deleteTicket(t.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  className="px-3 py-4 text-center text-gray-500 dark:text-gray-400"
                  colSpan={5}
                >
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-gray-600 dark:text-gray-300">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
