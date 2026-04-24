import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, id: Date.now() });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(x => x.id === product.id);
      if (existing) return prev.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to your selection`);
  }, [showToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(x => x.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const count = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <CartContext.Provider value={{ cart, count, total, isOpen, setIsOpen, addToCart, removeFromCart, clearCart, toast, showToast }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
