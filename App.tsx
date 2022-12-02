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
import {QueryClient, QueryClientProvider} from 'react-query';
import Home from './src/Home';

const queryClient = new QueryClient();

const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Navigator>
          <Screen component={Home} name="Home" />
        </Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
