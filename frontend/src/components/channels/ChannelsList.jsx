import React from 'react';
import { useSelector } from 'react-redux';
import { channelsSelector } from '../../features/channels/channelsSlice';

const ChannelsList = () => {
  const ids = useSelector(channelsSelector.selectIds);
  const entities = useSelector(channelsSelector.selectEntities);

  if (!ids || ids.length === 0) {
    return null;
  }
  const activeChannelButtonClassName = 'w-100 rounded-0 text-start btn btn-secondary';
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block   flex-grow-1">
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

export default ChannelsList;
