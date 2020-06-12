import {
  SEARCH_MOVIE_LIST,
  SEARCH_MOVIE_LIST_RESPONSE,
  SEARCH_MOVIE_LIST_FAILURE,
} from 'actions/AppActions';

const initialState = {
  computing: true,
  error: false,
  currentPage: 0,
  currentList: [],
};

/**
 * Handles movie-list-refreshing response or failure (sending the request
 * is done by Saga)
 * @param {object} state - The state when the action was dispatched
 * @param {object} action - The action dispatched
 * @return {object} - The new state (after the application of the action)
 */
export function refreshMovieListReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MOVIE_LIST_RESPONSE:
      return {
        ...state,
        computing: false,
        error: false,
        currentPage: action.data.page,
        currentList: [...state.currentList, ...action.data.data],
      };
    case SEARCH_MOVIE_LIST_FAILURE:
      return {
        ...state,
        error: true,
      };
    case SEARCH_MOVIE_LIST:
      return {
        ...state,
        computing: true,
      };
    default:
      return state;
  }
}
