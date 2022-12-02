import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FeedItem} from 'react-native-rss-parser';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamsList = {
  Home: undefined;
  Details: {data: FeedItem};
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  'Home'
>;

export type DetailsScreenRouteProp = RouteProp<RootStackParamsList, 'Details'>;
