import { withSwapiService } from '../hoc-helpers'
import ItemDetails from '../item-details'
import Record from '../item-details/record'
import ErrorButton from '../error-button/error-button';

const PersonDetails = (props) => {
  return (
      <ItemDetails {...props}>
        <Record field='gender' label='Gender: ' />
        <Record field='birthYear' label='Birth Year: ' />
        <Record field='eyeColor' label='Eye Color: ' />
        <ErrorButton />
      </ItemDetails>
  )
}

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage
  }
}

export default withSwapiService(mapMethodsToProps)(PersonDetails) 