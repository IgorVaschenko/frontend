import ItemList from "../item-list"
import {
    compose, withChildrenFunction,
    withData, withSwapiService
} from '../hoc-helpers'


const personChildFn = ({ name, birthYear }) => <span>{`${name} (${birthYear})`}</span>
const planetChildFn = ({ name, diameter }) => <span>{`${name} (${diameter})`}</span>
const starshipChildFn = ({ name, model }) => <span>{`${name} (${model})`}</span>

const mapMethodsPersonToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
}
const mapMethodsPlanetToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
}
const mapMethodsStarshipToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
}

const StarshipList = compose(
    withSwapiService(mapMethodsStarshipToProps),
    withData,
    withChildrenFunction(starshipChildFn)
)(ItemList)

const PlanetList = compose(
    withSwapiService(mapMethodsPlanetToProps),
    withData,
    withChildrenFunction(planetChildFn)
)(ItemList)

const PersonList = compose(
    withSwapiService(mapMethodsPersonToProps),
    withData,
    withChildrenFunction(personChildFn)
)(ItemList)



export {
    PersonList,
    StarshipList,
    PlanetList
}