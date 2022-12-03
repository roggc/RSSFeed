import {combineReducers} from 'redux';
import RSSFeed from './rssFeed';
import {reducer as network} from 'react-native-offline';

export default combineReducers({RSSFeed, network});
