import React from 'react';
import { Formik, Form, Field } from 'formik';

const AddNewMessageForm = () => {
  const qw = 1;
  console.log(qw);

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, actions) => {
        console, log(values);
      }}
    >
      {(props) => (
        <Form noValidate className="py-1 border rounded-2" onSubmit={props.handleSubmit}>
          <div className="input-group has-validation">
            <Field
              name="body"
              id="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2 form-control"
            />
            <label htmlFor="body" />
            <button type="submit" className="btn btn-group-vertical border border-secondary" disabled={props.isSubmitting}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewMessageForm;
