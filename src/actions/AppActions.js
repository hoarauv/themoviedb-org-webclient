/**
 * Action types
 */

export const SEARCH_MOVIE_LIST = 'SEARCH_MOVIE_LIST';
export const SEARCH_MOVIE_LIST_PAGE = 'SEARCH_MOVIE_LIST_PAGE';
export const SEARCH_MOVIE_LIST_RESPONSE = 'SEARCH_MOVIE_LIST_RESPONSE';
export const SEARCH_MOVIE_LIST_FAILURE = 'SEARCH_MOVIE_LIST_FAILURE';

export const MOVIE_MODAL_OPEN = 'MOVIE_MODAL_OPEN';
export const MOVIE_MODAL_CLOSE = 'MOVIE_MODAL_CLOSE';

/**
 * Action creators
 */

export const searchMovieList = (currentPage) =>
  ({type: SEARCH_MOVIE_LIST, data: {currentPage}});
export const searchMovieListResponse = (data) =>
  ({type: SEARCH_MOVIE_LIST_RESPONSE, data});
export const searchMovieListFailure = (data) =>
  ({type: SEARCH_MOVIE_LIST_FAILURE, data});

export const movieModalOpen = (movieId) =>
  ({type: MOVIE_MODAL_OPEN, data: {movieId}});
export const movieModalClose = () =>
  ({type: MOVIE_MODAL_CLOSE});
