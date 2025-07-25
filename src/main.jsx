import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Cart from './components/Cart.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import { CartProvider } from './context/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Discounts from './components/Discounts.jsx';
import Rozigrishi from './components/Rozigrishi.jsx';
import ProductsList from './components/ProductsList.jsx';
import WishList from './components/WishList.jsx';
import Login from './components/Login.jsx';
import Compare from './components/Compare.jsx';
import { UserProvider } from './context/UserContext';
import Profile from './components/Profile.jsx';
import Footer from './components/Footer.jsx';
import Orders from './components/Orders.jsx'
import Tolash from './components/Tolash.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/aksiya', element: <ProductsList /> },
      { path: '/login', element: <Login /> },
      { path: '/rassrochka', element: <Discounts /> },
      { path: '/wishlist', element: <WishList /> },
      { path: '/rozigrishi', element: <Rozigrishi /> },
      { path: '/compare', element: <Compare /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/orders', element: <Orders/>},
      {path: '/checkout', element: <Tolash/> },
      {path: '/footer', element: <Footer/>},
      {
        path: "/profile",
        element: <Profile />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </GoogleOAuthProvider>
);
