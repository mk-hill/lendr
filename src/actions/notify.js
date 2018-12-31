import { NOTIFY_USER } from './constants';

export const notifyUser = (message, messageType) => {
  return {
    type: NOTIFY_USER,
    message,
    messageType,
  };
};
