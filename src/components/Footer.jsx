import React from 'react';
import { FaApple, FaGooglePlay, FaMobileAlt, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-24">
      {/* App download section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Наше мобильное приложение доступно в AppGallery, App store и Google play
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
            <a 
              href="#" 
              className="flex items-center gap-3 bg-black hover:bg-gray-900 rounded-xl py-3 px-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <FaApple className="text-3xl text-white" />
              <div className="text-left">
                <p className="text-xs text-gray-300">Download on the</p>
                <p className="text-lg font-bold">App Store</p>
              </div>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 bg-[#0F9D58] hover:bg-[#0e8a4d] rounded-xl py-3 px-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <FaGooglePlay className="text-3xl text-white" />
              <div className="text-left">
                <p className="text-xs text-gray-100">GET IT ON</p>
                <p className="text-lg font-bold">Google Play</p>
              </div>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 bg-[#E41E26] hover:bg-[#c51920] rounded-xl py-3 px-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <FaMobileAlt className="text-3xl text-white" />
              <div className="text-left">
                <p className="text-xs text-gray-100">DEFINITE IT ON</p>
                <p className="text-lg font-bold">AppGallery</p>
              </div>
            </a>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-16">
          {/* Brand column */}
          <div className="space-y-6">
            <h3 className="text-4xl font-bold text-red-500 mb-4">olcha</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-blue-400" />
                <p>Телефон поддержки<br /><span className="text-white font-medium">+998 (71) 202 202 1</span></p>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-blue-400" />
                <p>Компания. Ташкент</p>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-blue-400" />
                <p>info@olcha.uz</p>
              </div>
            </div>
          </div>
          
          {/* Information links */}
          <div>
            <h3 className="text-xl font-bold mb-4 pl-3 border-l-4 border-blue-500">Информация</h3>
            <div className="grid grid-cols-1 gap-3 text-gray-300">
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                О компании
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Вакансии
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Публичная оферта
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Возврат и обмен товаров
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Условия рассрочки
              </a>
            </div>
          </div>
          
          {/* More information links */}
          <div>
            <h3 className="text-xl font-bold mb-4 pl-3 border-l-4 border-purple-500">Дополнительно</h3>
            <div className="grid grid-cols-1 gap-3 text-gray-300">
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Eco-friendly
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Политика обработки персональных данных
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Оплата и Доставка Товара
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Бонусы и акции
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Оферта для продавцов товаров на Olcha.uz
              </a>
            </div>
          </div>
          
          {/* Payment methods */}
          <div>
            <h3 className="text-xl font-bold mb-4 pl-3 border-l-4 border-green-500">Способы оплаты</h3>
            <div className="grid grid-cols-3 gap-3">
              {['USB/USB', 'SERVICE', 'PLum', 'CLICK', 'Pay Info', 'PAY/YET'].map((method, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="font-bold text-sm text-gray-200">{method}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-2xl text-green-400" />
                <div>
                  <h4 className="font-bold">Безопасные платежи</h4>
                  <p className="text-sm text-gray-400 mt-1">Все транзакции защищены</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10"></div>
        
        {/* Copyright section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2017-2025. ООО "Olcha store"
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Публичная оферта</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-[100px] opacity-10"></div>
      <div className="absolute top-20 right-10 w-60 h-60 bg-purple-500 rounded-full blur-[100px] opacity-10"></div>
    </footer>
  );
};

export default Footer;