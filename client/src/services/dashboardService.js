import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

export const getDashboardSummary = () => axios.get(`${API}/dashboard/summary`);
export const getBudgets = (month) => axios.get(`${API}/budgets`, { params: { month } });
export const setBudget = (data) => axios.post(`${API}/budgets`, data);