import React, { useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './app';

const BACKEND_URL = 'https://decipher-backend.onrender.com';

const LogoutPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.logout();
    navigate('/');
  }, []);

  return <></>;
};

export default LogoutPage;
