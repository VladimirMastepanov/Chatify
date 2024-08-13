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
import ROUTES from './helpers/routes';
import SignUpPage from './pages/SignUpPage';
import Spinner from './components/Spinner';

const AppPage = React.lazy(() => import('./pages/AppPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const NotFound = React.lazy(() => import('./pages/NotFoundPage'));

const AppRoutes = ({ isAuthenticated }) => (
  <Routes>
    <Route
      path={ROUTES.HOME}
      element={isAuthenticated ? <AppPage /> : <Navigate to={ROUTES.LOGIN} />}
    />
    <Route
      path={ROUTES.LOGIN}
      element={isAuthenticated ? <Navigate to={ROUTES.HOME} /> : <LoginPage />}
    />
    <Route path={ROUTES.HOME} element={<SignUpPage />} />
    <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
  </Routes>
);

const App = () => {
  const isAuthenticated = useSelector(currentTokenSelector);

  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: isAuthenticated === undefined ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Suspense fallback={<Spinner />}>
          <AppPage />
        </Suspense>
      ) : (
        <Navigate to={ROUTES.LOGIN} />
      ),
    },
    {
      path: ROUTES.LOGIN,
      element: isAuthenticated === undefined ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Navigate to={ROUTES.HOME} />
      ) : (
        <Suspense fallback={<Spinner />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: ROUTES.SIGNUP,
      element: (
        <Suspense fallback={<Spinner />}>
          <SignUpPage />
        </Suspense>
      ),
    },
    {
      path: ROUTES.NOTFOUND,
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
