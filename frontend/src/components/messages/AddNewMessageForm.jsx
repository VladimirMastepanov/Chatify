import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import SvgArrowIcon from '../../icons/SvgArrowIcon';
import { currentUsernameSelector } from '../../slices/authentication/authSlice';
import { activeChannelIdSelector } from '../../slices/channels/channelsSlice';
import { useAddMessageMutation } from '../../slices/messages/messagesApi';

const AddNewMessageForm = () => {
  const { t } = useTranslation();
  const username = useSelector(currentUsernameSelector);
  const [addMessage] = useAddMessageMutation();
  const activeChannelId = useSelector(activeChannelIdSelector);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={async (values, actions) => {
        const cleanText = leoProfanity.clean(values.body);
        const newMessage = {
          body: cleanText,
          username,
          channelId: activeChannelId,
        };
        try {
          await addMessage(newMessage);
          actions.resetForm();
        } catch (e) {
          toast.error('connectionError');
        }
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form noValidate className="py-1 border rounded-2" onSubmit={props.handleSubmit}>
          <div className="input-group has-validation">
            <Field
              innerRef={inputRef}
              name="body"
              id="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2 form-control"
            />
            <label htmlFor="body" className="visually-hidden">{t('newMessage')}</label>
            <button type="submit" className="btn btn-group-vertical border border-secondary" disabled={props.isSubmitting}>
              <SvgArrowIcon />
              <span className="visually-hidden">{t('sent')}</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewMessageForm;
