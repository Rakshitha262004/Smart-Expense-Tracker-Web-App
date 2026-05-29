import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;