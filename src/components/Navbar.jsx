import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full sticky top-0 z-50">
      {/* Top promo bar with animated gradient */}
      <div className="bg-gradient-to-r from-[#c00b27] to-[#dc0d2b] text-white text-lg animate-gradient-x">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
          <div className="flex gap-4 font-semibold">
            <Link to="/aksiya">
              <button className="bg-white text-[#dc0d2b] rounded-xl px-4 py-2 hover:bg-[#ffe5ea] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95">
                0% Muddatli to'lov
              </button>
            </Link>
            <Link to="/rassrochka">
              <button className="border border-white rounded-xl px-4 py-2 hover:bg-white hover:text-[#dc0d2b] transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95">
                Chegirmalar
              </button>
            </Link>
            <Link to="/rozigrishi">
              <button className="bg-white text-[#dc0d2b] rounded-xl px-4 py-2 hover:bg-[#ffe5ea] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95">
                Yutuqli o'yinlar
              </button>
            </Link>
            <p className="ml-3 mt-2 cursor-pointer hover:underline hover:text-gray-200 transition transform hover:translate-x-1">Sayt xaritasi</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center group">
              <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold group-hover:text-gray-200 transition">+998 (93) 123-45-67</h1>
            </div>
            <button className="border border-white rounded-xl px-4 py-2 text-base font-semibold hover:bg-white hover:text-[#dc0d2b] transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95">
              Olchada Soting
            </button>
            <div className="flex gap-3 text-base font-medium">
              <p className="cursor-pointer hover:underline hover:text-gray-200 transition transform hover:scale-105">Ўзб</p>
              <p className="font-bold underline text-white bg-white/20 px-2 py-0.5 rounded">O‘z</p>
              <p className="cursor-pointer hover:underline hover:text-gray-200 transition transform hover:scale-105">Рус</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation with shadow on scroll */}
      <div className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-6">
            <Link to="/">
              <div className="relative">
                <span className="text-[#dc0d2b] text-4xl font-extrabold tracking-tighter relative z-10">olcha</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff8a00] via-[#dc0d2b] to-[#c00b27] opacity-20 blur-md rounded-full -z-1 animate-pulse-slow"></div>
              </div>
            </Link>
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#ff8a00] to-[#dc0d2b] text-white rounded-xl px-5 py-2 text-lg font-medium hover:from-[#ff9a1a] hover:to-[#ec1d3a] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95">
              <span className="text-2xl mr-1">☰</span> <span>Katalog</span>
            </button>
          </div>

          <div className="flex-1 mx-6">
            <div className={`flex transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-[#dc0d2b] rounded-full shadow-lg' : 'rounded-full shadow'}`}>
              <input
                type="text"
                placeholder="Katalog bo'yicha qidirish"
                className="w-full bg-gray-100 px-6 py-3 rounded-l-full text-lg outline-none focus:bg-white transition pl-6"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button className="bg-gradient-to-r from-[#c00b27] to-[#dc0d2b] text-white px-6 py-3 rounded-r-full hover:opacity-90 transition-all duration-300 text-xl shadow-lg group">
                <span className="group-hover:scale-110 transition-transform block">🔍</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 text-center text-lg">
            <Link to="/compare">
              <div className="cursor-pointer hover:text-[#dc0d2b] transition-all duration-300 group relative">
                <div className="relative inline-block">
                  <div className="text-2xl group-hover:scale-110 transition-transform">📊</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-0 group-hover:opacity-20 blur-[8px] transition-opacity"></div>
                </div>
                <span className="text-sm block mt-1">Taqqoslash</span>
                <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-100 to-pink-100 -z-10 transition-opacity duration-300"></div>
              </div>
            </Link>
            
            <Link to="/wishlist">
              <div className="cursor-pointer hover:text-[#dc0d2b] transition-all duration-300 group relative">
                <div className="relative inline-block">
                  <div className="text-2xl group-hover:scale-110 transition-transform">❤️</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur-[8px] transition-opacity"></div>
                </div>
                <span className="text-sm block mt-1">Sevimliar</span>
                <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-100 to-pink-100 -z-10 transition-opacity duration-300"></div>
              </div>
            </Link>

            <Link to="/cart">
              <div className="relative cursor-pointer hover:text-[#dc0d2b] transition-all duration-300 group">
                <div className="relative inline-block">
                  <div className="text-2xl group-hover:scale-110 transition-transform">🛒</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 blur-[8px] transition-opacity"></div>
                </div>
                {totalQuantity > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md transform -translate-y-1 translate-x-1 animate-ping-once">
                    {totalQuantity}
                  </span>
                )}
                <span className="text-sm block mt-1">Savatcha</span>
                <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-100 to-orange-100 -z-10 transition-opacity duration-300"></div>
              </div>
            </Link>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-full border-2 border-white shadow-md group-hover:border-[#dc0d2b] transition-all duration-300">
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-10 h-10 object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium truncate max-w-[120px] group-hover:text-[#dc0d2b] transition-colors">{user.name.split(' ')[0]}</p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Premium Account</p>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180 text-[#dc0d2b]' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fade-in-down">
                    <div className="bg-gradient-to-r from-[#dc0d2b] to-[#a00a22] p-5 text-white relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>
                      
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="border-2 border-white rounded-full overflow-hidden">
                          <img
                            src={user.picture}
                            alt={user.name}
                            className="w-12 h-12 object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm opacity-80">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 relative z-10">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg mb-2 shadow-inner">
                        <div>
                          <p className="text-sm font-medium">Olcha Bonus</p>
                          <p className="text-xs text-gray-500">345 ball</p>
                        </div>
                        <button className="text-[#dc0d2b] text-sm font-medium hover:underline flex items-center">
                          Batafsil <span className="ml-1">→</span>
                        </button>
                      </div>
                      
                      <Link 
                        to="/orders" 
                        className="block p-3 hover:bg-gray-50 rounded-lg transition group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-2 rounded-lg shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-[#dc0d2b]" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="group-hover:text-[#dc0d2b] group-hover:font-medium transition">Buyurtmalarim</span>
                        </div>
                      </Link>
                      
                      <Link 
                        to="/profile" 
                        className="block p-3 hover:bg-gray-50 rounded-lg transition group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-2 rounded-lg shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-[#dc0d2b]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="group-hover:text-[#dc0d2b] group-hover:font-medium transition">Sozlamalar</span>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-100 p-3 relative z-10">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition hover:gap-3"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        <span>Akkauntdan chiqish</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <div className="cursor-pointer hover:text-[#dc0d2b] transition-all duration-300 group relative">
                  <div className="relative inline-block">
                    <div className="text-2xl group-hover:scale-110 transition-transform">👤</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-[8px] transition-opacity"></div>
                  </div>
                  <span className="text-sm block mt-1">Kirish</span>
                  <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-100 to-purple-100 -z-10 transition-opacity duration-300"></div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-ping-once {
          animation: ping 0.8s cubic-bezier(0, 0, 0.2, 1) 1;
        }
        @keyframes ping {
          75%, 100% { transform: translate(-1px, -1px) scale(1.1); opacity: 0; }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;