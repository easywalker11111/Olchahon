import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [language, setLanguage] = useState('oz');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setLanguage(user.language || 'oz');
    }
  }, [user]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      language,
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Saqlangan!');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="max-w-screen-xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold">Avval tizimga kiring</h2>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Profil sozlamalari</h2>

      <div className="flex items-center gap-4 mb-6">
        <img src={user.picture} alt="Avatar" className="w-16 h-16 rounded-full" />
        <p className="text-lg font-semibold">{user.email}</p>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Ism</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Til</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        >
          <option value="oz">O‘zbek</option>
          <option value="uz">Ўзбек</option>
          <option value="ru">Русский</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-[#dc0d2b] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Saqlash
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default Profile;
