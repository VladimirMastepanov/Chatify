// import Rollbar from 'rollbar';

// const rollbar = new Rollbar({
const rollbar = {

  accessToken: '6f9323de3cee497f9d6c4b9656255523', // Либо напрямую вставьте ваш токен: '3b1f72b9e9d74285b724e8dbf8fce31f'
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbar;
