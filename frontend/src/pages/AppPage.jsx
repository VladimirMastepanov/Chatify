import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setConnected, setDisconnected } from '../features/socket/socketSlice';
import { currentTokenSelector } from '../features/authentication/authSlice';
import { fetchChannels } from '../features/channels/channelsSlice';
import { fetchMessages } from '../features/messages/messagesSlice';
import ChannelsColumn from '../components/channels/ChannelsColumn';
import MessagesColumn from '../components/messages/MessagesColumn';
import TopNavigation from '../components/TopNavigation';
import socket from '../socket';

const AppPage = () => {
  const [activeChannelId, setActiveChannelId] = useState('1');
  const [activeChannelName, setActiveChannelName] = useState('general');
  const userToken = useSelector(currentTokenSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    try {
      dispatch(fetchChannels(userToken));
      dispatch(fetchMessages(userToken));
    } catch (e) {
      toast.error(t('connectionError'));
    }

    // try {
    //   throw new Error('Test error for Rollbar');
    // } catch (error) {
    //   Rollbar.error(error);
    // }

    // Rollbar.info('Test message from application');

    socket.connect();
    dispatch(setConnected());

    socket.on('disconnect', () => {
      dispatch(setDisconnected());
    });

    return () => {
      socket.disconnect();
    };
  }, [userToken, dispatch, t]);

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
    </div>
  );
};

export default AppPage;
