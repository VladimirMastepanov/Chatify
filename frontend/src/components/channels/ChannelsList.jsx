import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  channelsSelector,
  activeChannelIdSelector,
  setActiveChannelId,
} from '../../slices/channels/channelsSlice';
import { showRemoveModalWindow, showRenameModalWindow } from '../../slices/modal/modalSlice';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';

const ChannelsList = () => {
  const activeChannelId = useSelector(activeChannelIdSelector);
  const [modalId, setModalId] = useState('');
  const [nameForChange, setNameForChange] = useState('');
  const ids = useSelector(channelsSelector.selectIds);
  const entities = useSelector(channelsSelector.selectEntities);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const containerRef = useRef();

  const handleActiveChannelChange = (channel) => {
    dispatch(setActiveChannelId(channel.id));
  };

  const activateModalRename = (id, name) => {
    setModalId(id);
    setNameForChange(name);
    dispatch(showRenameModalWindow());
  };

  const activateModalRemove = (id) => {
    setModalId(id);
    dispatch(showRemoveModalWindow());
  };

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [entities, containerRef]);

  if (!ids || ids.length === 0) {
    return null;
  }

  return (
    <ul id="channels-box" ref={containerRef} className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {ids.map((id) => {
        const channel = entities[id];
        const isActive = channel.id === activeChannelId;
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
        id={modalId}
      />
      <ModalRenameChannel
        id={modalId}
        oldName={nameForChange}
      />
    </ul>
  );
};

export default ChannelsList;
