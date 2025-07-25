import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SimilarProducts from './SimilarProducts';
import { useCart } from '../context/CartContext';

const EXCHANGE_RATE = 12500;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [quantity, setQuantity] = useState(1); // 💥 количество
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false); 


  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        const data = res.data;
        setProduct(data);
        setSelectedImage(data.thumbnail);
        setLoading(false);

        if (data.category === 'smartphones') {
          setSelectedColor('Черный');
          setSelectedMemory('128GB');
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedColor, selectedMemory);
      }
      setShowSuccess(true); 

      setTimeout(() => setShowSuccess(false), 3000);
    }
  };


  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500"></div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-32">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Товар не найден</h2>
      <Link
        to="/"
        className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full transition duration-300"
      >
        Вернуться на главную
      </Link>
    </div>
  );

  const priceSom = (product.price * EXCHANGE_RATE).toLocaleString('ru-RU');
  const monthly = Math.round((product.price * EXCHANGE_RATE) / 12).toLocaleString('ru-RU');

  const specifications = (() => {
    switch (product.category) {
      case 'smartphones': return [
        { name: 'Процессор', value: 'Apple A17 Pro' },
        { name: 'Оперативная память', value: '6 ГБ' },
        { name: 'Память', value: '256 ГБ' },
        { name: 'Экран', value: '6.7" OLED' },
        { name: 'Батарея', value: '4422 мАч' },
        { name: 'ОС', value: 'Android 13' },
        { name: 'Защита', value: 'IP54' },
      ];
      case 'groceries': return [
        { name: 'Тип', value: 'Фрукт' },
        { name: 'Страна происхождения', value: 'Иран' },
        { name: 'Вес', value: '500 г' },
        { name: 'Калорийность', value: '41 ккал на 100 г' },
      ];
      case 'fragrances': return [
        { name: 'Объём', value: '100 мл' },
        { name: 'Тип', value: 'Парфюмированная вода' },
        { name: 'Для кого', value: 'Унисекс' },
        { name: 'Производитель', value: 'Chanel' },
      ];
      default: return [
        { name: 'Категория', value: product.category },
        { name: 'Бренд', value: product.brand },
      ];
    }
  })();

  const galleryImages = product.images.slice(0, 4);
  const colorOptions = ['Черный', 'Белый', 'Синий', 'Красный', 'Зеленый'];
  const memoryOptions = ['64GB', '128GB', '256GB', '512GB'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link to="/" className="hover:text-rose-500">Главная</Link></li>
          <li className="text-gray-300">/</li>
          <li className="capitalize">{product.category}</li>
          <li className="text-gray-300">/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{product.title}</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="bg-gray-200 rounded-2xl p-6 flex justify-center items-center h-[400px] mb-6 shadow-sm border border-gray-200">
            <img src={selectedImage} alt={product.title} className="max-h-full object-contain cursor-pointer" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`cursor-pointer h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImage === image
                  ? 'border-rose-200 ring-2 ring-rose-300'
                  : 'border-gray-300 hover:border-gray-300'
                  }`}
              >
                <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.brand}
          </span>

          <div className="flex items-center mb-4 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">{product.rating} ({product.stock} шт.)</span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Характеристики</h2>
            <div className="space-y-3">
              {specifications.map((spec, i) => (
                <div key={i} className="flex text-sm">
                  <span className="text-gray-500 w-40">{spec.name}</span>
                  <span className="text-gray-900 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {product.category === 'smartphones' && (
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Цвет:</h3>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${selectedColor === color
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Объем памяти:</h3>
                <div className="flex flex-wrap gap-2">
                  {memoryOptions.map(memory => (
                    <button
                      key={memory}
                      onClick={() => setSelectedMemory(memory)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${selectedMemory === memory
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'
                        }`}
                    >
                      {memory}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mb-6 flex items-center gap-4">
            <span className="text-md font-medium text-gray-700">Количество:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                className="px-3 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100"
              >-</button>
              <span className="px-5 text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100"
              >+</button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-3xl font-bold text-gray-900">{priceSom} сум</p>
              <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{Math.round(product.discountPercentage)}%
              </span>
            </div>
            <p className="text-rose-600 font-medium">{monthly} сум x 12 мес</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Добавить в корзину
          </button>
          {showSuccess && (
            <div className="mt-4 bg-green-100 text-green-800 font-medium px-4 py-3 rounded-lg shadow-sm border border-green-200 transition duration-300">
              ✅ Товар добавлен в корзину
            </div>
          )}

        </div>
      </div>
      <SimilarProducts category={product.category} currentProductId={product.id} />
    </div>
  );
};

export default ProductDetail;
