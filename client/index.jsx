import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App.js';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { buttonReducer, noteReducer, projectReducer, authReducer, logOutReducer, loginReducer, registrationReducer, imageUpdateReducer, showImageReducer, modalStateReducer } from './redux/reducers';

const reducers = {
  buttonReducer: buttonReducer,
  noteReducer:noteReducer,
  projectReducer: projectReducer,
  form: formReducer,
  authReducer: authReducer,
  logOutReducer: logOutReducer,
  loginReducer: loginReducer,
  registrationReducer: registrationReducer,
  imageUpdateReducer : imageUpdateReducer ,
  showImageReducer : showImageReducer,
  modalStateReducer: modalStateReducer
};
const combinedReducers = combineReducers(reducers);

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(combinedReducers)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
)