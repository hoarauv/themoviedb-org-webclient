import ReactDOM from 'react-dom';

import * as serviceWorker from 'serviceWorker';

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import rootSaga from 'saga/saga';
import {rootReducer} from 'reducers/reducers';

import App from 'components/App/App.js';
import Description from 'components/Description/Description';
import InvalidPath from 'components/InvalidPath/InvalidPath';

import index, {routerRedirection} from 'index.jsx';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

const routes = [
  {exact: true, path: '/', component: routerRedirection('/home')},
  {exact: true, path: '/home', component: App},
  {exact: true, path: '/:movie/description', component: Description},
  // Will become a redirection to a 404 page.
  {path: '/', component: InvalidPath},
];

ReactDOM.render(
    index(store, routes),
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
