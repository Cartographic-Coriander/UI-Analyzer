import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import { user, projects, tests, comments, images, mouseTrackings, errorState, currentFocus, stateRouter } from './redux/reducers';
import TestContainer from './components/dashboardPageComponents/contentComponents/testContainer/TestContainer';
import SettingsContainer from './components/dashboardPageComponents/contentComponents/settingsContainer/SettingsContainer';
import LandingPage from './pages/LandingPage.react';
import DashboardPage from './pages/DashboardPage.react';
import AddCommentsPage from './pages/AddCommentsPage.react';
import ReportPage from './pages/ReportPage.react';
import ProjectHeader from './components/dashboardPageComponents/contentComponents/projectHeader/ProjectHeader';
import Content from './components/dashboardPageComponents/contentComponents/Content';
import DashboardDefault from './components/dashboardPageComponents/contentComponents/dashboardContainer/DashboardContainer';

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
  form: formReducer,
  routing: routeReducer
};
const reducer = combineReducers(reducers);
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(
  <Provider store = { store }>
    <Router history = { browserHistory }>
      <Route path = '/' component = { LandingPage }/>
      <Route path = 'reports/:testId' component = { ReportPage }/>
      <Route path = 'addcomments/:testId' component = { AddCommentsPage }/>
      <Route path = '/dashboard' component = { DashboardPage }>
        <IndexRoute component = { Content }/>
        <Route path = 'settings/:projectIndex' component = { SettingsContainer }>
          <IndexRoute component = { ProjectHeader }/>
        </Route>
        <Route path = 'tests/:projectIndex' component = { TestContainer }>
          <IndexRoute component = { ProjectHeader }/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
