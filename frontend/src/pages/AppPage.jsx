import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import TopNavigation from '../components/TopNavigation';
import { currentTokenSelector } from '../features/authentication/authSlice';
import routes from '../routes';

const AppPage = () => {
  const userToken = useSelector(currentTokenSelector);
  console.log(userToken);

  useEffect(() => {
    // const token = localStorage.getItem('userToken');
    const header = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const getChannels = async () => {
      const res = await axios.get(routes.channelsPath(), header);
      return res;
    };
    const getMessages = async () => {
      const res = await axios.get(routes.messagesPath(), header);
      return res;
    };
    console.log(getChannels());
    console.log(getMessages());
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavigation />
    </div>
  );
};

export default AppPage;
