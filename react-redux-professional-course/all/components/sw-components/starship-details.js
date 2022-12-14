import { withSwapiService } from '../hoc-helpers'
import ItemDetails from '../item-details'
import Record from '../item-details/record'
import ErrorButton from '../error-button/error-button';
const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field='model' label='Model: ' />
            <Record field='length' label='Length: ' />
            <Record field='passengers' label='Passengers: ' />
            <Record field='cargoCapacity' label='Cargo Capacity: ' />
            <Record field='costInCredits' label='Cost In Credits: ' />
            <Record field='manufacturer' label='Manufacturer: ' />
            <ErrorButton />
        </ItemDetails>
    )
}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
}

export default withSwapiService(mapMethodsToProps)(StarshipDetails) 
