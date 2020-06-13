import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {searchMovieList, movieModalOpen, movieModalClose} from 'actions/AppActions';
import {App as appjsx} from 'components/App/App.jsx';

/**
 * Represents the main page of the web app
 */
class App extends Component {
  /**
   * Is ran when component is mounted.
   * Updates the list of popular movies for the first time.
   */
  componentDidMount() {
    if (this.props.currentList.length === 0) {
      this.refreshList();
    }
  }
  /**
   * Is ran when the list is empty or when the user is at the end fo the
   * page.
   */
  refreshList() {
    this.props.searchMovieList(this.props.currentPage);
  }
  trackScrolling = () => {
    const wrappedElement = document.getElementById('header');
    if (this.isBottom(wrappedElement)) {
      console.log('header bottom reached');
      document.removeEventListener('scroll', this.trackScrolling);
    }
  };
  /**
   * Renders the whole main page
   * @return {ReactNode} - The ReactNode to be   displayed by React
   */
  render() {
    return appjsx(this.props);
  }
}

const mapStateToProps = (state) => {
  console.log(JSON.stringify(state))
  return {
    computing: state.movieList.computing,
    currentPage: state.movieList.currentPage,
    currentList: state.movieList.currentList,
    movieOnModal: state.movieModal.movieId,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    searchMovieList,
    movieModalOpen,
    movieModalClose,
  }, dispatch);

App.propTypes = {
  searchMovieList: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
  currentList: propTypes.array.isRequired,
  computing: propTypes.bool.isRequired,
  movieOnModal: propTypes.number,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
