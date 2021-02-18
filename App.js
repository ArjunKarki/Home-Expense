/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './src/redux/reducers';
import Navigation from './src/Navigation';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const App = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['auth'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
