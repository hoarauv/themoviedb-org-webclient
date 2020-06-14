import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {searchMovieDescription} from 'actions/DescriptionActions';
import {Description as descriptionjsx} from
  'components/Description/Description.jsx';

/**
 * Represents the view for the description page of a movie
 */
class Description extends Component {
  /**
   * We need to call this native component method to update it using a
   * reducer
   */
  componentDidMount() {
    const movieId = this.props.match.params.movie;
    if (this.props.currentMovie !== movieId) {
      this.refreshDescription(movieId);
    }
  }
  /**
   * Dispatch an action to update itself with the correct infos
   * @param {number} movieId - The id of the movie to display on the page
   */
  refreshDescription(movieId) {
    this.props.searchMovieDescription(movieId);
  }
  /**
   * Native ReactJS method to display the component
   * @return {ReactNode} - The ReactNode to be displayed
   */
  render() {
    return descriptionjsx(this.props);
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.movieDescription.title,
    description: state.movieDescription.description,
    currentMovie: state.movieDescription.id,
    isAdult: state.movieDescription.adult,
    homepage: state.movieDescription.homepage,
    oTitle: state.movieDescription.originalTitle,
    spokenLanguages: state.movieDescription.spokenLanguages,
    duration: state.movieDescription.runTime,
    picture: state.movieDescription.picture,
    votes: {
      note: state.movieDescription.voteAverage,
      count: state.movieDescription.voteCount,
    },
    releaseDate: state.movieDescription.releaseDate,
    computing: state.movieDescription.computing,
    error: state.movieDescription.cantAccessDescription,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    searchMovieDescription,
  }, dispatch);

Description.propTypes= {
  currentMovie: propTypes.number,
  match: {params: {movie: propTypes.string.isRequired}},
  searchMovieDescription: propTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Description);
