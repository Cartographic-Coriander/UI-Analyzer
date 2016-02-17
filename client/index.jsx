import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import { user, projects, tests, comments, images, mouseTrackings, errorState, currentFocus, stateRouter, modalState } from './redux/reducers';
import { recallState } from './redux/api';
import LandingPage from './pages/LandingPage.react';
import DashboardPage from './pages/DashboardPage.react';
import AddCommentsPage from './pages/AddCommentsPage.react';
import ReportPage from './pages/ReportPage.react';

const reducers = {
  user: user,
  projects: projects,
  tests: tests,
  comments: comments,
  images: images,
  mouseTrackings: mouseTrackings,
  errorState: errorState,
  currentFocus: currentFocus,
  stateRouter: stateRouter,
  modalState: modalState,
  form: formReducer,
  routing: routeReducer
};
const reducer = combineReducers(reducers);
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

// reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(
  <Provider store = { store }>
    <Router history = { browserHistory }>
      <Route path = '/' component = { LandingPage }>
        <Route path = 'dashboard' component = { DashboardPage }/>
        <Route path = 'addcomments' component = { AddCommentsPage }/>
        <Route path = 'report' component = { ReportPage }/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
