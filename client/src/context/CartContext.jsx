import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i._id !== action.payload) };
    case 'UPDATE_QTY':
      if (action.payload.qty < 1) return { ...state, items: state.items.filter(i => i._id !== action.payload.id) };
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        )
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const saved = localStorage.getItem('chronos_cart');
  const initial = saved ? { items: JSON.parse(saved) } : { items: [] };
  const [state, dispatch] = useReducer(cartReducer, initial);

  useEffect(() => {
    localStorage.setItem('chronos_cart', JSON.stringify(state.items));
  }, [state.items]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      total,
      count,
      addToCart: (p) => dispatch({ type: 'ADD', payload: p }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', payload: id }),
      updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
