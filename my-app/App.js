import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home'
import Game from './src/screens/Game'
import Finish from './src/screens/Finish'

import { Provider } from 'react-redux'
import store from './src/store'

const Stack = createStackNavigator();

export default function App() {
 
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Game" component={Game}/>
        <Stack.Screen name="Finish" component={Finish}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});
