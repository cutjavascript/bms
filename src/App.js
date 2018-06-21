import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import ErrorBoundary from './components/ErrorBoundary';

import NotFound from './pages/NotFound';

import store from './store';
import MainApp from './MainApp';

import HomePage from './pages/HomePage';
import Booking from './example/Booking';

const App = () => (
  <ErrorBoundary showError>
    <Provider store={store}>
      {/* <Router>
        <MainApp dispatch={store.dispatch} getState={store.getState}>
          <Switch>
            <Route path="/studio/neelam" exact component={HomePage} />
            <Route path="/example" exact component={Booking} />
            <Route component={NotFound} />
          </Switch>
        </MainApp>
      </Router>
    </Provider>
  </ErrorBoundary> */}
      <Router>
        <div className="App container" style={{ backgroundColor: '#f8f8f8', minWidth: 1400, padding: 0 }}>
          <div className="component component-Shape" style={{ height: 80, padding: 0 }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
                borderBottom: '1px solid #ddd',
              }}
            >
              <div
                style={{
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  boxSizing: 'border-box',
                  borderRadius: 0,
                }}
              >
                <div className="row" style={{ marginTop: 28 }}>
                  <div className="col-sm-2">
                    <div className="component component-Label" style={{ textAlign: 'right', height: 38 }}>
                      <div className="context">
                        <label
                          style={{
                            whiteSpace: 'nowrap',
                            fontSize: 28,
                            fontWeight: 700,
                            fontStyle: 'normal',
                            fontFamily: '"Segoe UI"',
                            color: 'rgb(255, 0, 0)',
                          }}
                        >
                          #BMS
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-sm-2"></div> */}
                  <div className="col-sm-6">
                    <div className="">
                      <input
                        type="text"
                        placeholder="Search Your Studios"
                        style={{
                          width: '100%',
                          height: 40,
                          borderWidth: 'inherit',
                          borderStyle: 'none',
                          borderColor: 'rgb(204, 0, 51)',
                          borderImage: 'initial',
                          paddingLeft: 7,
                          paddingRight: 2,
                          margin: 0,
                          boxSizing: 'border-box',
                          outline: 'none',
                          lineHeight: 38,
                          textAlign: 'left',
                          fontSize: 14,
                          fontWeight: 400,
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          fontFamily: '"Segoe UI"',
                          color: 'rgb(102, 102, 102)',
                          backgroundColor: 'rgb(242, 242, 242)',
                          borderRadius: 5,
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ lineHeight: '49px' }}>
                    <label className="menu-label">Help</label>
                    <label className="menu-label">
                      <Link to="/studio/neelam">My Account</Link>
                    </label>
                    <label className="menu-label">Login/Signup</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="container-body">
            <switch>
              <Route path="/studio/neelam" exact component={HomePage} />
              <Route path="/example" exact component={Booking} />
              <Route component={NotFound} />
            </switch>
            <div className="col-sm-4" style={{ height: '49px' }} />
          </section>
        </div>
      </Router>
    </Provider>
  </ErrorBoundary>
);

export default hot(module)(App);
