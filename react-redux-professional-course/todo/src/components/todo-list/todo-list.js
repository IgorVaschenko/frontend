import TodoListItem from "../todo-list-item/todo-list-item"
import './todo-list.css'

const TodoList = ({ todos, doneTodo, deleteTodo, importantTodo }) => {

    return (
        <ul className="list-group todo-list">
            {todos.map((todo) => {
                const { id, ...todoDate } = todo

                return (
                    <li key={id} className="list-group-item">
                        <TodoListItem
                            {...todoDate}
                            doneTodo={() => doneTodo(id)}
                            deleteTodo={() => deleteTodo(id)}
                            importantTodo={() => importantTodo(id)}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export default TodoList