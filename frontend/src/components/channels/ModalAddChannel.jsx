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

const ModalAddChannel = (props) => {
  const dispatch = useDispatch();
  const { onHide, show } = props;
  const inputRef = useRef();

  const f = useFormik({
    onSubmit: () => {
      const userToken = localStorage.getItem('token');
      const newChannel = {
        name: f.values.body,
      };
      f.resetForm();
      dispatch(addChannel({ userToken, newChannel }));
      onHide();
    },
    initialValues: { body: '' },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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

export default ModalAddChannel;
