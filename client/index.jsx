import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App.js';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';

// const store = applyMiddleware(thunk)(createStore)(reducers);
let store = createStore(reducers)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
)