import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

import {searchMovieDescription} from 'actions/DescriptionActions';
import {Description as descriptionjsx} from
  'components/Description/Description.jsx';

class Description extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.movie;
    if (this.props.currentMovie !== movieId) {
      this.refreshDescription(movieId);
    }
  }
  refreshDescription(movieId) {
    this.props.searchMovieDescription(movieId);
  }
  render() {
    return descriptionjsx(this.props);
  }
}

const mapStateToProps = (state) => {
  console.log('stateToProps', JSON.stringify(state.movieDescription));
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
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Description);
