import {ReactNativeFirebase} from '@react-native-firebase/app';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import Login from './screens/auth/Login';
import Dashboard from './screens/dashboard';
import {useSelector} from 'react-redux';
import Signup from './screens/auth/Signup';
import {navigationRef} from './utils/RootNavigation';
import AddBudget from './screens/dashboard/addBudget';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signup" component={Signup} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="dashboard" component={Dashboard} />
    <Stack.Screen name="addBudget" component={AddBudget} />
  </Stack.Navigator>
);

const Navigation = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer ref={navigationRef}>
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
