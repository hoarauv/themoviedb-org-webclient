/**
 * Action types
 */

export const SEARCH_MOVIE_DESCRIPTION = 'SEARCH_MOVIE_DESCRIPTION';
export const SEARCH_MOVIE_DESCRIPTION_RESPONSE =
  'SEARCH_MOVIE_DESCRIPTION_RESPONSE';
export const SEARCH_MOVIE_DESCRIPTION_FAILURE =
  'SEARCH_MOVIE_DESCRIPTION_FAILURE';

/**
 * Action creators
 */

export const searchMovieDescription = (data) =>
  ({type: SEARCH_MOVIE_DESCRIPTION, data});
export const searchMovieDescriptionResponse = (data) =>
  ({type: SEARCH_MOVIE_DESCRIPTION_RESPONSE, data});
export const searchMovieDescriptionFailure = (data) =>
  ({type: SEARCH_MOVIE_DESCRIPTION_FAILURE, data});
