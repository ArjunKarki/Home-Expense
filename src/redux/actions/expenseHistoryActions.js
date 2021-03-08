import {
  ADD_BUDGET,
  ADD_EXPENSE,
  ADD_EXPENSE_FAILED,
  ADD_EXPENSE_SUCCESS,
  FETCH_EXPENSE_HISTORY,
  FETCH_EXPENSE_HISTORY_FAILED,
  FETCH_EXPENSE_HISTORY_SUCCESS,
  FETCH_EXPENSE_SUMMARY,
} from '../actionTypes/expenseTypes';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {navigate} from '../../utils/RootNavigation';
const yearMonth = moment().format('YYYY_MMMM');

export const addDailyExpense = (data) => (dispatch, getState) => {
  dispatch({type: ADD_EXPENSE, payload: false});
  let {auth} = getState();
  console.log('data', data);
  let {amount, description} = data;

  firestore()
    .collection('DailyExpense')
    .add({
      amount,
      description,
      user: auth.profile,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((res) => {
      firestore()
        .collection('ExpenseSummary')
        .doc(yearMonth)
        .get()
        .then((doc) => {
          let {total, available, spend, updated_at, created_at} = doc.data();
          if (doc.exists) {
            spend = spend + parseInt(amount);
            available = total - spend;
            firestore().collection('ExpenseSummary').doc(yearMonth).update({
              available,
              spend,
              updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
          } else {
            spend = spend + parseInt(amount);
            available = total - spend;
            firestore().collection('ExpenseSummary').doc(yearMonth).set({
              total: 0,
              available,
              spend,
              created_at: firebase.firestore.FieldValue.serverTimestamp(),
              updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
          dispatch({type: ADD_EXPENSE_SUCCESS, payload: false});
        })
        .catch((e) => dispatch({type: ADD_EXPENSE_FAILED, payload: false}));
    });
};

export const getExpenseHistory = () => (dispatch, getState) => {
  dispatch({type: FETCH_EXPENSE_HISTORY});
  firestore()
    .collection('DailyExpense')
    .get()
    .then((res) => {
      let data = [];
      res.forEach((doc) => {
        data = [...data, doc.data()];
      });
      dispatch({type: FETCH_EXPENSE_HISTORY_SUCCESS, payload: data});
    })
    .catch((err) => {
      dispatch({type: FETCH_EXPENSE_HISTORY_FAILED, payload: err.message});
    });
};
