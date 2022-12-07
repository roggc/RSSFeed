import {FeedItem} from 'react-native-rss-parser';

export type SelectedData = {
  document: string;
  title: string;
  aspectRatios: number[];
};

export type RssFeed = {
  data: FeedItem[];
  isFetching: boolean;
  error: Error | null;
  selectedData: SelectedData;
};
