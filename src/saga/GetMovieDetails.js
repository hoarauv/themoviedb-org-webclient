import axios from 'axios';
import {
  SEARCH_MOVIE_DESCRIPTION,
  searchMovieDescriptionResponse,
  searchMovieDescriptionFailure,
} from 'actions/DescriptionActions';
import {takeLatest, put, call} from 'redux-saga/effects';

import apiKeys from '../apiKeys';

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
  'spoken_languages',
  'title',
  'status',
  'genre',
  'overview',
  'poster_path',
];

const checkIncompleteResult = (result) => {
  requiredResultFields.forEach((item) => {
    if (!(item in result)) {
      return true;
    }
  });
  return false;
};

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
        originalTitle: requestResult.data['original_title'],
        spokenLanguages: requestResult.data['spoken_languages']
            .map((item) => (item.name)),
        productions: requestResult.data['production_companies']
            .map((item) => ({
              name: item.name,
              picture: 'https://image.tmdb.org/t/p/w500/' +
                `${item['logo_path']}`,
            })),
        picture: 'https://image.tmdb.org/t/p/w500/' +
            `${requestResult.data['backdrop_path']}`,
        runTime: requestResult.data.runTime,
        voteAverage: requestResult.data['vote_average'],
        voteCount: requestResult.data['vote_count'],
        releaseDate: requestResult.data['release_date'],
      }));
    }
  } catch (err) {
    yield put(searchMovieDescriptionFailure({errMessage: err.message}));
  }
}

export function* getMovieDetailsSaga() {
  yield takeLatest(SEARCH_MOVIE_DESCRIPTION, getMovieDetails);
}
