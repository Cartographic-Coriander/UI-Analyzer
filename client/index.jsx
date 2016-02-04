import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App.js';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { page, focus, note, project, auth, logOut, login, registration, imageUpdate, showImage, modalState, projects, user, tests, comments, images, mouseTrackings } from './redux/reducers';

const reducers = {
  focus: focus,
  note: note,
  project: project,
  form: form,
  auth: auth,
  logOut: logOut,
  login: login,
  registration: registration,
  imageUpdate : imageUpdate ,
  showImage: showImage,
  modalState: modalState,
  page: page,
  projects: projects,
  user: user,
  tests: tests, 
  comments: comments,
  images: images,
  mouseTrackings: mouseTrackings
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