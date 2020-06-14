import {
  SEARCH_MOVIE_DESCRIPTION,
  SEARCH_MOVIE_DESCRIPTION_RESPONSE,
  SEARCH_MOVIE_DESCRIPTION_FAILURE,
} from 'actions/DescriptionActions';

const initialState = {
  title: undefined,
  description: undefined,
  picture: undefined,
  id: undefined,
  adult: undefined,
  homepage: undefined,
  originalTitle: undefined,
  spokenLanguages: [],
  productions: [],
  runTime: undefined,
  voteAverage: undefined,
  voteCount: undefined,
  releaseDate: undefined,
  computing: false,
  cantAccessDescription: false,
};

export function refreshMovieDescriptionReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MOVIE_DESCRIPTION:
      return {
        ...state,
        computing: true,
        cantAccessDescription: false,
        id: action.data.id,
      };
    case SEARCH_MOVIE_DESCRIPTION_RESPONSE:
      return {
        ...state,
        id: action.data.id,
        title: action.data.title,
        description: action.data.description,
        adult: action.data.adult,
        homepage: action.data.homepage,
        picture: action.data.picture,
        originalTitle: action.data.originalTitle,
        spokenLanguages: action.data.spokenLanguages,
        productions: action.data.productions,
        runTime: action.data.runTime,
        voteAverage: action.data.voteAverage,
        voteCount: action.data.voteCount,
        releaseDate: action.data.releaseDate,
        computing: false,
        cantAccessDescription: false,
      };
    case SEARCH_MOVIE_DESCRIPTION_FAILURE:
      return {
        ...state,
        computing: false,
        cantAccessDescription: true,
      };
    default:
      return state;
  }
}
