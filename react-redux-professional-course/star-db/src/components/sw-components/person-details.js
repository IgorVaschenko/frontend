import ErrorButton from '../error-button/error-button';
import withSwapiService from '../hoc-helpers/with-swapi-service';
import ItemDetails from '../item-details/item-details';
import Record from '../item-details/record';

const PersonDetails = (props) => (
    <ItemDetails {...props}>
        <Record field='gender' label='Gender' />
        <Record field='birthYear' label='Birth Year' />
        <Record field='eyeColor' label='Eye Color' />
        <ErrorButton />
    </ItemDetails>
)


const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
}

export default withSwapiService(mapMethodsToProps)(PersonDetails)