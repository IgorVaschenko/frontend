import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './shop-header.css';

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
      <Link to='/'>
        <div className="logo text-dark" alt='alt'>ReStore</div>
      </Link>
      <Link to='cart'>
        <div className="shopping-cart" alt='alt'>
          <i className="cart-icon fa fa-shopping-cart" />
          {numItems} items (${total})
        </div>
      </Link>
    </header >
  );
};

const mapStateToProps = ({ shoppingCart:{ cardItems, orderTotal } }) => {
  return {
    numItems: cardItems.reduce((res, { count }) => res + count, 0),
    total: orderTotal
  }
}

export default connect(mapStateToProps)(ShopHeader);
