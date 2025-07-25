import React from 'react';
import Navbar from './components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { UserProvider } from './context/UserContext';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();

  const hideNavbarPaths = ['/login']; 
  const hideFooterPaths = ['/login'];   

  return (
    <UserProvider>
      <div>
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <ScrollToTop />
        <Outlet />
        {!hideFooterPaths.includes(location.pathname) && <Footer />}
      </div>
    </UserProvider>
  );
};

export default App;