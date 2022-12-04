import {
  FETCHING_RSSFEED,
  FETCH_RSSFEED_SUCCESS,
  FETCH_RSSFEED_FAILURE,
} from '../constants';
import {parse, FeedItem} from 'react-native-rss-parser';
import {Dispatch} from '../../App';

type ExtendedFeedItem = FeedItem & {date: Date};

const RSSFEED_URL = 'https://www.xatakandroid.com/tag/feeds/rss2.xml';

export const fetchRSSFeed = () => (dispatch: Dispatch) => {
  dispatch(getRSSFeedIsFetching());
  fetch(RSSFEED_URL)
    .then(response => response.text())
    .then(xml => parse(xml))
    .then(parsed =>
      dispatch(
        getRSSFeedSuccess(
          parsed.items
            .map(i => ({...i, date: new Date(i.published)}))
            .sort((a, b) => b.date.getTime() - a.date.getTime()),
        ),
      ),
    )
    .catch(e => dispatch(getRSSFeedFailure(e)));
};

const getRSSFeedIsFetching = () => ({type: FETCHING_RSSFEED} as const);
const getRSSFeedSuccess = (data: ExtendedFeedItem[]) =>
  ({type: FETCH_RSSFEED_SUCCESS, data} as const);
const getRSSFeedFailure = (error: Error) =>
  ({type: FETCH_RSSFEED_FAILURE, error} as const);

type RSSFeedSuccessAction = ReturnType<typeof getRSSFeedSuccess>;
type RSSFeedIsFetchingAction = ReturnType<typeof getRSSFeedIsFetching>;
type RSSFeedFailureAction = ReturnType<typeof getRSSFeedFailure>;

export type RSSFeedAction =
  | RSSFeedFailureAction
  | RSSFeedIsFetchingAction
  | RSSFeedSuccessAction;
