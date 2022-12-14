import { Component } from "react";
import ErrorBoundary from "../error-boundary";
import Row from "../row/row";
import { PersonDetails, PersonList } from "../sw-components";

export default class PeoplePage extends Component {

    state = {
        selectedItem: null
    }

    onSelectedItem = (selectedItem) =>  this.setState({ selectedItem })

    render() {

        const { selectedItem } = this.state

        return (
            <ErrorBoundary>
                <Row
                    left={<PersonList onSelectedItem={this.onSelectedItem} />}
                    right={<PersonDetails itemId={selectedItem} />}
                />
            </ErrorBoundary>
        )
    }
}