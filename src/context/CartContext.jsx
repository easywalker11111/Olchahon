import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const generateItemKey = (product, color, memory) => `${product.id}-${color}-${memory}`;

  const addToCart = (product, color, memory) => {
    const itemKey = generateItemKey(product, color, memory);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.key === itemKey);
      if (existingItem) {
        return prevItems.map(item =>
          item.key === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevItems,
          {
            key: itemKey,
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            brand: product.brand,
            color,
            memory,
            quantity: 1
          }
        ];
      }
    });
  };

  const removeFromCart = (key) => {
    setCartItems(prevItems => prevItems.filter(item => item.key !== key));
  };

  const updateQuantity = (key, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.key === key ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity * 12500),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};