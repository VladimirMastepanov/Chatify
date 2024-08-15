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
import {
  visibilityRenameModalWindow,
  hideRenameModalWindow,
} from '../../slices/modal/modalSlice';
import { channelsSelector } from '../../slices/channels/channelsSlice';
import { useUpdateChannelMutation } from '../../slices/channels/channelsApi';

const ModalRenameChannel = ({ id, oldName }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const visibility = useSelector(visibilityRenameModalWindow);
  const inputRef = useRef();
  const entities = useSelector(channelsSelector.selectEntities);
  const [updateChannel] = useUpdateChannelMutation();
  const channelsNames = Object.values(entities).map((channel) => channel.name);

  const validationSchema = yup.object().shape({
    newName: yup.string().min(3, t('lengthLimits')).max(20, t('lengthLimits')).required(t('requiredField')),
  });

  const handleHide = () => {
    dispatch(hideRenameModalWindow());
  };

  useEffect(() => {
    if (inputRef.current && oldName && visibility) {
      setTimeout(() => {
        inputRef.current.select();
      }, 0);
    }
  }, [oldName, visibility]);

  return (
    <Modal show={visibility} onHide={handleHide} className="modal-dialog-centered" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={{ newName: oldName }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            const validName = leoProfanity.clean(values.newName);
            if (!channelsNames.includes(validName)) {
              const newName = { name: validName };
              try {
                await updateChannel({ id, newName });
                toast.success(t('channelRenamed'));
                actions.resetForm();
                handleHide();
              } catch (e) {
                toast.error(t('connectionError'));
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
                <Button type="button" className="me-2 btn btn-secondary" onClick={handleHide}>{t('cancel')}</Button>
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
