import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(saved);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h2 className="text-2xl font-bold mb-2">Избранное пусто</h2>
        <p className="text-gray-500">Добавьте товары, чтобы они здесь появились</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#dc0d2b]">Мои избранные товары</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition relative">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => removeFromWishlist(product.id)}
              title="Удалить из избранного"
            >
              ❌
            </button>
            <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-contain mb-4" />
              <h3 className="text-base font-semibold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600">
                {(product.price * 12500).toLocaleString()} сум
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
