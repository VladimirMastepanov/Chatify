import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { updateChannel, channelsSelector } from '../../features/channels/channelsSlice';
import { currentSocketConnectionStatus } from '../../features/socket/socketSlice';

const ModalRenameChannel = ({
  onHide, show, id, oldName,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const token = useSelector(currentSocketConnectionStatus);
  const inputRef = useRef();
  const entities = useSelector(channelsSelector.selectEntities);
  const channelsNames = Object.values(entities).map((channel) => channel.name);

  const validationSchema = yup.object().shape({
    newName: yup.string().min(3, t('lengthLimits')).max(20, t('lengthLimits')).required(t('requiredField')),
  });

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
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={{ newName: oldName }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            if (!channelsNames.includes(values.newName)) {
              // const token = localStorage.getItem('token');
              const newName = { name: values.newName };
              try {
                dispatch(updateChannel({ id, token, newName }));
                toast.success(t('channelRenamed'));
                actions.resetForm();
                onHide();
              } catch (e) {
                toast.error(t('registrationError'));
              }
            } else {
              actions.setFieldError('newName', t('mustBeUnique'));
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form disabled={props.isSubmitting}>
              <Field
                className={`mb-2 form-control ${props.errors.newName ? 'is-invalid' : ''}`}
                required
                innerRef={inputRef}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.newName}
                name="newName"
                id="newName"
              />
              <label className="visually-hidden" htmlFor="newName">{t('newChannelName')}</label>
              <ErrorMessage name="newName" component="div" className="invalid-feedback" />
              <div className="d-flex justify-content-end">
                <Button type="button" className="me-2 btn btn-secondary" onClick={onHide}>{t('cancel')}</Button>
                <Button type="submit" className="btn btn-primary">{t('sent')}</Button>
              </div>
            </Form>
          )}

        </Formik>

      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
