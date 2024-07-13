import React from 'react';
import { useRouteError } from 'react-router-dom';

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-page">
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default NotFound;
