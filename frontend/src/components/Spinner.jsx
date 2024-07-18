import React from 'react';

const Spinner = () => (
  <div className="position-fixed top-0 start-0 bottom-0 end-0 d-flex justify-content-center align-items-center">
    <div className="spinner-grow" role="status">
      <span className="sr-only" />
    </div>
  </div>
);

export default Spinner;
