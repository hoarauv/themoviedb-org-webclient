import {combineReducers} from 'redux';
import {
  refreshMovieListReducer,
  movieModalDisplayReducer,
} from 'reducers/AppReducers';

import {
  refreshMovieDescriptionReducer,
} from 'reducers/DescriptionReducers';

export const rootReducer = combineReducers({
  movieList: refreshMovieListReducer,
  movieModal: movieModalDisplayReducer,
  movieDescription: refreshMovieDescriptionReducer,
});
