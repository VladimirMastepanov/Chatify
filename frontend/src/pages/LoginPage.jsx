import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { fetchAuth, currentTokenSelector } from '../slices/authentication/authSlice';
import TopNavigation from '../components/TopNavigation';
import PAGEPATH from '../helpers/pagePath';

const LoginForm = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const token = useSelector(currentTokenSelector);
  const [authFailed, setAuthFailed] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    if (token) {
      setAuthFailed(null);
      navigate(PAGEPATH.HOME);
    }
  }, [token, navigate]);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        setIsSubmitted(true);
        try {
          await dispatch(fetchAuth(values)).unwrap();
        } catch (e) {
          if (e.message === 'Network Error') {
            toast.error(t('connectionError'));
          }
          if (e.message === 'Request failed with status code 401') {
            setAuthFailed(t('incorrectLoginInformation'));
          }
        }
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={props.handleSubmit} disabled={props.isSubmitting}>
          <h1 className="text-center mb-4">{t('enter')}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              innerRef={inputRef}
              required
              placeholder={t('login')}
              id="loginUsername"
              className={`form-control ${authFailed ? 'is-invalid' : ''}`}
            />
            <label htmlFor="loginUsername">{t('login')}</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required
              placeholder={t('password')}
              type="password"
              id="loginPassword"
              className={`form-control ${authFailed ? 'is-invalid' : ''}`}
            />
            <label htmlFor="loginPassword">{t('password')}</label>
            {authFailed && isSubmitted && <div className="invalid-tooltip alert-danger">{authFailed}</div>}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('enter')}</button>
        </Form>
      )}
    </Formik>
  );
};

const LoginCard = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100 ">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">

          <div className="card shadow-sm">

            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="/images/tota.jpeg" className="rounded-circle img-fluid" alt="Войти" />
              </div>
              <LoginForm />
            </div>

            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('noAccount')}
                </span>
                <a href={PAGEPATH.SIGNUP}>{t('registration')}</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

const LoginPage = () => (
  <div className="d-flex flex-column h-100">
    <TopNavigation />
    <LoginCard />
  </div>
);

export default LoginPage;
