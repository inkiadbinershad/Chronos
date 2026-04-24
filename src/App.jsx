import { Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminOverview from './pages/Admin/AdminOverview';
import AdminInventory from './pages/Admin/AdminInventory';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminUsers from './pages/Admin/AdminUsers';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import Cursor from './components/Cursor';
import Home from './pages/Home';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <Cursor />
      <Toast />
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
<Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin" element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }>
    <Route index element={<AdminOverview />} />
    <Route path="products" element={<AdminInventory />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="users" element={<AdminUsers />} />
  </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
