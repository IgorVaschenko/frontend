import { useParams } from "react-router-dom"
import ErrorButton from "../error-button/error-button"
import withSwapiService from "../hoc-helpers/with-swapi-service"
import ItemDetails from "../item-details/item-details"
import Record from "../item-details/record"

const StarshipDetails = (props) =>{
    const data = useParams()
    return (
    <ItemDetails {...props} itemId={data.id}>
        <Record field='model' label='model' />
        <Record field='manufacturer' label='Manufacturer' />
        <Record field='costInCredits' label='Cost In Credits' />
        <Record field='length' label='Length' />
        <Record field='crew' label='Crew' />
        <Record field='passengers' label='Passengers' />
        <Record field='cargoCapacity' label='Cargo Capacity' />
        <ErrorButton />
    </ItemDetails>
)}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage,
    }
}

export default withSwapiService(mapMethodsToProps)(StarshipDetails)
