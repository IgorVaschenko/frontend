import { Component } from "react";
import ErrorBoundary from "../error-boundary";
import Row from "../row/row";
import { StarshipDetails, StarshipList } from "../sw-components";

export default class StarshipsPage extends Component {

    state = {
        selectedItem: null
    }

    onSelectedItem = (selectedItem) => this.setState({ selectedItem })

    render() {

        const { selectedItem } = this.state

        return (
            <ErrorBoundary>
                <Row
                    left={<StarshipList onSelectedItem={this.onSelectedItem} />}
                    right={<StarshipDetails itemId={selectedItem} />}
                />
            </ErrorBoundary>
        )
    }
}