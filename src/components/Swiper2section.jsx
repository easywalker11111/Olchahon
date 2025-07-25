import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import banner1 from '../assets/1.jpg'; 
import banner2 from '../assets/2.jpg';
import banner3 from '../assets/3.jpg'; 
import banner4 from '../assets/4.jpg'; 
import banner5 from '../assets/5.jpg'; 
import banner6 from '../assets/6.png';
import banner7 from '../assets/7.jpg'; 

const SmartphoneSwiper = () => {
  const banners = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];
  const categories = [
    'smartphones',
    'laptops',
    'televisions',
    'fragrances',
    'skincare',
    'groceries',
    'mens-shirts',
  ];

  const [linkedProducts, setLinkedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const fetchCategoryProducts = async () => {
    const results = await Promise.all(
      categories.map(async (cat) => {
        const res = await axios.get(`https://dummyjson.com/products/category/${cat}`);
        return res.data.products[0]; 
      })
    );
    setLinkedProducts(results);
  };

  const fetchRandomProduct = async () => {
    const res = await axios.get('https://dummyjson.com/products');
    const products = res.data.products;
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };

  const updateProductOfTheDay = async () => {
    const newProduct = await fetchRandomProduct();
    const expiresAt = Date.now() + 3600 * 1000;
    localStorage.setItem('productOfTheDay', JSON.stringify(newProduct));
    localStorage.setItem('productExpiresAt', expiresAt);
    setProduct(newProduct);
    setTimeLeft(3600);
  };

  useEffect(() => {
    fetchCategoryProducts();

    const savedProduct = JSON.parse(localStorage.getItem('productOfTheDay'));
    const expiresAt = parseInt(localStorage.getItem('productExpiresAt'), 10);

    if (savedProduct && expiresAt && Date.now() < expiresAt) {
      setProduct(savedProduct);
      setTimeLeft(Math.floor((expiresAt - Date.now()) / 1000));
    } else {
      updateProductOfTheDay();
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          updateProductOfTheDay();
          return 3600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => {
    const h = String(Math.floor(t / 3600)).padStart(2, '0');
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);

  return (
    <div className="flex  flex-col md:flex-row gap-4 p-4 cursor-pointer">
      <div className="md:w-[75%] w-full relative mt-16">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          className="rounded-xl overflow-hidden border-gray-800"
        >
          {banners.map((img, index) => (
            <SwiperSlide key={index}>
              {linkedProducts[index] ? (
                <Link to={`/product/${linkedProducts[index].id}`}>
                  <img
                    src={img}
                    alt={linkedProducts[index].title}
                    className="w-full h-auto object-cover"
                  />
                </Link>
              ) : (
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto object-cover opacity-50"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="md:w-1/2 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 p-1 shadow-xl">
        <div className="bg-gradient-to-b bg-white rounded-xl p-5 flex flex-col">
          <h2 className="font-bold text-2xl text-amber-400 mb-4 text-center">Товар дня</h2>
          
          <div className="flex justify-center gap-2 mb-5">
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 text-amber-600 text-xl font-bold w-16 h-16 rounded-xl flex items-center border-2 justify-center">
                {h}
              </div>
              <span className="text-gray-800 font-bold text-xs mt-1">Часы</span>
            </div>
            <div className="text-amber-400 text-2xl font-bold flex items-center pb-5">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 text-amber-600 text-xl font-bold w-16 h-16 rounded-xl flex items-center border-2 justify-center">
                {m}
              </div>
              <span className="text-gray-800 font-bold text-xs mt-1">Минуты</span>
            </div>
            <div className="text-amber-400 text-2xl font-bold flex items-center pb-5">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 text-amber-600 text-xl font-bold w-16 h-16 rounded-xl flex items-center border-2 justify-center">
                {s}
              </div>
              <span className="text-gray-800 font-bold text-xs mt-1">Секунды</span>
            </div>
          </div>

          {product ? (
            <div className="flex flex-col items-center mt-auto">
              <div className="bg-gray-200 rounded-xl p-3 w-full mb-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="text-black font-bold text-center line-clamp-2">{product.title}</h3>
              </div>
              
              <div className="flex justify-between w-full mb-3">
                <div className="text-left">
                  <p className="text-gray-900 font-bold text-sm">Цена:</p>
                  <p className="text-black font-bold text-lg">
                    {(product.price * 12500).toLocaleString()} сум
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-9 font-bold 00 text-sm">Рассрочка:</p>
                  <p className="text-black font-bold">
                    {(product.price * 12500 / 12).toFixed(0)} сум/мес
                  </p>
                </div>
              </div>
              
              <Link 
                to={`/product/${product.id}`} 
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Купить сейчас
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
              <p className="text-gray-400">Загружаем специальное предложение...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartphoneSwiper;
