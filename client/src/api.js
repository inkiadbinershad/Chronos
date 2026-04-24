import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
});

export const getProducts = (params) => API.get('/api/products', { params });
export const getProduct = (id) => API.get(`/api/products/${id}`);
export const createProduct = (data) => API.post('/api/products', data);
export const updateProduct = (id, data) => API.put(`/api/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);

export const getOrders = () => API.get('/api/orders');
export const getOrder = (id) => API.get(`/api/orders/${id}`);
export const createOrder = (data) => API.post('/api/orders', data);
export const updateOrder = (id, data) => API.put(`/api/orders/${id}`, data);

export default API;
