import axios from 'axios';
import {
  SEARCH_MOVIE_DESCRIPTION,
  searchMovieDescriptionResponse,
  searchMovieDescriptionFailure,
} from 'actions/DescriptionActions';
import {takeLatest, put, call} from 'redux-saga/effects';

import apiKeys from '../apiKeys';

/**
 * Do the technical process of requesting the data regarding one specific movie
 * @param {string} apiKey - The api key to themoviedb.org
 * @param {number} movieId - The id of the movie we want to describe
 * @param {string} language - The translation required for this page
 * @return {object} - The result of the request, whether it's a success or not
 */
async function doGetMovieDetails(apiKey, movieId, language = 'en-US') {
  const request = axios.get('https://api.themoviedb.org/3/movie/' +
    `${movieId}?api_key=${apiKey}&language=${language}`, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  });
  const requestResult = await request;
  return {status: requestResult.status, data: requestResult.data};
}

const requiredResultFields = [
  'title',
  'genre',
  'overview',
];

/**
 * Checks if the result of the request have minimal information regarding the
 * movie.
 * If it misses some of the expected data, it can be displayed but if it misses
 * those capital informations, it is considered as incomplete
 * @param {object} result - The result of the request previoulsy sent
 * @return {boolean} - True if the data is incomplete
 */
const checkIncompleteResult = (result) => {
  requiredResultFields.forEach((item) => {
    if (!(item in result)) {
      return true;
    }
  });
  return false;
};

/**
 * Handle the asynchronous process of requesting the description of a movie,
 * parsing the result and sending the required informations to the reducer.
 * @param {*} action - The action previously dispatched
 */
export function* getMovieDetails(action) {
  try {
    const requestResult = yield call(
        doGetMovieDetails,
        apiKeys['themoviedb.org'],
        action.data.movieId,
    );
    if (checkIncompleteResult(requestResult.data)) {
      yield put(searchMovieDescriptionFailure({
        errMessage: 'Incomplete Result provided (missing a field).',
      }));
    } else {
      yield put(searchMovieDescriptionResponse({
        id: requestResult.data.id,
        title: requestResult.data.title,
        description: requestResult.data.overview,
        adult: Boolean(requestResult.data.adult),
        homepage: requestResult.data.homepage,
        genres: requestResult.data.genres.map((item) => item.name),
        originalTitle: requestResult.data['original_title'],
        spokenLanguages: requestResult.data['spoken_languages']
            .map((item) => (item.name)),
        productions: requestResult.data['production_companies']
            .map((item) => ({
              name: item.name,
              picture: item['logo_path'] !== null ?
                'https://image.tmdb.org/t/p/w500/' +
                  `${item['logo_path']}` :
                '/productor.png',
            })),
        picture: requestResult.data['backdrop_path'] !== null ?
          'https://image.tmdb.org/t/p/w500/' +
            `${requestResult.data['backdrop_path']}` :
          '/movie.png',
        runTime: requestResult.data.runtime,
        voteAverage: requestResult.data['vote_average'],
        voteCount: requestResult.data['vote_count'],
        releaseDate: requestResult.data['release_date'],
      }));
    }
  } catch (err) {
    yield put(searchMovieDescriptionFailure({errMessage: err.message}));
  }
}

/**
 * Links the SEARCH_MOVIE_DESCRIPTION action to the logic needed to be
 * performed.
 */
export function* getMovieDetailsSaga() {
  yield takeLatest(SEARCH_MOVIE_DESCRIPTION, getMovieDetails);
}
