import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { addChannel, channelsSelector } from '../../features/channels/channelsSlice';
import { currentTokenSelector } from '../../features/authentication/authSlice';

const validationSchema = yup.object().shape({
  name: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
});

const ModalAddChannel = ({ onHide, show }) => {
  const dispatch = useDispatch();
  const token = useSelector(currentTokenSelector);
  const inputRef = useRef();
  const entities = useSelector(channelsSelector.selectEntities);
  const channelsNames = Object.values(entities).map((channel) => channel.name);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [channelsNames]);

  return (
    <Modal show={show} onHide={onHide} className="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            console.log(channelsNames);
            if (!channelsNames.includes(values.name)) {
              // const token = localStorage.getItem('token');
              const newChannel = { name: values.name };
              try {
                await dispatch(addChannel({ token, newChannel }));
                toast.success('Канал создан');
                actions.resetForm();
                onHide();
              } catch (e) {
                toast.error(e.message);
              }
            } else {
              actions.setFieldError('name', 'Должно быть уникальным');
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} disabled={props.isSubmitting}>
              <Field
                innerRef={inputRef}
                required
                name="name"
                id="name"
                value={props.values.name}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={`mb-2 form-control ${props.errors.name ? 'is-invalid' : ''}`}
              />
              <label className="visually-hidden" htmlFor="name">Имя канала</label>
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
              <div className="d-flex justify-content-end">
                <Button type="button" className="me-2 btn btn-secondary" onClick={onHide}>Отменить</Button>
                <Button type="submit" className="btn btn-primary">Отправить</Button>
              </div>
            </Form>
          )}

        </Formik>

      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
