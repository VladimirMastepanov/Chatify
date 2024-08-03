import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ErrorBoundary,
  Provider as RollbarProvider,
} from '@rollbar/react';
import store from './app/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import rollbar from './rollbar';
import './i18next';

const rollbar = {
  accessToken: '6f9323de3cee497f9d6c4b9656255523',
  environment: 'testenv',
};

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  // <React.StrictMode>
  <RollbarProvider instance={rollbar}>
    <ErrorBoundary>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          pauseOnFocusLoss
        />
        <App />
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
