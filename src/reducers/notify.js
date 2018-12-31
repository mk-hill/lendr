import { NOTIFY_USER } from '../actions/constants';

const initialState = {
  message: null,
  messageType: null,
};

function notifyReducer(state = initialState, action) {
  const { messageType, message } = action;
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message,
        messageType,
      };
    default:
      return state;
  }
}

export default notifyReducer;
