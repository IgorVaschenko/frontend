import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

import './app.css';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader/>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
          exact />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/*"
          element={<div>404</div>}
        />
      </Routes>
    </main>
  );
};

export default App;
