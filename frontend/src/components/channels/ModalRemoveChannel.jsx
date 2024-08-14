import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { removeChannel } from '../../slices/channels/channelsSlice';
import {
  visibilityRemoveModalWindow,
  hideRemoveModalWindow,
} from '../../slices/modal/modalSlice';

const ModalRemoveChannel = ({ id }) => {
  const visibility = useSelector(visibilityRemoveModalWindow);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleHide = () => {
    dispatch(hideRemoveModalWindow());
  };

  const handleChannelRemove = () => {
    const token = localStorage.getItem('token');
    try {
      dispatch(removeChannel({ token, id }));
      toast.success(t('channelDeleted'));
      handleHide();
    } catch (e) {
      toast.error(t('connectionError'));
    }
  };

  return (
    <Modal show={visibility} onHide={handleHide} className="modal-dialog-centered" centered>

      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('sure')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2 btn btn-secondary" onClick={handleHide}>{t('cancel')}</Button>
          <Button type="button" className="btn btn-danger" onClick={handleChannelRemove}>{t('delete')}</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default ModalRemoveChannel;
