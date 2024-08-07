import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { channelsSelector } from '../../features/channels/channelsSlice';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';

const ChannelsList = ({ activeChannelName, setActiveChannelName, setActiveChannelId }) => {
  const [showModalRename, setShowModalRename] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [modalId, setModalId] = useState('');
  const [nameForChange, setNameForChange] = useState('');
  const ids = useSelector(channelsSelector.selectIds);
  const entities = useSelector(channelsSelector.selectEntities);
  const { t } = useTranslation();

  const onHideModalRename = () => setShowModalRename(false);
  const onHideModalRemove = () => setShowModalRemove(false);

  const handleActiveChannelChange = (channel) => {
    setActiveChannelId(channel.id);
    setActiveChannelName(channel.name);
  };

  const activateModalRename = (id, name) => {
    setModalId(id);
    setNameForChange(name);
    setShowModalRename(true);
  };

  const activateModalRemove = (id) => {
    setModalId(id);
    setShowModalRemove(true);
  };

  if (!ids || ids.length === 0) {
    return null;
  }

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {ids.map((id) => {
        const channel = entities[id];
        const isActive = channel.name === activeChannelName;
        return (
          <li className="nav-item w-100" key={id}>
            <div role="group" className="d-flex align-items-center justify-content-between dropdown border-0 p-0 ps-2">

              <button
                onClick={() => handleActiveChannelChange(channel)}
                type="button"
                className={cn('w-100', 'rounded-0', 'text-start', {
                  'text-truncate': channel.removable,
                  btn: true,
                  'btn-secondary': isActive,
                })}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>

              {channel.removable && (
                <Dropdown drop="down">
                  <Dropdown.Toggle
                    variant={isActive ? 'secondary' : 'light'}
                    className="rounded-0 rounded-end dropdown-toggle-split"
                  >
                    <span className="visually-hidden">{t('channelManage')}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => activateModalRename(id, channel.name)} href="#">{t('rename')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => activateModalRemove(id)} href="#">{t('delete')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}

            </div>
          </li>
        );
      })}
      <ModalRemoveChannel
        show={showModalRemove}
        onHide={onHideModalRemove}
        id={modalId}
        setActiveChannelName={setActiveChannelName}
      />
      <ModalRenameChannel
        show={showModalRename}
        onHide={onHideModalRename}
        id={modalId}
        oldName={nameForChange}
      />
    </ul>
  );
};

export default ChannelsList;
