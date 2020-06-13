import {all} from 'redux-saga/effects';
import {getPopularMoviesListSaga} from 'saga/GetPopularMoviesList';
import {getMovieDetailsSaga} from 'saga/GetMovieDetails';

/**
 * Contains all the Saga logic
 */
export default function* rootSaga() {
  yield all([
    getPopularMoviesListSaga(),
    getMovieDetailsSaga(),
  ]);
}
