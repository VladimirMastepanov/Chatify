import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: '96083c626081455c9229aa55b1590701',
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbar;
