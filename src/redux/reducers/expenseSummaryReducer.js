import {
  FETCH_EXPENSE_SUMMARY,
  FETCH_EXPENSE_SUMMARY_FAILED,
  FETCH_EXPENSE_SUMMARY_SUCCESS,
} from '../actionTypes/expenseTypes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  summary: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EXPENSE_SUMMARY:
      return {...state, loading: true};
    case FETCH_EXPENSE_SUMMARY_SUCCESS:
      return {...state, loading: false, summary: action.payload};
    case FETCH_EXPENSE_SUMMARY_FAILED:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};
