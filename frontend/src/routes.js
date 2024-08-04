const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || '';
  }
  return '';
};

const apiUrl = getApiUrl();
const apiPath = '/api/v1';

export default {
  loginPath: () => [apiUrl, apiPath, 'login'].join('/'),
  signUpPath: () => [apiUrl, apiPath, 'signup'].join('/'),
  channelsPath: () => [apiUrl, apiPath, 'channels'].join('/'),
  channelPathWithId: (id) => [apiUrl, apiPath, `channels/${id}`].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  messagesPathWithId: (id) => [apiUrl, apiPath, `messages/${id}`].join('/'),
};
