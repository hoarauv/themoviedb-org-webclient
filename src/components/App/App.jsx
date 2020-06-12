import React from 'react';
import propTypes from 'prop-types';

const movieRow = (propArray) =>
  (propArray.map((prop, index) => (
    <tr key={ index }>
      <td>
        {prop.title}
      </td>
      <td>
        {prop.overview}
      </td>
      <td>
        <img alt={ `${prop.title}_illustration` } src={ prop.picture } />
      </td>
    </tr>
  )));

movieRow.propTypes = {
  picture: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  overview: propTypes.string.isRequired,
};

const NotReady = (props) => (
  (props.isReady) ?
    <></> :
    <div>this is not ready</div>
);

NotReady.propTypes = {
  isReady: propTypes.bool.isRequired,
};

export const App = (props) => (
  <div className="App">
    <div className="list">
      {movieRow(props.currentList)}
      <NotReady isReady={ !props.computing } />
    </div>
  </div>
);

App.propTypes = {
  currentList: propTypes.array.isRequired,
  computing: propTypes.bool.isRequired,
};
