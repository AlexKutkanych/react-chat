import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

const chatManager = (userId) => new ChatManager({
  instanceLocator: 'v1:us1:d0ec4f24-daa6-409c-8f66-cec95c62b14a', 
  userId,
  tokenProvider: new TokenProvider({
    url: 'http://localhost:3001/authenticate'
  })
});

export default chatManager;