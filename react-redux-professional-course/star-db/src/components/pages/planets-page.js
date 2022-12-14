import { Component } from "react";
import Row from "../row";
import { PlanetList } from "../sw-components/item-lists";
import PlanetDetails from "../sw-components/planet-details";

export default class PlanetsPage extends Component {

    state = {
        itemId: null
    }

    setItemId = (itemId) => this.setState({ itemId })

    render() {
        const { itemId } = this.state
        return (
            <Row
                left={<PlanetList setItemId={this.setItemId} />}
                right={<PlanetDetails itemId={itemId} />}
            />
        )
    }

}