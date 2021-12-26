import {
  SIGN_IN,
  SIGN_UP,
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
} from "./actionsTypes";

export const handleSign = (payload) => ({
  type: SIGN_IN,
  payload,
});

export const handleSignup = (payload) => ({
  type: SIGN_UP,
  payload,
});

export const handleGetUsers = (payload) => ({
  type: GET_USERS,
  payload,
});

export const handleAddUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const handleDeleteUser = (payload) => ({
  type: DELETE_USER,
  payload,
});

export const handleUpdateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});
