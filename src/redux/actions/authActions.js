import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_FAILED,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_SIGNUP,
  REQUEST_SIGNUP_FAILED,
  REQUEST_SIGNUP_SCCCESS,
} from '../actionTypes/authTypes';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {navigate} from '../../utils/RootNavigation';

const firebaseLogin = (data, dispatch) => {
  let {email, password} = data;
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(({user}) => {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((res) => {
          dispatch({type: REQUEST_LOGIN_SUCCESS, data: res.data()});
        });
    })
    .catch((err) =>
      dispatch({type: REQUEST_LOGIN_FAILED, payload: err.message}),
    );
};

export const requestLogin = (data) => (dispatch, getState) => {
  dispatch({
    type: REQUEST_LOGIN,
    payload: data,
  });

  firebaseLogin(data, dispatch);
};

const firebaseSignup = (data, dispatch) => {
  let {email, password, fullName} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      console.log('user created');
      let {uid} = user;

      firestore()
        .collection('Users')
        .doc(uid)
        .set({
          uid,
          email,
          fullName,
        })
        .then(() => {
          dispatch({type: REQUEST_SIGNUP_SCCCESS});
          navigate('login');
        });
    })
    .catch((err) => {
      console.log('error', err);
      dispatch({type: REQUEST_SIGNUP_FAILED, payload: err.message});
    });
};

export const requestSignup = (data) => (dispatch, getState) => {
  dispatch({
    type: REQUEST_SIGNUP,
    payload: data,
  });

  firebaseSignup(data, dispatch);
};
