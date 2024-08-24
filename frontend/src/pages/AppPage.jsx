import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery } from '../slices/channels/channelsApi';
import { useGetMessagesQuery } from '../slices/messages/messagesApi';
import ChannelsColumn from '../components/channels/ChannelsColumn';
import MessagesColumn from '../components/messages/MessagesColumn';
import TopNavigation from '../components/TopNavigation';

const AppPage = () => {
  const { error: channelsError } = useGetChannelsQuery();
  const { error: messagesError } = useGetMessagesQuery();
  const { t } = useTranslation();

  useEffect(() => {
    if (channelsError || messagesError) {
      toast.error(t('connectionError'));
    }
  }, [channelsError, messagesError, t]);

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
