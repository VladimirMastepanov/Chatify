import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentTokenSelector, clearCredentials } from '../features/authentication/authSlice';

const TopNavigation = () => {
  const auth = useSelector(currentTokenSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  // useEffect(() => {
  //   const savedUser = localStorage.getItem('userId');
  // }, []);
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
