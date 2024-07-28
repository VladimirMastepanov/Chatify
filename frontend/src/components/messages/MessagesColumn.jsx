import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddNewMessageForm from './AddNewMessageForm';
import MessagesList from './MessagesList';

const MessagesColumn = ({ activeChannelId, activeChannelName }) => {
  const [messageCount, setMessagesCount] = useState(0);
  const { t } = useTranslation();

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${activeChannelName}`}</b>
          </p>
          <span className="text-muted">{t('message', { count: messageCount })}</span>
        </div>
        <MessagesList activeChannelId={activeChannelId} setMessagesCount={setMessagesCount} />
        <div className="mt-auto px-5 py-3">
          <AddNewMessageForm activeChannelId={activeChannelId} />
        </div>
      </div>
    </div>
  );
};

export default MessagesColumn;
