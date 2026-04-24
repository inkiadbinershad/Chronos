import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminCustomers from './pages/admin/Customers';

function StorefrontLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-chr-black flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-chr-gold/20 border-t-chr-gold animate-spin" />
    </div>
  );
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <CustomCursor />
          <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>

          {/* Storefront Routes */}
          <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
          <Route path="/shop" element={<StorefrontLayout><Shop /></StorefrontLayout>} />
          <Route path="/product/:id" element={<StorefrontLayout><ProductDetail /></StorefrontLayout>} />
          <Route path="/cart" element={<StorefrontLayout><Cart /></StorefrontLayout>} />

          {/* 404 */}
          <Route path="*" element={
            <StorefrontLayout>
              <div className="min-h-screen bg-chr-black flex items-center justify-center pt-20">
                <div className="text-center">
                  <p className="font-playfair text-chr-gold text-8xl font-bold mb-4">404</p>
                  <p className="font-raleway text-chr-muted text-lg mb-8">This page doesn't exist.</p>
                  <a href="/" className="btn-gold px-8 py-3.5 text-xs rounded-sm inline-block">Go Home</a>
                </div>
              </div>
            </StorefrontLayout>
          } />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
  );
}
