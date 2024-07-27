import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { fetchSingUp, currentTokenSelector, authorizationError} from '../features/authentication/authSlice';
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
  }, [token, navigate, error]);

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const newUser = {
          username: values.username,
          password: values.password,
        };
        try {
          await dispatch(fetchSingUp(newUser));
        } catch (e) {
          if (e.message === 'Request failed with status code 409') {
            actions.setStatus({ nonFieldError: 'Такой пользователь уже существует' });
          } else {
            actions.setStatus({ nonFieldError: 'Ошибка регистрации. Попробуйте еще раз' });
          }
        }
        actions.setSubmitting(false);
      }}
      validateOnBlur
    >
      {(props) => (
        <Form className="w-50" onSubmit={props.handleSubmit} disabled={props.isSubmitting}>
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder="Имя пользователя"
              id="newUsername"
              className={`form-control ${(props.touched.username && props.errors.username) || error ? 'is-invalid' : ''}`}
              onBlur={props.handleBlur}
            />
            <label htmlFor="newUsername">Имя пользователя</label>
            {props.touched.username && props.errors.username && <div className="invalid-tooltip alert-danger">{props.errors.username}</div>}
          </div>
          <div className="form-floating mb-3">
            <Field
              name="password"
              autoComplete="new-password"
              required
              placeholder="Пароль"
              type="password"
              id="newPassword"
              className={`form-control ${(props.touched.password && props.errors.password) || error ? 'is-invalid' : ''}`}
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
              className={`form-control ${(props.touched.confirmPassword && props.errors.confirmPassword) || error ? 'is-invalid' : ''}`}
              onBlur={props.handleBlur}
            />
            <label htmlFor="newPasswordConfirmation">Подтвердите пароль</label>
            {props.errors.confirmPassword && props.touched.confirmPassword && <div className="invalid-tooltip alert-danger">{props.errors.confirmPassword}</div>}
            {props.status && props.status.nonFieldError && <div className="invalid-tooltip alert-danger">{props.status.nonFieldError}</div>}
          </div>
          <button type="submit" className="w-100 btn btn-outline-primary">Зарегестрироваться</button>
        </Form>
      )}
    </Formik>
  );
};

const SingUpCard = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src="/images/avatar_1.jpg" className="rounded-circle" alt="Регистрация" />
            </div>
            <SingUpForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SingUpPage = () => (
  <div className="d-flex flex-column h-100">
    <TopNavigation />
    <SingUpCard />
  </div>
);

export default SingUpPage;
