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

const {store, persistor} = configureStore();

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamsList>();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Navigator>
            <Screen component={Home} name="Home" />
            <Screen component={Details} name="Details" />
          </Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
