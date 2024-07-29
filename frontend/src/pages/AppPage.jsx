import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  useEffect(() => {
    try {
      dispatch(fetchChannels(userToken));
      dispatch(fetchMessages(userToken));
    } catch (e) {
      toast.error(t('connectionError'));
    }

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
