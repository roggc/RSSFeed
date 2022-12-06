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
import {store, persistor} from './redux/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ReduxNetworkProvider} from 'react-native-offline';
import styled from '@emotion/native';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamsList>();

const App = () => (
  <NavigationContainer>
    <Navigator>
      <Screen
        component={Home}
        name="Home"
        options={{
          headerTitle: props => (
            <BoldText {...props} testID="screen-header-title">
              Home
            </BoldText>
          ),
        }}
      />
      <Screen
        component={Details}
        name="Details"
        options={{
          headerTitle: props => (
            <BoldText {...props} testID="screen-header-title">
              Details
            </BoldText>
          ),
        }}
      />
    </Navigator>
  </NavigationContainer>
);

const Root = () => (
  <Provider store={store}>
    <ReduxNetworkProvider
      pingInterval={30000}
      pingOnlyIfOffline
      pingTimeout={10000}
      pingServerUrl="https://www.google.com/"
      shouldPing
      pingInBackground={false}
      httpMethod={'HEAD'}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ReduxNetworkProvider>
  </Provider>
);

const BoldText = styled.Text`
  font-weight: 700;
`;

export default Root;
