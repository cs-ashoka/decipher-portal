// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import Computer from './computerTerminal';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './login';
import Debugging from './rooms/Debugging';
import CryptographyRoom from './rooms/Cryptography';
import AlgorithmsRoom from './rooms/Algorithms';
import TriviaRoom from './rooms/TechTrivia';
import HomePage from './homePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/3/computer',
    element: <Computer />
  },
  {
    path: '/3',
    element: <Debugging />
  },
  {
    path: '/2',
    element: <CryptographyRoom />
  },
  {
    path: '/1',
    element: <TriviaRoom />
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
