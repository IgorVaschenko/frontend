import React from 'react';

import './item-list.css';

const ItemList = (props) => {

  const { data, onSelectedItem, children: renderItem } = props

  const handlerClick = (id) => () => onSelectedItem(id);

  const renderItems = (array) => {

    return array.map((data) => {
      const { id } = data

      const label = renderItem(data)
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={handlerClick(id)}
        >
          {label}
        </li>
      )
    })
  }

  const content = data ? renderItems(data) : null

  return (
    <ul className="item-list list-group" >
      {content}
    </ul>
  );

}

ItemList.defaultProps = {
  onSelectedItem: () => { }
}

export default ItemList
