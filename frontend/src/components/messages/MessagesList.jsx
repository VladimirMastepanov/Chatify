import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../../slices/messages/messagesSlice';
import { activeChannelIdSelector } from '../../slices/channels/channelsSlice';

const MessagesList = ({ setMessagesCount }) => {
  const entities = useSelector(messagesSelector.selectEntities);
  const activeChannelId = useSelector(activeChannelIdSelector);
  const containerRef = useRef();
  const actualMessages = Object.values(entities).filter((m) => m.channelId === activeChannelId);

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (actualMessages) {
      setMessagesCount(actualMessages.length);
    }
  }, [actualMessages, setMessagesCount]);

  useEffect(() => {
    scrollToBottom();
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
          {`: ${message.body}`}
        </div>
      ))}
      <div ref={containerRef} />
    </div>
  );
};

export default MessagesList;
