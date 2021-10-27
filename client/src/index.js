import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';

import App from './app';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Provider>
  </Router >,
  document.getElementById('root')
);
