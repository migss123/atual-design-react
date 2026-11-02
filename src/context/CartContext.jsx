import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "atualDesignCarrinho";

function readCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [toast, setToast] = useState("");
  const toastTimeout = useRef(null);

  const persist = useCallback((nextItems) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimeout.current);
    toastTimeout.current = window.setTimeout(() => setToast(""), 3200);
  }, [toastTimeout]);

  const addToCart = useCallback(async (design) => {
    const existing = items.find((item) => item.id === design.id);
    const nextItems = existing
      ? items.map((item) => item.id === design.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...design, quantity: 1 }];

    persist(nextItems);
    showToast(existing ? "Quantidade atualizada no carrinho." : "Design adicionado ao carrinho.");
    return nextItems.find((item) => item.id === design.id);
  }, [items, persist, showToast]);

  const removeFromCart = useCallback(async (id) => {
    persist(items.filter((item) => item.id !== id));
  }, [items, persist]);

  const updateQuantity = useCallback(async (id, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1);
    persist(items.map((item) => item.id === id ? { ...item, quantity: nextQuantity } : item));
  }, [items, persist]);

  const clearCart = useCallback(async () => {
    persist([]);
  }, [persist]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const projectCount = items.length;
  const value = useMemo(() => ({
    items,
    itemCount,
    projectCount,
    toast,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }), [items, itemCount, projectCount, toast, addToCart, removeFromCart, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}
