import React from 'react';
import './item-add-form.css'

export default class ItemAddForm extends React.Component {

    state = { value: '' }

    handlerSubmit = (e) => {
        e.preventDefault()
        this.props.addTodo(this.state.value)
        this.setState({ value: '' })
    }

    handlerChange = (e) => {
        this.setState(() => ({ value: e.target.value }))
    }

    render() {
        const { value } = this.state
        return (
            <form
                className='item-add-form d-flex'
                onSubmit={this.handlerSubmit}
            >
                <input
                    type='text'
                    className='form-control'
                    placeholder='add new todo'
                    value={value}
                    onChange={this.handlerChange}
                />
                <button
                    className='btn btn-outline-secondary'
                >
                    add
                </button>
            </form>
        );
    }
}

// const ItemAddForm = ({ handlerAdd }) => {

//     const [value, setValue] = useState('')

//     const handlerSubmit = (e) => {
//         e.preventDefault()
//         handlerAdd(value)
//     }
//     const handlerChange = (e) => {
//         setValue(e.target.value)
//     }
//     return (
//         <form className='item-add-form' onSubmit={handlerSubmit}>
//             <input type='text' value={value} onChange={handlerChange} />
//             <button
//                 className='btn btn-outline-secondary'
//             >
//                 add
//             </button>
//         </form>
//     );
// }

// export default ItemAddForm;