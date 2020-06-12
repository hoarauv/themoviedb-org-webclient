import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {searchMovieList} from 'actions/AppActions';
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
  /**
   * Renders the whole main page
   * @return {ReactNode} - The ReactNode to be displayed by React
   */
  render() {
    return appjsx(this.props);
  }
}

const mapStateToProps = (state) => {
  return {
    computing: state.app.computing,
    currentPage: state.app.page,
    currentList: state.app.currentList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({searchMovieList}, dispatch);

App.propTypes = {
  searchMovieList: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
  currentList: propTypes.array.isRequired,
  computing: propTypes.bool.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
