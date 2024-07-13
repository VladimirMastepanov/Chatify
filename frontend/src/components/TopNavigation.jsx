import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector, setCredentials } from '../features/authentication/authSlice';

const TopNavigation = () => {
  const auth = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    dispatch(setCredentials({ user: null, token: null }));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('userId');
    if (savedUser) {
      dispatch(setCredentials(JSON.parse(savedUser)));
    }
  }, []);
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {auth && (
          <button onClick={handleLogout} type="button" className="btn btn-primary">Выйти</button>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
