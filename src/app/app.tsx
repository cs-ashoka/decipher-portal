// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import Computer from './computerTerminal';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './login';
import Debugging from './Debugging';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/debugging/computer',
    element: <Computer />
  },
  {
    path: '/debugging',
    element: <Debugging />
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
