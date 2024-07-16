import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { channelsSelector, addChannels, setChannels } from '../features/channels/channelsSlice';
import { messagesSelector, setMessages } from '../features/messages/messagesSlice';
import TopNavigation from '../components/TopNavigation';
import { currentTokenSelector } from '../features/authentication/authSlice';
import routes from '../routes';
import AddNewMessageForm from '../components/AddNewMessageForm';

const ChannelsList = ({ ids, entities }) => {
  if (!ids || ids.length === 0) {
    return null;
  }
  const activeChannelButtonClassName = 'w-100 rounded-0 text-start btn btn-secondary';
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {ids.map((id) => (
        <li key={id} className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>
            {entities[id].name}
          </button>
        </li>
      ))}
    </ul>
  );
};

const AppPage = () => {
  const [activeChannelName, setActiveChannelName] = useState('general');
  const userToken = useSelector(currentTokenSelector);
  const dispatch = useDispatch();
  const channelsIds = useSelector(channelsSelector.selectIds);
  const channelsEntities = useSelector(channelsSelector.selectEntities);
  const messages = useSelector(messagesSelector.selectAll);

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
        // const getMessages = async () => {
        //   const res = await axios.get(routes.messagesPath(), header);
        //   return res.data;
        // };
        // const messageData = await getMessages();
        // dispatch(addMessages(normalizeData(messageData)));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavigation />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <svg xmlns="https:/www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ChannelsList ids={channelsIds} entities={channelsEntities} />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>!!! add Channel name</b>
                </p>
                <span className="text-muted">!!! messages count</span>
              </div>
              <div id="messages-box" className="chat-messages owerflow-auto px-5" />
              <div className="mt-auto px-5 py-3">
                <AddNewMessageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
