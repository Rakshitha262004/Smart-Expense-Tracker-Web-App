import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

export const getTransactions = (params) => axios.get(`${API}/transactions`, { params });
export const addTransaction = (data) => axios.post(`${API}/transactions`, data);
export const updateTransaction = (id, data) => axios.put(`${API}/transactions/${id}`, data);
export const deleteTransaction = (id) => axios.delete(`${API}/transactions/${id}`);