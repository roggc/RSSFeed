import {FeedItem} from 'react-native-rss-parser';

export type RssFeed = {
  data: FeedItem[];
  isFetching: boolean;
  error: Error | null;
};
