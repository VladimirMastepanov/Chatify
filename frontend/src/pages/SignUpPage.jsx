import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { fetchSignUp, currentTokenSelector, authorizationError } from '../slices/authentication/authSlice';
import TopNavigation from '../components/TopNavigation';
import PAGEPATH from '../helpers/pagePath';

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const token = useSelector(currentTokenSelector);
  const error = useSelector(authorizationError);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().min(3, t('lengthLimits')).max(20, t('lengthLimits')).required(t('requiredField')),
    password: yup.string().min(6, t('minLength')).required(t('requiredField')),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('passwordsMustMatch')).required(t('requiredConfirmation')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    if (token) {
      navigate(PAGEPATH.HOME);
    }
  }, [token, navigate]);

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
          await dispatch(fetchSignUp(newUser)).unwrap();
        } catch (e) {
          if (e.message === 'Request failed with status code 409') {
            actions.setStatus({ nonFieldError: t('existingUser') });
          } else {
            actions.setStatus({ nonFieldError: t('connectionError') });
            toast.error('connectionError');
          }
        }
        actions.setSubmitting(false);
      }}
      validateOnBlur
    >
      {(props) => (
        <Form className="w-50" onSubmit={props.handleSubmit} disabled={props.isSubmitting}>
          <h1 className="text-center mb-4">{t('registration')}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              innerRef={inputRef}
              placeholder={t('userName')}
              id="newUsername"
              className={`form-control ${(props.touched.username && props.errors.username) || error ? 'is-invalid' : ''}`}
              onBlur={props.handleBlur}
            />
            <label htmlFor="newUsername">{t('userName')}</label>
            {props.touched.username && props.errors.username && <div className="invalid-tooltip alert-danger">{props.errors.username}</div>}
          </div>
          <div className="form-floating mb-3">
            <Field
              name="password"
              autoComplete="new-password"
              required
              placeholder={t('password')}
              type="password"
              id="newPassword"
              className={`form-control ${(props.touched.password && props.errors.password) || error ? 'is-invalid' : ''}`}
              onBlur={props.handleBlur}
            />
            <label htmlFor="newPassword">{t('password')}</label>
            {props.errors.password && props.touched.password && <div className="invalid-tooltip alert-danger">{props.errors.password}</div>}
          </div>
          <div className="form-floating mb-4">
            <Field
              name="confirmPassword"
              autoComplete="new-password"
              required
              placeholder={t('passwordConfirmation')}
              type="password"
              id="newPasswordConfirmation"
              className={`form-control ${(props.touched.confirmPassword && props.errors.confirmPassword) || error ? 'is-invalid' : ''}`}
              onBlur={props.handleBlur}
            />
            <label htmlFor="newPasswordConfirmation">{t('passwordConfirmation')}</label>
            {props.errors.confirmPassword && props.touched.confirmPassword && <div className="invalid-tooltip alert-danger">{props.errors.confirmPassword}</div>}
            {props.status && props.status.nonFieldError && <div className="invalid-tooltip alert-danger">{props.status.nonFieldError}</div>}
          </div>
          <button type="submit" className="w-100 btn btn-outline-primary">{t('register')}</button>
        </Form>
      )}
    </Formik>
  );
};

const SignUpCard = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src="/images/avatar_1.jpg" className="rounded-circle" alt={t('registration')} />
              </div>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUpPage = () => (
  <div className="d-flex flex-column h-100">
    <TopNavigation />
    <SignUpCard />
  </div>
);

export default SignUpPage;
