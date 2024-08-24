import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../slices/messages/messagesApi';
import { activeChannelIdSelector } from '../../slices/channels/channelsSlice';

const MessagesList = ({ setMessagesCount }) => {
  const { data: messages } = useGetMessagesQuery();
  const activeChannelId = useSelector(activeChannelIdSelector);
  const [actualMessages, setActualMessages] = useState(null);
  const containerRef = useRef();

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (messages && messages.length !== 0) {
      setActualMessages(messages.filter((m) => m.channelId === activeChannelId));
    }
  }, [messages, activeChannelId]);

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
