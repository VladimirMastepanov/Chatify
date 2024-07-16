import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { channelsSelector, addChannels, setChannels } from '../features/channels/channelsSlice';
import { messagesSelector, setMessages } from '../features/messages/messagesSlice';
import TopNavigation from '../components/TopNavigation';
import { currentTokenSelector } from '../features/authentication/authSlice';
import routes from '../routes';
import ChannelsColumn from '../components/channels/ChannelsColumn';
import MessagesColumn from '../components/messages/MessagesColumn';

const AppPage = () => {
  const [activeChannelName, setActiveChannelName] = useState('general');
  const userToken = useSelector(currentTokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const header = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      try {
        const getChannels = async () => {
          const res = await axios.get(routes.channelsPath(), header);
          return res.data;
        };
        const channelsData = await getChannels();
        dispatch(setChannels(channelsData));
        const getMessages = async () => {
          const res = await axios.get(routes.messagesPath(), header);
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
            activeChannelName={activeChannelName}
            setActiveChannelName={setActiveChannelName}
          />
          <MessagesColumn />
        </div>
      </div>
    </div>
  );
};

export default AppPage;
