import { createContext, useContext, useState } from 'react';
import { PRODUCTS, ORDERS } from '../data';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState(ORDERS);

  const addProduct = (product) => {
    setProducts(prev => [{ ...product, id: Date.now(), reviews: 0, rating: 0 }, ...prev]);
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <AdminContext.Provider value={{ products, orders, addProduct, removeProduct, updateProduct, updateOrderStatus }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
