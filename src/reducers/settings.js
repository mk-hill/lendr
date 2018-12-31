import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
} from '../actions/types';

export default function(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: payload,
      };
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: payload,
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: payload,
      };
    default:
      return state;
  }
}
