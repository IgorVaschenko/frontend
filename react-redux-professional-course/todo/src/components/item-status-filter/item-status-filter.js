import { Component } from 'react'
import './item-status-filter.css'


export default class ItemStatusFilter extends Component { 
    buttons = [
        { type: 'all', description: 'All' },
        { type: 'active', description: 'Active' },
        { type: 'done', description: 'Done' },
    ]

    handlerClick = (value) => () => this.props.getFilterItem(value)

    render() {

        const { filter } = this.props

        const classBut = (type) => type === filter ? 'btn-info' : 'btn-outline-secondary'

        return (
            <div className='btn-group'>
                {this.buttons.map(({ type, description }) => (
                    <button
                        key={type}
                        type='button'
                        className={`btn ${classBut(type)}`}
                        onClick={this.handlerClick(type)}
                    >
                        {description}
                    </button>

                ))}
            </div>
        )
    }
}
