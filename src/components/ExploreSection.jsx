import React, { useEffect, useRef, useState } from 'react';
import ExploreItem from './ExploreItem';

const ExploreSection = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategoriesWithImages = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const data = await res.json();

        const categoryMap = {};

        data.products.forEach(product => {
          const cat = product.category;
          if (!categoryMap[cat]) {
            categoryMap[cat] = {
              name: cat,
              image: product.thumbnail,
            };
          }
        });

        setCategories(Object.values(categoryMap));
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };

    fetchCategoriesWithImages();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="relative p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Категории товаров:</h2>

      <button
        onClick={scrollLeft}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-80 shadow-md hover:bg-opacity-100 transition hidden md:flex"
      >
        <span className="text-2xl font-bold text-gray-700 select-none">{'<'}</span>
      </button>

      <button
        onClick={scrollRight}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-80 shadow-md hover:bg-opacity-100 transition hidden md:flex"
      >
        <span className="text-2xl font-bold text-gray-700 select-none">{'>'}</span>
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-2"
      >
        {categories.map((cat, index) => (
          <ExploreItem
            key={index}
            name={cat.name}
            image={cat.image}
            isActive={selectedCategory === cat.name}
            onClick={() =>
              selectedCategory === cat.name
                ? onSelectCategory(null)
                : onSelectCategory(cat.name)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
