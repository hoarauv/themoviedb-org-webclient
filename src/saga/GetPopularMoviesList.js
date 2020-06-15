import axios from 'axios';
import {
  SEARCH_MOVIE_LIST,
  searchMovieListResponse,
  searchMovieListFailure,
} from 'actions/AppActions';
import {takeLatest, put, call} from 'redux-saga/effects';
import apiKeys from 'apiKeys';

/**
 *
 * @param {string} apiKey - The api key required by themooviedb.org to be
 * authorized to process any request.
 * @param {string} language - The langage
 * @param {number} page - The page to fetch in the api
 */
async function doGetMoviePopular(apiKey, language = 'en-US', page = 1) {
  const request = axios.get('https://api.themoviedb.org/3/movie/popular' +
  `?api_key=${apiKey}&language=${language}&page=${page}`, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  });
  const requestResult = await request;
  return {status: requestResult.status, data: requestResult.data};
}

const checkIncompleteResult = (result) => {
  if (!('page' in result) || !('results' in result)) {
    return true;
  }
  return false;
};

/**
 * The technical process of the movie-list-refreshing request
 * @param {object} action - The action dispatched
 */
function* getPopularMoviesList(action) {
  try {
    const requestResult = yield call(
        doGetMoviePopular,
        apiKeys['themoviedb.org'],
            ('language' in action.data) ?
              action.data.language : 'en-US',
            ('currentPage' in action.data) ?
              action.data.currentPage + 1 : 1,
    );
    if (checkIncompleteResult(requestResult.data)) {
      yield put(searchMovieListFailure({
        errMessage: 'Incomplete Result provided (missing a field).',
      }));
    } else {
      yield put(searchMovieListResponse({
        page: requestResult.data.page,
        data: requestResult.data.results.map((item) => ({
          title: item.title,
          overview: item.overview,
          id: item.id,
          picture:
            item.backdrop_path !== null ?
              `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` :
              '/movie.png',
        })),
      }));
    }
  } catch (err) {
    yield put(searchMovieListFailure({errMessage: err.message}));
  }
}

/**
 * Links the SEARCH_MOVIE_LIST action to the logic needed to be performed.
 */
export function* getPopularMoviesListSaga() {
  yield takeLatest(SEARCH_MOVIE_LIST, getPopularMoviesList);
}
