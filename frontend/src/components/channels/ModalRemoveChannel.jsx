import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { removeChannel } from '../../features/channels/channelsSlice';

const ModalRemoveChannel = (props) => {
  const dispatch = useDispatch();
  const { onHide, show, id } = props;

  const handleChannelRemove = () => {
    const token = localStorage.getItem('token');
    dispatch(removeChannel({ userToken: token, id }));
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
