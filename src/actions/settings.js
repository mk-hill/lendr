import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
} from './types';

function updateSetting(setting) {
  const settings = JSON.parse(localStorage.getItem('settings')); // Get settings from localStorage
  let target;

  switch (setting) {
    case DISABLE_BALANCE_ON_ADD:
      target = 'disableBalanceOnAdd';
      break;
    case DISABLE_BALANCE_ON_EDIT:
      target = 'disableBalanceOnEdit';
      break;
    case ALLOW_REGISTRATION:
      target = 'allowRegistration';
      break;
    default:
      return;
  }

  settings[target] = !settings[target]; // Toggle setting
  localStorage.setItem('settings', JSON.stringify(settings)); // Update local storage

  return settings[target]; // Return new boolean value
}

export const setDisableBalanceOnAdd = () => {
  const type = DISABLE_BALANCE_ON_ADD;
  const payload = updateSetting(type);

  return {
    type,
    payload,
  };
};

export const setDisableBalanceOnEdit = () => {
  const type = DISABLE_BALANCE_ON_EDIT;
  const payload = updateSetting(type);

  return {
    type,
    payload,
  };
};

export const setAllowRegistration = () => {
  const type = ALLOW_REGISTRATION;
  const payload = updateSetting(type);

  return {
    type,
    payload,
  };
};
