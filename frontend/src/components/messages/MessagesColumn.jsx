import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AddNewMessageForm from './AddNewMessageForm';
import MessagesList from './MessagesList';
import { activeChannelIdSelector, channelsSelector } from '../../slices/channels/channelsSlice';

const MessagesColumn = () => {
  const activeChannelId = useSelector(activeChannelIdSelector);
  const channels = useSelector(channelsSelector.selectEntities);
  const [messageCount, setMessagesCount] = useState(0);
  const [activeChannelName, setActiveChannelName] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (channels[activeChannelId]) {
      setActiveChannelName(channels[activeChannelId].name);
    }
  }, [channels, activeChannelId]);

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
