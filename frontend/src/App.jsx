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
import PAGEPATH from './helpers/pagePath';
import './i18next';

const AppPage = React.lazy(() => import('./pages/AppPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const NotFound = React.lazy(() => import('./pages/NotFoundPage'));

const AppRoutes = ({ isAuthenticated }) => (
  <Routes>
    <Route
      path={PAGEPATH.HOME}
      element={isAuthenticated ? <AppPage /> : <Navigate to={PAGEPATH.LOGIN} />}
    />
    <Route
      path={PAGEPATH.LOGIN}
      element={isAuthenticated ? <Navigate to={PAGEPATH.HOME} /> : <LoginPage />}
    />
    <Route path={PAGEPATH.HOME} element={<SignUpPage />} />
    <Route path={PAGEPATH.NOTFOUND} element={<NotFound />} />
  </Routes>
);

const App = () => {
  const isAuthenticated = useSelector(currentTokenSelector);

  const router = createBrowserRouter([
    {
      path: PAGEPATH.HOME,
      element: isAuthenticated === undefined ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Suspense fallback={<Spinner />}>
          <AppPage />
        </Suspense>
      ) : (
        <Navigate to={PAGEPATH.LOGIN} />
      ),
    },
    {
      path: PAGEPATH.LOGIN,
      element: isAuthenticated === undefined ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Navigate to={PAGEPATH.HOME} />
      ) : (
        <Suspense fallback={<Spinner />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: PAGEPATH.SIGNUP,
      element: (
        <Suspense fallback={<Spinner />}>
          <SignUpPage />
        </Suspense>
      ),
    },
    {
      path: PAGEPATH.NOTFOUND,
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
