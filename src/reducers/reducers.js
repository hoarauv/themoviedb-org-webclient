import {combineReducers} from 'redux';
import {refreshMovieListReducer} from 'reducers/AppReducers';

export const rootReducer = combineReducers({
  app: refreshMovieListReducer,
});
