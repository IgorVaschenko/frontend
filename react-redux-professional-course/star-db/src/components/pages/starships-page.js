import { useNavigate } from "react-router-dom";
import { StarshipList } from "../sw-components/item-lists";

const StarshipsPage = () => {
    const navigate = useNavigate();
    return (
        <StarshipList setItemId={(id) => {
            navigate(`${id}`)
        }} />
    )

}

export default
    StarshipsPage