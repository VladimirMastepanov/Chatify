import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalAddChannel from './ModalAddChannel';
import ChannelsList from './ChannelsList';
import SvgPlusIcon from '../SvgPlusIcon';

const ChannelsColumn = () => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const onHide = () => setShowModal(false);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">

      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button onClick={() => setShowModal(true)} type="button" className="p-0 text-primary btn btn-group-vertical">
          <SvgPlusIcon />
          <span className="visually-hidden">{t('plus')}</span>
        </button>
      </div>

      <ChannelsList />
      <ModalAddChannel
        show={showModal}
        onHide={onHide}
      />

    </div>
  );
};

export default ChannelsColumn;
