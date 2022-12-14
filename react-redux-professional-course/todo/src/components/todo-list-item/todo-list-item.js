import { Component } from 'react';
import './todo-list-item.css'

export default class TodoListItem extends Component {

    render() {

        const { label, important, done, doneTodo, deleteTodo, importantTodo } = this.props

        const style = {
            textDecoration: done ? 'line-through' : 'none',
            fontWeight: important ? 'bold' : 'normal',
            color: important ? 'steelblue' : 'black',
        }

        return (
            <span>
                <span
                    className='todo-list-item-label'
                    onClick={doneTodo}
                    style={style}
                >
                    {label}
                </span>

                <button
                    type='button'
                    className='btn btn-outline-danger btn-sm float-right delete-btn'
                    onClick={deleteTodo}
                >
                    X
                    <i className='fa fa-trash-o' />
                </button>

                <button
                    type='button'
                    className='btn btn-outline-succcess btn-sm float-right important-btn'
                    onClick={importantTodo}
                >
                    <i className='fa fa-exclamation' />
                </button>
            </span>
        );
    }
}
