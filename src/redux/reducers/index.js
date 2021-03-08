import {combineReducers} from 'redux';
import authReducer from './authReducer';
import expenseHistoryReducer from './expenseHistoryReducer';
import expensSummaryReducer from './expenseSummaryReducer';

export default combineReducers({
  auth: authReducer,
  expenseHistory: expenseHistoryReducer,
  expenseSummary: expensSummaryReducer,
});
