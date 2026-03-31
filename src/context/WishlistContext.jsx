import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('argos_wishlist')) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('argos_wishlist', JSON.stringify(items));
  }, [items]);

  const toggle = (product) => {
    setItems(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) => items.some(i => i.id === id);
  const count = items.length;

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
