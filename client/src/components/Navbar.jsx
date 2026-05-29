import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
        💰 SmartTrack
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">Dashboard</Link>
        <Link to="/transactions" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">Transactions</Link>
        <Link to="/budget" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">Budget</Link>
        <span className="text-gray-400 text-sm">Hi, {user?.name?.split(' ')[0]}</span>
        <button
          onClick={logout}
          className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
