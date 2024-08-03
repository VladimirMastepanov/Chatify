const rollbar = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbar;
