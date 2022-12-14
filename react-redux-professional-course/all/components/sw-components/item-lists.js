import ItemList from '../item-list'
import { withData, withSwapiService, withChildFunction, compose } from '../hoc-helpers'


const renderNameBirth = ({ name, birthYear }) => <span>{`${name} (${birthYear})`}</span>
const renderNameModel = ({ name, model }) => <span>{`${name} (${model})`}</span>
const renderNameDiameter = ({ name, diameter }) => <span>{`${name} (${diameter})`}</span>

const mapPersonMethodToProps = (swapiServive) => {
    return {
        getData: swapiServive.getAllPeople
    }
}
const mapStarshipMethodToProps = (swapiServive) => {
    return {
        getData: swapiServive.getAllStarships
    }
}
const mapPlanetMethodToProps = (swapiServive) => {
    return {
        getData: swapiServive.getAllPlanets
    }
}


const PersonList = compose(
    withSwapiService(mapPersonMethodToProps),
    withData,
    withChildFunction(renderNameBirth)
)(ItemList)

const StarshipList = compose(
    withSwapiService(mapStarshipMethodToProps),
    withData,
    withChildFunction(renderNameModel)
)(ItemList)


const PlanetList = compose(
    withSwapiService(mapPlanetMethodToProps),
    withData,
    withChildFunction(renderNameDiameter)
)(ItemList)




export {
    PersonList,
    StarshipList,
    PlanetList
}