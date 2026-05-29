import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getBudgets, setBudget } from '../services/dashboardService';
import axios from 'axios';

const EXPENSE_CATEGORIES = ['Food', 'Rent', 'Travel', 'Shopping', 'Bills', 'Education', 'Other'];

export default function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ category: 'Food', limit: '' });
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(false);

  const fetchBudgets = async () => {
    const { data } = await getBudgets(month);
    setBudgets(data);
  };

  useEffect(() => { fetchBudgets(); }, [month]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setBudget({ ...form, month });
      setForm({ category: 'Food', limit: '' });
      fetchBudgets();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/budgets/${id}`);
    fetchBudgets();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Budget Manager</h2>

        <div className="flex items-center gap-4 mb-6">
          <label className="text-sm font-medium text-gray-600">Month:</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        {/* Set Budget Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Set Budget Limit</h3>
          <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              {EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input
              type="number"
              value={form.limit}
              onChange={(e) => setForm({ ...form, limit: e.target.value })}
              placeholder="Budget limit (₹)"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required min="0"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Set Budget'}
            </button>
          </form>
        </div>

        {/* Budget List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Budgets — {month}</h3>
          {budgets.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No budgets set for this month.</p>
          ) : (
            <div className="space-y-3">
              {budgets.map(b => (
                <div key={b._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">{b.category}</span>
                    <span className="ml-3 text-indigo-600 font-semibold">₹{b.limit.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}