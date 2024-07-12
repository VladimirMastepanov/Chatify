import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import routes from '../routes';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(3).required('Password is required'),
});

const LoginForm = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={async (values, actions) => {
      console.log(values);
      try {
        const res = await axios.post(routes.loginPath(), values);
        console.log(res);
      } catch (e) {
        console.log(e.message);
      }
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
            id="username"
            className="form-control"
          />
          <label htmlFor="username">Ваш ник</label>
          <ErrorMessage name="username" component="div" className="text-danger" />
        </div>
        <div className="form-floating mb-4">
          <Field
            name="password"
            autoComplete="current-password"
            required
            placeholder="Пароль"
            type="password"
            id="password"
            className="form-control"
          />
          <label htmlFor="password">Пароль</label>
          <ErrorMessage name="password" component="div" className="text-danger" />
        </div>
        <button type="submit" disabled={props.isSubmitting} className="w-100 btn btn-outline-primary">Войти</button>
      </Form>
    )}
  </Formik>
);

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

const Login = () => (
  <div className="d-flex flex-column h-100">
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
      </div>
    </nav>
    <div className="container-fluid d-flex justify-content-center align-items-center flex-grow-1">
      <div className="row justify-content-center align-items-center w-100">
        <LoginCard />
      </div>
    </div>
  </div>
);

export default Login;
