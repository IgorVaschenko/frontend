import { withSwapiService } from '../hoc-helpers'
import ItemDetails from '../item-details'
import Record from '../item-details/record'
import ErrorButton from '../error-button/error-button';

const PlanetDetails = (props) => {
  return (
    <ItemDetails {...props}            >
      <Record field='diameter' label='Diameter: ' />
      <Record field='population' label='Population: ' />
      <Record field='rotationPeriod' label='Rotation Period: ' />
      <ErrorButton />
    </ItemDetails>
  )
}

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage
  }
}

export default withSwapiService(mapMethodsToProps)(PlanetDetails) 