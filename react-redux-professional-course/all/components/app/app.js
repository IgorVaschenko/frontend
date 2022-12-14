import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from '../error-boundary';

import { SwapiServiceProvider } from '../swapi-service-context'
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';


export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
  }

  onServiceChange = () => this.setState(({ swapiService }) =>
    swapiService instanceof SwapiService
      ? { swapiService: new DummySwapiService() }
      : { swapiService: new SwapiService() })

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className='stardb-app'>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />
            
            <PeoplePage />
            <StarshipsPage />
            <PlanetsPage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
};
