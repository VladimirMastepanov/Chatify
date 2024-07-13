import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import store from './app/store';
import NotFound from './pages/NotFoundPage';
import AppPage from './pages/AppPage';
import Login from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppPage />,
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
  <Provider store={store}>
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
  </Provider>
);

export default App;
