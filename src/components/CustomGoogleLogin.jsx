import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const CustomGoogleLogin = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const { name, email, picture } = res.data;

        setUser({ name, email, picture });
        navigate('/');
      } catch (err) {
        console.error('Google login error:', err);
      }
    },
    onError: () => console.log('Google login failed'),
    flow: 'implicit',
  });

  return (
    <button
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded-xl shadow hover:shadow-md transition duration-200"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="google logo"
        className="w-5 h-5"
      />
      <span>Войти через Google</span>
    </button>
  );
};

export default CustomGoogleLogin;
