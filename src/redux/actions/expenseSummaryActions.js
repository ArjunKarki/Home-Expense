import {
  ADD_BUDGET,
  ADD_EXPENSE,
  FETCH_EXPENSE_SUMMARY,
  FETCH_EXPENSE_SUMMARY_SUCCESS,
} from '../actionTypes/expenseTypes';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {navigate} from '../../utils/RootNavigation';
const yearMonth = moment().format('YYYY_MMMM');
export const addBudget = (data) => (dispatch, getState) => {
  let {auth} = getState();
  let {amount} = data;
  let formData = {
    amount,
  };
  dispatch({type: ADD_BUDGET});

  firestore()
    .collection('Budget')
    .doc(yearMonth)
    .collection('expense')
    .add({
      amount,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      user: auth.profile,
    })
    .then((res) => {
      firestore()
        .collection('ExpenseSummary')
        .doc(yearMonth)
        .get()
        .then((doc) => {
          console.log('ExpenseSummary', doc.data());

          if (doc.exists) {
            let {total, available, spend, updated_at, created_at} = doc.data();

            total = total + parseInt(amount);
            available = total - spend;

            firestore().collection('ExpenseSummary').doc(yearMonth).update({
              total,
              available,
              updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
          } else {
            firestore().collection('ExpenseSummary').doc(yearMonth).set({
              total: amount,
              available: amount,
              spend: 0,
              created_at: firebase.firestore.FieldValue.serverTimestamp(),
              updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
          navigate('dashboard');
        });
    })
    .catch((err) => console.log('err', err));
};

export const getExpenseSummary = () => (dispatch, getState) => {
  dispatch({type: FETCH_EXPENSE_SUMMARY});

  firestore()
    .collection('ExpenseSummary')
    .doc(yearMonth)
    .get()
    .then((res) => {
      dispatch({type: FETCH_EXPENSE_SUMMARY_SUCCESS, payload: res.data()});
    })
    .catch((e) => {
      dispatch({type: FETCH_EXPENSE_SUMMARY_FAILED, payload: err.message});
    });
};
