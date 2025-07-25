import React from 'react';

const ExploreItem = ({ name, image, onClick, isActive }) => {
  const CATEGORY_TRANSLATIONS = {
    beauty: "Красота",
    smartphones: "Смартфоны",
    laptops: "Ноутбуки",
    fragrances: "Ароматы",
    skincare: "Уход за кожей",
    groceries: "Продукты",
    homeDecoration: "Украшения для дома",
    furniture: "Мебель",
    tops: "Футболки",
    womensDresses: "Платья",
    mensShirts: "Мужские рубашки",
    sunglasses: "Очки",
    automotive: "Автотовары",
    motorcycle: "Мотоциклы",
    lighting: "Освещение",
  };

  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-36 min-w-[144px] cursor-pointer transition-all p-4 rounded-xl
        ${isActive ? 'bg-blue-100 border-2 border-blue-500 shadow-lg' : 'bg-white border border-gray-300 hover:shadow-lg'}
      `}
    >
      <div className="w-28 h-28 rounded-full flex items-center justify-center bg-white shadow-inner border border-red-500">
        <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-300 shadow-sm bg-gray-50">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <p
        className={`mt-3 text-sm text-center capitalize font-semibold select-none
    ${isActive ? 'text-blue-600' : 'text-gray-700'}
  `}
      >
        {CATEGORY_TRANSLATIONS[name] || name}
      </p>

    </div>
  );
};

export default ExploreItem;
