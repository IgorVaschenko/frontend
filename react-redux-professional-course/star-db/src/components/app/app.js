import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Header from '../header';
import RandomPlanet from '../random-planet';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service'
import { SwapiServiceProvider } from '../swapi-service-context'

import PeoplePage from '../pages/people-page';
import PlanetsPage from '../pages/planets-page';
import StarshipsPage from '../pages/starships-page';
import { LoginPage, SecretPage } from '../pages'

import './app.css';
import StarshipDetails from '../sw-components/starship-details';
import PersonDetails from '../sw-components/person-details';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onServiceChange = () => this.setState(({ swapiService }) => {
    const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService

    console.log(Service);
    return {
      swapiService: new Service()
    }
  }
  )

  onLogin = () => this.setState({ isLoggedIn: true })

  render() {
    const { swapiService, isLoggedIn } = this.state
    return (
      <SwapiServiceProvider value={swapiService}>
        <Router>

          <div className='stardb-app'>

            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet updateInterval={undefined} />

            <Routes>
              <Route path='/' element={<h2>Welcome to StarDB</h2>} exact />
              <Route path='*' element={<h2>Not way for StarDB</h2>} />

              <Route path='/people' element={<PeoplePage />} />
              <Route path='/people/:id' element={<PeoplePage />} />

              <Route path='/planets' element={<PlanetsPage />} />

              <Route path='/starships' element={<StarshipsPage />} />
              <Route path='/starships/:id' element={<StarshipDetails />} />

              <Route path='/secret' element={<SecretPage isLoggedIn={isLoggedIn} />} />
              <Route
                path='/login'
                element={<LoginPage
                  isLoggedIn={isLoggedIn}
                  onLogin={this.onLogin}
                />} />
            </Routes>
          </div>
        </Router>
      </SwapiServiceProvider>
    );

  }
};

