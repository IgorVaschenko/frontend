import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, } from "react-router-dom";

import store from './store'
import ErrorBoundry from './components/error-boundry'
import { BookstoreServiceProvider } from './components/bookstore-service-context';
import App from './components/app';
import BookstoreService from "./services/bookstore-service";

const bookstoreService = new BookstoreService()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BookstoreServiceProvider value={bookstoreService}>
        <Router>
          <App />
        </Router>
      </BookstoreServiceProvider>
    </ErrorBoundry>
  </Provider>
);
