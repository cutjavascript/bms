import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import ErrorBoundary from './components/ErrorBoundary';

import NotFound from './pages/NotFound';

import store from './store';
import MainApp from './MainApp';

import HomePage from './pages/HomePage';

const App = () => (
  <ErrorBoundary showError>
    <Provider store={store}>
      <Router>
        <MainApp dispatch={store.dispatch} getState={store.getState}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </MainApp>
      </Router>
    </Provider>
  </ErrorBoundary>
);

export default hot(module)(App);
