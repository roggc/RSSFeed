import {RssFeed} from '../../types';
import {
  FETCHING_RSSFEED,
  FETCH_RSSFEED_SUCCESS,
  FETCH_RSSFEED_FAILURE,
} from '../constants';
import {RSSFeedAction} from '../actions/rssFeed';

const initialState: RssFeed = {
  data: [],
  isFetching: false,
  error: null,
};

export default (state = initialState, action: RSSFeedAction) => {
  switch (action.type) {
    case FETCHING_RSSFEED:
      return {...state, isFetching: true};
    case FETCH_RSSFEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        error: null,
      };
    case FETCH_RSSFEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
