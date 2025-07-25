import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartModal from './CartModal';

const EXCHANGE_RATE = 12500;

const Discounts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartProduct, setCartProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscountedTech = async () => {
      try {
        setLoading(true);
        const techCategories = ["smartphones", "laptops", "lighting", "automotive", "motorcycle"];
        const techProducts = [];

        for (const category of techCategories) {
          const res = await fetch(`https://dummyjson.com/products/category/${category}`);
          const data = await res.json();
          techProducts.push(...data.products);
        }

        const discountedProducts = techProducts
          .filter(product => product.discountPercentage > 10)
          .sort((a, b) => b.discountPercentage - a.discountPercentage)
          .slice(0, 40);

        setProducts(discountedProducts);
      } catch (error) {
        console.error('Ошибка при получении товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedTech();
  }, []);

  const formatPrice = (price) => (price * EXCHANGE_RATE).toLocaleString('ru-RU');
  const formatOldPrice = (price, discount) =>
    ((price * (1 + discount / 100)) * EXCHANGE_RATE).toLocaleString('ru-RU');
  const formatMonthly = (price) =>
    Math.round((price * EXCHANGE_RATE) / 12).toLocaleString('ru-RU');

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white py-8 text-center mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <h1 className="text-4xl font-bold mb-3 relative z-10">
          <span className="text-white drop-shadow-lg">СУПЕР</span>
          <span className="text-black bg-amber-300 px-4 py-1 rounded-full mx-2">РАСПРОДАЖИ</span>
        </h1>
        <p className="text-xl font-medium relative z-10">
          Скидки до <span className="font-bold text-2xl bg-black/30 px-3 py-1 rounded-full">20%</span>
        </p>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-amber-500"></div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-5 flex flex-col cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div 
              onClick={() => navigate(`/product/${product.id}`)}
              className="relative h-52 w-full mb-4 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Логика добавления в избранное
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div 
              className="flex-grow"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{product.brand}</p>

              <div className="flex items-center gap-2 mb-3">
                <p className="text-xl font-extrabold text-gray-900">{formatPrice(product.price)} сум</p>
                <p className="text-sm line-through text-gray-400">
                  {formatOldPrice(product.price, product.discountPercentage)} сум
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 mb-4 border border-amber-100">
                <p className="text-amber-700 font-bold text-sm">
                  {formatMonthly(product.price)} сум / мес
                </p>
                <p className="text-amber-600 text-xs">12 месяцев без переплат</p>
              </div>
            </div>

            <div className="mt-auto flex justify-between items-center">
              <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                Скидка: {Math.round(product.discountPercentage)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCartProduct(product);
                  setShowCartModal(true);
                }}
                className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 text-sm font-bold rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300"
              >
                В корзину
              </button>
            </div>
          </div>
        ))}
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

export default Discounts;