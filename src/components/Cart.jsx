import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const priceSom = (item.price * 12500).toLocaleString('ru-RU');
  const totalItemPrice = (item.price * 12500 * item.quantity).toLocaleString('ru-RU');

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-100">
      <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center mr-6">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-16 h-16 object-contain"
        />
      </div>

      <div className="flex-1 min-w-0 mr-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.color && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Цвет: {item.color}
                </span>
              )}
              {item.memory && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Память: {item.memory}
                </span>
              )}
              {item.brand && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {item.brand}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 sm:mt-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
            >
              -
            </button>
            <span className="w-10 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">{totalItemPrice} сум</p>
            <p className="text-sm text-gray-500">{priceSom} сум/шт</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const formattedTotal = totalPrice.toLocaleString('ru-RU');

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center py-20">
          <div className="mx-auto bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ваша корзина пуста</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Добавьте товары из каталога, чтобы продолжить покупки
          </p>
          <Link
            to="/"
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Корзина ({cartItems.length} товара)</h1>
        <button
          onClick={clearCart}
          className="flex items-center text-gray-500 hover:text-red-500 mt-4 md:mt-0 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Очистить корзину
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          {cartItems.map(item => (
            <CartItem key={`${item.id}-${item.color}-${item.memory}`} item={item} />
          ))}
        </div>

        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Общая стоимость:</span>
            <span className="text-2xl font-bold text-gray-900">{formattedTotal} сум</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="px-6 py-3 text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Продолжить покупки
            </Link>
            <Link to="/checkout">
              <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors">
                Перейти к оформлению
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;