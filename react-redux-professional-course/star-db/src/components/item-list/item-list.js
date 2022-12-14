import React, { Component } from 'react';

import './item-list.css';

class ItemList extends Component {

  handleClick = (id) => () => this.props.setItemId(id)

  render() {

    const { children: renderItem, data } = this.props

    const renderItems = (items) => items.map((item) => {
      const { id } = item
      const label = renderItem(item)

      return (
        <li
          key={id}
          className="list-group-item"
          onClick={this.handleClick(id)}
        >
          {label}
        </li>
      )
    })

    const content = data ? renderItems(data) : null

    return (
      <ul className="item-list list-group">
        {content}
      </ul>
    );
  }
}


export default ItemList