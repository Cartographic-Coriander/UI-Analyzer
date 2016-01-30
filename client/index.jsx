import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App.js';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { buttonReducer, noteReducer, projectReducer } from './redux/reducers';

const reducers = {
  buttonReducer: buttonReducer,
  noteReducer:noteReducer,
  projectReducer: projectReducer,
  form: formReducer
};
const combinedReducers = combineReducers(reducers);

// const store = applyMiddleware(thunk)(createStore)(reducers);
let store = createStore(combinedReducers)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
)