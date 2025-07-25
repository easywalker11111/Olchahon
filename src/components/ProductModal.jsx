import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!product) return null;

  const priceTotal = product.price * 12500 * quantity;
  const monthly = Math.round(priceTotal / 12);

  const formattedPrice = priceTotal.toLocaleString('ru-RU');
  const formattedMonthly = monthly.toLocaleString('ru-RU');

  const originalPrice = Math.round(product.price * 12500 * (1 + (product.discountPercentage || 0) / 100) * quantity)
    .toLocaleString('ru-RU');

  const handleGoToDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          className="cursor-pointer absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-gray-100 rounded-full shadow-md transition-all"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
          <div className="w-full lg:w-1/2">
            <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-8">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
              />
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discountPercentage}%
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {[...Array(4)].map((_, idx) => (
                <button
                  key={idx}
                  className="flex-shrink-0 w-16 h-16 border border-gray-200 hover:border-blue-400 rounded-lg overflow-hidden transition-all"
                >
                  <img
                    src={product.thumbnail}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">{product.brand || 'Бренд'}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h2>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">({product.rating || 5})</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Сколько вы хотите купить:</p>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setQuantity(qty)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                      quantity === qty
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{formattedPrice} сум</p>
                {product.discountPercentage && (
                  <span className="text-lg text-gray-500 line-through">
                    {originalPrice} сум
                  </span>
                )}
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-blue-700 font-medium">
                  <span className="text-lg">{formattedMonthly} сум</span> x 12 мес
                </p>
                <p className="text-blue-700 text-sm mt-1">В рассрочку без переплат</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleGoToDetails}
                className="cursor-pointer flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-xl font-medium transition-colors"
              >
                Перейти к деталям
              </button>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4">
              <h3 className="text-lg font-semibold mb-3">Характеристики</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex">
                  <span className="w-32 text-gray-500">Категория:</span>
                  <span className="capitalize">{product.category}</span>
                </li>
                <li className="flex">
                  <span className="w-32 text-gray-500">На складе:</span>
                  <span>{product.stock} шт.</span>
                </li>
                <li className="flex">
                  <span className="w-32 text-gray-500">Гарантия:</span>
                  <span>12 месяцев</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
