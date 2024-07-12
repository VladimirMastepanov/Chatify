import React from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => (
  <div className="App">
    <div className="h-100 bg-light">
      <RouterProvider router={router}>
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="*">404 Not Found</Link>
            </li>
          </ul>
        </nav>
      </RouterProvider>
    </div>
  </div>
);

export default App;
