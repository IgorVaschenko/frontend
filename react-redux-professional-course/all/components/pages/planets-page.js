import { Component } from "react";
import ErrorBoundary from "../error-boundary";
import Row from "../row/row";
import { PlanetDetails, PlanetList } from "../sw-components";


export default class PlanetsPage extends Component {

    state = {
        selectedItem: null
    }

    onSelectedItem = (selectedItem) => this.setState({ selectedItem })

    render() {

        const { selectedItem } = this.state

        return (
            <ErrorBoundary>
                <Row
                    left={<PlanetList onSelectedItem={this.onSelectedItem} />}
                    right={<PlanetDetails itemId={selectedItem} />}
                />
            </ErrorBoundary>
        )
    }
}