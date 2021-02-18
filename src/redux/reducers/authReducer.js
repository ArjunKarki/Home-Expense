import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_FAILED,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_SIGNUP,
  REQUEST_SIGNUP_SCCCESS,
} from '../actionTypes/authTypes';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
    case REQUEST_SIGNUP:
      return {...state, loading: true};

    case REQUEST_LOGIN_SUCCESS:
      return {loading: false, profile: action.data};

    case REQUEST_SIGNUP_SCCCESS:
      return {...state, loading: false};

    case REQUEST_LOGIN_FAILED:
      return {...state, loading: false};

    default:
      return state;
  }
};
