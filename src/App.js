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


import profilePic from "./assets/images/anonymous.jpg";

const App = () => (
  <ErrorBoundary showError>
    <Provider store={store}>
      <Router>
        <div className="App container" style={{ backgroundColor: '#f8f8f8', minWidth: 1400, padding: 0 }}>
          <div className="component component-Shape" style={{ height: 80, padding: 0 }}>
            <div style={{width: '100%',height: '100%',overflow: 'hidden',boxSizing: 'border-box',borderBottom: '1px solid #ddd'}}>
               <div className="row" style={{ marginTop: 23 }}>
                  <div className="col-sm-2">
                    <div className="component component-Label" style={{ textAlign: 'right', height: 38 }}>
                      <div className="context">
                        <label style={{whiteSpace: 'nowrap',fontSize: 28,fontWeight: 700,fontStyle: 'normal',fontFamily: '"Segoe UI"',color: 'rgb(255, 0, 0)', }}>
                          #BMS
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-sm-2"></div> */}
                  <div className="col-sm-6">
                    <div className="">
                      <input className="header-search" type="text" placeholder="Search Your Studios"/>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ lineHeight: '49px',textAlign: "right"}}>
                    {/* <label className="menu-label">Help</label> */}
                    {/* <label className="menu-label">
                      <Link to="/studio/neelam">My Account</Link>
                    </label> */}
                    {/* <label className="menu-label">Login/Signup</label> */}
                    <label className="menu-label">
                      <a href="#" style={{textDecoration: "none",color: "#666666"}}>
                        <span className="header-username">Ujjal Sannyal</span>
                        <img src={profilePic} className="avatar img-responsive" style={{width: 32,height: 32,border: "2px solid #c4c4c4",borderRadius: 17,marginLeft: 5}} />
                      </a>
                      {/* <span className="nav-user-profile" style={{margin: "0px 5px 5px"}}>Ujjal Sannyal</span> <i class="fa fa-user-circle fa-2x" style={{margin: "0px 5px 5px"}}></i> */}
                    </label>
                  </div>
                </div>
            </div>
          </div>
          <section className="container-body">
            <switch>
              <Route path="/studio/neelam" exact component={HomePage} />
              <Route path="/example" exact component={Booking} />
              <Route path="/notfound" component={NotFound} />
            </switch>
            <div className="col-sm-4" style={{ height: '49px' }} />
          </section>
          <footer>
            <div style={{width: "100%",height: 320,boxSizing: "border-box",borderRadius: 0,backgroundColor: "rgb(240, 248, 255)"}}>
              <div className="component component-TextArea" style={{textAlign: "center", paddingTop: 40}}>
                  <div style={{fontSize: 14,fontWeight: 400,fontFamily: '"Segoe UI"',color: "rgb(30, 135, 240)",height: "100%",wordWrap: "break-word",wordBreak: "break-word"}}>
                    <p style={{textAlign: "center",textDecoration: "none"}}>
                      <span> About BMS.com | Terms of Use | Privacy Policy | Home | Add
                        Post | Blogs </span>
                    </p>
                  </div>
              </div>
              <div className="Border" style={{width: "100%",height: 45,borderColor: "rgb(2, 63, 123)",borderWidth: 1,borderStyle: "none",borderRadius: 0}}>
                <div style={{fontSize: 14,fontWeight: 400,fontStyle: "normal",textDecoration: "none",fontFamily: '"Segoe UI"',color: "rgb(2, 63, 123)",height: "100%",lineHeight: "18px"}}>
                  <p style={{margin: 0,padding: 0,textAlign: "center",textDecoration: "none"}}>
                    <span>Bangalore Chennai Delhi Hyderabad Mumbai Pune Kolkata Gurgaon Ahmedabad Noida</span>
                  </p>
                </div>
              </div>
              <div style={{height: 58,padding: "20px 0px 0" }}>
                <div className="Border" style={{backgroundColor: "rgba(255, 255, 255, 0)",borderColor: "rgb(2, 63, 123)",borderWidth: 1,borderStyle: "none"}}>
                  <div style={{fontSize: 14,fontWeight: 400,fontStyle: "normal",textDecoration: "none",fontFamily: '"Segoe UI"',color: "rgb(2, 63, 123)",height: "100%",wordWrap: "break-word",wordBreak: "break-word",lineHeight: "18px"}}>
                    <div style={{textAlign: "center",overflow: "hidden",lineHeight: "inherit"}}>
                      <p style={{margin: 0,padding: 0,width: 967,textOverflow: "clip",whiteSpace: "normal",textAlign: "center",textDecoration: "none",userSelect: "text",display: "inline-block"}}>
                        <span>
                          BMS.com is India's largest network of most trusted Music
                          Recording Studios. Over 50 lakh customers rely on BMS.com,
                          to fulfill their Studio requirements across 1,000+
                          categories. Using BMS.com, You can compare multiple
                          Studios and choose the one that best suits their
                          requirements. Read more
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="component component-TextArea" style={{textAlign: "center", paddingTop: 20}}>
                  <div style={{fontSize: 14,fontWeight: 400,fontFamily: '"Segoe UI"',color: "rgb(2, 63, 123)",height: "100%",wordWrap: "break-word",wordBreak: "break-word"}}>
                    <p style={{textAlign: "center",textDecoration: "none"}}>
                      <span>BMS.com ©2018 All Rights Reserved</span>
                    </p>
                  </div>
              </div>
              <div className="component component-TextArea" style={{textAlign: "center",paddingTop: 10}}>
                  <div style={{fontSize: 14,fontWeight: 400,fontFamily: '"Segoe UI"',color: "rgb(102, 102, 102)",height: "100%",wordWrap: "break-word",wordBreak: "break-word"}}>
                    <p style={{textAlign: "center",textDecoration: "none"}}>
                      <i class="fa fa-facebook-square fa-2x"  style={{padding: 5}}></i>
                      <i class="fa fa-twitter-square fa-2x" style={{padding: 5}}></i>
                      <i class="fa fa-google-plus-square fa-2x" style={{padding: 5}}></i>
                    </p>
                  </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  </ErrorBoundary>
);

export default hot(module)(App);
