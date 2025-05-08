import React, { useCallback, createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  cart: [],
  addProduct: () => {},
  removeProduct: () => {},
  clearCart: () => {},
  cartValue: 0,
  cartItemsCount: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          console.log('Cart loaded from localStorage:', parsedCart);
          return parsedCart;
        } else {
          console.warn('Stored cart is not an array:', parsedCart);
        }
      }
    } catch (error) {
      console.error('Error parsing stored cart:', error);
    }
    return [];
  });



  useEffect(() => {
    console.log('Cart updated:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = useCallback((product) => {
    console.log('Adding product to cart:', product);
    setCart((prevCart) => [...prevCart, product]);
  },[]);

  const removeProduct = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
  },[]);

  const clearCart = () => {
    setCart([]);
  };

  const cartValue = cart.reduce((sum, product) => sum + Number(product.price), 0).toFixed(2);
  const cartItemsCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, clearCart, cartValue, cartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};
