import {ADD_BUDGET} from '../actionTypes/expenseTypes';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
export const addBudget = (data) => (dispatch, getState) => {
  console.log(data);
  let {auth} = getState();
  let {amount} = data;
  let formData = {
    amount,
  };
  dispatch({type: ADD_BUDGET, payload: data});
  let _doc = moment().format('YYYY_MMMM');
  return;

  firestore()
    .collection('Budget')
    .doc(_doc)
    .collection('expense')
    .add({
      amount,
      time: moment().toISOString(),
      user: auth.profile,
    })
    .then((res) => {
      console.log('expense added', res.id);
      firestore()
        .collection('ExpenseSummary')
        .doc(_doc)
        .get()
        .then((doc) => {
          console.log('summary', res.data());
          let data = doc.data();
          if (doc.exists()) {
          } else {
            firestore().collection('ExpenseSummary').doc(_doc).set({});
          }
        });
    })
    .catch((err) => console.log('err', err));
};
