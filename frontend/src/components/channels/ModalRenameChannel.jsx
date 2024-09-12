import React, { useEffect, useRef, useState } from 'react';
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
  visibilityModalWindowSelector,
  typeModalWindowSelector,
  hideModalWindow,
} from '../../slices/modal/modalSlice';
import { useUpdateChannelMutation, useGetChannelsQuery } from '../../slices/channels/channelsApi';

const ModalRenameChannel = ({ id, oldName }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modalVisibility = useSelector(visibilityModalWindowSelector);
  const modalType = useSelector(typeModalWindowSelector);
  const inputRef = useRef();
  const { data: channels, isSuccess } = useGetChannelsQuery();
  const [updateChannel] = useUpdateChannelMutation();
  const [channelNames, setChannelNames] = useState(null);

  const validationSchema = yup.object().shape({
    newName: yup.string().min(3, t('lengthLimits')).max(20, t('lengthLimits')).required(t('requiredField')),
  });

  const handleHide = () => {
    dispatch(hideModalWindow('rename'));
  };

  useEffect(() => {
    if (isSuccess) {
      setChannelNames(channels.map((channel) => channel.name));
    }
  }, [isSuccess, channels]);

  useEffect(() => {
    if (inputRef.current && oldName && modalVisibility) {
      setTimeout(() => {
        inputRef.current.select();
      }, 0);
    }
  }, [oldName, modalVisibility]);

  return (
    <Modal show={modalVisibility && modalType === 'rename'} onHide={handleHide} className="modal-dialog-centered" centered>
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
            if (!channelNames.includes(validName)) {
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
                <Button type="submit" className="btn btn-primary">{t('send')}</Button>
              </div>
            </Form>
          )}

        </Formik>

      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
