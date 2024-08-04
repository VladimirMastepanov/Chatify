const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelPathWithId: (id) => [apiPath, `channels/${id}`].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  messagesPathWithId: (id) => [apiPath, `messages/${id}`].join('/'),
};
