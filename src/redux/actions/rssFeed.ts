import {
  FETCHING_RSSFEED,
  FETCH_RSSFEED_SUCCESS,
  FETCH_RSSFEED_FAILURE,
  SET_SELECTED_DATA,
} from '../constants';
import {parse, FeedItem} from 'react-native-rss-parser';
import {Dispatch} from '../configureStore';
import {SelectedData} from '../../types';

type ExtendedFeedItem = FeedItem & {time: number};

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
            .map(i => ({...i, time: new Date(i.published).getTime()}))
            .sort((a, b) => b.time - a.time),
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

export const setSelectedData = (data: SelectedData) =>
  ({type: SET_SELECTED_DATA, data} as const);

type RSSFeedSuccessAction = ReturnType<typeof getRSSFeedSuccess>;
type RSSFeedIsFetchingAction = ReturnType<typeof getRSSFeedIsFetching>;
type RSSFeedFailureAction = ReturnType<typeof getRSSFeedFailure>;
type SetSelectedDataAction = ReturnType<typeof setSelectedData>;

export type RSSFeedAction =
  | RSSFeedFailureAction
  | RSSFeedIsFetchingAction
  | RSSFeedSuccessAction
  | SetSelectedDataAction;
