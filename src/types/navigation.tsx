import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamsList = {
  Home: undefined;
  Details: undefined;
};

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'Details'
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  'Home'
>;

export type DetailsScreenRouteProp = RouteProp<RootStackParamsList, 'Details'>;
