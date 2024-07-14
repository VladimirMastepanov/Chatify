import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TopNavigation from '../components/TopNavigation';
import { currentTokenSelector } from '../features/authentication/authSlice';

const AppPage = () => {
  const user = useSelector(currentTokenSelector);
  console.log(user);
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavigation />
      <footer className="bg-light py-3 mt-auto">
        <div className="container">
          <span className="text-muted">Your footer content here</span>
        </div>
      </footer>
    </div>
  );
};

export default AppPage;
