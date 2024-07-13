import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import store from './app/store';
import NotFound from './pages/NotFoundPage';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import { setCredentials } from './features/authentication/authSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App = () => {
 const dispatch = useDispatch();

  useEffect(() => {
    const savedUser =  JSON.parse(localStorage.getItem('userId'));
    if(savedUser) {
      dispatch(setCredentials(savedUser));
    }
  }, [dispatch])

  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <div className="App">
          <div className="h-100 bg-light">
            {auth ? (
              <Route path="/" element={<AppPage />} />
            ) : (
              <Route path="/login" element={<LoginPage />} />
            )}
          </div>
        </div>
      </RouterProvider>
    </Provider>
  )
};

export default App;
