import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner';

import './item-details.css';
import ErrorBoundary from '../error-boundary';


export default class ItemDetails extends Component {

  state = {
    item: {},
    imageUrl: null,
    loading: false,
    error: false
  }

  updateItem = () => {

    const { getData, getImageUrl, itemId } = this.props

    if (!itemId) return

    this.setState({ loading: true })

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          imageUrl: getImageUrl(item)
        })
      })
      .catch(() => {
        this.setState({ error: true, loading: false })
      })
  }

  componentDidMount() {
    this.updateItem()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemId !== this.props.itemId ||
      this.props.getData !== prevProps.getData||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem()
    }
  }

  render() { 
    const {
      item
      , imageUrl, loading, error
    } = this.state

    const { name } = item

    if (!this.props.itemId) return <span>Choice a person</span>

    if (loading) return <Spinner />
    if (error) return <ErrorIndicator />

    return (
      <ErrorBoundary>
        <div className="person-details card">
          <img
            className="person-image"
            src={imageUrl}
            alt='item-icon'
          />

          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              {React.Children.map(this.props.children, (child) =>
                React.cloneElement(child, { item })
              )}
            </ul>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}
