import React, { useEffect, useState } from "react";
import axios from "axios";
import bannerImg from "../assets/note.png";
import CartModal from "./CartModal";
import { Link } from "react-router-dom";

const EXCHANGE_RATE = 12500;

const OlchaPage = () => {
  const [products, setProducts] = useState([]);
  const [cartProduct, setCartProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/smartphones?limit=6")
      .then((res) => {
        setProducts(res.data.products);
        setTimeout(() => setLoading(false), 800); // Задержка для анимации
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {cartProduct && showCartModal && (
        <CartModal
          product={cartProduct}
          onClose={() => {
            setShowCartModal(false);
            setCartProduct(null);
          }}
        />
      )}

      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-10 left-10 w-60 h-60 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        
        <div className="lg:w-1/2 w-full flex items-center justify-center p-6 relative z-10">
          <div className="relative w-full max-w-2xl">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl blur-xl opacity-30 animate-pulse-slow"></div>
            <div className="relative bg-gradient-to-br from-[#3C0F78] to-[#21183C] rounded-3xl p-8 shadow-2xl border-8 border-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/15 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
              
              <div className="relative z-10">
                <img
                  src={bannerImg}
                  alt="Banner"
                  className="w-full h-auto object-contain transform transition-all duration-1000 hover:scale-105"
                />
              </div>
              
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full px-6 py-10 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-800 mb-3">
                Популярные товары
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={`transform transition-all duration-700 ${
                    loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
                  }`}
                  style={{ transitionDelay: loading ? `${index * 100}ms` : '0ms' }}
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="block h-full"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white relative overflow-hidden h-full flex flex-col group">
                      {/* Акцентный уголок */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-bl from-purple-600 to-indigo-700 rotate-45 transform origin-center"></div>
                      </div>
                      
                      {/* Градиентная рамка */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-300/50 transition-all duration-500 pointer-events-none"></div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-center mb-5">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl -rotate-3 scale-105"></div>
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="relative w-full h-40 object-contain z-10 transform transition-all duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <h2 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-purple-700 transition-colors">
                            {product.title}
                          </h2>
                          <p className="text-gray-500 text-sm mb-3 bg-gray-100 inline-block px-2 py-1 rounded-full">
                            {product.brand}
                          </p>
                          
                          <div className="space-y-2 mb-5">
                            <p className="text-xl font-extrabold text-gray-900">
                              {(product.price * EXCHANGE_RATE).toLocaleString("ru-RU")}{" "}
                              сум
                            </p>
                            <div className="flex items-center">
                              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-md mr-2">
                                -{product.discountPercentage}%
                              </div>
                              <p className="text-blue-600 text-sm font-medium">
                                {Math.round(
                                  (product.price * EXCHANGE_RATE) / 12
                                ).toLocaleString("ru-RU")}{" "}
                                сум x 12 мес
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault(); 
                            setCartProduct(product);
                            setShowCartModal(true);
                          }}
                          className="mt-auto relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 w-full font-bold shadow-lg hover:shadow-xl group-hover:scale-[1.02] transform transition-transform"
                        >
                          <span className="relative z-10">В корзину</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OlchaPage;