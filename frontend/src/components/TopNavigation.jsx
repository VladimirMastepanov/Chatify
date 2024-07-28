import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { currentTokenSelector, clearCredentials } from '../features/authentication/authSlice';

const TopNavigation = () => {
  const { t } = useTranslation();
  const auth = useSelector(currentTokenSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(clearCredentials());
    } catch (e) {
      toast.error(t('registrationError'));
    }
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('hexletChat')}</a>
        {auth && (
          <button onClick={handleLogout} type="button" className="btn btn-primary">{t('exit')}</button>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
