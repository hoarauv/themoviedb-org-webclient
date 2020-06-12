import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import 'index.css';

const mapRoutes = (routes) => routes.map((route, index) =>
  <Route key={ index } { ...route } />,
);

const index = (store, routes) => (
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          {mapRoutes(routes)}
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

/**
 * Represent a redirection to be done
 * @param {string} to - Route to be redirected to
 * @return {Redirect} - The ReactNode of the redirection to be provided to
 * react-router-dom's Switch Component.
 * Cf. https://reacttraining.com/react-router/web/api/Redirect
 */
export const routerRedirection = (to) => (
  () => <Redirect to={ to } />
);

export default index;
