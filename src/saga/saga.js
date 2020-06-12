import {all} from 'redux-saga/effects';
import {getPopularMoviesListSaga} from 'saga/GetPopularMoviesList';

/**
 * Contains all the Saga logic
 */
export default function* rootSaga() {
  yield all([
    getPopularMoviesListSaga(),
  ]);
}
