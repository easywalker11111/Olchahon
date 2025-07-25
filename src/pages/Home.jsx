import React, { useState, useEffect } from 'react';
import Swiper from '../components/Swiper2section';
import ExploreSection from '../components/ExploreSection';
import ProductsList from '../components/ProductsList';
import Discounts from '../components/Discounts';
import OlchaPage from '../components/OlchaPage';
import AppleSection from '../components/AppleSection';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=10&select=title,price,discountPercentage');
        const data = await response.json();
        
        const filtered = data.products.filter(
          product => product.discountPercentage > 10
        );
        
        setDiscountedProducts(filtered);
      } catch (error) {
        console.error('Error fetching discounted products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

  return (
      <>
          <div className="flex flex-col gap-6 p-4">
      <Swiper />

      <ExploreSection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div>
        <h2 className="text-xl font-bold mb-4 ml-2">Популярные товары:</h2>
        <ProductsList category={selectedCategory} />
      </div>

      {!loading && discountedProducts.length > 0 && (
        <Discounts products={discountedProducts} />
      )}
      
      {!loading && discountedProducts.length === 0 && (
        <div className="text-center py-4">Нет товаров со скидкой</div>
      )}
    </div>

    <OlchaPage/>
    <AppleSection/>
      </>
  );
};

export default Home;