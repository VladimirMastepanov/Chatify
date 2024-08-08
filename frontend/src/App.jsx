/* eslint-disable no-nested-ternary */
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Route, Routes,
  Navigate,
} from 'react-router-dom';
import { currentTokenSelector } from './slices/authentication/authSlice';
import SignUpPage from './pages/SignUpPage';
import Spinner from './components/Spinner';

const AppPage = React.lazy(() => import('./pages/AppPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const NotFound = React.lazy(() => import('./pages/NotFoundPage'));

const AppRoutes = ({ isAuthenticated }) => (
  <Routes>
    <Route path="/" element={isAuthenticated ? <AppPage /> : <Navigate to="/login" />} />
    <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  const isAuthenticated = useSelector(currentTokenSelector);

  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated === undefined ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Suspense fallback={<Spinner />}>
          <AppPage />
        </Suspense>
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: '/login',
      element: isAuthenticated === undefined ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <Suspense fallback={<Spinner />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: '/signup',
      element: (
        <Suspense fallback={<Spinner />}>
          <SignUpPage />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Spinner />}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);

  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router}>
        <AppRoutes isAuthenticated={isAuthenticated} />
      </RouterProvider>
    </Suspense>
  );
};

export default App;
