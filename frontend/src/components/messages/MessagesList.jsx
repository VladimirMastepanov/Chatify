import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../../features/messages/messagesSlice';

const MessagesList = ({ activeChannelId, setMessagesCount }) => {
  const entities = useSelector(messagesSelector.selectEntities);
  console.log(entities);
  const actualMessages = Object.values(entities).filter((m) => m.channelId === activeChannelId);
  console.log(actualMessages);
  console.log(actualMessages.length);

  useEffect(() => {
    if (actualMessages) {
      setMessagesCount(actualMessages.length);
    }
  }, [actualMessages]);

  if (!actualMessages || actualMessages.length === 0) {
    return null;
  }

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {actualMessages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>
            {message.username}
          </b>
          : {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
