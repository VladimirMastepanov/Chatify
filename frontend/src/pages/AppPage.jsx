import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { fetchChannels } from '../features/channels/channelsSlice';
import { fetchMessages } from '../features/messages/messagesSlice';
import TopNavigation from '../components/TopNavigation';
import { currentTokenSelector } from '../features/authentication/authSlice';
import ChannelsColumn from '../components/channels/ChannelsColumn';
import MessagesColumn from '../components/messages/MessagesColumn';
import socket from '../socket';
import { setConnected, setDisconnected } from '../features/socket/socketSlice';

const AppPage = () => {
  const [activeChannelId, setActiveChannelId] = useState('1');
  const [activeChannelName, setActiveChannelName] = useState('general');
  const userToken = useSelector(currentTokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels(userToken));
    dispatch(fetchMessages(userToken));

    socket.connect();
    dispatch(setConnected());

    socket.on('disconnect', () => {
      dispatch(setDisconnected());
    });

    return () => {
      socket.disconnect();
    };
  }, [userToken, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <TopNavigation />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsColumn
            activeChannelId={activeChannelId}
            setActiveChannelId={setActiveChannelId}
            setActiveChannelName={setActiveChannelName}
          />
          <MessagesColumn
            activeChannelId={activeChannelId}
            activeChannelName={activeChannelName}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        // autoClose={5000}
        // pauseOnFocusLoss
      />
    </div>
  );
};

export default AppPage;
