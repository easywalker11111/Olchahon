import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaSync, FaChartBar } from 'react-icons/fa';

const Compare = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center py-16 px-4 mb-50">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 py-6 px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white flex items-center">
                <FaChartBar className="mr-3" />
                Сравнение товаров
              </h1>
              <div className="bg-white/20 rounded-full px-4 py-1 text-white text-sm font-medium">
                Пусто
              </div>
            </div>
          </div>
          
          <div className="p-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center">
                  <FaSearch className="text-5xl text-red-500" />
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white text-lg">0</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">К сожалению, сейчас нет таких товаров</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-10">
              Возможно, допущена ошибка в названии товара либо у нас пока нет таких товаров
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/" 
                className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <FaHome />
                На главную
              </Link>
              
              <button 
                className="border-2 border-red-600 text-red-600 py-3 px-8 rounded-full font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaSync />
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Compare;