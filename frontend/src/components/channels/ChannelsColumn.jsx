import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showAddModalWindow } from '../../slices/modal/modalSlice';
import ModalAddChannel from './ModalAddChannel';
import ChannelsList from './ChannelsList';
import SvgPlusIcon from '../SvgPlusIcon';

const ChannelsColumn = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">

      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button onClick={() => dispatch(showAddModalWindow())} type="button" className="p-0 text-primary btn btn-group-vertical">
          <SvgPlusIcon />
          <span className="visually-hidden">{t('plus')}</span>
        </button>
      </div>

      <ChannelsList />
      <ModalAddChannel />

    </div>
  );
};

export default ChannelsColumn;
