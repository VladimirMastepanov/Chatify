import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { addChannel, channelsSelector } from '../../slices/channels/channelsSlice';
import { currentTokenSelector } from '../../slices/authentication/authSlice';

const ModalAddChannel = ({ onHide, show }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const token = useSelector(currentTokenSelector);
  const inputRef = useRef();
  const entities = useSelector(channelsSelector.selectEntities);
  const channelsNames = Object.values(entities).map((channel) => channel.name);

  const validationSchema = yup.object().shape({
    name: yup.string().min(3, t('lengthLimits')).max(20, t('lengthLimits')).required(t('requiredField')),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={show} onHide={onHide} className="modal-dialog-centered" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            const validName = leoProfanity.clean(values.name);
            if (!channelsNames.includes(validName)) {
              const newChannel = { name: validName };
              try {
                await dispatch(addChannel({ token, newChannel }));
                toast.success(t('channelCreated'));
                actions.resetForm();
                onHide();
              } catch (e) {
                toast.error(t('connectionError'));
              }
            } else {
              actions.setFieldError('name', t('mustBeUnique'));
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
              <label className="visually-hidden" htmlFor="name">{t('channelName')}</label>
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
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

export default ModalAddChannel;
