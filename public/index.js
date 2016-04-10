import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { authenticationMiddleware } from './components/middleware';

import App from './components/app';

import RootReducer from './reducers/reducers';

let store = createStore(RootReducer, applyMiddleware(thunkMiddleware, authenticationMiddleware));

let rootElement = document.getElementById('app-root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
