// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext, useContext, useMemo, useState } from 'react';
import Computer from './computerTerminal';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './login';
import Debugging from './rooms/Debugging';
import CryptographyRoom from './rooms/Cryptography';
import TriviaRoom from './rooms/TechTrivia';
import HomePage from './homePage';
import {useNavigate, Navigate} from 'react-router-dom';
import Error from './Error';

const AuthContext = createContext({userID: '', login: (data:string) => {Promise<void>}, logout: () => {}});

const useLocalStorage = (keyName:string, defaultValue:string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue:string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export const AuthProvider = ({...props}) => {
  const [userID, setUserID] = useLocalStorage("userID", "");
  const navigate = useNavigate();

  async function login(data:string) {
    console.log(data);
    setUserID(data);
    navigate("/home");
  };

  const logout = () => {
    setUserID(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      userID,
      login,
      logout
    }),
    [userID]
  );
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ ...props }) => {
  const { userID } = useAuth();
  if (!userID) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return props.children;
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/3" element={<ProtectedRoute><Debugging /></ProtectedRoute>} />
          <Route path="/2" element={<ProtectedRoute><CryptographyRoom /></ProtectedRoute>} />
          <Route path="/1" element={<ProtectedRoute><TriviaRoom /></ProtectedRoute>} />
          <Route path="/3/computer" element={<ProtectedRoute><Computer /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
