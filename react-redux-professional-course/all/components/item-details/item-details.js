import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import SingleItem from './single-item';
import './item-details.css';

export default class ItemDetails extends Component {

  SwapiService = new SwapiService()

  state = {
    item: null,
    loading: false,
    image:null
  }

  componentDidMount() {
    this.updateItem()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemId !== this.props.itemId ||
      prevProps.getData !== this.props.getData ||
      prevProps.getImageUrl !== this.props.getImageUrl) this.updateItem()
  }

  updateItem() {
    const { itemId , getData, getImageUrl } = this.props

    if (!itemId) return;

    this.setState({ loading: true })

    getData(itemId)
      .then((item) => {
        this.setState({ item,
           loading: false ,
           image: getImageUrl(item)
          })
      })

  }

  render() {

    if (!this.state.item) return (<div>Choice a person</div>)

    const { loading, item , image} = this.state

    const spinner = loading ? <Spinner /> : null
    const content = !loading ? <SingleItem item={item} image={image} children={this.props.children}/> : null

    return (
      <>
        <div className="person-details card">
          {spinner}
          {content}
        </div>
      </>
    )
  }
}
