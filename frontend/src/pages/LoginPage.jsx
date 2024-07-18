import React, { useState, useEffect } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { fetchAuth, currentTokenSelector, authorizationError } from '../features/authentication/authSlice';
import TopNavigation from '../components/TopNavigation';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(3).required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(currentTokenSelector);
  const error = useSelector(authorizationError);
  const [authFailed, setAuthFailed] = useState(error);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setAuthFailed(null);
      navigate('/');
    } else {
      setAuthFailed(error);
    }
  }, [token, error, navigate]);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        dispatch(fetchAuth(values));
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form className="w-100" onSubmit={props.handleSubmit}>
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder="Ваш ник"
              id="loginUsername"
              className={`form-control ${authFailed ? 'is-invalid' : ''}`}
            />
            <label htmlFor="loginUsername">Ваш ник</label>
            <ErrorMessage name="username" component="div" className="text-danger" />
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required
              placeholder="Пароль"
              type="password"
              id="loginPassword"
              className={`form-control ${authFailed ? 'is-invalid' : ''}`}
            />
            <label htmlFor="loginPassword">Пароль</label>
            <ErrorMessage name="password" component="div" className="text-danger" />
            {authFailed && <div className="invalid-tooltip alert-danger">{authFailed}</div>}
          </div>
          <button type="submit" disabled={props.isSubmitting} className="w-100 btn btn-outline-primary">Войти</button>
        </Form>
      )}
    </Formik>
  );
};

const LoginCard = () => (
  <div className="col-12 col-md-8 col-xxl-6">
    <div className="card shadow-sm mx-auto">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/tota.jpeg" className="rounded-circle img-fluid" alt="Войти" />
        </div>
        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <LoginForm />
        </div>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Нет аккаунта?</span>
          <a href="/">Регистрация</a>
        </div>
      </div>
    </div>
  </div>
);

const LoginPage = () => (
  <div className="d-flex flex-column min-vh-100">
    <TopNavigation />
    <div className="container-fluid d-flex justify-content-center align-items-center flex-grow-1">
      <div className="row justify-content-center align-items-center w-100">
        <LoginCard />
      </div>
    </div>
    <footer className="bg-light py-3 mt-auto">
      <div className="container">
        <span className="text-muted">Your footer content here</span>
      </div>
    </footer>
  </div>
);

export default LoginPage;
