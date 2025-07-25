import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SimilarProducts = ({ category, currentProductId }) => {
  const [similar, setSimilar] = useState([]);
  const scrollContainer = useRef(null);

  useEffect(() => {
    if (!category) return;

    axios.get(`https://dummyjson.com/products/category/${category}`)
      .then(res => {
        const filtered = res.data.products.filter(item => item.id !== parseInt(currentProductId));
        setSimilar(filtered.slice(0, 6));
      });
  }, [category, currentProductId]);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  if (similar.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-24 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Похожие товары
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            <FiChevronLeft size={20} />
          </button>
          <button 
            onClick={scrollRight}
            className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainer}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
      >
        {similar.map(product => (
          <Link 
            to={`/product/${product.id}`} 
            key={product.id} 
            className="group min-w-[220px] rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:from-indigo-50 hover:to-purple-50 relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="p-4 h-full flex flex-col">
              <div className="overflow-hidden rounded-xl mb-3 border border-gray-200">
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              
              <div className="mt-auto">
                <h3 className="text-md font-bold text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {(product.price * 12500).toLocaleString()} сум
                  </span>
                  <span className="ml-2 text-xs font-semibold bg-rose-100 text-rose-800 px-2 py-1 rounded-full">
                    -{product.discountPercentage}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;