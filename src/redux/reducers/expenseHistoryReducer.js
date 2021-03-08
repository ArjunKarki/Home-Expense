import {
  ADD_EXPENSE,
  ADD_EXPENSE_FAILED,
  ADD_EXPENSE_SUCCESS,
  FETCH_EXPENSE_HISTORY,
  FETCH_EXPENSE_HISTORY_FAILED,
  FETCH_EXPENSE_HISTORY_SUCCESS,
  FETCH_EXPENSE_SUMMARY,
} from '../actionTypes/expenseTypes';

const InitialState = {
  loading: false,
  history: [],
  error: null,
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
    case ADD_EXPENSE_SUCCESS:
    case ADD_EXPENSE_FAILED:
      return {...state, loading: action.payload};

    case FETCH_EXPENSE_HISTORY:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EXPENSE_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        history: action.payload,
      };
    case FETCH_EXPENSE_HISTORY_FAILED:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
