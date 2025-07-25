import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ product, onClose }) => {
  if (!product) return null;

  const priceInSom = (product.price * 12500).toLocaleString('ru-RU');
  const [selectedColor, setSelectedColor] = useState('Черный');
  const [quantity, setQuantity] = useState(1);
  const colors = [
    { name: 'Черный', hex: '#1C1C1E' },
    { name: 'Белый', hex: '#F5F5F7' },
    { name: 'Синий', hex: '#0A84FF' },
    { name: 'Красный', hex: '#FF453A' },
  ];
  const navigate = useNavigate();

  const handleGoToProduct = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    console.log(`Added to cart: ${product.title}, Color: ${selectedColor}, Quantity: ${quantity}`);
    onClose();
  };

  const increaseQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stock));
  const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-lg transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 animate-in fade-in zoom-in">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/5 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col">
            <div className="relative bg-white rounded-2xl shadow-inner flex items-center justify-center h-80">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full object-contain transition-transform duration-500 hover:scale-110"
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-rose-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-md">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-3 mt-6">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-xl p-2 border-2 border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={product.thumbnail}
                    alt={`preview-${i}`}
                    className="w-full h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-3/5 p-8 flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Закрыть"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-6">
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                {product.brand || 'Популярный бренд'}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-2">{product.title}</h2>
              
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.rating}/5)</span>
              </div>
              
              <p className="text-xl font-bold text-gray-900 mb-1">{priceInSom} сум</p>
              {product.discountPercentage > 0 && (
                <p className="text-gray-500 line-through mb-2">
                  {(product.price * 12500 * (1 + product.discountPercentage/100)).toLocaleString('ru-RU')} сум
                </p>
              )}
              <p className="text-green-600 font-medium text-sm">
                Рассрочка {(Math.round(product.price * 12500 / 12)).toLocaleString('ru-RU')} сум x 12 мес
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Цвет: <span className="font-semibold text-gray-900">{selectedColor}</span></p>
                <div className="flex gap-3 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={`flex flex-col items-center group ${
                        selectedColor === color.name ? '' : ''
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full border-2 border-gray-200 transition-all duration-200 ${
                          selectedColor === color.name 
                            ? 'ring-2 ring-offset-2 ring-rose-500' 
                            : 'group-hover:ring-2 group-hover:ring-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs mt-1 text-gray-600">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Количество:</p>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-l-lg text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-xl">-</span>
                  </button>
                  <div className="w-14 h-10 flex items-center justify-center bg-gray-50 border-y border-gray-200">
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <button 
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-r-lg text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-xl">+</span>
                  </button>
                  <span className="ml-3 text-sm text-gray-500">Доступно: {product.stock} шт.</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                className="px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={handleGoToProduct}
              >
                Добавить в корзину
              </button>
              <button
                className="px-6 py-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md"
                onClick={onClose}
              >
                Продолжить покупки
              </button>
            </div>
            
            <button 
              className="mt-6 text-center text-rose-600 hover:text-rose-700 font-medium flex items-center justify-center group"
              onClick={handleGoToProduct}
            >
              Подробнее о товаре
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>В наличии</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Доставка за 2 дня</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Гарантия 12 месяцев</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Оплата картой онлайн</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;