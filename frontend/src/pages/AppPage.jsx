import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { channelsSelector, fetchChannels } from '../features/channels/channelsSlice';
import { messagesSelector, setMessages } from '../features/messages/messagesSlice';
import TopNavigation from '../components/TopNavigation';
import { currentTokenSelector } from '../features/authentication/authSlice';
import routes from '../routes';
import ChannelsColumn from '../components/channels/ChannelsColumn';
import MessagesColumn from '../components/messages/MessagesColumn';
import getHeader from '../helpers/getHeader';

const AppPage = () => {
  const [activeChannelId, setActiveChannelId] = useState('1');
  const userToken = useSelector(currentTokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels(userToken));
    const fetchData = async () => {
      try {
        const getMessages = async () => {
          const res = await axios.get(routes.messagesPath(), getHeader(userToken));
          return res.data;
        };
        const messageData = await getMessages();
        dispatch(setMessages(messageData));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavigation />
      <div className="container flex-grow-1 my-4 overflow-hidden rounded shadow    d-flex flex-column">
        <div className="row bg-white flex-grow-1 h-100 flex-md-row">
          <ChannelsColumn
            activeChannelId={activeChannelId}
            setActiveChannelId={setActiveChannelId}
          />
          <MessagesColumn activeChannelId={activeChannelId} />
        </div>
      </div>
    </div>
  );
};

export default AppPage;
