import React from 'react';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../../features/messages/messagesSlice';

const MessagesList = ({ activeChannelId }) => {
  // const ids = useSelector(messagesSelector.selectIds);
  const entities = useSelector(messagesSelector.selectEntities);
  const actualMessages = Object.values(entities).filter((m) => m.channelId === activeChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {actualMessages ?? actualMessages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>
            !
            {message.username}
          </b>
          :
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
