import { useParams, useNavigate } from "react-router-dom";
import Row from "../row";
import { PersonList } from "../sw-components/item-lists";
import PersonDetails from "../sw-components/person-details";

const PeoplePage = () => {

    const params = useParams()
    const navigate = useNavigate();

    const setId = (id) => navigate(`/people/${id}`)

    return (
        <Row
            left={<PersonList setItemId={setId} />}
            right={<PersonDetails itemId={params.id} />}
        />
    )
}

export default PeoplePage
// export default class PeoplePage extends Component {
//     state = {
//         itemId: null
//     }

//     setItemId = (itemId) => this.setState({ itemId })

//     render() {
//         const { itemId } = this.state
//         return (
//             <Row
//                 left={<PersonList setItemId={this.setItemId} />}
//                 right={<PersonDetails itemId={itemId} />}
//             />

//         )
//     }

// }