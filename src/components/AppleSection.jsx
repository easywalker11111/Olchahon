import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartModal from './CartModal';

const EXCHANGE_RATE = 12500;

const AppleProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartProduct, setCartProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/search?q=Apple')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products.slice(0, 6));
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/3 mx-auto mb-16"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                <div className="bg-gray-200 rounded-2xl w-full h-64 mb-6"></div>
                <div className="h-8 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-8"></div>
                <div className="h-10 bg-gray-200 rounded-xl w-full mb-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
          Apple техника
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => {
          const priceSom = (product.price * EXCHANGE_RATE).toLocaleString('ru-RU');
          const monthly = Math.round((product.price * EXCHANGE_RATE) / 12).toLocaleString('ru-RU');

          return (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 h-64">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <h2 className="text-2xl font-bold mb-2 text-gray-900">{product.title}</h2>
              <p className="text-sm font-semibold text-gray-500 mb-6">{product.brand}</p>

              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-3xl font-extrabold text-gray-900">{priceSom} сум</p>
                    <p className="text-rose-600 font-semibold">{monthly} сум x 12 мес</p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCartProduct(product);
                    setShowCartModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Добавить в корзину
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {cartProduct && showCartModal && (
        <CartModal
          product={cartProduct}
          onClose={() => {
            setCartProduct(null);
            setShowCartModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AppleProducts;
