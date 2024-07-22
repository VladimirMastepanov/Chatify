import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { addChannel } from '../../features/channels/channelsSlice';


const handleChannelRename = (id, newName) => {
  const token = localStorage.getItem('token');
  const data = {
    id,
    userToken: token,
    newName: {
      name: newName,
    },
  };
  dispatch(updateChannel(data));
};

const ModalRenameChannel = (props) => {
  const dispatch = useDispatch();
  const { onHide, show, id, name } = props;
  const inputRef = useRef();

  const f = useFormik({
    onSubmit: () => {
      const userToken = localStorage.getItem('token');
      const newChannel = {
        name: f.values.body,
      };
      dispatch(addChannel({ userToken, newChannel }));
      f.values.body = '';
      onHide();
    },
    initialValues: { body: name },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2 form-control"
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              data-testid="input-body"
              name="body"
            />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button type="button" className="me-2 btn btn-secondary" onClick={onHide}>Отменить</Button>
            <Button type="submit" className="btn btn-primary">Отправить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
