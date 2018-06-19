/* eslint prefer-rest-params: 0, no-extend-native: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome/css/font-awesome.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
