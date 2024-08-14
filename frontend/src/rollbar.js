const rollbar = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbar;
