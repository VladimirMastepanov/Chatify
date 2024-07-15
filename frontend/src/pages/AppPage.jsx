import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { channelsSelector, addChannels } from '../features/channels/channelsSlice';
import { messagesSelector, addMessages } from '../features/messages/messagesSlice';
import TopNavigation from '../components/TopNavigation';
import { currentTokenSelector } from '../features/authentication/authSlice';
import routes from '../routes';
import normalizeData from '../helpers/normalizeData';

const ChannelsList = ({ ids, entities }) => {
  if (ids.length === 0) {
    return null;
  }
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {ids.map((id) => (
        <li key={id} className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>
            {entities.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

const AppPage = () => {
  const [activeChannel, setActiveChannel] = useState(null);
  const userToken = useSelector(currentTokenSelector);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelector.selectAll);
  const messages = useSelector(messagesSelector.selectAll);

  useEffect(() => {
    const header = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const getChannels = async () => {
        const res = await axios.get(routes.channelsPath(), header);
        return res;
      };
      dispatch(addChannels(normalizeData(getChannels())));
      const getMessages = async () => {
        const res = await axios.get(routes.messagesPath(), header);
        return res;
      };
      dispatch(addMessages(normalizeData(getMessages())));
    } catch (e) {
      console.log(e.message);
    }
  }, [dispatch]);

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
            <ChannelsList channels={channels} />
          </div>
          <div className="col p-0 h-100">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
