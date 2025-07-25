import React, { useEffect, useState } from 'react';
import ProductModal from './ProductModal';
import CartModal from './CartModal';
import { Link } from 'react-router-dom';

const EXCHANGE_RATE = 12500;

const ProductsList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProduct, setCartProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [animateHeart, setAnimateHeart] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = category
          ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
          : `https://dummyjson.com/products`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = (product) => {
    let updatedWishlist;
    if (wishlist.find((p) => p.id === product.id)) {
      updatedWishlist = wishlist.filter((p) => p.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
      setAnimateHeart(product.id);
      setTimeout(() => setAnimateHeart(null), 500);
    }
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (id) => wishlist.some((p) => p.id === id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {cartProduct && showCartModal && (
        <CartModal
          product={cartProduct}
          onClose={() => {
            setCartProduct(null);
            setShowCartModal(false);
          }}
        />
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-2 mt-8">
        {products.map((product) => {
          const priceInSom = (product.price * EXCHANGE_RATE).toLocaleString('ru-RU');
          const monthlyPrice = Math.round(product.price * EXCHANGE_RATE / 12).toLocaleString('ru-RU');
          const wishlisted = isInWishlist(product.id);
          const heartAnimate = animateHeart === product.id;

          return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110 z-0"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault(); // 🔒 Останавливаем переход по ссылке
                    toggleWishlist(product);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-md z-20 transition-all duration-300 
        ${wishlisted ? 'bg-red-100 text-red-600' : 'bg-white hover:bg-red-100 hover:text-red-600'} 
        ${heartAnimate ? 'animate-ping-slow' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col flex-grow p-4">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">
                  {product.brand || 'Premium Brand'}
                </p>

                <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-amber-600 transition-colors">
                  {product.title}
                </h3>

                <div className="mt-auto space-y-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-extrabold text-gray-900 tracking-tight">
                      {priceInSom} сум
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{monthlyPrice} сум/мес</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault(); // ⛔️ Предотвратить переход
                          setSelectedProduct(product);
                        }}
                        className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-emerald-500 text-emerald-600 rounded-full hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200 select-none active:scale-95"
                      >
                        📘 В рассрочку
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault(); // ⛔️ Предотвратить переход
                      setCartProduct(product);
                      setShowCartModal(true);
                    }}
                    className="mt-2 w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl text-sm font-bold cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-95 active:opacity-100 active:scale-[0.98]"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ProductsList;
