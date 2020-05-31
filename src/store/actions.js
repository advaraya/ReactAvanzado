//Acciones: Objetos que representan la intencion de cambiar el estado
import * as TYPES from './types';

/*export const userRegister = (username, password) => ({
  type: TYPES.USER_REGISTER,
  username,
  password,
});*/

export const userLogin = (username, tokenSession) => ({
  type: TYPES.USER_LOGIN,
  username,
  tokenSession,
});

export const registeredUser = (tokenSession) => ({
  type: TYPES.REGISTERED_USER,
  tokenSession,
});
export const userLogout = (username) => ({
  type: TYPES.USER_LOGOUT,
  username,
});

export const setFilter = (filter) => ({
  type: TYPES.SET_FILTER,
  filter,
});

export const setAds = (listOfAds) => ({
  type: TYPES.SET_ADS,
  listOfAds,
});

export const createAd = (newAd) => ({
  type: TYPES.CREATE_AD,
  newAd,
});
export const editAd = (adChanged) => ({
  type: TYPES.EDIT_AD,
  adChanged,
});
