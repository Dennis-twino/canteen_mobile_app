// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen'; // Adjust this path as needed
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetail';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='ItemList' component={ItemList} options={{headerShown:false}}/>
        <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown:false}}/>
        <Stack.Screen name='ItemDetails' component={ItemDetails} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
