/**
 * Action types
 */

export const SEARCH_MOVIE_LIST = 'SEARCH_MOVIE_DESCRIPTION';
export const SEARCH_MOVIE_LIST_PAGE = 'SEARCH_MOVIE_LIST_PAGE';
export const SEARCH_MOVIE_LIST_RESPONSE = 'SEARCH_MOVIE_DESCRIPTION_RESPONSE';
export const SEARCH_MOVIE_LIST_FAILURE = 'SEARCH_MOVIE_DESCRIPTION_FAILURE';

/**
 * Action creators
 */

export const searchMovieList = (currentPage) =>
  ({type: SEARCH_MOVIE_LIST, data: {currentPage}});
export const searchMovieListResponse = (data) =>
  ({type: SEARCH_MOVIE_LIST_RESPONSE, data});
export const searchMovieListFailure = (data) =>
  ({type: SEARCH_MOVIE_LIST_FAILURE, data});
