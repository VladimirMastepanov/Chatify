import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { updateChannel, channelsSelector } from '../../features/channels/channelsSlice';

const validationSchema = yup.object().shape({
  newName: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
});

const ModalRenameChannel = ({
  onHide, show, id, oldName,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const entities = useSelector(channelsSelector.selectEntities);
  const channelsNames = Object.values(entities).map((channel) => channel.name);

  useEffect(() => {
    if (inputRef.current && oldName && show) {
      setTimeout(() => {
        inputRef.current.select();
      }, 0);
    }
  }, [oldName, show]);

  return (
    <Modal show={show} onHide={onHide} className="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={{ newName: oldName }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            if (!channelsNames.includes(values.newName)) {
              const token = localStorage.getItem('token');
              const newName = { name: values.newName };
              try {
                await dispatch(updateChannel({ id, token, newName }));
                toast.success('Канал переименован');
                actions.resetForm();
                onHide();
              } catch (e) {
                toast.error(e.message);
              }
            } else {
              actions.setFieldError('newName', 'Должно быть уникальным');
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field
                className={`mb-2 form-control ${props.errors.newName ? 'is-invalid' : ''}`}
                required
                innerRef={inputRef}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.newName}
                disabled={props.isSubmitting}
                name="newName"
                id="newName"
              />
              <label className="visually-hidden" htmlFor="newName">Новое имя канала</label>
              <ErrorMessage name="newName" component="div" className="invalid-feedback" />
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

export default ModalRenameChannel;
