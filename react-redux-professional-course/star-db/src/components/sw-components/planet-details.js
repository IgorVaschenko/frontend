import ErrorButton from "../error-button/error-button"
import withSwapiService from "../hoc-helpers/with-swapi-service"
import ItemDetails from "../item-details/item-details"
import Record from "../item-details/record"


const PlanetDetails = (props) => (
    <ItemDetails {...props}>
        <Record field='population' label='Population' />
        <Record field='rotationPeriod' label='Rotation Period' />
        <Record field='diameter' label='Diameter' />
        <Record field='climate' label='Climate' />
        <Record field='terrain' label='Terrain' />
        <ErrorButton />
    </ItemDetails>
)

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage,
    }
}


export default withSwapiService(mapMethodsToProps)(PlanetDetails)