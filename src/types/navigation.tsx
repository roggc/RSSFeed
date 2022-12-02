import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamsList = {
  Home: undefined;
  Details: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  'Home'
>;
