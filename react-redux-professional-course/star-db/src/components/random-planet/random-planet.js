import React, { Component } from 'react';
import  { number } from 'prop-types'
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner'
import ErrorBoundary from '../error-boundary'

import { SwapiServiceConsumer } from '../swapi-service-context';

import './random-planet.css';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class RandomPlanet extends Component {

  SwapiService = new SwapiService()

  static defaultProps = {
    updateInterval: 1000000
  }

  static propTypes = {
    updateInterval: number
  }

  state = {
    data: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    const { updateInterval } = this.props
    this.update()
    this.interval = setInterval(() => {
      this.update()
    }, updateInterval)
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  update = () => {
    const id = Math.floor(Math.random() * 10) + 3
    const { getPlanet } = this.SwapiService

    getPlanet(id)
      .then((data) => {
        this.setState({ data, loading: false })
      })
      .catch(() => {
        this.setState({ loading: false, error: true })
      })
  }



  render() {

    const { loading, error, data: { name, population,
      rotationPeriod, diameter, climate,
      terrain, id
    } } = this.state

    if (loading) return <Spinner />
    if (error) return <ErrorIndicator />

    return (
      <ErrorBoundary>
        <div className="random-planet jumbotron rounded">
          <img className="planet-image"
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
          <div>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="term">Population:</span>
                <span>{population}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Rotation Period:</span>
                <span>{rotationPeriod}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Diameter:</span>
                <span>{diameter}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Terrain:</span>
                <span>{terrain}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Climate:</span>
                <span>{climate}</span>
              </li>
            </ul>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}


