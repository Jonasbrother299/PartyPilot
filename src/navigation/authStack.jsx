import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent'
          },
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login" // name to navigate to this component
          component={LoginScreen}
          options={{
            presentation: 'transparentModal', 
            animationTypeForReplace: "push"
          }} />
        <Stack.Screen
          name="Register" // name to navigate to this component
          component={RegisterScreen}
          options={{
            presentation: 'transparentModal',
            animationTypeForReplace: "pop"
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}