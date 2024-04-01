// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [totalItemsCart, setTotalItemsCart] = useState(() => {
    // Initialize state from Local Storage or set it to 0 if not present
    const storedCount = parseInt(localStorage.getItem("cartItemsCount"), 10);
    return isNaN(storedCount) ? 0 : storedCount;
  });

  useEffect(() => {
    // Persist totalItemsCart changes to Local Storage
    localStorage.setItem("cartItemsCount", totalItemsCart.toString());
  }, [totalItemsCart]);

  const updateCartCount = (count) => {
    setTotalItemsCart(count);
  };

  return (
    <CartContext.Provider value={{ totalItemsCart, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
