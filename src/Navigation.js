import {ReactNativeFirebase} from '@react-native-firebase/app';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import Login from './screens/auth/Login';
import Dashboard from './screens/dashboard';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="login" component={Login} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="dashboard" component={Dashboard} />
  </Stack.Navigator>
);

const Navigation = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.profile ? (
          <Stack.Screen
            name="app"
            component={AppStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
