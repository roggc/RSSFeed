/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Details from './Details';
import {RootStackParamsList} from './types';
import configureStore from './redux/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ReduxNetworkProvider} from 'react-native-offline';

const {store, persistor} = configureStore();
const {Navigator, Screen} = createNativeStackNavigator<RootStackParamsList>();

const App = () => (
  <NavigationContainer>
    <Navigator>
      <Screen component={Home} name="Home" />
      <Screen component={Details} name="Details" />
    </Navigator>
  </NavigationContainer>
);

const Root = () => (
  <Provider store={store}>
    <ReduxNetworkProvider pingInterval={30000} pingOnlyIfOffline>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ReduxNetworkProvider>
  </Provider>
);

export default Root;
