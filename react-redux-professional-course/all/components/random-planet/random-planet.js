import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator/error-indicator';

import Spinner from '../spinner'
import PlanetView from './planet-view';

import './random-planet.css';

export default class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 10000
  }

  SwapiService = new SwapiService()

  id = Math.floor(Math.random() * 18) + 1

  state = {
    planet: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    const { updateInterval } = this.props
    this.updatePlanet()
    this.interval = setInterval(() => {
      this.updatePlanet()
    }, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  onPlanetLoaded = (planet) => this.setState({ planet, loading: false })

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 18) + 1
    this.SwapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  render() {
    const { planet, loading, error } = this.state

    const errorEvent = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(error || loading) ? <PlanetView planet={planet} /> : null

    return (
      <div className="random-planet jumbotron rounded">
        {errorEvent}
        {spinner}
        {content}
      </div>
    );
  }
}


// RandomPlanet.defaultProps = {
//   updateInterval: 10000
// }