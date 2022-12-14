import React, { Component } from 'react'

import AppHeader from '../app-header/app-header'
import SearchPanel from '../search-panel/search-panel'
import TodoList from '../todo-list/todo-list'
import ItemStatusFilter from '../item-status-filter/item-status-filter'

import './app.css'
import ItemAddForm from '../item-add-form'


export default class App extends Component {

  id = 1

  state = {
    data: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Learn React'),
      this.createTodoItem('Build this App'),
    ],
    searchItem: '',
    filterItem: 'all'
  }

  createTodoItem(text) {
    return {
      label: text,
      important: false,
      done: false,
      id: this.id++
    }
  }

  changeTodoProperty(data, id, prop) {
    const targetIndex = data.findIndex((todo) => todo.id === id)
    const targetTodo = { ...data[targetIndex], [prop]: !data[targetIndex][prop] }
    return {
      data: [
        ...data.slice(0, targetIndex),
        targetTodo,
        ...data.slice(targetIndex + 1),
      ]
    }
  }

  doneTodo = (id) => this.setState(({ data }) => this.changeTodoProperty(data, id, 'done'))

  importantTodo = (id) => this.setState(({ data }) => this.changeTodoProperty(data, id, 'important'))

  deleteTodo = (id) => this.setState(({ data }) => ({ data: data.filter((todo) => todo.id !== id) }))

  addTodo = (text) => this.setState(({ data }) => ({ data: [...data, this.createTodoItem(text)] }))

  search(data, searchItem) {
    if (!searchItem) return data

    return data.filter((todo) => todo.label.toLowerCase().includes(searchItem))
  }

  getSearchItem = (text) => this.setState(() => ({ searchItem: text }))

  filter(data, filterItem) {
    switch (filterItem) {
      case 'active':
        return data.filter((todo) => !todo.done)
      case 'done':
        return data.filter((todo) => todo.done)
      default:
        return data
    }
  }

  getFilterItem = (value) => this.setState({ filterItem: value })

  render() {

    const { data, filterItem, searchItem } = this.state

    const doneCount = data.filter((todo) => todo.done).length

    const visibleTodos = this.filter(this.search(data, searchItem), filterItem)

    return (
      <div className='todo-app'>
        <AppHeader
          done={doneCount}
          active={data.length - doneCount}
        />
        <div className='top-panel d-flex'>
          <SearchPanel
            getSearchItem={this.getSearchItem}
          />
          <ItemStatusFilter
            filter={filterItem}
            getFilterItem={this.getFilterItem}
          />
        </div>
        <TodoList
          todos={visibleTodos}
          doneTodo={this.doneTodo}
          deleteTodo={this.deleteTodo}
          importantTodo={this.importantTodo}
        />
        <ItemAddForm
          addTodo={this.addTodo}
        />
      </div>
    )
  }
}

// const todoData = [
//   { label: 'Drink Cofee', important: false, id: 1 },
//   { label: 'Make Awesome App', important: true, id: 2 },
//   { label: 'Have a lunch', important: false, id: 3 }
// ]
// const App = () => {

//   const handlerDelete = () =>

//   return (
//     <div className='todo-app'>
//       <AppHeader toDo={1} done={3} />
//       <div className='top-panel d-flex'>
//         <SearchPanel />
//         <ItemStatusFilter />
//       </div>
//       <TodoList
//         todos={todoData}
//         onDeleted={(id) => handlerDelete}
//       />
//     </div>
//   )
// }

// export default App