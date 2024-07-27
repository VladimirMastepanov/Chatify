import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { removeChannel } from '../../features/channels/channelsSlice';

const ModalRemoveChannel = ({
  onHide, show, id, setActiveChannelId, setActiveChannelName,
}) => {
  const dispatch = useDispatch();

  const handleChannelRemove = () => {
    const token = localStorage.getItem('token');
    dispatch(removeChannel({ token, id }));
    setActiveChannelId('1');
    setActiveChannelName('general');
    toast.success('Канал удален');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>

      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверенны?</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2 btn btn-secondary" onClick={onHide}>Отменить</Button>
          <Button type="button" className="btn btn-danger" onClick={handleChannelRemove}>Удалить</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default ModalRemoveChannel;
