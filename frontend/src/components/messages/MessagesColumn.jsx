import React from 'react';
import { useSelector } from 'react-redux';
import AddNewMessageForm from './AddNewMessageForm';
import MessagesList from './MessagesList';

const MessagesColumn = () => {

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>!!! add Channel name</b>
          </p>
          <span className="text-muted">!!! messages count</span>
        </div>
        <MessagesList />
        <div className="mt-auto px-5 py-3">
          <AddNewMessageForm />
        </div>
      </div>
    </div>
  );
};

export default MessagesColumn;
