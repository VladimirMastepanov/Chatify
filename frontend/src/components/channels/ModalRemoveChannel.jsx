import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removeChannel } from '../../slices/channels/channelsSlice';

const ModalRemoveChannel = ({ onHide, show, id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChannelRemove = () => {
    const token = localStorage.getItem('token');
    try {
      dispatch(removeChannel({ token, id }));
      toast.success(t('channelDeleted'));
      onHide();
    } catch (e) {
      toast.error(t('connectionError'));
    }
  };

  return (
    <Modal show={show} onHide={onHide} className="modal-dialog-centered" centered>

      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('sure')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2 btn btn-secondary" onClick={onHide}>{t('cancel')}</Button>
          <Button type="button" className="btn btn-danger" onClick={handleChannelRemove}>{t('delete')}</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default ModalRemoveChannel;
