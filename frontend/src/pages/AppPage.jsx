import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  console.log(activeChannelId, activeChannelName);
  const userToken = useSelector(currentTokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('перед dispatch');
    console.log(userToken);
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
    <div className="d-flex flex-column min-vh-100">
      <TopNavigation />
      <div className="container flex-grow-1 my-4 overflow-hidden rounded shadow d-flex flex-column">
        <div className="row bg-white flex-grow-1 h-100 flex-md-row">
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
    </div>
  );
};

export default AppPage;
