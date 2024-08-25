import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AddNewMessageForm from './AddNewMessageForm';
import MessagesList from './MessagesList';
import { activeChannelIdSelector } from '../../slices/channels/channelsSlice';
import { useGetChannelsQuery } from '../../slices/channels/channelsApi';

const MessagesColumn = () => {
  const { data: channels, isSuccess } = useGetChannelsQuery();
  const activeChannelId = useSelector(activeChannelIdSelector);
  const [messageCount, setMessagesCount] = useState(0);
  const [activeChannelName, setActiveChannelName] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess && channels.length !== 0) {
      const [active] = channels.filter((channel) => channel.id === activeChannelId);
      if (active) {
        setActiveChannelName(active.name);
      }
    }
  }, [channels, activeChannelId, isSuccess]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${activeChannelName}`}</b>
          </p>
          <span className="text-muted">{t('message', { count: messageCount })}</span>
        </div>
        <MessagesList setMessagesCount={setMessagesCount} />
        <div className="mt-auto px-5 py-3">
          <AddNewMessageForm />
        </div>
      </div>
    </div>
  );
};

export default MessagesColumn;
