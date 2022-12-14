import React, { Component } from 'react'
import Select from 'react-select'

class DropList extends Component {
    state = {}

    handleChange = (value) => {
        this.props.onChange('topics', value)
    }

    handleBlur = (value) => {
        this.props.onBlur('topics', true)
    }

    render() {
        return (
            <Select
                value={this.props.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                options={this.props.options}
                isMulti={true}
            />
        );
    }
}

export default DropList;