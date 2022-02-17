import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {AuthProvider} from './contexts/auth';
import {CartProvider} from './contexts/cart';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'react-native'


const App = () => (
  <NavigationContainer>
    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#a295f1" translucent = {true}/>
    <AuthProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </AuthProvider>
  </NavigationContainer> 
);

export default App;
