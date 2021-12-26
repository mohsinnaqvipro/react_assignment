import {
  SIGN_IN,
  SIGN_UP,
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
} from "./actionsType.js";

const initialState = {
  sign_in: {},
  sign_up: {},
  get_users: {},
  add_user: {},
  delete_user: {},
  update_user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        sign_in: action.payload,
      };
    case SIGN_UP:
      return {
        ...state,
        sign_up: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        get_users: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        add_user: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        delete_user: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        update_user: action.payload,
      };
    default:
      break;
  }
};
export default reducer;
