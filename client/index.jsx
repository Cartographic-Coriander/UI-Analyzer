import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App.js';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { user, projects, tests, comments, images, mouseTrackings, stateRouter, modalState } from './redux/reducers';

const reducers = {
  user: user,
  projects: projects,
  tests: tests,
  comments: comments,
  images: images,
  mouseTrackings: mouseTrackings,
  stateRouter: stateRouter,
  modalState: modalState,
  form: formReducer
};
const combinedReducers = combineReducers(reducers);
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(combinedReducers);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
)