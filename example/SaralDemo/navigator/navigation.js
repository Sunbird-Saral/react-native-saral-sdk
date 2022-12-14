import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../src/App';
import ScanDetailScreen from '../src/ScanDetailScreen';
import { Provider } from 'react-redux';
import { store } from './../src/redux/store';

const Stack = createNativeStackNavigator();
const MainNavigation = ()=> {
    return (
      <NavigationContainer>
         <Provider store ={store}>
        <Stack.Navigator>
        <Stack.Screen name="App" component={App} options={{ headerShown : false }} />
          <Stack.Screen name="ScanDetailScreen" component={ScanDetailScreen} options={{ headerShown : false }} />
        </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    );
  }
  export default MainNavigation