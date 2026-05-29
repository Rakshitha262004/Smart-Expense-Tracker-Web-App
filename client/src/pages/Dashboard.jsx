import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getDashboardSummary } from '../services/dashboardService';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary()
      .then(({ data }) => setSummary(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-indigo-600 text-lg font-medium animate-pulse">Loading dashboard...</div>
    </div>
  );

  const pieData = summary?.categoryExpenses?.map(c => ({
    name: c._id,
    value: c.total
  })) || [];

  const barData = summary?.monthlyTrend?.map(m => ({
    month: MONTH_NAMES[m._id.month - 1],
    amount: m.total
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Overview</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Total Income</p>
            <p className="text-3xl font-bold text-green-600">₹{summary?.totalIncome?.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-red-500">₹{summary?.totalExpenses?.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Net Balance</p>
            <p className={`text-3xl font-bold ${summary?.balance >= 0 ? 'text-indigo-600' : 'text-red-600'}`}>
              ₹{summary?.balance?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Budget Alerts */}
        {summary?.budgetStatus?.filter(b => b.isOver).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-red-700 mb-2">⚠️ Budget Alerts</h3>
            {summary.budgetStatus.filter(b => b.isOver).map(b => (
              <p key={b.category} className="text-red-600 text-sm">
                {b.category}: Spent ₹{b.spent} / Limit ₹{b.limit} ({b.percentage}% used)
              </p>
            ))}
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Expenses by Category</h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-10">No expense data yet</p>
            )}
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Spending Trend</h3>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-10">No monthly data yet</p>
            )}
          </div>
        </div>

        {/* Budget Progress */}
        {summary?.budgetStatus?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Budget Status (This Month)</h3>
            <div className="space-y-3">
              {summary.budgetStatus.map(b => (
                <div key={b.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{b.category}</span>
                    <span className={b.isOver ? 'text-red-600 font-medium' : 'text-gray-500'}>
                      ₹{b.spent} / ₹{b.limit}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${b.isOver ? 'bg-red-500' : b.percentage > 75 ? 'bg-yellow-400' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(b.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}