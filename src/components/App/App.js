import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {searchMovieList, movieModalOpen, movieModalClose} from
  'actions/AppActions';
import {App as appjsx} from 'components/App/App.jsx';

/**
 * Represents the main page of the web app
 */
class App extends Component {
  /**
   * Constructor needed here to create the list refresh callback
   * @param {object} props - The props of App
   */
  constructor(props) {
    super(props);
    /**
     * Is ran when the list is empty or when the user is at the end fo the
     * page.
     */
    this.handleRefreshList = () => {
      if (this.props.computing === false) {
        this.props.searchMovieList(this.props.currentPage);
      }
    };
  }
  /**
   * Is ran when component is mounted.
   * Updates the list of popular movies for the first time.
   */
  componentDidMount() {
    if (this.props.currentList.length === 0) {
      this.props.searchMovieList(this.props.currentPage);
    }
  }
  /**
   * Renders the whole main page
   * @return {ReactNode} - The ReactNode to be   displayed by React
   */
  render() {
    return appjsx({
      ...this.props,
      currentList: this.props.currentList.map((item) =>
        ({data: item, handleClick: () => this.props.movieModalOpen(item.id)}),
      ),
    }, this.handleRefreshList);
  }
}

const mapStateToProps = (state) => {
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
  movieModalOpen: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
  currentList: propTypes.array.isRequired,
  computing: propTypes.bool.isRequired,
  movieOnModal: propTypes.number,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
