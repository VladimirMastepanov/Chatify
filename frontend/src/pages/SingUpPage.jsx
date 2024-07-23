import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { fetchSingUp, currentTokenSelector, authorizationError } from '../features/authentication/authSlice';
import TopNavigation from '../components/TopNavigation';

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
  password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required('Подтверждение пароля обязательно'),
});

const SingUpForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(currentTokenSelector);
  const error = useSelector(authorizationError);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        const newUser = {
          username: values.username,
          password: values.password,
        };
        await dispatch(fetchSingUp(newUser));
        actions.setSubmitting(false);
      }}
      validateOnBlur
    >
      {(props) => (
        <Form className="w-100" onSubmit={props.handleSubmit}>
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder="Имя пользователя"
              id="newUsername"
              className={`form-control ${props.touched.username && props.errors.username ? 'is-invalid' : ''}`}
              onBlur={props.handleBlur}
            />
            <label htmlFor="newUsername">Имя пользователя</label>
            {props.touched.username && props.errors.username && <div className="invalid-tooltip alert-danger">{props.errors.username}</div>}
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="new-password"
              required
              placeholder="Пароль"
              type="password"
              id="newPassword"
              className={`form-control ${props.touched.password && props.errors.password ? 'is-invalid' : ''}`}
              onBlur={props.handleBlur}
            />
            <label htmlFor="newPassword">Пароль</label>
            {props.errors.password && props.touched.password && <div className="invalid-tooltip alert-danger">{props.errors.password}</div>}
          </div>
          <div className="form-floating mb-4">
            <Field
              name="confirmPassword"
              autoComplete="new-password"
              required
              placeholder="Подтвердите пароль"
              type="password"
              id="newPasswordConfirmation"
              className={`form-control ${props.touched.confirmPassword && props.errors.confirmPassword ? 'is-invalid' : ''}`}
              onBlur={props.handleBlur}
            />
            <label htmlFor="newPasswordConfirmation">Подтвердите пароль</label>
            {props.errors.confirmPassword && props.touched.confirmPassword && <div className="invalid-tooltip alert-danger">{props.errors.confirmPassword}</div>}
          </div>
          <button type="submit" disabled={props.isSubmitting} className="w-100 btn btn-outline-primary">Зарегестрироваться</button>
        </Form>
      )}
    </Formik>
  );
};

const SingUpCard = () => (
  <div className="col-12 col-md-8 col-xxl-6">
    <div className="card shadow-sm mx-auto">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/avatar_1.jpg" className="rounded-circle img-fluid" alt="Регистрация" />
        </div>
        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <SingUpForm />
        </div>
      </div>

    </div>
  </div>
);

const SingUpPage = () => (
  <div className="d-flex flex-column min-vh-100">
    <TopNavigation />
    <div className="container-fluid d-flex justify-content-center align-items-center flex-grow-1">
      <div className="row justify-content-center align-items-center w-100">
        <SingUpCard />
      </div>
    </div>
  </div>
);

export default SingUpPage;
