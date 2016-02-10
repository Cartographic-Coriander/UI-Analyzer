import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App.js';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';
import { recallState } from './redux/api';
import { user, projects, tests, comments, images, mouseTrackings, currentFocus, stateRouter, modalState } from './redux/reducers';
import { signsOut } from './redux/actions';

const reducers = {
  user: user,
  projects: projects,
  tests: tests,
  comments: comments,
  images: images,
  mouseTrackings: mouseTrackings,
  currentFocus: currentFocus,
  stateRouter: stateRouter,
  modalState: modalState,
  form: formReducer
};
const combinedReducers = combineReducers(reducers);
//combined reducer is wrapped for saving state
const reducer = storage.reducer(combinedReducers);
const engine = createEngine('Scrutinize.saved.state');
const middleware = storage.createMiddleware(engine);

let createStoreWithMiddleware = applyMiddleware(thunk, middleware)(createStore);
let store = createStoreWithMiddleware(reducer);
const load = storage.createLoader(engine);

const app = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>,
    document.getElementById('app')
  )
}

load(store)
  .then(() => {
    console.log('state reloaded');
    recallState();
    app();
  })
  .catch(() => {
    console.log('failed to load previous state')
    app();
  })
