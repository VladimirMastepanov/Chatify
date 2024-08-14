import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setConnected, setDisconnected } from '../slices/socket/socketSlice';
import { currentTokenSelector } from '../slices/authentication/authSlice';
import { fetchChannels } from '../slices/channels/channelsSlice';
import { fetchMessages } from '../slices/messages/messagesSlice';
import ChannelsColumn from '../components/channels/ChannelsColumn';
import MessagesColumn from '../components/messages/MessagesColumn';
import TopNavigation from '../components/TopNavigation';
import socket from '../socket';

const AppPage = () => {
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
          <ChannelsColumn />
          <MessagesColumn />
        </div>
      </div>
    </div>
  );
};

export default AppPage;
